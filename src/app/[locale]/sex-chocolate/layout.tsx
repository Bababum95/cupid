import { Footer } from "@/components/sex-chocolate";

export default async function SexChocolateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
