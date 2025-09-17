export type PointBalance = {
  userId: number;
  balance: number;
};

export type PointTransaction = {
  id: number;
  userId: number;
  amount: number;
  transactionType: string;
  createdAt: string;
};
