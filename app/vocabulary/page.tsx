import { Link } from "@heroui/link";

import prisma from "@/lib/prisma";

// random
export default async function Posts() {
  const vocabularies = await prisma.vocabulary.findMany();

  return vocabularies.map((voca) => (
    <li key={voca.id}>
      <Link href={`/posts/${voca.id}`}>{voca.from_message}</Link>
      <span className="text-sm text-gray-600 ml-2">by {voca.to_message}</span>
    </li>
  ));
}
