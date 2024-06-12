import axios from "axios";
import { TokenInterface } from "../_interface/TokenInterface";
import { ReadonlyURLSearchParams } from "next/navigation";

interface HandlerAuthInterface {
  status: number;
  message: string;
  token?: {
    accessToken: TokenInterface
    refreshToken: TokenInterface
  };
  auth?: {
    isAuthenticated: boolean;
    user: {
      id: string;
      username: string;
      role: string;
      avatar: string;
    };
  };
  validationErrors?: any;
}

export type AuthTypeKeys = keyof typeof authType;

const authType = {
  LOGIN: 'api/auth/login',
  REGISTER: 'api/auth/register',
  OAUTH_GOOGLE: 'api/oauth/google/exchange',
} as const;

export const handleAuth = async ({
  type,
  formData,
  params
}: {
  type: AuthTypeKeys;
  formData?: any;
  params?: any
}): Promise<HandlerAuthInterface> => {
  try {
    let url: string = authType[type] || ''
    if (params) {
      url = `${url}?${params}`
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${url}`,
      formData || null,
      {
        timeout: 5000,
      }
    );

    const { status, data } = response;
    const { message, data: dataFetch } = data;
    const { user, accessToken, refreshToken } = dataFetch;

    return {
      status,
      message,
      token: {
        accessToken,
        refreshToken,
      },
      auth: {
        isAuthenticated: true,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          avatar: user.UserProfile.avatar,
        },
      },
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const response = error.response;
      if (response) {
        const { data, status } = response;

        if (status === 429) {
          const { resetTime } = data;

          const now = new Date();
          const diffMs = new Date(resetTime).getTime() - now.getTime();

          if (diffMs <= 0) {
            throw new Error('IP ban expired');
          }

          const diffMinutes = Math.floor(diffMs / (1000 * 60));
          const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);

          throw new Error(
            `Your IP has been banned for the next ${diffMinutes} minutes and ${diffSeconds} seconds!`
          );
        }

        if (status === 400) {
          const { message, validationErrors } = data;

          return {
            status,
            message,
            validationErrors,
          };
        }
      }
      throw new Error('An unknown error occurred');
    }
    throw new Error('An unknown error occurred');
  }
};
