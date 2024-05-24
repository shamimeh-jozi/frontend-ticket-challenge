import { NextResponse } from "next/server";

const maps = ["m213", "m654", "m63", "m6888"];

// fetch maps
export async function GET() {
  return NextResponse.json(maps);
}
