import { SexChocolateFooter } from "@/components";

export default async function SexChocolateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <SexChocolateFooter />
    </>
  );
}
