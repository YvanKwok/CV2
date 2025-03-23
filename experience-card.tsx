"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface Experience {
  id: number
  company: string
  position: string
  period: string
  teamSize?: string
  description: string
  accounts?: string
  models?: string
  image: string
}

interface ExperienceCardProps {
  experience: Experience
  index: number
  onMouseEnter: (text?: string) => void
  onMouseLeave: () => void
}

export function ExperienceCard({ experience, index, onMouseEnter, onMouseLeave }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="min-w-[90vw] md:min-w-[600px] lg:min-w-[800px] h-[600px] relative rounded-lg overflow-hidden group mr-8"
      onMouseEnter={() => onMouseEnter(experience.company)}
      onMouseLeave={onMouseLeave}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10"></div>
      <Image
        src={experience.image || "/placeholder.svg"}
        alt={experience.company}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-2">{experience.company}</h3>
          <p className="text-xl text-gray-300 mb-1">{experience.position}</p>
          <p className="text-gray-400 mb-4">{experience.period}</p>
          {experience.teamSize && <p className="text-gray-400 mb-4">{experience.teamSize}</p>}

          <div className="h-0.5 w-16 bg-white mb-4"></div>

          <p className="text-gray-200 mb-4 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
            {experience.description}
          </p>

          {experience.accounts && (
            <p className="text-gray-300 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {experience.accounts}
            </p>
          )}

          {experience.models && (
            <p className="text-gray-300 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {experience.models}
            </p>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-6"
          >
            <span className="inline-block px-4 py-2 border border-white/30 rounded-full text-sm hover:bg-white/10 transition-colors">
              查看详情
            </span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

