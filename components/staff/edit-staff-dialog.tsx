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

interface EditStaffDialogProps {
  staff: any
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: (updatedStaff: any) => void
}

export function EditStaffDialog({ staff, open, onOpenChange, onUpdate }: EditStaffDialogProps) {
  const [formData, setFormData] = useState({
    id: staff.id,
    name: staff.name,
    email: staff.email,
    role: staff.role,
    department: staff.department,
    status: staff.status,
    avatar: staff.avatar,
    initials: staff.initials,
  })
  const [selectedClasses, setSelectedClasses] = useState<string[]>(staff.classes || [])
  const [classesOpen, setClassesOpen] = useState(false)

  // Update form data when staff prop changes
  useEffect(() => {
    if (staff) {
      setFormData({
        id: staff.id,
        name: staff.name,
        email: staff.email,
        role: staff.role,
        department: staff.department,
        status: staff.status,
        avatar: staff.avatar,
        initials: staff.initials,
      })
      setSelectedClasses(staff.classes || [])
    }
  }, [staff])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const updatedStaff = { ...formData, classes: selectedClasses }
    onUpdate(updatedStaff)
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
            <DialogTitle>Edit Staff Member</DialogTitle>
            <DialogDescription>Update the details of the staff member.</DialogDescription>
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
                <Label htmlFor="role">Role</Label>
                <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Administrator">Administrator</SelectItem>
                    <SelectItem value="Teacher">Teacher</SelectItem>
                    <SelectItem value="Assistant">Assistant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" name="department" value={formData.department} onChange={handleChange} required />
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
            <Button type="submit">Update Staff Member</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

