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
};

export default function Home() {
  const [step, setStep] = useState<'welcome' | 'voter' | 'voting' | 'thanks'>(
    'welcome',
  );
  const [voterId, setVoterId] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [votes, setVotes] = useState<Vote[]>([]);

  const handleStart = () => {
    setStep('voter');
  };

  const handleVoterSelected = (id: number) => {
    setVoterId(id);
    setStep('voting');
  };

  const handleVote = (categoryId: number, candidateId: number) => {
    setVotes((prev) => {
      const existing = prev.findIndex((v) => v.categoryId === categoryId);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { categoryId, candidateId };
        return updated;
      }
      return [...prev, { categoryId, candidateId }];
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/votes`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              voterId,
              votes,
            },
          }),
        },
      );

      if (response.ok) {
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
