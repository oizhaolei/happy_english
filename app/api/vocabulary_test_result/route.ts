import { Prisma } from "@prisma/client";
import { PrimitiveType } from "intl-messageformat";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({});
}

export async function POST(request: NextRequest) {
  const input: Prisma.VocabularyTestResultUncheckedCreateInput =
    await request.json();
  console.log("input:", input);

  return new NextResponse(JSON.stringify({ quote: "data.content" }), {
    status: 201,
  });
}
