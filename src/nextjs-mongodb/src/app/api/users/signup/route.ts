import { connect } from "@/helpers/db.config";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
