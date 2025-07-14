"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,

    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEditUserMutation, useGetMeQuery } from "@/redux/services/user"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import Link from "next/link"
import { useState } from "react"
import Cookies from "js-cookie";
import { useRouter } from "next/navigation"


export default function EditProfile() {

    const userId = Cookies.get("userId");
    const { data: user } = useGetMeQuery(userId);

    const [ editUser ] = useEditUserMutation();

    const [avatar, setAvatar] = useState("");
    const [username, setUsername] = useState("");

    const router = useRouter();

    if (!user) {
        return <div className="text-center p-6">Loading...</div>;
    }


    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedAvatar = avatar || user.avatar;
    const updatedUsername = username || user.username;

    try {
        editUser({ id: userId, avatar: updatedAvatar, username: updatedUsername }).unwrap();
        console.log("Profile updated successfully");
        router.push("/profile")
    }
    catch (error) {
        console.error("Error updating profile:", error);
    }
}

    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Edit your profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-center ">
                            <Avatar className="flex w-25 h-25">
                                <AvatarImage
                                    src={user.avatar}
                                    alt="User avatar"
                                    className="rounded-full object-cover w-full h-full"
                                />
                            </Avatar>
                        </div>

                        <form className="grid gap-6">
                            <div className="grid gap-6">
                                <div className="flex flex-col gap-4">
                                </div>
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="awatar">Custom profile picture</Label>
                                        <Input
                                            id="awatar"
                                            type="text"
                                            value={avatar}
                                            onChange={(e) => setAvatar(e.target.value)}
                                            placeholder="https://example.com/avatar.jpg"
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <div className="flex items-center">
                                            <Label htmlFor="username">Username</Label>

                                        </div>
                                        <Input
                                            id="username"
                                            type="text"
                                            value={username}
                                            placeholder={user.username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex w-full gap-2">
                                        <Link href="/profile" className="w-1/2">
                                            <Button variant="outline" className="w-full">
                                                Cancel
                                            </Button>
                                        </Link>
                                        <Button type="submit" className="w-1/2" onClick={handleSubmit}>
                                            Save
                                        </Button>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </CardContent>
                </Card>

            </div>
        </div>

    )
}
