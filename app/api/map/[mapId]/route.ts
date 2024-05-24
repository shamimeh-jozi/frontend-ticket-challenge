import { NextRequest, NextResponse } from "next/server";

const maps = {
  m213: [
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ],
  m654: [
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [1, 0, 0, 1],
    [0, 1, 0, 0],
  ],
  m63: [
    [1, 0, 0, 0],
    [0, 1, 0, 1],
    [0, 0, 1, 0],
    [1, 1, 1, 1],
  ],
  m6888: [
    [0, 1, 0, 1],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
    [1, 1, 0, 1],
  ],
};

type MapId = keyof typeof maps;

// fetch map details
export async function GET(
  request: NextRequest,
  { params }: { params: { mapId: MapId } }
) {
  const { mapId } = params;
  const map = maps[mapId];

  if (map) {
    return NextResponse.json(map);
  } else {
    return NextResponse.json({ error: "Map not found" }, { status: 404 });
  }
}

// reserve ticket
export async function POST(
  request: NextRequest,
  { params }: { params: { mapId: string } }
) {
  const { mapId } = params;
  const { x, y } = await request.json();

  if (!maps[mapId as MapId]) {
    return NextResponse.json({ error: "Map not found" }, { status: 404 });
  }

  if (maps[mapId as MapId][x][y] === 1) {
    return NextResponse.json(
      { error: "Seat is already reserved" },
      { status: 400 }
    );
  }

  // Assume payment is processed here and seat is reserved
  maps[mapId as MapId][x][y] = 1;

  // Return a mock ticket ID
  return NextResponse.json({ ticketId: `${mapId}-${x}-${y}` });
}
