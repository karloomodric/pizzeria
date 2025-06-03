'use client';

import { useRef } from 'react';
import MenuPage from './menu/page';


export default function Home() {
    const menuRef = useRef<HTMLDivElement>(null);

    const scrollToMenu = () => {
        if(menuRef.current) {
            menuRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return(
        <main className="min-h-screen bg-[#f1ebdd] text-[#2e2b1f] font-serif">Header
        <header className="flex justify-between items-center p-6 shadow-sm">
            <h1 className="text-3xl font-bold tracking-widest">Dal Pizzaiolo</h1>
            <button onClick={scrollToMenu}
            className="text-lg underline underline-offset-4 hover:opacity-70 transition">
                View menu
            </button>
        </header>
        <section className="flex flex-col items-center justify-center py-24 text-center">
            <h2 className="text-4xl font-bold mb-4">Authentic Neapolitan Pizza</h2>
            <p className="max-w-xl text-lg">Fresh ingridients. Local deliverty. A true taste of Italy in every slice.
            </p>
        </section>
        <div ref={menuRef}>
            <MenuPage />
        </div>
        </main>
    );
}