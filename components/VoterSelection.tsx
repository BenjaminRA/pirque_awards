'use client';

import { useState, useEffect } from 'react';
import Autocomplete from './Autocomplete';
import API from '@/api/api';

type Voter = {
  id: number;
  name: string;
};

type VoterSelectionProps = {
  onVoterSelected: (id: number) => void;
  onBack: () => void;
};

export default function VoterSelection({
  onVoterSelected,
  onBack,
}: VoterSelectionProps) {
  const [voters, setVoters] = useState<Voter[]>([]);
  const [selectedVoter, setSelectedVoter] = useState<number | null>(null);

  useEffect(() => {
    const fetchVoters = async () => {
      try {
        const data = await API.fetchVoters();
        setVoters(data);
      } catch (error) {
        console.error('Error fetching voters:', error);
      }
    };

    fetchVoters();
  }, []);

  const handleContinue = () => {
    if (selectedVoter) {
      onVoterSelected(selectedVoter);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center p-8">
      <button
        onClick={onBack}
        className="absolute bottom-6 left-6 text-foreground/60 hover:text-foreground font-medium text-lg transition-colors cursor-pointer"
      >
        ← Volver
      </button>
      <div className="bg-white/95 rounded-3xl shadow-2xl p-12 max-w-2xl w-full border-2 border-kraft-dark/20">
        <h2
          className="text-4xl md:text-5xl font-bold text-purple mb-8 text-center"
          style={{ fontFamily: 'var(--font-bebas-neue)' }}
        >
          ¿Quién eres?
        </h2>
        <p className="text-xl text-foreground/70 mb-8 text-center">
          Selecciona tu nombre para comenzar a votar
        </p>

        <Autocomplete
          options={voters}
          value={selectedVoter}
          onChange={setSelectedVoter}
          placeholder="Busca tu nombre..."
        />

        <button
          onClick={handleContinue}
          disabled={!selectedVoter}
          className="w-full mt-8 bg-teal text-white font-bold text-2xl px-12 py-5 rounded-2xl shadow-lg hover:bg-teal-light disabled:bg-gray-300 disabled:cursor-not-allowed transform transition-all duration-300 hover:scale-105 uppercase tracking-wide cursor-pointer"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
