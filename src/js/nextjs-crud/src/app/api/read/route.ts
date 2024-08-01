import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({ status: "read" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
      },
      {
        status: 500,
      }
    );
  }
}
