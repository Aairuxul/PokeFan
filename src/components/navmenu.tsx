import Link from "next/link";
import Image from 'next/image';
import { useSession } from "next-auth/react";

function NavMenu() {
  return (
    <nav className="flex h-16 w-full items-center justify-between bg-gray-800 px-4 text-white">
      <Link href="/" className="text-lg font-bold hover:text-gray-300">
        ComptaCount
      </Link>
      <div className="flex space-x-4">
        <Image src={useSession().data?.user?.image || "/default-avatar.png"} alt="user picture" width={32} height={32} />
        <span className="text-sm">{useSession().data?.user?.name || "Guest"}</span>
      </div>
    </nav>
  );
}

export default NavMenu;
