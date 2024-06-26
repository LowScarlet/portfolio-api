import { fetcherClient } from "@/app/_utils/fetcher";
import { getCookie } from 'cookies-next';
import useSWR from "swr";
import { PortfolioInterface, PortfolioInterface_ValidationErrors } from "../../interface/PortfolioInterface";
import { PortfolioProfileInterface } from "../../interface/PortfolioProfileInterface";

interface BadRequest {
  message: string,
  validationErrors: PortfolioInterface_ValidationErrors
}

type Output = { portfolio: (PortfolioInterface & { PortfolioProfile: PortfolioProfileInterface }) } & BadRequest;

export function usePortfolio(id: string) {
  const accessToken = getCookie('accessToken')
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/client/portfolios?id=${id}`;

  const { data, error } = useSWR<Output>(url, () => fetcherClient(url, accessToken));

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
