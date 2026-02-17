'use client';

import { useState, useEffect } from 'react';
import Autocomplete from './Autocomplete';
import Image from 'next/image';
import API, { CandidateType } from '@/api/api';

type Category = {
  id: number;
  title: string;
  image: string;
  candidateType: CandidateType;
};

type Candidate = {
  id: number;
  name: string;
};

type CategoryVotingProps = {
  category: Category;
  currentIndex: number;
  totalCategories: number;
  currentVote?: number;
  onVote: (categoryId: number, candidateId: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onReset: () => void;
};

export default function CategoryVoting({
  category,
  currentIndex,
  totalCategories,
  currentVote,
  onVote,
  onNext,
  onPrevious,
  onReset,
}: CategoryVotingProps) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const selectedCandidate = currentVote || null;

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await API.fetchCandidates(category.candidateType);
        setCandidates(data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchCandidates();
  }, [category.id, category.candidateType]);

  const handleNext = () => {
    if (selectedCandidate) {
      onVote(category.id, selectedCandidate);
      onNext();
    }
  };

  const handleCandidateChange = (id: number) => {
    onVote(category.id, id);
  };

  const isLastCategory = currentIndex === totalCategories - 1;

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4 md:p-8 pb-16">
      <button
        onClick={onReset}
        className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-foreground/60 hover:text-foreground font-medium text-base md:text-lg transition-colors cursor-pointer"
      >
        ← Volver
      </button>
      <div className="bg-white/95 rounded-3xl shadow-2xl p-5 md:p-12 max-w-3xl w-full border-2 border-kraft-dark/20">
        <div className="mb-6">
          <p className="text-purple font-semibold text-lg">
            Pregunta {currentIndex + 1} de {totalCategories}
          </p>
          <div className="w-full bg-kraft-light rounded-full h-3 mt-2">
            <div
              className="progress-bar h-3 rounded-full transition-all duration-500"
              style={{
                width: `${((currentIndex + 1) / totalCategories) * 100}%`,
              }}
            />
          </div>
        </div>

        {category.image && (
          <div className="polaroid-card rounded-lg mb-6">
            <div className="relative w-full h-64 md:h-80 overflow-hidden rounded">
              <Image
                src={`${category.image}`}
                // src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${category.image}`}
                alt={category.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        <h2
          className="text-3xl md:text-5xl font-bold text-purple mb-8 text-center"
          style={{ fontFamily: 'var(--font-bebas-neue)' }}
        >
          {category.title}
        </h2>

        <Autocomplete
          options={candidates}
          value={selectedCandidate}
          onChange={handleCandidateChange}
          placeholder="Selecciona un candidato..."
        />

        <div className="flex gap-3 md:gap-4 mt-6 md:mt-8">
          {currentIndex > 0 && (
            <button
              onClick={onPrevious}
              className="flex-1 bg-kraft-light text-foreground font-bold text-lg md:text-xl px-4 md:px-8 py-3 md:py-4 rounded-2xl shadow-lg hover:bg-kraft transform transition-all duration-300 hover:scale-105 cursor-pointer uppercase"
            >
              ← Atrás
            </button>
          )}

          <button
            onClick={handleNext}
            disabled={!selectedCandidate}
            className="flex-1 bg-teal text-white font-bold text-lg md:text-xl px-4 md:px-8 py-3 md:py-4 rounded-2xl shadow-lg hover:bg-teal-light disabled:bg-gray-300 disabled:cursor-not-allowed transform transition-all duration-300 hover:scale-105 uppercase tracking-wide cursor-pointer"
          >
            {isLastCategory ? 'Finalizar' : 'Siguiente →'}
          </button>
        </div>
      </div>
    </div>
  );
}
