import useSWR from "swr";
import { getCookie } from 'cookies-next';
import axios from "axios";
import { UserInterface_ValidationErrors } from "../../../rest/UserInterface";
import { UserProfileInterface } from "../../../rest/UserProfileInterface";
import { fetcherClient } from "@/app/app/_utils/fetcher";

interface BadRequest {
  message: string,
  validationErrors: UserInterface_ValidationErrors
}

type Output = { userProfile: UserProfileInterface } & BadRequest;

export function useUserProfile(query = '') {
  const accessToken = getCookie('accessToken')
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/client/user/profile?${query}`;

  const { data, error } = useSWR<Output>(url, () => fetcherClient(url, accessToken));

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}