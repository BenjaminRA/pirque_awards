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
};

export type VoteSubmission = {
  voterId: number;
  votes: Vote[];
};
