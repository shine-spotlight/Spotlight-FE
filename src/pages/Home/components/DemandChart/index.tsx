import React from "react";
import styled from "@emotion/styled";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { ChartDataPoint } from "../../types";

interface DemandChartProps {
  data: ChartDataPoint[];
}

const CustomTooltip = (props: {
  active?: boolean;
  payload?: Array<{ value: number; name: string; payload: ChartDataPoint }>;
  label?: string;
}) => {
  const { active, payload, label } = props;
  const items = payload as
    | Array<{ value: number; name: string; payload: ChartDataPoint }>
    | undefined;

  if (active && items && items.length) {
    const d = items[0].payload as ChartDataPoint;
    return (
      <TooltipContainer>
        <TooltipLabel>{label}</TooltipLabel>
        {d.forecast !== null && (
          <TooltipItem>
            <TooltipDot $color="#3B82F6" />
            <span>예측: {d.forecast}</span>
          </TooltipItem>
        )}
      </TooltipContainer>
    );
  }
  return null;
};

export const DemandChart: React.FC<DemandChartProps> = ({ data }) => {
  return (
    <ChartContainer>
      <ChartTitle>공연 수요 데이터 예측</ChartTitle>
      <ChartWrapper>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="month"
              stroke="#6B7280"
              fontSize={12}
              tickFormatter={(value: string) => value.slice(0, 7)}
            />
            <YAxis
              stroke="#6B7280"
              fontSize={12}
              domain={[0, "dataMax + 20"]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  width: 100%;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`;

const ChartTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  text-align: center;
  width: 100%;
  margin-bottom: 24px;
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 300px;
`;

const TooltipContainer = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px;
  width: 100%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const TooltipLabel = styled.div`
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`;

const TooltipItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #6b7280;
`;

const TooltipDot = styled.div<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`;
