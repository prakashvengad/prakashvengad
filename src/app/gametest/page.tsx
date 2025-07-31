"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import clsx from "clsx";

const icons = [
  "🍕", "🎮", "🚀", "🐱", "🌈", "🎵", "💎", "⚡️",
];

const shuffle = (array: string[]) => {
  return [...array, ...array]
    .sort(() => Math.random() - 0.5)
    .map((icon, i) => ({ id: i, icon, matched: false }));
};

export default function MemoryGame() {
  const [cards, setCards] = useState(() => shuffle(icons));
  const [firstCard, setFirstCard] = useState<any>(null);
  const [secondCard, setSecondCard] = useState<any>(null);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    let timer: any;
    if (started && !allMatched()) {
      timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [started]);

  useEffect(() => {
    if (firstCard && secondCard) {
      setDisabled(true);
      if (firstCard.icon === secondCard.icon) {
        setCards((prev) =>
          prev.map((card) =>
            card.icon === firstCard.icon ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 800);
      }
    }
  }, [firstCard, secondCard]);

  const handleClick = (card: any) => {
    if (!started) setStarted(true);
    if (disabled || card === firstCard || card.matched) return;
    firstCard ? setSecondCard(card) : setFirstCard(card);
  };

  const resetTurn = () => {
    setFirstCard(null);
    setSecondCard(null);
    setMoves((prev) => prev + 1);
    setDisabled(false);
  };

  const resetGame = () => {
    setCards(shuffle(icons));
    setFirstCard(null);
    setSecondCard(null);
    setMoves(0);
    setTime(0);
    setStarted(false);
  };

  const allMatched = () => cards.every((card) => card.matched);

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white/10 backdrop-blur-md rounded-xl shadow-xl text-center text-white">
      <h1 className="text-3xl font-bold mb-4">🧠 Memory Match Game</h1>
      <div className="flex justify-between mb-4 text-sm font-semibold">
        <p>Moves: {moves}</p>
        <p>Time: {time}s</p>
        <button
          onClick={resetGame}
          className="px-4 py-1 bg-violet-600 hover:bg-violet-700 rounded-md"
        >
          Restart
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {cards.map((card) => {
          const isFlipped =
            card === firstCard || card === secondCard || card.matched;
          return (
            <motion.div
              key={card.id}
              layout
              onClick={() => handleClick(card)}
              className={clsx(
                "relative w-20 h-20 cursor-pointer select-none bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center text-2xl font-bold transition-transform duration-500",
                {
                  "bg-green-500 text-white": card.matched,
                }
              )}
            >
              {isFlipped ? (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  {card.icon}
                </motion.span>
              ) : (
                "❓"
              )}
            </motion.div>
          );
        })}
      </div>

      {allMatched() && (
        <motion.div
          className="mt-6 text-green-300 font-semibold text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          🎉 Well done! You matched all cards in {moves} moves and {time}s!
        </motion.div>
      )}
    </div>
  );
}
