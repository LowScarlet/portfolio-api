import { setToken } from "@/app/(authentication)/_utils/token";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { passport: string } }) {
  const passport = params.passport
  const searchParams = request.nextUrl.searchParams;

  let queryString = "";
  searchParams.forEach((value, key) => {
    queryString += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`;
  });
  queryString = queryString.slice(0, -1);

  const fetchRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/oauth/${passport}/exchange?${queryString}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const fetchResOutput = await fetchRes.json();

  if (!fetchRes.ok) {
    const { message } = fetchResOutput;
    return new Response(message, {
      status: fetchRes.status,
    });
  }

  const { data } = fetchResOutput;

  await setToken(data);

  revalidateTag('getMe')

  return new Response('Noice!', {
    status: fetchRes.status,
  });
}
