import { fetcherClient } from "@/app/_utils/fetcher";
import { rateLimitWarning } from "@/app/_utils/utils";
import axios from "axios";
import { getCookie } from 'cookies-next';
import useSWR, { mutate } from "swr";
import { PortfolioInterface, PortfolioInterface_Update, PortfolioInterface_ValidationErrors } from "../../../interface/PortfolioInterface";
import { PortfolioProfileInterface } from "../../../interface/PortfolioProfileInterface";

interface BadRequest {
  message: string,
  validationErrors: PortfolioInterface_ValidationErrors
}

const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/client/user/portfolios`;

type useOutput = { portfolios: Array<(PortfolioInterface & { PortfolioProfile: PortfolioProfileInterface })> } & BadRequest;

export function revalidateUserPortfolios() {
  return mutate(url);
}

export function useUserPortfolios() {
  const accessToken = getCookie('accessToken')

  const { data, error } = useSWR<useOutput>(url, () => fetcherClient(url, accessToken));

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export async function createUserPortfolio(data: PortfolioInterface_Update) {
  const accessToken = getCookie('accessToken');

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const output: { portfolio: PortfolioInterface & { PortfolioProfile: PortfolioProfileInterface } } = response.data

    return {
      status: response.status,
      data: output,
    };

  } catch (error) {
    if (axios.isAxiosError(error)) {
      const response = error.response;
      if (response) {
        const { data, status } = response;

        if (status === 429) {
          const { resetTime } = data
          return {
            status,
            message: rateLimitWarning(resetTime)
          }
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
    }
    throw new Error('An unknown error occurred');
  }
}