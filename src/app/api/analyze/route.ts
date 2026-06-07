import { NextResponse } from "next/server";
import { analyzeProduct } from "@/services/gemini";

export async function POST(request: Request) {
    console.log("API KEY EXISTS:", !!process.env.GEMINI_API_KEY);
  try {
    const body = await request.json();

    const result = await analyzeProduct(body.productIdea);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
  console.error("FULL ERROR:", error);

  return NextResponse.json(
    {
      success: false,
      error: String(error),
    },
    {
      status: 500,
    }
  );
  }
}