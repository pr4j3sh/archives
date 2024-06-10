import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();
    console.log(data);
    return NextResponse.json({ status: "created", data }, { status: 200 });
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
