import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-red-200">
      <Head>
        <title>23 Nisan Portali | Gelecegin Guvencesi Cocuklar</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <header className="bg-red-600 text-white p-4 shadow-lg flex justify-between items-center px-8 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold tracking-tight">23 Nisan Portali</h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="font-semibold hover:text-yellow-200">Ana Sayfa</Link>
          <Link href="/oyunlar/yapboz-ataturk" className="font-semibold hover:text-yellow-200">Ataturk Yapbozu</Link>
        </nav>
      </header>

      <main className="container mx-auto py-16 flex flex-col items-center px-4">
        {/* VIDEO LIMIT: 650PX FIXED */}
        <section className="w-full max-w-[650px] bg-white p-6 rounded-[2.5rem] shadow-2xl border-[12px] border-white ring-1 ring-slate-200">
          <h2 className="text-3xl font-extrabold text-center text-slate-800 mb-8 tracking-tight">
            23 Nisanin Anlami
          </h2>
          
          <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-slate-900 shadow-inner group">
            <iframe 
              title="23 Nisan Video"
              src="https://www.youtube-nocookie.com/embed/VHPj_FpZsGU?modestbranding=1&rel=0" 
              className="absolute inset-0 w-full h-full transform transition-transform duration-700"
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
          
          <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <p className="text-center text-slate-600 font-medium leading-relaxed">
              "Egemenlik kayitsiz sartsiz milletindir." <br/>
              <span className="text-sm font-bold text-slate-400">--- Mustafa Kemal Ataturk</span>
            </p>
          </div>
        </section>
      </main>

      <footer className="mt-20 py-8 bg-slate-900 text-slate-400 text-center text-sm">
        <p>2024 23 Nisan Cocuk Portali. Tum haklari cocuklara aittir.</p>
      </footer>
    </div>
  );
}
