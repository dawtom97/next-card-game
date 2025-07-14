"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Trophy } from "lucide-react";

import Cookies from "js-cookie";
import { useGetMeQuery } from "@/redux/services/user";

export default function UserProfile() {
  const userId = Cookies.get("userId");
  const {data: user} = useGetMeQuery(userId);

  if (!user) {
    return <div className="text-center p-6">Loading...</div>;
  }

  return (
    <Card className="max-w-2xl mx-auto p-6">
      <div className="flex flex-col items-center gap-2 relative">
        <button className="absolute top-2 right-2 bg-white text-gray-600 font-semibold px-3 py-1 rounded shadow hover:bg-gray-200 border-1 border-gray-200 transition" onClick={() => window.location.href = "/profile/edit"}>
          Edit Profile
        </button>

        <Avatar className="w-20 h-20">
          <AvatarImage
            src={user.avatar}
            alt="User avatar"
            className="rounded-full object-cover w-full h-full"
          />
        </Avatar>

        <div className="text-center">
          <h2 className="text-xl font-semibold">{user.username}</h2>
          <p className="text-muted-foreground text-sm">{user.email}</p>
        </div>
      </div>

      <CardContent className="mt-2">
        <div className="flex flex-col items-center mb-6 space-y-1">
          <span className="text-2xl font-semibold">Ranking</span>

          <div className="flex items-center gap-2">
            <Trophy className="text-yellow-500 w-6 h-6" />
            <div className="text-lg text-muted-foreground">{user.ranking}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 border rounded-lg overflow-hidden text-center divide-x">
          <div className="p-4">
            <div className="text-lg font-semibold">{user.wins}</div>
            <div className="text-sm text-muted-foreground">Won games</div>
          </div>
          <div className="p-4">
            <div className="text-lg font-semibold">{user.losses}</div>
            <div className="text-sm text-muted-foreground">Lost games</div>
          </div>
          <div className="p-4">
            <div className="text-lg font-semibold">{user.ties}</div>
            <div className="text-sm text-muted-foreground">Ties</div>
          </div>
        </div>
      </CardContent>
    </Card>

  );
}
