import { Prisma } from "@prisma/client";

export async function GET() {
  return Response.json({});
}

export async function POST(request: Request) {
  const input: Prisma.VocabularyTestResultUncheckedCreateInput =
    await request.json();
  console.log("input:", input);

  return new Response(JSON.stringify({ quote: "data.content" }), {
    status: 201,
  });
}
