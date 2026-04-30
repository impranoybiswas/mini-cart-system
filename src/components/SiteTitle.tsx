import Image from "next/image";
import Link from "next/link";

export default function SiteTitle() {
  return (
    <Link
      href="/"
      className="text-2xl font-bold tracking-tight text-foreground flex items-center"
    >
      <Image
        src="/logo.png"
        alt="MiniCart Logo"
        width={32}
        height={32}
        loading="eager"
        priority
        className="mr-2"
      />
      <p>
        MiniCart<span className="text-primary">.</span>
      </p>
    </Link>
  );
}
