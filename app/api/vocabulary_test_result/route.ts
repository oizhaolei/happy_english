import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET() {
  return Response.json({});
}

export async function POST(request: Request) {
  const input: Prisma.VocabularyTestResultUncheckedCreateInput =
    await request.json();
  const created = await prisma.vocabularyTestResult.upsert({
    create: {
      uid: input.uid,
      from_message: input.from_message,
      score: input.score,
    },
    update: {
      score: input.score,
    },
    where: {
      uid_from_message: {
        uid: input.uid,
        from_message: input.from_message,
      },
    },
  });
  console.log("created:", created);

  return new Response(JSON.stringify(created), {
    status: 201,
  });
}
