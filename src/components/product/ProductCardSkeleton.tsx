export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-foreground/2 border border-foreground/10">
      {/* Image placeholder */}
      <div className="aspect-square w-full bg-foreground/10 animate-pulse" />

      {/* Content placeholder */}
      <div className="flex flex-col flex-1 px-4 pt-3 pb-4 gap-3">
        {/* Product name */}
        <div className="h-4 w-3/4 bg-foreground/10 rounded-md animate-pulse" />

        {/* Description */}
        <div className="h-3 w-full bg-foreground/10 rounded-md animate-pulse" />
        <div className="h-3 w-2/3 bg-foreground/10 rounded-md animate-pulse" />

        <div className="mt-auto pt-3 flex flex-col gap-3">
          {/* Price */}
          <div className="h-4 w-1/3 bg-foreground/10 rounded-md animate-pulse" />

          {/* Button */}
          <div className="h-8 md:h-10 w-full bg-foreground/10 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}
