import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"
import { Heart, Download, User } from "lucide-react"

import { CustomButton } from "@smilexx2/custom-button"

const meta = {
  title: "UI Library/CustomButton",
  component: CustomButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
        "gradient",
        "glow",
        "neon",
      ],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "default", "lg", "xl", "icon"],
    },
    animation: {
      control: "select",
      options: ["none", "pulse", "bounce", "wobble", "ripple"],
    },
    loading: {
      control: "boolean",
    },
    ripple: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof CustomButton>

export default meta
type Story = StoryObj<typeof meta>

// Basic variants
export const Default: Story = {
  args: {
    children: "Default Button",
  },
}

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Delete",
  },
}

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
}

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost",
  },
}

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link",
  },
}

// Enhanced variants
export const Gradient: Story = {
  args: {
    variant: "gradient",
    children: "Gradient Button",
  },
}

export const Glow: Story = {
  args: {
    variant: "glow",
    children: "Glow Effect",
  },
}

export const Neon: Story = {
  args: {
    variant: "neon",
    children: "Neon Style",
  },
}

// Sizes
export const ExtraSmall: Story = {
  args: {
    size: "xs",
    children: "Extra Small",
  },
}

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small",
  },
}

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large",
  },
}

export const ExtraLarge: Story = {
  args: {
    size: "xl",
    children: "Extra Large",
  },
}

export const Icon: Story = {
  args: {
    size: "icon",
    children: <Heart className="h-4 w-4" />,
  },
}

// Interactive features
export const WithIcons: Story = {
  args: {
    leftIcon: <Heart className="h-4 w-4" />,
    rightIcon: <Download className="h-4 w-4" />,
    children: "With Icons",
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    children: "Loading...",
  },
}

export const WithRipple: Story = {
  args: {
    ripple: true,
    variant: "default",
    children: "Click for Ripple",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
}

// Animations
export const PulseAnimation: Story = {
  args: {
    animation: "pulse",
    children: "Pulse Animation",
  },
}

export const BounceAnimation: Story = {
  args: {
    animation: "bounce",
    children: "Hover to Bounce",
  },
}

export const WobbleAnimation: Story = {
  args: {
    animation: "wobble",
    children: "Hover to Wobble",
  },
}

// Showcase combinations
export const GradientWithRipple: Story = {
  args: {
    variant: "gradient",
    ripple: true,
    leftIcon: <User className="h-4 w-4" />,
    children: "Gradient + Ripple",
  },
}

export const NeonWithAnimation: Story = {
  args: {
    variant: "neon",
    animation: "pulse",
    children: "Neon + Pulse",
  },
}

export const GlowLarge: Story = {
  args: {
    variant: "glow",
    size: "lg",
    children: "Large Glow Button",
  },
}

// Playground story for full customization
export const Playground: Story = {
  args: {
    variant: "default",
    size: "default",
    children: "Customize Me",
    animation: "none",
    ripple: false,
    loading: false,
    disabled: false,
  },
}
