"use client";

import { useGetAllUsersQuery } from "@/redux/services/user";



const GamePage = () => {

  const {data, error, isLoading} = useGetAllUsersQuery(null);

  console.log(data)

  return <h1>Game Page</h1>;
};

export default GamePage;
