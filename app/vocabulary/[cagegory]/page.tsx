import { Prisma } from "@prisma/client";

import prisma from "@/lib/prisma";
import { VocabularyQuiz } from "@/components/vocabulary/quiz";

export default async function VocabularyPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const count = await prisma.vocabulary.count({
    where: {
      category,
    },
  });
  const skip = Math.floor(Math.random() * count);

  const vocabularies: Prisma.VocabularyGetPayload<{}>[] =
    await prisma.vocabulary.findMany({
      where: {
        category,
      },
      take: 1,
      skip: skip,
    });
  if (vocabularies && vocabularies.length > 0) {
    return <VocabularyQuiz data={vocabularies[0]} />;
  } else {
    <div>Please Refresh</div>;
  }
}
