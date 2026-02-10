'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function FantasyFootballRedirect() {
  // Option 1: Redirect to deployed app URL
  // Uncomment and update the URL when you have it deployed
  // useEffect(() => {
  //   window.location.href = 'https://your-fantasy-app.vercel.app';
  // }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 px-6">
      <div className="max-w-lg text-center">
        <div className="text-6xl mb-6">🏈</div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Fantasy Football Compare
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Compare NFL players and predict who will score more fantasy points next week.
        </p>

        <div className="space-y-4">
          {/* Update this link when deployed */}
          <a
            href="http://localhost:3001"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors"
          >
            Open Fantasy Football Compare
          </a>

          <Link
            href="/"
            className="block w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium py-4 px-6 rounded-lg transition-colors"
          >
            Back to Portfolio
          </Link>
        </div>

        <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <strong>Development:</strong> Run the fantasy app on port 3001:
          </p>
          <code className="block mt-2 text-sm bg-gray-100 dark:bg-gray-900 p-2 rounded text-gray-800 dark:text-gray-200">
            cd fantasy-football-compare && npm run dev -- -p 3001
          </code>
        </div>
      </div>
    </div>
  );
}
