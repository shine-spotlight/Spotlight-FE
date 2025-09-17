// Point DTO
export type PointBalanceDTO = {
  user_id: number;
  balance: number;
};

export type PointTransactionDTO = {
  id: number;
  user_d: number;
  amount: number;
  transaction_type: string;
  created_at: string;
};

// Artist Response 타입
export type PointBalanceResponse = PointBalanceDTO;
export type PointTransactionResponse = PointTransactionDTO;
export type PointHistoryResponse = PointTransactionDTO[];
