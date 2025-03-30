import React, { useEffect, useState } from "react";
import chessMoves from "../data/chessMoves";

const ChessMoves = () => {
  const [displayedMoves, setDisplayedMoves] = useState([]);

  // Piece symbols with modern aesthetic
  const getPieceSymbol = (move) => {
    if (!move) return '';
    const pieceMap = {
      'K': '♚', 'Q': '♛', 'R': '♜', 'B': '♝', 'N': '♞', 'P': '♟',
      'O-O': 'O-O', 'O-O-O': 'O-O-O'
    };
    return pieceMap[move[0]] || '';
  };

  useEffect(() => {
    const allMoves = chessMoves.flatMap(moveString => {
      const match = moveString.match(/(\d+)\. (\S+)(?: (\S+))?/);
      if (!match) return [];

      const moveNumber = parseInt(match[1]);
      const whiteMove = match[2];
      const blackMove = match[3];

      return [
        { number: moveNumber, player: 'white', move: whiteMove, piece: getPieceSymbol(whiteMove) },
        ...(blackMove ? [{ number: moveNumber, player: 'black', move: blackMove, piece: getPieceSymbol(blackMove) }] : [])
      ];
    });

    // Set all moves instantly
    setDisplayedMoves(allMoves);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center p-6 font-chess">
      {/* Luxurious Header */}
      <div className="w-full max-w-4xl mb-12 text-center relative">
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-6xl opacity-10 text-amber-400">♔♚</div>
        <h1 className="text-5xl font-light text-amber-50 mb-4 tracking-widest relative">
          <span className="text-amber-400/80">MOVE</span> ARCHIVE
        </h1>
        <div className="h-px w-48 mx-auto bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"></div>
      </div>

      {/* Moves Display - Luxury Glass Panel */}
      <div className="w-full max-w-4xl bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
        {/* Column Headers */}
        <div className="grid grid-cols-12 bg-gray-900/50 text-gray-400 text-sm py-3 border-b border-gray-700/50">
          <div className="col-span-1 text-center">No.</div>
          <div className="col-span-5 pl-4 flex items-center">
            <span className="text-lg mr-2 text-amber-400">♔</span> White
          </div>
          <div className="col-span-5 pl-4 flex items-center">
            <span className="text-lg mr-2 text-gray-300">♚</span> Black
          </div>
          <div className="col-span-1"></div>
        </div>

        {/* Moves List */}
        <div className="max-h-[60vh] overflow-y-auto scrollbar-thin">
          {Array.from({ length: Math.ceil(displayedMoves.length / 2) }).map((_, groupIndex) => {
            const whiteMove = displayedMoves[groupIndex * 2];
            const blackMove = displayedMoves[groupIndex * 2 + 1];

            return (
              <div 
                key={groupIndex} 
                className={`grid grid-cols-12 items-center py-4 px-2 border-b border-gray-800/50 transition-all duration-300 hover:bg-gray-700/20 ${
                  groupIndex % 2 === 0 ? 'bg-gray-900/10' : 'bg-gray-900/5'
                }`}
              >
                {/* Move Number */}
                <div className="col-span-1 text-center text-gray-500 font-mono">
                  {groupIndex + 1}.
                </div>

                {/* White Move */}
                <div className="col-span-5 pl-4">
                  {whiteMove && (
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl text-amber-400/90">{whiteMove.piece}</span>
                      <span className="text-lg font-medium text-amber-100 tracking-wide">
                        {whiteMove.move.replace(/^[KQRNB]?/, '')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Black Move */}
                <div className="col-span-5 pl-4">
                  {blackMove && (
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl text-gray-300/90">{blackMove.piece}</span>
                      <span className="text-lg font-medium text-gray-100 tracking-wide">
                        {blackMove.move.replace(/^[KQRNB]?/, '')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Decorative Element */}
                <div className="col-span-1 flex justify-center">
                  <div className="w-2 h-2 rounded-full bg-amber-400/30"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default ChessMoves;
