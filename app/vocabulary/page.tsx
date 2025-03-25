import { VocabularyCategoryList } from "@/components/vocabulary/category-list";
import { VocabularyResultTable } from "@/components/vocabulary/result/table";
import prisma from "@/lib/prisma";

// random
export default async function Vocabularis() {
  const categories = await prisma.vocabulary.findMany({
    distinct: ["category"],
    select: {
      category: true,
    },
  });

  return (
    <div className="inline-block max-w-lg text-center justify-center">
      <VocabularyCategoryList list={categories} />
      <VocabularyResultTable />
    </div>
  );
}
