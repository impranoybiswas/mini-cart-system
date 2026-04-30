import ProductList from "@/components/ProductList";
import Cart from "@/components/Cart";

export default function Home() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8 lg:gap-12 min-h-dvh">
      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col">
        <header className="mb-10 md:mt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold tracking-wide uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            Featured Collection
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            Essential Gear
          </h1>
          <p className="text-foreground/60 text-lg max-w-xl leading-relaxed">
            Discover our curated selection of highly aesthetic tools, gear, and
            accessories for the modern creator.
          </p>
        </header>

        <ProductList />
      </main>

      {/* Cart Sidebar */}
      <aside className="w-full md:w-[350px] lg:w-[400px] shrink-0 md:pt-4">
        <div className="sticky top-8">
          <Cart />
        </div>
      </aside>
    </div>
  );
}
