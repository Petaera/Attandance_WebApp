"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AttendanceReportChart } from "@/components/reports/attendance-report-chart"
import { AttendanceReportTable } from "@/components/reports/attendance-report-table"
import { Search, Download, Filter, Calendar, BarChart3, TableIcon } from "lucide-react"

export default function ReportsPage() {
  const [startDate, setStartDate] = useState<string>(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  )
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [viewMode, setViewMode] = useState<"chart" | "table">("chart")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Attendance Reports</h2>
          <p className="text-muted-foreground">View and export attendance reports for your classes.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search reports..."
              className="w-full rounded-md pl-8 md:w-[200px] lg:w-[300px]"
            />
          </div>
          <Button variant="outline" size="icon">
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
              <CardTitle>Attendance Report</CardTitle>
              <CardDescription>View attendance statistics and trends.</CardDescription>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex items-center gap-2">
                <Label htmlFor="start-date" className="w-20">
                  Start Date:
                </Label>
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full sm:w-auto"
                />
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="end-date" className="w-20">
                  End Date:
                </Label>
                <Input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full sm:w-auto"
                />
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="class" className="w-12">
                  Class:
                </Label>
                <Select defaultValue="all">
                  <SelectTrigger id="class" className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="math101">Mathematics 101</SelectItem>
                    <SelectItem value="phys202">Physics 202</SelectItem>
                    <SelectItem value="cs301">Computer Science 301</SelectItem>
                    <SelectItem value="eng101">English Literature</SelectItem>
                    <SelectItem value="hist101">History 101</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "chart" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("chart")}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Chart View
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("table")}
              >
                <TableIcon className="mr-2 h-4 w-4" />
                Table View
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>

          <Tabs defaultValue="daily" className="space-y-4">
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="student">By Student</TabsTrigger>
            </TabsList>

            <TabsContent value="daily" className="space-y-4">
              {viewMode === "chart" ? (
                <AttendanceReportChart period="daily" />
              ) : (
                <AttendanceReportTable period="daily" />
              )}
            </TabsContent>

            <TabsContent value="weekly" className="space-y-4">
              {viewMode === "chart" ? (
                <AttendanceReportChart period="weekly" />
              ) : (
                <AttendanceReportTable period="weekly" />
              )}
            </TabsContent>

            <TabsContent value="monthly" className="space-y-4">
              {viewMode === "chart" ? (
                <AttendanceReportChart period="monthly" />
              ) : (
                <AttendanceReportTable period="monthly" />
              )}
            </TabsContent>

            <TabsContent value="student" className="space-y-4">
              {viewMode === "chart" ? (
                <AttendanceReportChart period="student" />
              ) : (
                <AttendanceReportTable period="student" />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

