/**
 * Store layout — sticky header and content wrapper for public routes.
 */

import StoreHeader from "@/components/layout/store-header";
import Container from "@/components/ui/container";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <StoreHeader />
      <main>{children}</main>
      <footer className="mt-16 border-t border-slate-200 bg-white py-8">
        <Container>
          <p className="text-center text-sm text-slate-500">
            © {new Date().getFullYear()} BookVault. All rights reserved.
          </p>
        </Container>
      </footer>
    </div>
  );
}
