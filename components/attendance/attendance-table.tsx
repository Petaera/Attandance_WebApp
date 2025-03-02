"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CheckCircle, XCircle, Clock, MoreHorizontal } from "lucide-react"

// Mock student data by class
const studentsByClass = {
  math101: [
    {
      id: 1,
      name: "John Smith",
      studentId: "S12345",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JS",
      status: "present",
    },
    {
      id: 2,
      name: "Emily Johnson",
      studentId: "S12346",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "EJ",
      status: "present",
    },
    {
      id: 5,
      name: "David Wilson",
      studentId: "S12349",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "DW",
      status: "present",
    },
    {
      id: 7,
      name: "Robert Taylor",
      studentId: "S12351",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RT",
      status: "present",
    },
  ],
  phys202: [
    {
      id: 3,
      name: "Michael Brown",
      studentId: "S12347",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MB",
      status: "absent",
    },
    {
      id: 4,
      name: "Sarah Davis",
      studentId: "S12348",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SD",
      status: "late",
    },
    {
      id: 6,
      name: "Jessica Martinez",
      studentId: "S12350",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JM",
      status: "absent",
    },
    {
      id: 8,
      name: "Jennifer Anderson",
      studentId: "S12352",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JA",
      status: "late",
    },
  ],
  cs301: [
    {
      id: 9,
      name: "Thomas Wilson",
      studentId: "S12353",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "TW",
      status: "present",
    },
    {
      id: 10,
      name: "Lisa Rodriguez",
      studentId: "S12354",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "LR",
      status: "absent",
    },
  ],
  eng101: [
    {
      id: 11,
      name: "James Miller",
      studentId: "S12355",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JM",
      status: "present",
    },
    {
      id: 12,
      name: "Patricia Moore",
      studentId: "S12356",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "PM",
      status: "late",
    },
  ],
  hist101: [
    {
      id: 13,
      name: "Richard Harris",
      studentId: "S12357",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RH",
      status: "present",
    },
    {
      id: 14,
      name: "Linda Martin",
      studentId: "S12358",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "LM",
      status: "present",
    },
  ],
}

type AttendanceStatus = "present" | "absent" | "late"

interface AttendanceTableProps {
  classId: string
  date: string
  filter?: AttendanceStatus
}

export function AttendanceTable({ classId, date, filter }: AttendanceTableProps) {
  const [studentData, setStudentData] = useState<any[]>([])

  // Load students based on class
  useEffect(() => {
    if (classId && studentsByClass[classId as keyof typeof studentsByClass]) {
      // In a real app, you would fetch attendance data for the specific date
      // For now, we'll just use the mock data
      setStudentData(studentsByClass[classId as keyof typeof studentsByClass])
    }
  }, [classId, date])

  // Filter students based on the filter prop
  const filteredStudents = filter ? studentData.filter((student) => student.status === filter) : studentData

  // Update student status
  const updateStatus = (id: number, status: AttendanceStatus) => {
    setStudentData((prevData) => prevData.map((student) => (student.id === id ? { ...student, status } : student)))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Student</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No students found.
              </TableCell>
            </TableRow>
          ) : (
            filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={student.avatar} alt={student.name} />
                      <AvatarFallback>{student.initials}</AvatarFallback>
                    </Avatar>
                    <span>{student.name}</span>
                  </div>
                </TableCell>
                <TableCell>{student.studentId}</TableCell>
                <TableCell>
                  <StatusBadge status={student.status} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant={student.status === "present" ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateStatus(student.id, "present")}
                    >
                      <CheckCircle className="mr-1 h-4 w-4" />
                      Present
                    </Button>
                    <Button
                      variant={student.status === "absent" ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateStatus(student.id, "absent")}
                    >
                      <XCircle className="mr-1 h-4 w-4" />
                      Absent
                    </Button>
                    <Button
                      variant={student.status === "late" ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateStatus(student.id, "late")}
                    >
                      <Clock className="mr-1 h-4 w-4" />
                      Late
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View History</DropdownMenuItem>
                        <DropdownMenuItem>Add Note</DropdownMenuItem>
                        <DropdownMenuItem>Contact Student</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "present":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800">
          <CheckCircle className="mr-1 h-3 w-3" /> Present
        </Badge>
      )
    case "absent":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800">
          <XCircle className="mr-1 h-3 w-3" /> Absent
        </Badge>
      )\
    case "late

