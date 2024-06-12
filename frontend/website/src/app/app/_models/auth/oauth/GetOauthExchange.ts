import useSWR from "swr";
import axios from "axios";
import { ReadonlyURLSearchParams } from "next/navigation";

const fetcher = async (url: string) => {
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const fetchResOutput = response.data;
    return fetchResOutput;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

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