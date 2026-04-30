import Link from "next/link";

export default function SiteTitle() {
  return (
    <Link
      href="/"
      className="text-2xl font-bold tracking-tight text-foreground flex items-center"
    >
      MiniCart<span className="text-primary">.</span>
    </Link>
  );
}
