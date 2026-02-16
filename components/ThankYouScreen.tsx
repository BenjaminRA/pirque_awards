type ThankYouScreenProps = {
  onReset: () => void;
};

export default function ThankYouScreen({ onReset }: ThankYouScreenProps) {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <div className="text-9xl mb-8 animate-bounce">🎉</div>
        <h1
          className="text-6xl md:text-8xl font-black text-foreground mb-8"
          style={{ fontFamily: 'var(--font-bebas-neue)' }}
        >
          ¡GRACIAS!
        </h1>
        <p className="text-2xl md:text-3xl font-semibold text-foreground/80 mb-12">
          Tu votación ha sido registrada exitosamente
        </p>
        <button
          onClick={onReset}
          className="bg-purple text-white font-bold text-2xl md:text-3xl px-16 py-6 rounded-2xl shadow-2xl hover:bg-purple-light hover:scale-105 transform transition-all duration-300 uppercase tracking-wide"
        >
          OK
        </button>
      </div>
    </div>
  );
}
