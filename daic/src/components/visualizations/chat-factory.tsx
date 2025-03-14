"use client"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"

// 차트 색상 팔레트
const COLORS = ["#4ade80", "#22c55e", "#16a34a", "#15803d", "#166534"]

interface ChartFactoryProps {
  type: string
  data: any[]
  title?: string
}

export default function ChartFactory({ type, data, title }: ChartFactoryProps) {
  // 데이터 검증
  if (!data || data.length === 0) {
    return <div className="text-center p-4">표시할 데이터가 없습니다.</div>
  }

  // 차트 유형에 따라 다른 컴포넌트 렌더링
  switch (type) {
    case "bar":
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#4ade80" />
          </BarChart>
        </ResponsiveContainer>
      )

    case "line":
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#4ade80" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      )

    case "pie":
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )

    default:
      return <div className="text-center p-4">지원되지 않는 차트 유형: {type}</div>
  }
}

