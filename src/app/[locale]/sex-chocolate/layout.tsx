import { Footer, Header } from "@/components/sex-chocolate";

export default function SexChocolateLayout({
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
