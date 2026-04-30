import Link from "next/link";
import SiteTitle from "./SiteTitle";

export default function Footer() {
  return (
    <footer className="w-full bg-foreground/2 border-t border-foreground/5 py-12 mt-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <SiteTitle />

        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-semibold tracking-wider text-foreground/60">
          <Link href="#" className="hover:text-foreground transition-colors">
            PRIVACY POLICY
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            TERMS OF SERVICE
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            SHIPPING & RETURNS
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            CONTACT US
          </Link>
        </nav>

        <div className="text-xs font-medium text-foreground/40 text-center md:text-right">
          &copy; {new Date().getFullYear()} Professional E-commerce. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
