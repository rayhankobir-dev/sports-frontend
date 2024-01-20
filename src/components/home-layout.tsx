import FooterSection from "./footer";
import HeaderSection from "./header";

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderSection />
      <main className="container max-w-7xl mx-auto">{children}</main>
      <FooterSection />
    </>
  );
}

export default HomeLayout;
