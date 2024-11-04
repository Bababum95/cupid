import { Footer, Header } from "@/components/sex-chocolate";

export default async function SexChocolateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
