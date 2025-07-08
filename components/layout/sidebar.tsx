"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Activity, Clock, CloudRain, Dices, Dna, Trophy, GitBranch, Settings } from "lucide-react"

interface SidebarProps {
  isOpen: boolean
}

const navigationItems = [
  {
    title: "Live Race Center",
    href: "/",
    icon: Activity,
    description: "Real-time predictions and analysis",
  },
  {
    title: "Era Comparison",
    href: "/era-comparison",
    icon: Clock,
    description: "Cross-generational driver analysis",
  },
  {
    title: "Weather Predictor",
    href: "/weather-predictor",
    icon: CloudRain,
    description: "Weather impact modeling",
  },
  {
    title: "Monte Carlo Lab",
    href: "/monte-carlo",
    icon: Dices,
    description: "Strategy simulation engine",
  },
  {
    title: "Driver DNA",
    href: "/driver-dna",
    icon: Dna,
    description: "Driver characteristic analysis",
  },
  {
    title: "Championship Battle",
    href: "/championship-battle",
    icon: Trophy,
    description: "Title fight simulation",
  },
  {
    title: "What-If Generator",
    href: "/what-if",
    icon: GitBranch,
    description: "Alternative history scenarios",
  },
  {
    title: "Strategy Workshop",
    href: "/strategy-workshop",
    icon: Settings,
    description: "Personal strategy testing",
  },
]

export function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-all duration-300 ease-in-out z-40",
        isOpen ? "w-64" : "w-16",
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive ? "bg-red-100 text-red-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  )}
                >
                  <Icon
                    className={cn(
                      "flex-shrink-0 h-5 w-5",
                      isActive ? "text-red-500" : "text-gray-400 group-hover:text-gray-500",
                    )}
                  />

                  {isOpen && (
                    <div className="ml-3 flex-1">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                    </div>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* F1 Branding */}
        <div className="border-t border-gray-200 p-4">
          {isOpen ? (
            <div className="text-center">
              <div className="text-lg font-bold text-red-600">F1 AI PREDICTOR</div>
              <div className="text-xs text-gray-500">Elite Analytics Platform</div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-sm font-bold text-red-600">F1</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
