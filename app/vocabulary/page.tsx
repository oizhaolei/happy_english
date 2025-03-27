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
    <div className="grid grid-cols-6 gap-4">
      <div className="col-start-1 col-end-3 ">
        <VocabularyCategoryList list={categories} />
      </div>
      <div className="col-start-4 col-end-6 ">
        <VocabularyResultTable />
      </div>
    </div>
  );
}
