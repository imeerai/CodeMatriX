"use client"
import LoginButton from "@/components/LoginButton"
import { SignedOut, UserButton } from "@clerk/nextjs"
import { User } from "lucide-react"

function HeaderProfileBtn() {
  return (
    <div className="relative">
      <UserButton
        appearance={{
          elements: {
            userButtonPopoverCard: "right-0 left-auto max-w-[300px] w-[300px]",
            userButtonPopoverActionButton: "text-sm py-2",
            userButtonPopoverActionButtonIcon: "w-4 h-4",
            userButtonPopoverFooter: "hidden",
          },
        }}
      >
        <UserButton.MenuItems>
          <UserButton.Link label="Profile" labelIcon={<User className="size-4" />} href="/profile" />
        </UserButton.MenuItems>
      </UserButton>

      <SignedOut>
        <LoginButton />
      </SignedOut>
    </div>
  )
}
export default HeaderProfileBtn
