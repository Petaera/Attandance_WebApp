"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EditStaffDialog } from "@/components/staff/edit-staff-dialog"
import { MoreHorizontal, Pencil, Trash2, UserCog } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Mock staff data
const staffData = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    role: "Administrator",
    department: "Computer Science",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JS",
    status: "active",
    classes: ["Mathematics 101", "Physics 202"],
  },
  {
    id: 2,
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    role: "Teacher",
    department: "Mathematics",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "EJ",
    status: "active",
    classes: ["Mathematics 101", "Algebra 202"],
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    role: "Teacher",
    department: "Physics",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MB",
    status: "inactive",
    classes: ["Physics 202", "Physics 301"],
  },
  {
    id: 4,
    name: "Sarah Davis",
    email: "sarah.davis@example.com",
    role: "Teacher",
    department: "English",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SD",
    status: "active",
    classes: ["English Literature", "Creative Writing"],
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.wilson@example.com",
    role: "Teacher",
    department: "History",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "DW",
    status: "active",
    classes: ["History 101", "World History"],
  },
]

interface StaffTableProps {
  searchQuery?: string
}

export function StaffTable({ searchQuery = "" }: StaffTableProps) {
  const [staff, setStaff] = useState(staffData)
  const [editingStaff, setEditingStaff] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [staffToDelete, setStaffToDelete] = useState<number | null>(null)

  // Filter staff based on search query
  const filteredStaff = staff.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Toggle staff status
  const toggleStatus = (id: number) => {
    setStaff(
      staff.map((member) =>
        member.id === id ? { ...member, status: member.status === "active" ? "inactive" : "active" } : member,
      ),
    )
  }

  // Edit staff
  const handleEdit = (staffMember: any) => {
    setEditingStaff(staffMember)
    setIsEditDialogOpen(true)
  }

  // Update staff
  const handleUpdate = (updatedStaff: any) => {
    setStaff(staff.map((member) => (member.id === updatedStaff.id ? updatedStaff : member)))
    setIsEditDialogOpen(false)
  }

  // Delete staff
  const handleDelete = (id: number) => {
    setStaffToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (staffToDelete) {
      setStaff(staff.filter((member) => member.id !== staffToDelete))
      setDeleteDialogOpen(false)
      setStaffToDelete(null)
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Classes</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStaff.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No staff members found.
                </TableCell>
              </TableRow>
            ) : (
              filteredStaff.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div>{member.name}</div>
                        <div className="text-xs text-muted-foreground">{member.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.department}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {member.classes.map((cls) => (
                        <Badge key={cls} variant="outline" className="mr-1">
                          {cls}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch checked={member.status === "active"} onCheckedChange={() => toggleStatus(member.id)} />
                      <span
                        className={
                          member.status === "active"
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }
                      >
                        {member.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(member)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(member.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserCog className="mr-2 h-4 w-4" />
                          Manage Permissions
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {editingStaff && (
        <EditStaffDialog
          staff={editingStaff}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onUpdate={handleUpdate}
        />
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the staff member and remove their data from the
              system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

