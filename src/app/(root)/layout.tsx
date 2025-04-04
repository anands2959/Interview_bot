import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/actions/auth.action";
import { Button } from "@/components/ui/button";
import { getCurrentUser, signOut } from "@/lib/actions/auth.action";
const Layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/nexthire");

  return (
    <div className="root-layout">
      <nav className="flex w-full justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/brand-logo.png" alt="MockMate Logo" width={38} height={32} />
          <h2 className="text-primary-100">NextHire</h2>
        </Link>
        <div className="flex items-center">
        <form action={signOut}>
          <Button 
            type="submit"
            className="bg-gradient-to-r text-white from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105"
          >
            Logout
          </Button>
        </form>
      </div>
      </nav>

      {children}
    </div>
  );
};

export default Layout;
