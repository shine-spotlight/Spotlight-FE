import { sendRequest } from "@apis/api";
import { pointInstance } from "@apis/instance";
import type {
  PointBalanceResponse,
  PointTransactionResponse,
  PointHistoryResponse,
} from "@models/point/point.dto";

// 포인트 잔액 조회
export function getPointBalance() {
  return sendRequest<PointBalanceResponse>(pointInstance, "GET", `/balance/`);
}

// 포인트 내역 조회
export function getPointHistory() {
  return sendRequest<PointHistoryResponse>(pointInstance, "GET", `/history/`);
}

// 포인트 충전
export function chargePoint(amount: number) {
  return sendRequest<PointTransactionResponse>(
    pointInstance,
    "POST",
    `/charge/`,
    {
      amount,
    }
  );
}

// 포인트 차감
export function deductPoint(amount: number) {
  return sendRequest<PointTransactionResponse>(
    pointInstance,
    "POST",
    `/deduct/`,
    {
      amount,
    }
  );
}
