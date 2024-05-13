import { UserInterface } from "@/app/_interface/UserInterface";
import { cookies } from "next/headers";

export default async function GetUser() {
  const accessToken = cookies().get("accessToken")

  const fetchRes = await fetch('http://localhost:5000/api/client/@me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
      'Content-Type': 'application/json'
    },
  })

  if (!fetchRes.ok) {
    return (
      <div>
        Failed To Fetch (status: {fetchRes.status})
      </div>
    )
  }

  const fetchResOutput: { user: UserInterface } = await fetchRes.json()

  const { user } = fetchResOutput

  return (
    <div>
      <pre>
        {JSON.stringify(user, null, 4)}
      </pre>
    </div>
  );
}
