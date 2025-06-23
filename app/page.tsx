"use client";

// pages/index.tsx
import { useGetPostsQuery } from "@/redux/services/api";

export default function Home() {
  const { data, error, isLoading } = useGetPostsQuery()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error occurred</div>

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data?.map(post => (
          <li key={post.id}>
            <strong>{post.title}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}
