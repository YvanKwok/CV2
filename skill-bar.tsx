"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronRight } from "lucide-react"

interface SkillBarProps {
  skill: string
  percentage: number
  description?: string
  subSkills?: { name: string; level: number }[]
}

export function SkillBar({ skill, percentage, description, subSkills }: SkillBarProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center cursor-pointer group" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center">
          <ChevronRight className={`h-4 w-4 mr-2 transition-transform duration-300 ${expanded ? "rotate-90" : ""}`} />
          <span className="text-lg font-medium group-hover:text-white transition-colors">{skill}</span>
        </div>
        <span className="text-gray-400">{percentage}%</span>
      </div>

      <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </div>

      {description && expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-2 text-gray-300 text-sm pl-6 border-l border-zinc-700 ml-1"
        >
          {description}
        </motion.div>
      )}

      {subSkills && expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-3 pl-6 space-y-3"
        >
          {subSkills.map((subSkill, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">{subSkill.name}</span>
                <span className="text-gray-400">{subSkill.level}%</span>
              </div>
              <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white/70 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${subSkill.level}%` }}
                  transition={{ duration: 0.8, delay: 0.1 * index, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

