import type { PointHistory } from "@models/point/point.type";

export const mockPointHistory: PointHistory = [
  {
    id: 1,
    userId: 101,
    amount: 5000,
    transactionType: "charge", // 포인트 적립
    createdAt: "2025-09-20T10:15:30Z",
  },
  {
    id: 2,
    userId: 101,
    amount: 2000,
    transactionType: "deduct", // 포인트 사용
    createdAt: "2025-09-21T14:22:10Z",
  },
  {
    id: 3,
    userId: 101,
    amount: 1000,
    transactionType: "charge",
    createdAt: "2025-09-22T08:45:00Z",
  },
  {
    id: 4,
    userId: 101,
    amount: 1500,
    transactionType: "deduct",
    createdAt: "2025-09-23T18:05:42Z",
  },
  {
    id: 5,
    userId: 101,
    amount: 3000,
    transactionType: "charge",
    createdAt: "2025-09-24T09:10:12Z",
  },
];
