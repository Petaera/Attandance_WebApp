"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock classes data
const classes = [
  { value: "math101", label: "Mathematics 101" },
  { value: "phys202", label: "Physics 202" },
  { value: "cs301", label: "Computer Science 301" },
  { value: "eng101", label: "English Literature" },
  { value: "hist101", label: "History 101" },
  { value: "alg202", label: "Algebra 202" },
  { value: "phys301", label: "Physics 301" },
  { value: "writing", label: "Creative Writing" },
  { value: "world-hist", label: "World History" },
]

interface EditUserDialogProps {
  user: any
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: (updatedUser: any) => void
}

export function EditUserDialog({ user, open, onOpenChange, onUpdate }: EditUserDialogProps) {
  const [formData, setFormData] = useState({
    id: user.id,
    name: user.name,
    email: user.email,
    studentId: user.studentId,
    type: user.type,
    status: user.status,
    avatar: user.avatar,
    initials: user.initials,
  })
  const [selectedClasses, setSelectedClasses] = useState<string[]>(user.classes || [])
  const [classesOpen, setClassesOpen] = useState(false)

  // Update form data when user prop changes
  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id,
        name: user.name,
        email: user.email,
        studentId: user.studentId,
        type: user.type,
        status: user.status,
        avatar: user.avatar,
        initials: user.initials,
      })
      setSelectedClasses(user.classes || [])
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const updatedUser = { ...formData, classes: selectedClasses }
    onUpdate(updatedUser)
  }

  const toggleClass = (value: string) => {
    setSelectedClasses((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update the details of the user.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentId">Student/Employee ID</Label>
                <Input id="studentId" name="studentId" value={formData.studentId} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Employee">Employee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Assigned Classes</Label>
              <Popover open={classesOpen} onOpenChange={setClassesOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={classesOpen}
                    className="w-full justify-between"
                  >
                    {selectedClasses.length > 0 ? `${selectedClasses.length} classes selected` : "Select classes..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search classes..." />
                    <CommandList>
                      <CommandEmpty>No class found.</CommandEmpty>
                      <CommandGroup className="max-h-64 overflow-auto">
                        {classes.map((cls) => (
                          <CommandItem key={cls.value} value={cls.value} onSelect={() => toggleClass(cls.label)}>
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedClasses.includes(cls.label) ? "opacity-100" : "opacity-0",
                              )}
                            />
                            {cls.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Update User</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

