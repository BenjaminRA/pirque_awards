export type Category = {
  id: number;
  title: string;
  image: string;
};

export type Candidate = {
  id: number;
  name: string;
};

export type Voter = {
  id: number;
  name: string;
};

export type Vote = {
  categoryId: number;
  candidateId: number;
  categoryTitle: string;
  candidateName: string;
};

export type VoteSubmission = {
  voterId: number;
  votes: { categoryTitle: string; candidateName: string }[];
};
