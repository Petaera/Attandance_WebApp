"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// Mock data for the chart
const data = [
  { name: "Mon", present: 85, absent: 15 },
  { name: "Tue", present: 88, absent: 12 },
  { name: "Wed", present: 90, absent: 10 },
  { name: "Thu", present: 87, absent: 13 },
  { name: "Fri", present: 82, absent: 18 },
  { name: "Sat", present: 75, absent: 25 },
  { name: "Sun", present: 70, absent: 30 },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip />
        <Bar dataKey="present" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
        <Bar dataKey="absent" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-muted" />
      </BarChart>
    </ResponsiveContainer>
  )
}

