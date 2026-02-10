'use client';

interface ComparisonData {
  player1: {
    name: string;
    team: string;
    position: string;
    projectedPoints: number;
    recentAverage: number;
    opponent: string;
  };
  player2: {
    name: string;
    team: string;
    position: string;
    projectedPoints: number;
    recentAverage: number;
    opponent: string;
  };
  winner: 'player1' | 'player2';
  confidence: number;
}

interface ComparisonResultsProps {
  data: ComparisonData;
}

export default function ComparisonResults({ data }: ComparisonResultsProps) {
  const winner = data[data.winner];
  const loser = data.winner === 'player1' ? data.player2 : data.player1;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Comparison Results
      </h2>

      {/* Winner Announcement */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-6 mb-8 text-white text-center">
        <div className="text-xl mb-2">Projected Winner</div>
        <div className="text-4xl font-bold mb-2">{winner.name}</div>
        <div className="text-lg opacity-90">
          Projected to score {(winner.projectedPoints ?? 0).toFixed(1)} fantasy points
        </div>
        <div className="mt-2 text-sm opacity-75">
          Confidence: {data.confidence}%
        </div>
      </div>

      {/* Detailed Comparison */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Player 1 */}
        <div className={`p-6 rounded-lg ${data.winner === 'player1' ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-500' : 'bg-gray-50 dark:bg-gray-700'}`}>
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            {data.player1.name}
          </h3>
          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <div className="flex justify-between">
              <span>Team:</span>
              <span className="font-semibold">{data.player1.team}</span>
            </div>
            <div className="flex justify-between">
              <span>Position:</span>
              <span className="font-semibold">{data.player1.position}</span>
            </div>
            <div className="flex justify-between">
              <span>Opponent:</span>
              <span className="font-semibold">{data.player1.opponent}</span>
            </div>
            <div className="border-t border-gray-300 dark:border-gray-600 pt-3 mt-3">
              <div className="flex justify-between">
                <span>Recent Avg:</span>
                <span className="font-semibold">{(data.player1.recentAverage ?? 0).toFixed(1)} pts</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="font-bold">Projected Points:</span>
                <span className="font-bold text-xl text-blue-600 dark:text-blue-400">
                  {(data.player1.projectedPoints ?? 0).toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Player 2 */}
        <div className={`p-6 rounded-lg ${data.winner === 'player2' ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-500' : 'bg-gray-50 dark:bg-gray-700'}`}>
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            {data.player2.name}
          </h3>
          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <div className="flex justify-between">
              <span>Team:</span>
              <span className="font-semibold">{data.player2.team}</span>
            </div>
            <div className="flex justify-between">
              <span>Position:</span>
              <span className="font-semibold">{data.player2.position}</span>
            </div>
            <div className="flex justify-between">
              <span>Opponent:</span>
              <span className="font-semibold">{data.player2.opponent}</span>
            </div>
            <div className="border-t border-gray-300 dark:border-gray-600 pt-3 mt-3">
              <div className="flex justify-between">
                <span>Recent Avg:</span>
                <span className="font-semibold">{(data.player2.recentAverage ?? 0).toFixed(1)} pts</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="font-bold">Projected Points:</span>
                <span className="font-bold text-xl text-blue-600 dark:text-blue-400">
                  {(data.player2.projectedPoints ?? 0).toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Analysis</h4>
        <p className="text-gray-700 dark:text-gray-300">
          Based on recent performance and matchup data, {winner.name} is projected to score{' '}
          {((winner.projectedPoints ?? 0) - (loser.projectedPoints ?? 0)).toFixed(1)} more fantasy points than{' '}
          {loser.name} in the upcoming week. {winner.name} has been averaging{' '}
          {(winner.recentAverage ?? 0).toFixed(1)} points per game recently and faces {winner.opponent}.
        </p>
      </div>
    </div>
  );
}
