import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import { LocaleProvider } from "@/hooks/useLocale";

// Public pages: site menu and footer. The admin dashboard has its own layout.
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="w-full min-h-screen-footer bg-bg text-fg">
        <LocaleProvider>
          <Menu />
          {children}
        </LocaleProvider>
      </div>
      <Footer />
    </>
  );
}
