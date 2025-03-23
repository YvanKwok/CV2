"use client"

import { motion } from "framer-motion"
import { Award } from "lucide-react"

interface ExperienceOverviewProps {
  totalYears: number
  companies: number
  projects: number
  onMouseEnter: (text?: string) => void
  onMouseLeave: () => void
}

export function ExperienceOverview({
  totalYears,
  companies,
  projects,
  onMouseEnter,
  onMouseLeave,
}: ExperienceOverviewProps) {
  const stats = [
    {
      value: projects,
      label: "主导项目",
      icon: <Award className="h-6 w-6" />,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="flex flex-col items-center p-4 bg-zinc-800/50 rounded-lg"
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={onMouseLeave}
    >
      <div className="p-3 bg-white/10 rounded-full mb-3">{stats[0].icon}</div>
      <span className="text-3xl font-bold text-white">{stats[0].value}+</span>
      <span className="text-gray-400 mt-1">{stats[0].label}</span>
    </motion.div>
  )
}

