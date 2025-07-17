import * as React from "react"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

export interface StatsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  description?: string
  trend?: {
    value: number
    label?: string
    period?: string
  }
  icon?: React.ReactNode
  variant?: "default" | "positive" | "negative" | "neutral"
}

const StatsCard = React.forwardRef<HTMLDivElement, StatsCardProps>(
  (
    {
      title,
      value,
      description,
      trend,
      icon,
      variant = "default",
      className,
      ...props
    },
    ref
  ) => {
    const getTrendIcon = () => {
      if (!trend) return null
      
      if (trend.value > 0) return <TrendingUp className="h-3 w-3" />
      if (trend.value < 0) return <TrendingDown className="h-3 w-3" />
      return <Minus className="h-3 w-3" />
    }

    const getTrendColor = () => {
      if (!trend) return ""
      
      if (trend.value > 0) return "text-green-600"
      if (trend.value < 0) return "text-red-600"
      return "text-muted-foreground"
    }

    const getVariantStyles = () => {
      switch (variant) {
        case "positive":
          return "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950"
        case "negative":
          return "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950"
        case "neutral":
          return "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950"
        default:
          return "border bg-card"
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg p-6 shadow-sm transition-shadow hover:shadow-md",
          getVariantStyles(),
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline space-x-2">
              <p className="text-2xl font-bold">{value}</p>
              {trend && (
                <div className={cn("flex items-center space-x-1 text-xs", getTrendColor())}>
                  {getTrendIcon()}
                  <span>
                    {Math.abs(trend.value)}%
                    {trend.label && ` ${trend.label}`}
                  </span>
                </div>
              )}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
            {trend?.period && (
              <p className="text-xs text-muted-foreground mt-1">vs {trend.period}</p>
            )}
          </div>
          {icon && (
            <div className="flex-shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {icon}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
)

StatsCard.displayName = "StatsCard"

export { StatsCard }