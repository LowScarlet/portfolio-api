import useSWR from "swr";
import { getCookie } from 'cookies-next';
import { fetcherClient } from "@/app/app/_utils/fetcher";
import { PortfolioInterface, PortfolioInterface_ValidationErrors } from "../../rest/PortfolioInterface";
import { PortfolioProfileInterface } from "../../rest/PortfolioProfileInterface";

interface BadRequest {
  message: string,
  validationErrors: PortfolioInterface_ValidationErrors
}

type Output = { portfolio: (PortfolioInterface & { PortfolioProfile: PortfolioProfileInterface }) } & BadRequest;

export function usePortfolio(id: string, query = '') {
  const accessToken = getCookie('accessToken')
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/client/portfolios?id=${id}&${query}`;

  const { data, error } = useSWR<Output>(url, () => fetcherClient(url, accessToken));

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}