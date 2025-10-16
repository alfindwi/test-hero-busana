import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { useLocation, useParams } from "react-router-dom";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { id } = useParams();
  const { pathname } = useLocation();

  if (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === `/tasks/${id}`
  ) {
    return (
      <div className="min-h-screen bg-[#f2f7f5] flex items-center justify-center p-4">
        {children}
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
