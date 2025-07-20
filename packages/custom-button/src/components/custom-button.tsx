import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@smilexx2/ui-core"
import "../styles/index.css"

const customButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient:
          "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg",
        glow: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/50 hover:shadow-primary/60",
        neon: "bg-black text-cyan-400 border border-cyan-400 hover:bg-cyan-400 hover:text-black shadow-lg shadow-cyan-400/50",
      },
      size: {
        xs: "h-7 rounded-md px-2 text-xs",
        sm: "h-9 rounded-md px-3",
        default: "h-10 px-4 py-2",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-md px-10 text-lg",
        icon: "h-10 w-10",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "hover:animate-bounce",
        wobble: "hover:animate-pulse",
        ripple: "active:animate-ping",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
    },
  }
)

export interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof customButtonVariants> {
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  ripple?: boolean
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      className,
      variant,
      size,
      animation,
      loading,
      leftIcon,
      rightIcon,
      ripple,
      children,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const [rippleEffect, setRippleEffect] = React.useState<{
      x: number
      y: number
      id: number
    } | null>(null)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple && !disabled && !loading) {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const id = Date.now()

        setRippleEffect({ x, y, id })
        setTimeout(() => setRippleEffect(null), 600)
      }

      if (onClick) {
        onClick(e)
      }
    }

    const isDisabled = disabled || loading

    return (
      <button
        className={cn(customButtonVariants({ variant, size, animation, className }))}
        ref={ref}
        disabled={isDisabled}
        onClick={handleClick}
        {...props}
      >
        {ripple && rippleEffect && (
          <span
            className="absolute rounded-full bg-white/30 animate-ping"
            style={{
              left: rippleEffect.x - 10,
              top: rippleEffect.y - 10,
              width: 20,
              height: 20,
            }}
          />
        )}

        {loading && <Loader2 className="animate-spin" />}
        {!loading && leftIcon && leftIcon}

        <span className={cn(loading && "opacity-70")}>{children}</span>

        {!loading && rightIcon && rightIcon}
      </button>
    )
  }
)
CustomButton.displayName = "CustomButton"

export { CustomButton, customButtonVariants }
