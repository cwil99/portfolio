'use client';

import { useState, useEffect } from 'react';

interface Player {
  id: string;
  name: string;
  team: string;
  position: string;
}

interface PlayerSelectorProps {
  label: string;
  selectedPlayer: string | null;
  onPlayerSelect: (playerId: string) => void;
}

export default function PlayerSelector({ label, selectedPlayer, onPlayerSelect }: PlayerSelectorProps) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch players from API
    const fetchPlayers = async () => {
      try {
        const response = await fetch('/api/players');
        const data = await response.json();
        setPlayers(data.players);
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.team.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedPlayerData = players.find(p => p.id === selectedPlayer);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{label}</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search players..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Loading players...
        </div>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredPlayers.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No players found
            </div>
          ) : (
            filteredPlayers.map((player) => (
              <button
                key={player.id}
                onClick={() => onPlayerSelect(player.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  selectedPlayer === player.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                }`}
              >
                <div className="font-semibold">{player.name}</div>
                <div className="text-sm opacity-75">
                  {player.position} • {player.team}
                </div>
              </button>
            ))
          )}
        </div>
      )}

      {selectedPlayerData && (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-300">Selected:</div>
          <div className="font-bold text-lg text-gray-900 dark:text-white">{selectedPlayerData.name}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {selectedPlayerData.position} • {selectedPlayerData.team}
          </div>
        </div>
      )}
    </div>
  );
}
