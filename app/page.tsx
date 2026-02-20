'use client';

import { useState, useEffect } from 'react';
import WelcomeScreen from '@/components/WelcomeScreen';
import VoterSelection from '@/components/VoterSelection';
import CategoryVoting from '@/components/CategoryVoting';
import ThankYouScreen from '@/components/ThankYouScreen';
import API, { CandidateType } from '@/api/api';

export type Category = {
  id: number;
  title: string;
  image: string;
  candidateType: CandidateType;
};

export type Candidate = {
  id: number;
  name: string;
};

export type Vote = {
  categoryId: number;
  candidateId: number;
  categoryTitle: string;
  candidateName: string;
};

export default function Home() {
  const [step, setStep] = useState<'welcome' | 'voter' | 'voting' | 'thanks'>(
    'welcome',
  );
  const [voterId, setVoterId] = useState<number | null>(null);
  const [voterName, setVoterName] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [votes, setVotes] = useState<Vote[]>([]);

  const handleStart = () => {
    setStep('voter');
  };

  const handleVoterSelected = (id: number, name: string) => {
    setVoterId(id);
    setVoterName(name);
    setStep('voting');
  };

  const handleVote = (
    categoryId: number,
    candidateId: number,
    categoryTitle: string,
    candidateName: string,
  ) => {
    setVotes((prev) => {
      const existing = prev.findIndex((v) => v.categoryId === categoryId);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = {
          categoryId,
          candidateId,
          categoryTitle,
          candidateName,
        };
        return updated;
      }
      return [
        ...prev,
        { categoryId, candidateId, categoryTitle, candidateName },
      ];
    });
  };

  const handleNext = () => {
    if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex((prev) => prev + 1);
    } else {
      submitVotes();
    }
  };

  const handlePrevious = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex((prev) => prev - 1);
    }
  };

  const submitVotes = async () => {
    try {
      const payload = votes.map((v) => ({
        categoryTitle: v.categoryTitle,
        candidateName: v.candidateName,
      }));
      const response = await API.submitVote(voterName, payload);

      if (response?.status === 200) {
        setStep('thanks');
      }
    } catch (error) {
      console.error('Error submitting votes:', error);
      setStep('thanks');
    }
  };

  const handleReset = () => {
    setStep('welcome');
    setVoterId(null);
    setVoterName('');
    setCurrentCategoryIndex(0);
    setVotes([]);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await API.fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    if (step === 'voting') {
      fetchCategories();
    }
  }, [step]);

  return (
    <div className="min-h-screen kraft-bg">
      {step === 'welcome' && <WelcomeScreen onStart={handleStart} />}
      {step === 'voter' && (
        <VoterSelection
          onVoterSelected={handleVoterSelected}
          onBack={() => setStep('welcome')}
        />
      )}
      {step === 'voting' && categories.length === 0 && (
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-purple/30 border-t-purple rounded-full animate-spin" />
            <p className="text-lg text-foreground/70 font-medium">
              Cargando categorías...
            </p>
          </div>
        </div>
      )}
      {step === 'voting' && categories.length > 0 && (
        <CategoryVoting
          category={categories[currentCategoryIndex]}
          currentIndex={currentCategoryIndex}
          totalCategories={categories.length}
          currentVote={
            votes.find(
              (v) => v.categoryId === categories[currentCategoryIndex].id,
            )?.candidateId
          }
          onVote={handleVote}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onReset={handleReset}
        />
      )}
      {step === 'thanks' && <ThankYouScreen onReset={handleReset} />}
    </div>
  );
}
