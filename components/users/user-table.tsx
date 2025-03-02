"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EditUserDialog } from "@/components/users/edit-user-dialog"
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

// Mock user data
const userData = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    studentId: "S10001",
    type: "Student",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AJ",
    status: "active",
    classes: ["Mathematics 101", "Physics 202"],
  },
  {
    id: 2,
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    studentId: "S10002",
    type: "Student",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "EW",
    status: "active",
    classes: ["Mathematics 101", "English Literature"],
  },
  {
    id: 3,
    name: "Noah Martinez",
    email: "noah.martinez@example.com",
    studentId: "S10003",
    type: "Student",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "NM",
    status: "inactive",
    classes: ["Physics 202", "Computer Science 301"],
  },
  {
    id: 4,
    name: "Olivia Taylor",
    email: "olivia.taylor@example.com",
    studentId: "S10004",
    type: "Student",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "OT",
    status: "active",
    classes: ["English Literature", "History 101"],
  },
  {
    id: 5,
    name: "William Anderson",
    email: "william.anderson@example.com",
    studentId: "S10005",
    type: "Student",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "WA",
    status: "active",
    classes: ["Computer Science 301", "Mathematics 101"],
  },
]

interface UserTableProps {
  searchQuery?: string
}

export function UserTable({ searchQuery = "" }: UserTableProps) {
  const [users, setUsers] = useState(userData)
  const [editingUser, setEditingUser] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<number | null>(null)

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Toggle user status
  const toggleStatus = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user,
      ),
    )
  }

  // Edit user
  const handleEdit = (user: any) => {
    setEditingUser(user)
    setIsEditDialogOpen(true)
  }

  // Update user
  const handleUpdate = (updatedUser: any) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)))
    setIsEditDialogOpen(false)
  }

  // Delete user
  const handleDelete = (id: number) => {
    setUserToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter((user) => user.id !== userToDelete))
      setDeleteDialogOpen(false)
      setUserToDelete(null)
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Name</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Classes</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div>{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.studentId}</TableCell>
                  <TableCell>{user.type}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.classes.map((cls) => (
                        <Badge key={cls} variant="outline" className="mr-1">
                          {cls}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch checked={user.status === "active"} onCheckedChange={() => toggleStatus(user.id)} />
                      <span
                        className={
                          user.status === "active"
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }
                      >
                        {user.status === "active" ? "Active" : "Inactive"}
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
                        <DropdownMenuItem onClick={() => handleEdit(user)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(user.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserCog className="mr-2 h-4 w-4" />
                          Manage Classes
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

      {editingUser && (
        <EditUserDialog
          user={editingUser}
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
              This action cannot be undone. This will permanently delete the user and remove their data from the system.
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

