import ProductList from "@/components/ProductList";

export default function Home() {
  return (
    <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col min-h-0">
      <main className="flex-1 w-full flex flex-col">
        <ProductList />
      </main>
    </div>
  );
}
