import prisma from "@/lib/prisma";
import { VocabolaryTable } from "@/components/vocabulary-table";
import { Prisma } from "@prisma/client";

// random
export default async function Posts() {
  const vocabularies: Prisma.VocabularyGetPayload<{}>[] =
    await prisma.vocabulary.findMany();
  return <VocabolaryTable data={vocabularies} />;
}
