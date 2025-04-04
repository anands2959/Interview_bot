import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/actions/auth.action";

const Layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/nexthire");

  return (
    <div className="root-layout">
      <nav>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/brand-logo.png" alt="MockMate Logo" width={38} height={32} />
          <h2 className="text-primary-100">NextHire</h2>
        </Link>
      </nav>

      {children}
    </div>
  );
};

export default Layout;
