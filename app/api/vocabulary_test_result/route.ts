import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const uid = searchParams.get("uid") || "";

  const results = await prisma.vocabularyTestResult.findMany({
    where: {
      uid,
    },
    orderBy: {
      score: "asc",
    },
    take: 30,
  });

  return Response.json(results);
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

  return new Response(JSON.stringify(created), {
    status: 201,
  });
}
