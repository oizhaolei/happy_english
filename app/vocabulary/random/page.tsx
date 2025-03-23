import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

import { VocabolaryRecite } from "@/components/vocabolary/recite";

// random
export default async function Posts() {
  const count = await prisma.vocabulary.count();
  const skip = Math.floor(Math.random() * count);

  const vocabularies: Prisma.VocabularyGetPayload<{}>[] =
    await prisma.vocabulary.findMany({
      take: 1,
      skip: skip,
    });
  if (vocabularies && vocabularies.length > 0) {
    return <VocabolaryRecite data={vocabularies[0]} />;
  } else {
    <div>Please Refresh</div>;
  }
}
