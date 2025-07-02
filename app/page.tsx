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
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

// pages/index.tsx

export default function Home() {
  const [username, setUsername] = useState("")
  const [avatar, setAvatar] = useState("")

  useEffect(() => {
    const userId = Cookies.get("userId")

    console.log("Pobrano userId z ciasteczek:", userId)

    if (userId) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}`)
        .then(res => {
          return res.json();
        })
        .then(data => {
          setUsername(data.username);
          setAvatar(data.avatar)
        })
        .catch(err => {
          console.error("Błąd podczas pobierania użytkownika:", err);
        });
    }
  }, [])


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
                {username || "Guest"}
                <Avatar className="w-8 h-8 ml-2">
                  <AvatarImage src={avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="@shadcn" className="rounded-xl object-cover w-full h-full"/>
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
