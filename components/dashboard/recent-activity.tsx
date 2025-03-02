import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for recent activity
const recentActivity = [
  {
    id: 1,
    user: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JS",
    },
    action: "marked present",
    class: "Mathematics 101",
    time: "2 minutes ago",
  },
  {
    id: 2,
    user: {
      name: "Emily Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "EJ",
    },
    action: "marked absent",
    class: "Physics 202",
    time: "15 minutes ago",
  },
  {
    id: 3,
    user: {
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MB",
    },
    action: "marked late",
    class: "Computer Science 301",
    time: "32 minutes ago",
  },
  {
    id: 4,
    user: {
      name: "Sarah Davis",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SD",
    },
    action: "marked present",
    class: "English Literature",
    time: "1 hour ago",
  },
  {
    id: 5,
    user: {
      name: "David Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "DW",
    },
    action: "marked present",
    class: "History 101",
    time: "2 hours ago",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {recentActivity.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.user.name}</p>
            <p className="text-sm text-muted-foreground">
              {activity.action} in {activity.class}
            </p>
          </div>
          <div className="ml-auto text-xs text-muted-foreground">{activity.time}</div>
        </div>
      ))}
    </div>
  )
}

