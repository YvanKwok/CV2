"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ExternalLink, Award, TrendingUp, BarChart } from "lucide-react"
import Image from "next/image"
import { useMediaQuery } from "@/hooks/use-mobile"

interface ProjectGalleryProps {
  onMouseEnter: (text?: string) => void
  onMouseLeave: () => void
}

const projects = [
  {
    id: 1,
    title: "长城汽车抖音矩阵",
    description: "0-1搭建官方抖音矩阵，包含长城汽车直营，长城汽车直营营销中心，福利社，试驾中心等账号",
    image: "/images/gwm-tank700.jpeg",
    stats: [
      { label: "CPL", value: "110以内", icon: <TrendingUp className="h-4 w-4" /> },
      { label: "月均线索", value: "2万+", icon: <BarChart className="h-4 w-4" /> },
      { label: "转化率", value: "4.6%", icon: <Award className="h-4 w-4" /> },
    ],
    tags: ["抖音矩阵", "短视频", "直播", "线索获取"],
  },
  {
    id: 2,
    title: "魏牌全新高山上市",
    description: "针对高端新能源MPV市场，通过精准的市场定位、整合营销传播及用户体验活动，实现产品市场破圈",
    image: "/images/weipai-mountain.png",
    stats: [
      { label: "产品定位", value: "高端MPV", icon: <Award className="h-4 w-4" /> },
      { label: "目标市场", value: "新能源", icon: <TrendingUp className="h-4 w-4" /> },
      { label: "营销策略", value: "整合传播", icon: <BarChart className="h-4 w-4" /> },
    ],
    tags: ["产品上市", "整合营销", "用户体验", "市场定位"],
  },
  {
    id: 3,
    title: "淘宝买菜直播商业化",
    description: "负责直播组日播及专场运营，0到1落地多场S级直播，通过创意内容策划、投放优化与全流程项目管理",
    image: "/images/taobao-maicai.png",
    stats: [
      { label: "单场PV", value: "100万+", icon: <BarChart className="h-4 w-4" /> },
      { label: "单场GMV", value: "1500万+", icon: <TrendingUp className="h-4 w-4" /> },
      { label: "转化率", value: "12%", icon: <Award className="h-4 w-4" /> },
    ],
    tags: ["直播商业化", "内容策划", "GMV增长", "用户运营"],
  },
]

export function ProjectGallery({ onMouseEnter, onMouseLeave }: ProjectGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const slideRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // 自动轮播
  useEffect(() => {
    if (isHovering) return

    const interval = setInterval(() => {
      nextProject()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex, isHovering])

  const nextProject = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
  }

  const prevProject = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)
  }

  const currentProject = projects[currentIndex]

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  }

  // 移动端手势处理
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    slideRef.current?.setAttribute("data-start-x", touch.clientX.toString())
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0]
    const startX = Number(slideRef.current?.getAttribute("data-start-x") || 0)
    const endX = touch.clientX
    const diff = endX - startX

    // 如果滑动距离足够大，则切换项目
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        prevProject()
      } else {
        nextProject()
      }
    }
  }

  return (
    <div className="relative" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      {/* 导航按钮 - 在移动端隐藏，依靠滑动手势 */}
      <div className="hidden md:flex justify-between absolute top-1/2 -translate-y-1/2 left-4 right-4 z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevProject}
          className="bg-white/10 backdrop-blur-sm p-2 rounded-full"
          onMouseEnter={() => onMouseEnter("上一个")}
          onMouseLeave={onMouseLeave}
        >
          <ChevronLeft className="h-6 w-6" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextProject}
          className="bg-white/10 backdrop-blur-sm p-2 rounded-full"
          onMouseEnter={() => onMouseEnter("下一个")}
          onMouseLeave={onMouseLeave}
        >
          <ChevronRight className="h-6 w-6" />
        </motion.button>
      </div>

      <div
        className="overflow-hidden rounded-lg relative h-[400px] md:h-[600px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentProject.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0"
            ref={slideRef}
          >
            <div className="relative h-full w-full overflow-hidden rounded-lg">
              {/* 背景图片 */}
              <div className="absolute inset-0">
                <Image
                  src={currentProject.image || "/placeholder.svg"}
                  alt={currentProject.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
              </div>

              {/* 内容区域 */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-8 z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  {/* 标签 - 在移动端减少显示数量 */}
                  <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                    {currentProject.tags.slice(0, isMobile ? 2 : 4).map((tag, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="px-2 py-1 md:px-3 md:py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  {/* 标题和描述 */}
                  <h3 className="text-xl md:text-3xl font-bold mb-2 md:mb-3">{currentProject.title}</h3>
                  <p className="text-sm md:text-lg text-gray-300 mb-4 md:mb-6 max-w-3xl line-clamp-2 md:line-clamp-none">
                    {currentProject.description}
                  </p>

                  {/* 统计数据 - 在移动端调整布局 */}
                  <div className="grid grid-cols-3 gap-2 md:gap-4">
                    {currentProject.stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        className="bg-white/10 backdrop-blur-sm p-2 md:p-4 rounded-lg border border-white/5"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                      >
                        <div className="flex items-center mb-1 md:mb-2">
                          <span className="md:block hidden">{stat.icon}</span>
                          <p className="text-gray-300 text-xs md:text-sm md:ml-2">{stat.label}</p>
                        </div>
                        <p className="text-base md:text-2xl font-bold">{stat.value}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* 查看详情按钮 */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mt-4 md:mt-8 flex items-center gap-1 md:gap-2 px-4 py-2 md:px-6 md:py-3 bg-white text-black rounded-full text-sm md:text-base font-medium hover:bg-white/90 transition-colors"
                    onMouseEnter={() => onMouseEnter("查看详情")}
                    onMouseLeave={onMouseLeave}
                  >
                    查看项目详情
                    <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 导航指示器 - 移动端优化 */}
      <div className="flex justify-center mt-3 md:mt-6 space-x-2">
        {projects.map((project, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            className={`transition-all duration-300 flex items-center ${
              index === currentIndex
                ? "bg-white text-black px-3 py-1 rounded-full text-xs"
                : "bg-gray-600 w-2 h-2 md:w-3 md:h-3 rounded-full"
            }`}
            onMouseEnter={() => onMouseEnter(index === currentIndex ? "" : project.title)}
            onMouseLeave={onMouseLeave}
          >
            {index === currentIndex && (
              <span className="text-xs font-medium">
                {index + 1}/{projects.length}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

