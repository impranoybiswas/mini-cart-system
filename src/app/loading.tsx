export default function Loading() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8 lg:gap-12 min-h-dvh">
      {/* Main Content Loading Skeleton */}
      <main className="flex-1 min-w-0 flex flex-col">
        <header className="mb-10 md:mt-4 space-y-4">
          <div className="w-32 h-7 bg-foreground/5 animate-pulse rounded-full mb-5"></div>
          <div className="w-3/4 max-w-md h-12 bg-foreground/5 animate-pulse rounded-xl mb-4"></div>
          <div className="w-1/2 max-w-sm h-6 bg-foreground/5 animate-pulse rounded-lg"></div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-2xl bg-foreground/2 border border-foreground/5 h-[380px] animate-pulse"
            >
              <div className="w-full aspect-square bg-foreground/10"></div>
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div className="w-3/4 h-5 bg-foreground/10 rounded-md"></div>
                <div className="w-full h-4 bg-foreground/10 rounded-md"></div>
                <div className="w-5/6 h-4 bg-foreground/10 rounded-md"></div>
                <div className="mt-auto pt-5 flex justify-between items-center">
                  <div className="w-16 h-6 bg-foreground/10 rounded-md"></div>
                  <div className="w-28 h-10 bg-foreground/10 rounded-lg"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Sidebar Loading Skeleton */}
      <aside className="w-full md:w-[350px] lg:w-[400px] shrink-0 md:pt-4">
        <div className="sticky top-8 h-[500px] bg-foreground/2 border border-foreground/5 rounded-2xl animate-pulse p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-foreground/10"></div>
            <div className="flex flex-col gap-2">
              <div className="w-24 h-5 bg-foreground/10 rounded-md"></div>
              <div className="w-16 h-4 bg-foreground/10 rounded-md"></div>
            </div>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="w-16 h-16 rounded-lg bg-foreground/10 shrink-0"></div>
                <div className="flex-1 flex flex-col gap-2 py-1">
                  <div className="w-full h-4 bg-foreground/10 rounded-md"></div>
                  <div className="w-2/3 h-4 bg-foreground/10 rounded-md"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
