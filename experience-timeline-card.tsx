"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Briefcase, Award, ChevronRight, Target, TrendingUp, Users } from "lucide-react"
import type { JSX } from "react"

interface Achievement {
  title: string
  details: string[]
  icon?: string
}

interface Experience {
  id: number
  company: string
  position: string
  period: string
  teamSize?: string
  description: string
  accounts?: string
  models?: string
  achievements?: Achievement[]
  keyMetrics?: { label: string; value: string; icon?: string }[]
  skills?: string[]
}

interface ExperienceTimelineCardProps {
  experience: Experience
  index: number
  isExpanded: boolean
  toggleExpand: () => void
  isCurrent: boolean
}

export function ExperienceTimelineCard({
  experience,
  index,
  isExpanded,
  toggleExpand,
  isCurrent,
}: ExperienceTimelineCardProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "achievements" | "skills">("overview")

  // 图标映射
  const iconMap: Record<string, JSX.Element> = {
    target: <Target className="h-5 w-5" />,
    trending: <TrendingUp className="h-5 w-5" />,
    users: <Users className="h-5 w-5" />,
    award: <Award className="h-5 w-5" />,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`
        relative rounded-xl overflow-hidden shadow-2xl 
        ${isCurrent ? "border-2 border-white ring-4 ring-white/10" : "border border-zinc-800"}
        transition-all duration-300 hover:shadow-white/5
        ${isExpanded ? "bg-zinc-900" : "bg-zinc-900/70 hover:bg-zinc-900"}
      `}
    >
      {/* 卡片头部 */}
      <div
        className={`
          p-6 md:p-8 border-b border-zinc-800 
          flex flex-col md:flex-row justify-between items-start
          cursor-pointer
        `}
        onClick={toggleExpand}
      >
        <div className="flex-1">
          <div className="flex items-center">
            {isCurrent && <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>}
            <h3 className="text-2xl font-bold text-white">{experience.company}</h3>
          </div>
          <p className="text-xl text-gray-300 mt-2">{experience.position}</p>
          <div className="flex flex-wrap gap-4 mt-3">
            <div className="flex items-center text-gray-400">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{experience.period}</span>
            </div>
            {experience.teamSize && (
              <div className="flex items-center text-gray-400">
                <Briefcase className="h-4 w-4 mr-2" />
                <span>{experience.teamSize}</span>
              </div>
            )}
          </div>
        </div>

        <button
          className={`
            mt-4 md:mt-0 inline-flex items-center px-4 py-2 rounded-full
            ${isExpanded ? "bg-white text-black" : "bg-zinc-800 text-white hover:bg-zinc-700"} 
            transition-colors h-10
          `}
        >
          {isExpanded ? "收起详情" : "查看详情"}
          <ChevronRight className={`ml-1 h-4 w-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
        </button>
      </div>

      {/* 卡片内容 */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* 标签导航 */}
            <div className="border-b border-zinc-800">
              <div className="flex overflow-x-auto hide-scrollbar">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-6 py-4 font-medium transition-colors ${
                    activeTab === "overview"
                      ? "text-white border-b-2 border-white"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  工作概览
                </button>
                {experience.achievements && experience.achievements.length > 0 && (
                  <button
                    onClick={() => setActiveTab("achievements")}
                    className={`px-6 py-4 font-medium transition-colors ${
                      activeTab === "achievements"
                        ? "text-white border-b-2 border-white"
                        : "text-gray-400 hover:text-gray-300"
                    }`}
                  >
                    主要成就
                  </button>
                )}
                {experience.skills && experience.skills.length > 0 && (
                  <button
                    onClick={() => setActiveTab("skills")}
                    className={`px-6 py-4 font-medium transition-colors ${
                      activeTab === "skills"
                        ? "text-white border-b-2 border-white"
                        : "text-gray-400 hover:text-gray-300"
                    }`}
                  >
                    核心技能
                  </button>
                )}
              </div>
            </div>

            {/* 内容区域 */}
            <div className="p-6 md:p-8">
              {/* 工作概览 */}
              {activeTab === "overview" && (
                <div>
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">工作描述</h4>
                    <p className="text-gray-300 leading-relaxed">
                      {experience.description.split("，").map((segment, i) => (
                        <span key={i}>
                          {i > 0 && "，"}
                          {segment.includes("0-1") || segment.includes("AI") || segment.includes("品效合一") ? (
                            <span className="text-white font-medium">{segment}</span>
                          ) : (
                            segment
                          )}
                        </span>
                      ))}
                    </p>
                  </div>

                  {experience.accounts && (
                    <div className="mt-6 p-4 bg-zinc-800/30 rounded-lg">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">管理账号</h4>
                      <p className="text-gray-300">{experience.accounts}</p>
                    </div>
                  )}

                  {experience.models && (
                    <div className="mt-4 p-4 bg-zinc-800/30 rounded-lg">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">负责车型</h4>
                      <p className="text-gray-300">{experience.models}</p>
                    </div>
                  )}

                  {/* 关键指标 */}
                  {experience.keyMetrics && experience.keyMetrics.length > 0 && (
                    <div className="mt-8">
                      <h4 className="text-lg font-semibold text-white mb-4">关键业绩指标</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {experience.keyMetrics.map((metric, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700"
                          >
                            <div className="flex items-center mb-2">
                              {metric.icon && iconMap[metric.icon] ? (
                                iconMap[metric.icon]
                              ) : (
                                <TrendingUp className="h-5 w-5" />
                              )}
                              <h5 className="ml-2 text-gray-300 font-medium">{metric.label}</h5>
                            </div>
                            <p className="text-2xl font-bold text-white">{metric.value}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 主要成就 */}
              {activeTab === "achievements" && experience.achievements && (
                <div className="space-y-8">
                  {experience.achievements.map((achievement, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-center mb-4">
                        <Award className="h-5 w-5 text-white mr-2" />
                        <h4 className="text-xl font-bold text-white">{achievement.title}</h4>
                      </div>
                      <div className="ml-7">
                        <ul className="space-y-3">
                          {achievement.details.map((detail, j) => (
                            <li key={j} className="text-gray-300 leading-relaxed">
                              {detail.split("：").map((part, k) => (
                                <span key={k}>
                                  {k > 0 && "："}
                                  {k === 0 ? <span className="text-white font-medium">{part}</span> : part}
                                </span>
                              ))}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* 核心技能 */}
              {activeTab === "skills" && experience.skills && (
                <div className="mt-2">
                  <div className="flex flex-wrap gap-3">
                    {experience.skills.map((skill, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="px-4 py-2 bg-zinc-800 text-white rounded-full text-sm border border-zinc-700"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

