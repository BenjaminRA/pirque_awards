type WelcomeScreenProps = {
  onStart: () => void;
};

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 md:p-8">
      <div className="text-center max-w-2xl">
        <h1
          className="font-[var(--font-bebas-neue)] text-8xl md:text-[10rem] font-black text-foreground mb-4 tracking-wider uppercase"
          style={{ fontFamily: 'var(--font-bebas-neue)' }}
        >
          PIRQUE
        </h1>
        <h2
          className="font-[var(--font-bebas-neue)] text-6xl md:text-8xl font-black text-foreground mb-2 tracking-wider uppercase"
          style={{ fontFamily: 'var(--font-bebas-neue)' }}
        >
          AWARDS
        </h2>
        <h3
          className="font-[var(--font-bebas-neue)] text-5xl md:text-7xl font-bold text-purple mb-10 tracking-wide"
          style={{ fontFamily: 'var(--font-bebas-neue)' }}
        >
          2026
        </h3>
        <div className="mb-10">
          <p className="text-xl md:text-2xl text-foreground/80 italic font-medium">
            &ldquo;Sobre toda cosa guardada, guarda tu corazón;&rdquo;
          </p>
          <p className="text-lg text-foreground/60 mt-2 font-semibold">
            Proverbios 4:23
          </p>
        </div>
        <button
          onClick={onStart}
          className="bg-purple text-white font-bold text-xl md:text-3xl px-10 md:px-16 py-5 md:py-6 rounded-2xl shadow-2xl hover:bg-purple-light hover:scale-105 transform transition-all duration-300 uppercase tracking-wide cursor-pointer"
        >
          Empezar Votación
        </button>
      </div>
    </div>
  );
}
