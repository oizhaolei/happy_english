import { Link } from "@heroui/link";

import prisma from "@/lib/prisma";

export default async function Posts() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });

  return posts.map((post) => (
    <li key={post.id}>
      <span className="font-semibold">
        <Link href={`/posts/${post.id}`}>{post.title}</Link>
      </span>
      <span className="text-sm text-gray-600 ml-2">by {post.author.name}</span>
    </li>
  ));
}
