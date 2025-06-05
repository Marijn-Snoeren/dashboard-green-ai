export interface Challenge {
  id: string;
  title: string;
  description: string;
  completionCount: number;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

export interface AIChallenge {
  id: string;
  title: string;
  description: string;
  category?: string;
  createdAt: Date;
}
