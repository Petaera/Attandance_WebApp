import { TableHeader } from "@/components/ui/table"
;('"use client')

import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table"

// Mock data for the table
const dailyData = [
  { day: "Mon", present: 85, absent: 10, late: 5 },
  { day: "Tue", present: 88, absent: 7, late: 5 },
  { day: "Wed", present: 90, absent: 5, late: 5 },
  { day: "Thu", present: 87, absent: 8, late: 5 },
  { day: "Fri", present: 82, absent: 13, late: 5 },
  { day: "Sat", present: 75, absent: 20, late: 5 },
  { day: "Sun", present: 70, absent: 25, late: 5 },
]

const weeklyData = [
  { week: "Week 1", present: 82, absent: 13, late: 5 },
  { week: "Week 2", present: 85, absent: 10, late: 5 },
  { week: "Week 3", present: 88, absent: 7, late: 5 },
  { week: "Week 4", present: 84, absent: 11, late: 5 },
]

const monthlyData = [
  { month: "Jan", present: 80, absent: 15, late: 5 },
  { month: "Feb", present: 82, absent: 13, late: 5 },
  { month: "Mar", present: 85, absent: 10, late: 5 },
  { month: "Apr", present: 88, absent: 7, late: 5 },
  { month: "May", present: 90, absent: 5, late: 5 },
  { month: "Jun", present: 87, absent: 8, late: 5 },
]

const studentData = [
  { student: "John S.", present: 90, absent: 5, late: 5 },
  { student: "Emily J.", present: 85, absent: 10, late: 5 },
  { student: "Michael B.", present: 75, absent: 20, late: 5 },
  { student: "Sarah D.", present: 80, absent: 10, late: 10 },
  { student: "David W.", present: 95, absent: 2, late: 3 },
  { student: "Jessica M.", present: 70, absent: 25, late: 5 },
  { student: "Robert T.", present: 88, absent: 7, late: 5 },
  { student: "Jennifer A.", present: 82, absent: 8, late: 10 },
]

interface AttendanceReportTableProps {
  period: "daily" | "weekly" | "monthly" | "student"
}

export function AttendanceReportTable({ period }: AttendanceReportTableProps) {
  const data =
    period === "daily" ? dailyData : period === "weekly" ? weeklyData : period === "monthly" ? monthlyData : studentData

  const headers =
    period === "student"
      ? ["Student", "Present", "Absent", "Late"]
      : [period.charAt(0).toUpperCase() + period.slice(1), "Present", "Absent", "Late"]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.day || item.week || item.month || item.student}>
            <TableCell>{item.day || item.week || item.month || item.student}</TableCell>
            <TableCell>{item.present}</TableCell>
            <TableCell>{item.absent}</TableCell>
            <TableCell>{item.late}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

