import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

import { VocabolaryTable } from "@/components/vocabolary/table";

// random
export default async function Posts() {
  const vocabularies: Prisma.VocabularyGetPayload<{}>[] =
    await prisma.vocabulary.findMany();
  return <VocabolaryTable list={vocabularies} />;
}
