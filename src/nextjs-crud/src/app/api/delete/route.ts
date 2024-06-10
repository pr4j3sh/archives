import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    console.log(id);
    return NextResponse.json({ status: "deleted", id }, { status: 200 });
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
