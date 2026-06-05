/**
 * Shopping cart page — line items and order summary.
 * Route: /cart
 */

import Container from "@/components/ui/container";
import CartList from "@/components/cart/cart-list";
import CartSummary from "@/components/cart/cart-summary";

export default function CartPage() {
  return (
    <Container className="py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Shopping Cart</h1>
        <p className="mt-1 text-slate-500">Review items before checkout</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CartList />
        </div>
        <div>
          <CartSummary />
        </div>
      </div>
    </Container>
  );
}
