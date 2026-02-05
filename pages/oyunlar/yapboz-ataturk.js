import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const JigsawPuzzle = dynamic(
  () => import('react-jigsaw-puzzle').then(mod => mod.JigsawPuzzle),
  { 
    ssr: false,
    loading: () => <div className="h-[400px] flex items-center justify-center font-bold">Yukleniyor...</div>
  }
);

import 'react-jigsaw-puzzle/lib/jigsaw-puzzle.css';

export default function AtaturkPuzzle() {
  const [solved, setSolved] = useState(false);

  const triggerConfetti = useCallback(async () => {
    const confetti = (await import('canvas-confetti')).default;
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
  }, []);

  useEffect(() => {
    if (solved) triggerConfetti();
  }, [solved, triggerConfetti]);

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <Head><title>Ataturk Yapbozu</title></Head>

      <header className="bg-slate-900 text-white p-4 flex items-center justify-between px-8 shadow-2xl">
        <Link href="/" className="bg-red-600 px-5 py-2 rounded-full font-bold hover:scale-105 transition-all text-white no-underline">
          Ana Sayfa
        </Link>
        <h1 className="text-lg font-bold uppercase tracking-widest">Ataturk ve Cocuklar</h1>
      </header>

      <main className="container mx-auto py-12 flex flex-col items-center px-4">
        {solved && (
          <div className="mb-8 p-8 bg-white border-b-8 border-green-500 rounded-3xl shadow-2xl animate-bounce">
            <h2 className="text-2xl font-black text-green-600">HARIKA!</h2>
          </div>
        )}

        <div className="w-full max-w-[850px] bg-white p-4 rounded-[2rem] shadow-2xl border-[16px] border-slate-900 relative">
          <JigsawPuzzle
            imageSrc="/ataturk-cocuklar.jpg"
            rows={3}
            columns={4}
            onSolved={() => setSolved(true)}
          />
        </div>
      </main>
    </div>
  );
}
