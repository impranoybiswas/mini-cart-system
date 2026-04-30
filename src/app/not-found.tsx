import Link from "next/link";
import { FileQuestion, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-dvh flex items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full flex flex-col items-center text-center p-8 bg-foreground/2 border border-foreground/10 rounded-3xl shadow-xl shadow-black/5 backdrop-blur-xl">
        <div className="w-16 h-16 rounded-full bg-foreground/5 text-foreground/60 flex items-center justify-center mb-6">
          <FileQuestion className="w-8 h-8" />
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">
          404
        </h2>
        <h3 className="text-xl font-semibold tracking-tight text-foreground mb-3">
          Page Not Found
        </h3>

        <p className="text-foreground/60 mb-8 max-w-[280px]">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>

        <Link
          href="/"
          className="w-full btn bg-primary text-white h-12 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-semibold">Back to Catalog</span>
        </Link>
      </div>
    </div>
  );
}
