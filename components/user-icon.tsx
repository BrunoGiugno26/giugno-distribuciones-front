"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { User } from "lucide-react";

export default function UserIcon() {
  return (
    <>
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "w-6 h-6",
            },
          }}
        />
      </SignedIn>

      <SignedOut>
        <Link href="/sign-in" className="flex items-center">
          <User strokeWidth={2} className="cursor-pointer" />
        </Link>
      </SignedOut>
    </>
  );
}
