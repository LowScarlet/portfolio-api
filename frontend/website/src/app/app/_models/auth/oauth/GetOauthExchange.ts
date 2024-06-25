import useSWR from "swr";
import { ReadonlyURLSearchParams } from "next/navigation";
import { fetcher } from "@/app/app/_utils/fetcher";

export function useGet_OauthExchange({ passport, searchParams }: { passport: string, searchParams: ReadonlyURLSearchParams }) {
  let queryString = "";
  searchParams.forEach((value, key) => {
    queryString += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`;
  });
  queryString = queryString.slice(0, -1);

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/oauth/${passport}/exchange?${queryString}`;

  const { data, error } = useSWR(url, () => fetcher(url));

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}