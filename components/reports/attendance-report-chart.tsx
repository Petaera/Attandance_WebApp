"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Line, LineChart } from "recharts"

// Mock data for the charts
const dailyData = [
  { name: "Mon", present: 85, absent: 10, late: 5 },
  { name: "Tue", present: 88, absent: 7, late: 5 },
  { name: "Wed", present: 90, absent: 5, late: 5 },
  { name: "Thu", present: 87, absent: 8, late: 5 },
  { name: "Fri", present: 82, absent: 13, late: 5 },
  { name: "Sat", present: 75, absent: 20, late: 5 },
  { name: "Sun", present: 70, absent: 25, late: 5 },
]

const weeklyData = [
  { name: "Week 1", present: 82, absent: 13, late: 5 },
  { name: "Week 2", present: 85, absent: 10, late: 5 },
  { name: "Week 3", present: 88, absent: 7, late: 5 },
  { name: "Week 4", present: 84, absent: 11, late: 5 },
]

const monthlyData = [
  { name: "Jan", present: 80, absent: 15, late: 5 },
  { name: "Feb", present: 82, absent: 13, late: 5 },
  { name: "Mar", present: 85, absent: 10, late: 5 },
  { name: "Apr", present: 88, absent: 7, late: 5 },
  { name: "May", present: 90, absent: 5, late: 5 },
  { name: "Jun", present: 87, absent: 8, late: 5 },
]

const studentData = [
  { name: "John S.", present: 90, absent: 5, late: 5 },
  { name: "Emily J.", present: 85, absent: 10, late: 5 },
  { name: "Michael B.", present: 75, absent: 20, late: 5 },
  { name: "Sarah D.", present: 80, absent: 10, late: 10 },
  { name: "David W.", present: 95, absent: 2, late: 3 },
  { name: "Jessica M.", present: 70, absent: 25, late: 5 },
  { name: "Robert T.", present: 88, absent: 7, late: 5 },
  { name: "Jennifer A.", present: 82, absent: 8, late: 10 },
]

interface AttendanceReportChartProps {
  period: "daily" | "weekly" | "monthly" | "student"
}

export function AttendanceReportChart({ period }: AttendanceReportChartProps) {
  // Select data based on period
  const data = 
    period === "daily" ? dailyData :
    period === "weekly" ? weeklyData :
    period === "monthly" ? monthlyData :
    studentData

  // For student data, use a bar chart
  if (period === "student") {
    return (
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <XAxis type="number" tickFormatter={(value) => `${value}%`} />
            <YAxis dataKey="name" type="category" width={80} />
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
            <Bar dataKey="present" name="Present" fill="#22c55e" stackId="stack" />
            <Bar dataKey="absent" name="Absent" fill="#ef4444" stackId="stack" />
            <Bar dataKey="late" name="Late" fill="#eab308" stackId="stack" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  // For other periods, use a line chart
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `${value}%`} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="present" 
            name="Present" 
            stroke="#22c55e" 
            strokeWidth={2} 
            dot={{ r: 4 }} 
          />
          <Line 
            type="monotone" 
            dataKey="absent" 
            name="Absent" 
            stroke="#ef4444" 
            strokeWidth={2} 
            dot={{ r: 4 }} \

