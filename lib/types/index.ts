// User types
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

// Poll types
export interface Poll {
  id: string;
  title: string;
  description?: string;
  options: PollOption[];
  createdAt: Date;
  createdBy: string; // User ID
  isActive: boolean;
  endDate?: Date;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Vote {
  id: string;
  pollId: string;
  optionId: string;
  userId: string;
  votedAt: Date;
}