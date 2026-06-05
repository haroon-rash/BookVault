/**
 * Admin dashboard — inventory stats, add-book form, and book table.
 * Route: /admin (protected by middleware + requireAdmin)
 */

import { requireAdmin } from "@/lib/auth/session";
import { getBooks, getBookStats } from "@/actions/books";
import AdminHeader from "@/components/admin/admin-header";
import AdminStats from "@/components/admin/admin-stats";
import BookForm from "@/components/admin/book-form";
import BookTable from "@/components/admin/book-table";
import Container from "@/components/ui/container";

export default async function AdminDashboardPage() {
  await requireAdmin();

  const [books, stats] = await Promise.all([getBooks(), getBookStats()]);

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />
      <Container className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-slate-500">
            Manage inventory, pricing, and book listings
          </p>
        </div>

        <div className="space-y-8">
          <AdminStats
            totalBooks={stats.totalBooks}
            totalStock={stats.totalStock}
            avgPrice={stats.avgPrice}
          />
          <BookForm />
          <BookTable books={books} />
        </div>
      </Container>
    </div>
  );
}
