import useSWR from "swr";
import { getCookie } from 'cookies-next';
import { PortfolioInterface, PortfolioInterface_ValidationErrors } from "../../../rest/PortfolioInterface";
import { PortfolioProfileInterface } from "../../../rest/PortfolioProfileInterface";
import { fetcherClient } from "@/app/app/_utils/fetcher";

interface BadRequest {
  message: string,
  validationErrors: PortfolioInterface_ValidationErrors
}

type Output = { portfolios: Array<(PortfolioInterface & { PortfolioProfile: PortfolioProfileInterface })> } & BadRequest;

export function useGet_ClientPortfolios(query = '') {
  const accessToken = getCookie('accessToken')
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/client/user/portfolios?${query}`;

  const { data, error } = useSWR<Output>(url, () => fetcherClient(url, accessToken));

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}