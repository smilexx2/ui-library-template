import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { cn } from "@/lib/utils"

export interface UserProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  user: {
    name: string
    email: string
    avatar?: string
    status?: "online" | "offline" | "away"
    role?: string
  }
  showStatus?: boolean
  showRole?: boolean
  size?: "sm" | "md" | "lg"
}

const UserProfile = React.forwardRef<HTMLDivElement, UserProfileProps>(
  ({ className, user, showStatus = true, showRole = true, size = "md", ...props }, ref) => {
    const getInitials = (name: string) => {
      return name
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }

    const sizeClasses = {
      sm: {
        avatar: "h-8 w-8",
        text: "text-sm",
        spacing: "space-y-1",
      },
      md: {
        avatar: "h-10 w-10",
        text: "text-base",
        spacing: "space-y-2",
      },
      lg: {
        avatar: "h-12 w-12",
        text: "text-lg",
        spacing: "space-y-3",
      },
    }

    const statusColors = {
      online: "bg-green-500",
      offline: "bg-gray-400",
      away: "bg-yellow-500",
    }

    return (
      <div ref={ref} className={cn("flex items-center space-x-3 p-4 rounded-lg border bg-card", className)} {...props}>
        <div className="relative">
          <Avatar className={sizeClasses[size].avatar}>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          {showStatus && user.status && (
            <div
              className={cn(
                "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background",
                statusColors[user.status]
              )}
            />
          )}
        </div>
        <div className={sizeClasses[size].spacing}>
          <div>
            <h3 className={cn("font-semibold", sizeClasses[size].text)}>{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          {showRole && user.role && (
            <span className={cn(
              "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
              user.role === "admin" ? "bg-destructive text-destructive-foreground" :
              user.role === "moderator" ? "bg-secondary text-secondary-foreground" :
              "bg-muted text-muted-foreground"
            )}>
              {user.role}
            </span>
          )}
        </div>
      </div>
    )
  }
)

UserProfile.displayName = "UserProfile"

export { UserProfile }
