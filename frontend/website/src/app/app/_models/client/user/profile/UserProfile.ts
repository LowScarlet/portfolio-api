import useSWR from "swr";
import { getCookie } from 'cookies-next';
import axios from "axios";
import { UserInterface_ValidationErrors } from "../../../interface/UserInterface";
import { UserProfileInterface } from "../../../interface/UserProfileInterface";
import { fetcherClient } from "@/app/_utils/fetcher";

interface BadRequest {
  message: string,
  validationErrors: UserInterface_ValidationErrors
}

type Output = { userProfile: UserProfileInterface } & BadRequest;

export function useUserProfile() {
  const accessToken = getCookie('accessToken')
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/client/user/profile`;

  const { data, error } = useSWR<Output>(url, () => fetcherClient(url, accessToken));

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}