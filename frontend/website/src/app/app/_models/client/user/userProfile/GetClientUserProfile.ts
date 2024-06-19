import useSWR from "swr";
import { getCookie } from 'cookies-next';
import axios from "axios";
import { UserInterface_ValidationErrors } from "../../../rest/UserInterface";
import { UserProfileInterface } from "../../../rest/UserProfileInterface";
import useSWRImmutable from "swr/immutable";

interface BadRequest {
  message: string,
  validationErrors: UserInterface_ValidationErrors
}

const fetcher = async (url: string, accessToken: string | undefined) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const fetchResOutput: { userProfile: UserProfileInterface } & BadRequest = response.data;
    return fetchResOutput;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export function useGet_ClientUser(query = '') {
  const accessToken = getCookie('accessToken')
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/client/@me/profile?${query}`;

  const { data, error } = useSWRImmutable(url, () => fetcher(url, accessToken));

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}