"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AttendanceTable } from "@/components/attendance/attendance-table"
import { Search, Calendar, Filter, Save } from "lucide-react"

// Mock classes data
const classes = [
  { value: "math101", label: "Mathematics 101" },
  { value: "phys202", label: "Physics 202" },
  { value: "cs301", label: "Computer Science 301" },
  { value: "eng101", label: "English Literature" },
  { value: "hist101", label: "History 101" },
]

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [selectedClass, setSelectedClass] = useState<string>("")
  const [isClassSelected, setIsClassSelected] = useState(false)

  // Reset class selection when date changes
  useEffect(() => {
    setSelectedClass("")
    setIsClassSelected(false)
  }, [])

  const handleClassChange = (value: string) => {
    setSelectedClass(value)
    setIsClassSelected(true)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Attendance Management</h2>
          <p className="text-muted-foreground">Take and manage attendance for your assigned groups.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search students..."
              className="w-full rounded-md pl-8 md:w-[200px] lg:w-[300px]"
              disabled={!isClassSelected}
            />
          </div>
          <Button variant="outline" size="icon" disabled={!isClassSelected}>
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
            <span className="sr-only">Calendar</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Take Attendance</CardTitle>
              <CardDescription>Select a class and date to take attendance.</CardDescription>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex items-center gap-2">
                <Label htmlFor="date" className="w-12">
                  Date:
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full sm:w-auto"
                />
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="class" className="w-12">
                  Class:
                </Label>
                <Select value={selectedClass} onValueChange={handleClassChange}>
                  <SelectTrigger id="class" className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls.value} value={cls.value}>
                        {cls.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isClassSelected ? (
            <>
              <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="all">All Students</TabsTrigger>
                  <TabsTrigger value="present">Present</TabsTrigger>
                  <TabsTrigger value="absent">Absent</TabsTrigger>
                  <TabsTrigger value="late">Late</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  <AttendanceTable classId={selectedClass} date={selectedDate} />
                </TabsContent>
                <TabsContent value="present">
                  <AttendanceTable classId={selectedClass} date={selectedDate} filter="present" />
                </TabsContent>
                <TabsContent value="absent">
                  <AttendanceTable classId={selectedClass} date={selectedDate} filter="absent" />
                </TabsContent>
                <TabsContent value="late">
                  <AttendanceTable classId={selectedClass} date={selectedDate} filter="late" />
                </TabsContent>
              </Tabs>

              <div className="mt-6 flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Attendance
                </Button>
              </div>
            </>
          ) : (
            <div className="flex h-64 flex-col items-center justify-center text-center">
              <div className="text-muted-foreground">
                <Calendar className="mx-auto h-12 w-12 opacity-50" />
                <h3 className="mt-4 text-lg font-medium">No Class Selected</h3>
                <p className="mt-2 text-sm">Please select a class and date to view and take attendance.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

