import { cookies } from "next/headers";

import PageV1 from "./v1/page";
import PageV2 from "./v2/page";

export default function Page() {
  const cookieStore = cookies();

  if (cookieStore.get("variant")?.value === "2") {
    return <PageV2 />;
  }

  return <PageV1 />;
}
