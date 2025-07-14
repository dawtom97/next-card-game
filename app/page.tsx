"use client";

import { Toaster } from "sonner";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Cookies from "js-cookie";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useGetMeQuery } from "@/redux/services/user";

// pages/index.tsx

export default function Home() {
  const userId = Cookies.get("userId")

  const {data: user} = useGetMeQuery(userId);

  if(!user) {
    return <div className="text-center p-6">Loading...</div>;
  }

  const hadnleLogout = () => {
    Cookies.remove("userId");
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex justify-center mt-6">
        <NavigationMenu>
          <NavigationMenuList className="gap-6">

            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center gap-2">
                {user.username}
                <Avatar className="w-8 h-8 ml-2">
                  <AvatarImage src={user.avatar} alt="@shadcn" className="rounded-xl object-cover w-full h-full"/>
                </Avatar>
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-2 w-40 bg-white shadow-lg rounded-md ">
                <ul className="flex flex-col gap-2">
                  <li>
                    <NavigationMenuLink
                      href="/profile"
                      className="block px-3 py-1 hover:bg-gray-100 rounded"
                    >
                      Profile
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink
                      href="/auth/login"
                      className="block px-3 py-1 hover:bg-gray-100 rounded"
                      onClick={hadnleLogout}
                    >
                      Wyloguj
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <h1 className="text-center text-2xl font-bold mt-10">Hello</h1>
      <Toaster richColors position="top-center" />
    </div>
  )
}
