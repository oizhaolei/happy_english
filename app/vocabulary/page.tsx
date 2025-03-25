import { VocabularyCategoryList } from "@/components/vocabulary/category-list";
import prisma from "@/lib/prisma";

// random
export default async function Vocabularis() {
  const categories = await prisma.vocabulary.findMany({
    distinct: ["category"],
    select: {
      category: true,
    },
  });

  return <VocabularyCategoryList list={categories} />;
}
