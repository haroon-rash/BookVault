/**
 * Admin dashboard stat cards — total books, stock, and average price.
 * Used on: /admin
 */

import { formatPrice } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  totalBooks: number;
  totalStock: number;
  avgPrice: number;
};

export default function AdminStats({ totalBooks, totalStock, avgPrice }: Props) {
  const stats = [
    { label: "Total Books", value: String(totalBooks) },
    { label: "Total Stock", value: String(totalStock) },
    { label: "Avg. Price", value: formatPrice(avgPrice) },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">
              {stat.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
