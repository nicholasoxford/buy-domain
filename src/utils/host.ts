import { headers } from "next/headers";
export async function getBaseUrlServerSide() {
  "use server";
  const headerInfo = headers();
  const host = headerInfo.get("host");

  return `${host}`;
}
