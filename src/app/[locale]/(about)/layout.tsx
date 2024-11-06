import { Subscribe, Header, Footer } from "@/components";
import { Wrapper } from "@/components/about";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>
        <Wrapper>{children}</Wrapper>
        <Subscribe />
      </main>
      <Footer />
    </>
  );
}
