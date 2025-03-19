import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
    include: {
      author: true,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 text-[#333333]">{post.title}</h1>
      <p className="text-gray-600 text-center">by {post.author.name}</p>
      <div className="prose prose-gray mt-8">
        {post.content || "No content available."}
      </div>
    </div>
  );
}
