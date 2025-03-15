import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  checkmarkColor = "stroke-[#8338EC]", // Default color
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & { checkmarkColor?: string }) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer  w-[22px] h-[22px] rounded-[6px] border-[2px] border-[#8338EC]",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
               <svg
    width="14"
    height="10"
    viewBox="0 0 14 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("stroke-[#8338EC]", checkmarkColor)}
  >
    <path
      d="M12.3332 1.33337L4.99984 8.66671L1.6665 5.33337"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
