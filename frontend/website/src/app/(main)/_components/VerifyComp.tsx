import { Verify } from "@/app/_models/auth/Verify";

export default async function VerifyComp() {
  const fetchRes = await Verify('components')

  return (<></>);
}
