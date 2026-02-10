'use client';

import { useState } from 'react';
import Link from 'next/link';
import PlayerSelector from './components/PlayerSelector';
import ComparisonResults from './components/ComparisonResults';

export default function FantasyFootballCompare() {
  const [player1, setPlayer1] = useState<string | null>(null);
  const [player2, setPlayer2] = useState<string | null>(null);
  const [comparisonData, setComparisonData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = async () => {
    if (!player1 || !player2) {
      alert('Please select both players');
      return;
    }

    setIsLoading(true);
    setError(null);
    setComparisonData(null);

    try {
      const response = await fetch('/api/compare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ player1, player2 }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setError(data.error || 'Failed to compare players. Please try again.');
        return;
      }

      setComparisonData(data);
    } catch (error) {
      console.error('Error comparing players:', error);
      setError('Failed to compare players. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      {/* Back to portfolio link */}
      <div className="absolute top-4 left-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Portfolio
        </Link>
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Fantasy Football Player Comparison
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Compare two NFL players and see who is likely to score more fantasy points next week
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <PlayerSelector
              label="Player 1"
              selectedPlayer={player1}
              onPlayerSelect={setPlayer1}
            />
            <PlayerSelector
              label="Player 2"
              selectedPlayer={player2}
              onPlayerSelect={setPlayer2}
            />
          </div>

          <div className="text-center mb-8">
            <button
              onClick={handleCompare}
              disabled={!player1 || !player2 || isLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors shadow-lg"
            >
              {isLoading ? 'Comparing...' : 'Compare Players'}
            </button>
          </div>

          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-6 py-4 rounded-lg mb-8 text-center">
              <p className="font-semibold">Unable to Compare Players</p>
              <p className="mt-1">{error}</p>
            </div>
          )}

          {comparisonData && (
            <ComparisonResults data={comparisonData} />
          )}
        </div>
      </main>
    </div>
  );
}
