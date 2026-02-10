import { NextRequest, NextResponse } from 'next/server';

async function fetchPlayerProjection(playerId: string) {
  const response = await fetch(
    `https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLProjections?playerID=${playerId}`,
    {
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY || '',
        'x-rapidapi-host': 'tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com'
      }
    }
  );
  return response.json();
}

// Calculate PPR fantasy points from raw stats
function calculateFantasyPoints(projection: any): number {
  if (!projection) return 0;

  let points = 0;

  // Passing: 0.04 pts per yard, 4 pts per TD, -2 per INT
  if (projection.Passing) {
    points += parseFloat(projection.Passing.passYds || 0) * 0.04;
    points += parseFloat(projection.Passing.passTD || 0) * 4;
    points -= parseFloat(projection.Passing.int || 0) * 2;
  }

  // Rushing: 0.1 pts per yard, 6 pts per TD
  if (projection.Rushing) {
    points += parseFloat(projection.Rushing.rushYds || 0) * 0.1;
    points += parseFloat(projection.Rushing.rushTD || 0) * 6;
  }

  // Receiving (PPR): 1 pt per reception, 0.1 pts per yard, 6 pts per TD
  if (projection.Receiving) {
    points += parseFloat(projection.Receiving.receptions || 0) * 1; // PPR
    points += parseFloat(projection.Receiving.recYds || 0) * 0.1;
    points += parseFloat(projection.Receiving.recTD || 0) * 6;
  }

  // 2-point conversions
  points += parseFloat(projection.twoPointConversion || 0) * 2;

  // Fumbles lost: -2 pts
  points -= parseFloat(projection.fumblesLost || 0) * 2;

  return Math.round(points * 10) / 10; // Round to 1 decimal
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { player1: player1Id, player2: player2Id } = body;

    if (!player1Id || !player2Id) {
      return NextResponse.json(
        { error: 'Both player IDs are required' },
        { status: 400 }
      );
    }

    // Fetch projections for both players in parallel
    const [player1Response, player2Response] = await Promise.all([
      fetchPlayerProjection(player1Id),
      fetchPlayerProjection(player2Id)
    ]);

    // Check if we got valid responses with projection data
    const p1 = player1Response.body;
    const p2 = player2Response.body;

    // Build specific error message for players missing data
    const p1HasData = p1?.projections && p1.projections.length > 0;
    const p2HasData = p2?.projections && p2.projections.length > 0;

    if (!p1HasData || !p2HasData) {
      const missingPlayers: string[] = [];
      if (!p1HasData) {
        missingPlayers.push(p1?.longName || p1?.espnName || 'Player 1');
      }
      if (!p2HasData) {
        missingPlayers.push(p2?.longName || p2?.espnName || 'Player 2');
      }

      const errorMessage = missingPlayers.length === 2
        ? 'Neither player has fantasy projection data available. They may be inactive, injured, or former players.'
        : `${missingPlayers[0]} does not have fantasy projection data available. They may be inactive, injured, or a former player. Please select a different player.`;

      return NextResponse.json(
        { error: errorMessage },
        { status: 404 }
      );
    }

    // Get the first week's projection (most recent/upcoming)
    const p1Projection = p1.projections[0];
    const p2Projection = p2.projections[0];

    // Calculate fantasy points
    const player1Points = calculateFantasyPoints(p1Projection);
    const player2Points = calculateFantasyPoints(p2Projection);

    // Calculate season average for "recent average"
    const p1SeasonProjection = p1.projections.find((p: any) => p.week === 'season');
    const p2SeasonProjection = p2.projections.find((p: any) => p.week === 'season');

    // Divide season totals by 17 games for weekly average
    const p1RecentAvg = p1SeasonProjection ? calculateFantasyPoints(p1SeasonProjection) / 17 : player1Points;
    const p2RecentAvg = p2SeasonProjection ? calculateFantasyPoints(p2SeasonProjection) / 17 : player2Points;

    // Determine winner and confidence
    const winner = player1Points > player2Points ? 'player1' : 'player2';
    const pointDifference = Math.abs(player1Points - player2Points);

    // Confidence based on point difference (max 95%)
    let confidence = Math.min(95, 50 + (pointDifference * 3));
    confidence = Math.round(confidence);

    const comparisonResult = {
      player1: {
        name: p1.longName,
        team: p1.team,
        position: p1.pos,
        opponent: p1Projection.week || 'Upcoming',
        projectedPoints: player1Points,
        recentAverage: Math.round(p1RecentAvg * 10) / 10,
      },
      player2: {
        name: p2.longName,
        team: p2.team,
        position: p2.pos,
        opponent: p2Projection.week || 'Upcoming',
        projectedPoints: player2Points,
        recentAverage: Math.round(p2RecentAvg * 10) / 10,
      },
      winner,
      confidence,
    };

    return NextResponse.json(comparisonResult);

  } catch (error) {
    console.error('Error in compare API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
