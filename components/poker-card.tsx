"use client"

import type { Card as PokerCard } from "@/lib/poker/types"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

interface CardProps {
  card: PokerCard
  hidden?: boolean
  className?: string
  size?: "xs" | "sm" | "md" | "lg"
  animate?: boolean
  animationType?: "deal" | "discard" | "slide" | "none"
  animationDelay?: number
}

export function Card({
  card,
  hidden = false,
  className,
  size = "md",
  animate = false,
  animationType = "slide",
  animationDelay = 0,
}: CardProps) {
  const [showAnimation, setShowAnimation] = useState(false)
  const [isFlipping, setIsFlipping] = useState(false)
  const isRed = card.suit === "♥" || card.suit === "♦"

  const sizeClasses = {
    xs: "w-12 h-16",
    sm: "w-14 h-20",
    md: "w-16 h-24",
    lg: "w-20 h-32",
  }

  const rankSizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  }

  const suitSizeClasses = {
    xs: "text-lg",
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-4xl",
  }

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setShowAnimation(true)
      }, animationDelay)
      return () => clearTimeout(timer)
    }
  }, [animate, animationDelay])

  const getAnimationClass = () => {
    if (!showAnimation || !animate) return ""
    switch (animationType) {
      case "deal":
        return "card-deal-animation"
      case "discard":
        return "card-discard-animation"
      case "slide":
        return "card-slide-animation"
      default:
        return ""
    }
  }

  if (hidden) {
    return (
      <div
        className={cn(
          "relative rounded-xl bg-gradient-to-br from-blue-900 to-blue-950",
          "border-2 border-blue-700 shadow-xl",
          "flex items-center justify-center",
          "transition-all duration-300 hover:scale-105",
          sizeClasses[size],
          getAnimationClass(),
          className,
        )}
      >
        <div className="absolute inset-2 rounded-lg border border-blue-600 opacity-30" />
        <div className="text-3xl text-blue-400 font-bold">🂠</div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "relative rounded-xl bg-white border-2 border-gray-300",
        "shadow-xl flex flex-col items-center justify-between",
        "transition-all duration-300 hover:scale-105",
        sizeClasses[size],
        getAnimationClass(),
        isFlipping && "animate-spin",
        className,
      )}
    >
      {/* Top rank */}
      <div
        className={cn(
          "absolute top-1 left-1.5 font-bold leading-none",
          rankSizeClasses[size],
          isRed ? "text-red-600" : "text-black",
        )}
      >
        {card.rank}
      </div>

      {/* Center suit */}
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "font-bold leading-none",
          suitSizeClasses[size],
          isRed ? "text-red-600" : "text-black",
        )}
      >
        {card.suit}
      </div>

      {/* Bottom rank (rotated) */}
      <div
        className={cn(
          "absolute bottom-1 right-1.5 font-bold leading-none rotate-180",
          rankSizeClasses[size],
          isRed ? "text-red-600" : "text-black",
        )}
      >
        {card.rank}
      </div>

      {/* Card border detail */}
      <div className="absolute inset-1 rounded-lg border border-gray-200 pointer-events-none" />
    </div>
  )
}

export { Card as PokerCard }
