import { NextResponse } from 'next/server';
import { Player } from '../../lib/types';

// Fallback mock data in case API fails
const mockPlayers: Player[] = [
  { id: '1', name: 'Christian McCaffrey', team: 'SF', position: 'RB' },
  { id: '2', name: 'Tyreek Hill', team: 'MIA', position: 'WR' },
  { id: '3', name: 'CeeDee Lamb', team: 'DAL', position: 'WR' },
  { id: '4', name: 'Bijan Robinson', team: 'ATL', position: 'RB' },
  { id: '5', name: 'Amon-Ra St. Brown', team: 'DET', position: 'WR' },
  { id: '6', name: 'Breece Hall', team: 'NYJ', position: 'RB' },
  { id: '7', name: "Ja'Marr Chase", team: 'CIN', position: 'WR' },
  { id: '8', name: 'Justin Jefferson', team: 'MIN', position: 'WR' },
  { id: '9', name: 'Travis Kelce', team: 'KC', position: 'TE' },
  { id: '10', name: 'Patrick Mahomes', team: 'KC', position: 'QB' },
  { id: '11', name: 'Josh Allen', team: 'BUF', position: 'QB' },
  { id: '12', name: 'Saquon Barkley', team: 'PHI', position: 'RB' },
  { id: '13', name: 'Garrett Wilson', team: 'NYJ', position: 'WR' },
  { id: '14', name: 'A.J. Brown', team: 'PHI', position: 'WR' },
  { id: '15', name: 'Puka Nacua', team: 'LAR', position: 'WR' },
  { id: '16', name: 'Derrick Henry', team: 'BAL', position: 'RB' },
  { id: '17', name: 'Lamar Jackson', team: 'BAL', position: 'QB' },
  { id: '18', name: 'Stefon Diggs', team: 'HOU', position: 'WR' },
  { id: '19', name: 'Cooper Kupp', team: 'LAR', position: 'WR' },
  { id: '20', name: 'Davante Adams', team: 'LV', position: 'WR' },
];

export async function GET() {
  try {
    // Attempt to fetch real data from RapidAPI
    const response = await fetch(
      'https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLPlayerList',
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': process.env.RAPIDAPI_KEY || '',
          'x-rapidapi-host': 'tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com'
        },
        // Cache for 1 hour to avoid hitting API limits
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Valid fantasy positions
    const validPositions = ['QB', 'RB', 'WR', 'TE', 'K'];

    // Transform API response to match our Player type
    // Filter to only include active players with fantasy-relevant positions
    const players: Player[] = (data.body || [])
      .filter((player: any) => {
        // Must have a valid position for fantasy
        const hasValidPosition = validPositions.includes(player.pos);
        // Must be on an active NFL team (not free agent or retired)
        const hasTeam = player.team && player.team !== 'FA' && player.team !== '';
        // Must have a player ID for projection lookups
        const hasId = player.playerID || player.espnID;
        // Must have a name
        const hasName = player.espnName || player.longName;

        return hasValidPosition && hasTeam && hasId && hasName;
      })
      .map((player: any) => ({
        id: player.playerID || player.espnID,
        name: player.espnName || player.longName,
        team: player.team,
        position: player.pos,
      }));

    return NextResponse.json({
      players,
      count: players.length,
      source: 'api'
    });

  } catch (error) {
    console.error('Error fetching from NFL API, using mock data:', error);

    // Fall back to mock data if API fails
    return NextResponse.json({
      players: mockPlayers,
      count: mockPlayers.length,
      source: 'mock'
    });
  }
}
