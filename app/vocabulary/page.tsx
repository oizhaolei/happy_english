import { VocabolaryList } from "@/components/vocabolary/category-list";
import prisma from "@/lib/prisma";

// random
export default async function Posts() {
  const categories = await prisma.vocabulary.findMany({
    distinct: ["category"],
    select: {
      category: true,
    },
  });

  return <VocabolaryList list={categories} />;
}
