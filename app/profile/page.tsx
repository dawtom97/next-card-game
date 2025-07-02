'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Trophy } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function UserProfile() {
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('')
  const [ranking, setRanking] = useState(0);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [ties, setTies] = useState(0);


  useEffect(() => {
    const userId = Cookies.get("userId");

    if (userId) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}`)
        .then(res => res.json())
        .then(data => {
          setUsername(data.username);
          setAvatar(data.avatar);
          setEmail(data.email);
          setRanking(data.ranking);
          setWins(data.wins);
          setLosses(data.losses);
          setTies(data.ties);

          console.log("Pobrano dane użytkownika:", { data })
        })
        .catch(err => {
          console.error("Error fetching user data:", err);
        });
    }
  })

  return (
    <Card className="max-w-2xl mx-auto p-6">
      <div className="flex flex-col items-center gap-2 relative">

        <button className="absolute top-2 right-2 bg-white text-gray-600 font-semibold px-3 py-1 rounded shadow hover:bg-gray-200 border-1 border-gray-200 transition">
          Edit Profile
        </button>

        <Avatar className="w-20 h-20">
          <AvatarImage src={avatar} alt="User avatar" className="rounded-full object-cover w-full h-full" />
        </Avatar>

        <div className="text-center">
          <h2 className="text-xl font-semibold">{username}</h2>
          <p className="text-muted-foreground text-sm">{email}</p>
        </div>
      </div>

      <CardContent className="mt-2">
        <div className="flex flex-col items-center mb-6 space-y-1">
          <span className="text-2xl font-semibold">Ranking</span>

          <div className="flex items-center gap-2">
            <Trophy className="text-yellow-500 w-6 h-6" />
            <div className="text-lg text-muted-foreground">{ranking}</div>
          </div>

        </div>

        <div className="grid grid-cols-3 border rounded-lg overflow-hidden text-center divide-x">
          <div className="p-4">
            <div className="text-lg font-semibold">{wins}</div>
            <div className="text-sm text-muted-foreground">Won games</div>
          </div>
          <div className="p-4">
            <div className="text-lg font-semibold">{losses}</div>
            <div className="text-sm text-muted-foreground">Lost games</div>
          </div>
          <div className="p-4">
            <div className="text-lg font-semibold">{ties}</div>
            <div className="text-sm text-muted-foreground">Ties</div>
          </div>
        </div>

        
      </CardContent>
    </Card>
  )
}

