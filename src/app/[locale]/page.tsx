import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Page() {
  const t = useTranslations("HomePage");

  return (
    <div>
      <h1>{t("title")}</h1>
      <Link href="/sex-chocolate">{t("by-now")}</Link>
    </div>
  );
}
