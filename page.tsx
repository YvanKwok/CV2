"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion"
import {
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  Phone,
  Mail,
  Calendar,
  Award,
  Zap,
  Globe,
  Users,
  Megaphone,
} from "lucide-react"
import { useInView } from "react-intersection-observer"

// Components
import { ParticleBackground } from "@/components/particle-background"
import { SkillBar } from "@/components/skill-bar"
import { ExperienceTimelineCard } from "@/components/experience-timeline-card"
import { ExperienceOverview } from "@/components/experience-overview"
import { ProjectGallery } from "@/components/project-gallery"
import { MouseFollower } from "@/components/mouse-follower"

export default function Home() {
  const [cursorVariant, setCursorVariant] = useState("default")
  const [cursorText, setCursorText] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [activeSkillCategory, setActiveSkillCategory] = useState("digital")
  const [expandedExperience, setExpandedExperience] = useState<number | null>(1)
  const [scrollY, setScrollY] = useState(0)

  // Refs for sections
  const homeRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const experienceRef = useRef<HTMLElement>(null)
  const educationRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  // Intersection Observer for sections
  const [aboutRefView, aboutInView] = useInView({ threshold: 0.3, triggerOnce: false })
  const [expRefView, expInView] = useInView({ threshold: 0.1, triggerOnce: false })
  const [eduRefView, eduInView] = useInView({ threshold: 0.3, triggerOnce: false })
  const [contactRefView, contactInView] = useInView({ threshold: 0.3, triggerOnce: false })

  // Parallax effect for hero section
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const springHeroY = useSpring(heroY, { stiffness: 100, damping: 30 })

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Determine which section is currently in view
      const scrollPosition = window.scrollY + 100

      if (homeRef.current && scrollPosition < homeRef.current.offsetHeight) {
        setActiveSection("home")
      } else if (aboutRef.current && scrollPosition < aboutRef.current.offsetTop + aboutRef.current.offsetHeight) {
        setActiveSection("about")
      } else if (
        experienceRef.current &&
        scrollPosition < experienceRef.current.offsetTop + experienceRef.current.offsetHeight
      ) {
        setActiveSection("experience")
      } else if (
        educationRef.current &&
        scrollPosition < educationRef.current.offsetTop + educationRef.current.offsetHeight
      ) {
        setActiveSection("education")
      } else if (contactRef.current) {
        setActiveSection("contact")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Cursor hover handlers
  const handleLinkEnter = (text = "") => {
    setCursorVariant("link")
    setCursorText(text)
  }

  const handleLinkLeave = () => {
    setCursorVariant("default")
    setCursorText("")
  }

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  // Skill categories
  const skillCategories = [
    {
      id: "digital",
      name: "数字营销能力",
      icon: <Megaphone className="h-5 w-5" />,
      skills: [
        {
          skill: "商业化新媒体运营",
          percentage: 95,
          description:
            "深耕新媒体商业化整合与效果转化，主导官方抖音矩阵0-1搭建及常态化运营，构建高效商业化线索捕获及品牌传播体系。",
          subSkills: [
            { name: "抖音矩阵搭建与运营", level: 96 },
            { name: "短视频内容策划与制作", level: 94 },
            { name: "直播策划与执行", level: 93 },
            { name: "KOL/KOC生态孵化", level: 90 },
          ],
        },
        {
          skill: "数据驱动决策",
          percentage: 92,
          description:
            "通过精准内容策略+数据驱动优化，持续提升社交媒体平台商业转化效率，助力品牌与销售渠道实现价值增长。",
          subSkills: [
            { name: "数据分析与洞察", level: 93 },
            { name: "转化漏斗优化", level: 94 },
            { name: "A/B测试与优化", level: 90 },
            { name: "ROI评估与提升", level: 91 },
          ],
        },
        {
          skill: "内容优化与创意策划",
          percentage: 94,
          description:
            "策划并落地多个现象级IP项目，全网总PV突破200万+，互动指标达32,000+，有效提升品牌内容的传播力与商业价值。",
          subSkills: [
            { name: "品牌IP打造", level: 95 },
            { name: "创意内容策划", level: 96 },
            { name: "用户互动设计", level: 92 },
            { name: "传播策略制定", level: 93 },
          ],
        },
      ],
    },
    {
      id: "tech",
      name: "技术与工具能力",
      icon: <Zap className="h-5 w-5" />,
      skills: [
        {
          skill: "AI agent部署与应用",
          percentage: 90,
          description:
            "结合业务需求部署AI工具，自动生成创意素材并优化传播策略，确保内容与品牌定位高度匹配，最大化实现曝光、互动及转化目标。",
          subSkills: [
            { name: "AI创意生成", level: 92 },
            { name: "智能内容优化", level: 89 },
            { name: "自动化工作流", level: 88 },
            { name: "数据分析自动化", level: 91 },
          ],
        },
        {
          skill: "数据分析工具",
          percentage: 88,
          description: "熟练使用各类数据分析工具，对用户行为进行深度分析，提取有价值的洞察，指导营销决策。",
          subSkills: [
            { name: "抖音巨量引擎", level: 93 },
            { name: "Google Analytics", level: 87 },
            { name: "Excel高级分析", level: 89 },
            { name: "数据可视化", level: 85 },
          ],
        },
        {
          skill: "内容制作工具",
          percentage: 86,
          description: "熟练使用各类内容制作工具，能够独立完成高质量的视频、图片和文案创作。",
          subSkills: [
            { name: "视频剪辑软件", level: 88 },
            { name: "图片处理工具", level: 85 },
            { name: "直播技术应用", level: 90 },
            { name: "内容管理系统", level: 83 },
          ],
        },
      ],
    },
    {
      id: "management",
      name: "管理与协作能力",
      icon: <Users className="h-5 w-5" />,
      skills: [
        {
          skill: "团队管理与协作",
          percentage: 88,
          description: "管理5人团队，协调多部门资源，确保项目高效执行与目标达成。",
          subSkills: [
            { name: "团队领导力", level: 89 },
            { name: "项目管理", level: 90 },
            { name: "跨部门协作", level: 87 },
            { name: "资源调配", level: 86 },
          ],
        },
        {
          skill: "商业策略制定",
          percentage: 91,
          description: "基于市场洞察和数据分析，制定有效的商业策略，推动业务增长。",
          subSkills: [
            { name: "市场分析", level: 92 },
            { name: "竞品研究", level: 90 },
            { name: "增长策略", level: 93 },
            { name: "预算管理", level: 89 },
          ],
        },
        {
          skill: "沟通与谈判",
          percentage: 87,
          description: "与内外部利益相关者进行有效沟通，推动项目顺利进行。",
          subSkills: [
            { name: "商务谈判", level: 86 },
            { name: "演讲能力", level: 88 },
            { name: "书面表达", level: 89 },
            { name: "冲突解决", level: 85 },
          ],
        },
      ],
    },
    {
      id: "language",
      name: "语言能力",
      icon: <Globe className="h-5 w-5" />,
      skills: [
        {
          skill: "中文",
          percentage: 100,
          description: "母语，具备专业的口头和书面表达能力。",
        },
        {
          skill: "英语",
          percentage: 85,
          description: "流利的口语和书面表达，能够在国际化环境中自如工作。",
          subSkills: [
            { name: "商务英语", level: 87 },
            { name: "日常交流", level: 90 },
            { name: "专业写作", level: 83 },
            { name: "演讲能力", level: 80 },
          ],
        },
        {
          skill: "意大利语 CILS B2",
          percentage: 80,
          description: "具备CILS B2水平认证，能够进行日常和部分专业交流。",
          subSkills: [
            { name: "日常交流", level: 85 },
            { name: "阅读理解", level: 82 },
            { name: "听力理解", level: 78 },
            { name: "写作能力", level: 75 },
          ],
        },
      ],
    },
  ]

  // Experience data
  const experiences = [
    {
      id: 1,
      company: "长城汽车股份有限公司-长城智选",
      position: "商业化-新媒体运营部-新媒体运营专家（用户运营经理）",
      period: "2024年7月至今",
      teamSize: "团队管理规模：5人",
      description:
        "深耕新媒体商业化整合与效果转化，主导官方抖音矩阵0-1搭建及常态化运营，孵化KOS/KOC生态，推动官方社交媒体品效合一，构建高效商业化线索捕获及品牌传播体系。通过精准内容策略+数据驱动优化，结合业务原生AI搭建，持续提升社交媒体平台商业转化效率，助力品牌与销售渠道实现价值增长。",
      accounts: "官方抖音/小红书账号：长城汽车直营/长城汽车直营营销中心/福利社/试驾中心/魏牌/魏牌电台/魏牌直播中心等",
      models: "车型号：坦克700/魏牌全新蓝山/魏牌高山",
      keyMetrics: [
        { label: "月均线索", value: "6万+", icon: "target" },
        { label: "CPL", value: "110以内", icon: "trending" },
        { label: "试驾转化率", value: "4.6%", icon: "trending" },
      ],
      skills: [
        "抖音矩阵搭建",
        "商业化线索捕获",
        "数据驱动决策",
        "AI创意策划",
        "内容优化",
        "团队管理",
        "KOL/KOC生态孵化",
      ],
      achievements: [
        {
          title: "商业化线索捕获与转化优化",
          details: [
            "官方抖音矩阵整体运营：全盘搭建、精细化运营抖音矩阵，CPL稳定保持在110以内，CPS15,000；每月通过短视频与直播叠加投放策略，实现高效线索捕获：",
            "短视频：月均有效线索2万+，季度累计超6万+；",
            "直播：月均有效线索4万+，季度累计超10万+。",
            "数据驱动与AIagent，在抖音公域引流后，通过数据模型分析后链路转化表现；利用AIagent创意策划，创意素材占比约50%，有效提升素材效率；渠道内订单转化率达28%，月均线索转订单转化率1.5%，试驾转化率4.6%，显著提高营销投放的ROI。",
          ],
        },
        {
          title: "专项营销项目",
          details: [
            "魏牌全新高山上市发布产品营销传播（2025 Q1）：作为重点战略车型，针对高端新能源MPV市场，2025年上市发布。核心目标通过精准的市场定位、整合营销传播及用户体验活动，实现产品市场破圈及高质量线索转化。负责范围：1.社交媒体产品力营销策略；2.上市传播规划；3.内容营销及媒介投放；4.产品体验与用户运营。",
            "长城智选x魏牌全新蓝山上市发布（2024年 Q3）：全新蓝山（智驾版）作为长城汽车旗舰SUV车型，2024年Q3上市。本项目核心目标通过长城智选（现长城汽车直营）精准数字营销、内容传播和试驾体验，迅速提升市场认知度，扩大品牌影响力，并推动潜客转化。负责范围：1.上市内容传播策略制定；2.抖音直营矩阵精细化运营；3.线索收割与转化提升。",
            '2024 成都车展（2024 Q3）：长城智选围绕"来智选耍一哈"主题展开营销，旨在通过线上线下联动，扩大品牌影响力，并优化线索转化链路，提升试驾与订单转化效率。负责范围：1.牵头新媒体整合营销，全域提升品牌声量；2.高效线索获取与试驾转化；3.CPL/CPS/CPT 运营优化，提升营销效率。',
          ],
        },
        {
          title: "技能聚焦",
          details: [
            "商业化线索捕获效率提升：深耕新媒体渠道营销线索获取、漏斗优化及后链路转化。",
            "内容优化：提升曝光量和用户互动，增强品牌影响力。",
            "官方抖音矩阵体系建设：构建高效的内容分发网络。",
            "新媒体矩阵搭建：整合资源，提升品牌在线上平台的整体表现。",
            "业务AI搭建与优化：结合业务需求部署AI工具，自动生成创意素材并优化传播策略，结合销售政策与市场变化，确保内容与品牌定位高度匹配，最大化实现曝光、互动及转化目标。",
          ],
        },
      ],
    },
    {
      id: 2,
      company: "阿里巴巴集团-淘宝天猫",
      position: "市场营销高级专员",
      period: "2023年 - 2024年",
      description:
        "聚焦淘宝买菜大促节点及日常直播优化直播商业化项目，负责直播组日播及专场运营，0到1落地多场S级直播，通过创意内容策划、投放优化与全流程项目管理，实现了高GMV、高PV/UV与粉丝快速增量，强化品牌心智与用户粘性。",
      keyMetrics: [
        { label: "单场GMV", value: "1500万+", icon: "trending" },
        { label: "单场PV", value: "100万+", icon: "target" },
        { label: "转化率", value: "12%", icon: "trending" },
      ],
      skills: ["直播商业化", "内容IP打造", "KOL合作", "数据分析", "用户增长", "品牌心智建设", "创意策划"],
      achievements: [
        {
          title: "直播与站内运营",
          details: [
            "直播项目落地：0-1孵化并执行多场S级直播，单场PV突破100万+，年货节单场GMV超过1,500万；酒水专场GMV500万+，转化率12%。依托站内750万粉丝矩阵（含淘宝买菜官方账号108万+、农场直发账号651.7万），制定直播商业化玩法机制，持续提升曝光度与成交效率。",
            "KOL/明星的深度合作：全程策划执行直播，显著放大场次声量与用户覆盖度，并确保转化率和ROI达成。",
            '直播IP孵化：任职期间粉丝破百万借助"原产地溯源直播 + 中国节味嘉年华 + BOSS来了"等IP活动，打造特色直播场，强化用户心智与品牌黏性；5个月内新增粉丝超100万，多场直播UV与GMV均实现快速增长，为平台带来高效商业回报。',
            "内容营销与IP项目打造：《中国节味嘉年华》IP：策划并落地中秋潮汕专场直播，聚焦垂直品类，准确触达核心消费人群；有效提升场次PV、UV与GMV，并扩大品牌认知度.",
          ],
        },
        {
          title: "策略与平台品牌建设",
          details: [
            "平台品牌心智建设：IP 项目与重点 KOL/明星合作，持续提升目标人群对品牌的认知度与认同感，促进用户活跃度与留存率。与千万级KOL 合作，全流程策划执行直播项目，提升场次全网声量与用户覆盖度。",
            "内容策略与热点营销：基于行业、消费者行为与热点趋势，设计并落地突破性的直播策略与营销事件，提升曝光度与达人参与度。与细分行业、消费场景合作，打造内容话题热点，持续优化传播内容，提高用户浏览深度与转化率.",
          ],
        },
        {
          title: "核心技能与亮点",
          details: [
            "直播商业化项目管理：落地千万级与S级直播项目，显著提升 GMV与商业转化效率。",
            "内容创意与品牌IP 打造：策划IP项目与原产地直播，强化用户品牌心智，提升曝光量与互动量。",
            "精准投放与渠道优化：制定投放策略与合作计划，推动直播渠道成交增长。",
            "数据驱动策略输出：基于消费者画像与市场数据，输出内容与商业策略，实现品牌的高效传播与转化。",
          ],
        },
      ],
    },
    {
      id: 3,
      company: "保时捷-JEBSEN MOTORS HZWL",
      position: "市场主管（营销及大客户BD）",
      period: "2022年 - 2023年",
      description:
        "主导JEBSEN MOTORS保时捷品牌东一区域线上线下营销及用户关系管理，特别聚焦社交媒体商业化探索与私域增长，通过直播、用户活动及精准内容输出，持续提升品牌曝光与商业化转化。",
      keyMetrics: [
        { label: "直播UV", value: "3万+", icon: "target" },
        { label: "月均成交", value: "8+台", icon: "trending" },
        { label: "粉丝增长", value: "40%", icon: "users" },
      ],
      skills: ["高端品牌营销", "社交媒体运营", "私域增长", "内容IP打造", "大客户关系管理", "线上线下活动策划"],
      achievements: [
        {
          title: "核心成绩与亮点",
          details: [
            "营销直播成绩：单场直播平均UV3万+，最佳表现达到10万+。月度线索交付3000+，月均车辆成交数达8+，有效实现商业转化闭环。",
            "账号经营与粉丝增长：实现官方账号粉丝增长40%，单月曝光量达247万+。",
            '内容IP打造与品牌传播：策划并落地现象级IP项目"997改装系列视频"，全网总PV突破200万+，互动指标达32,000+，有效提升品牌内容的传播力与商业价值。',
          ],
        },
      ],
    },
    {
      id: 4,
      company: "欢瑞世纪（星瑞时空）",
      position: "艺人/商务助理",
      period: "2017年 - 2021年",
      description:
        "在影视、综艺及广告项目中，前期以艺人/演员身份演出，后期逐步转向商务助理，积累从前台到制作统筹的全方位经验，对项目提供专业支持，确保拍摄及宣传工作的高效推进。",
      skills: ["影视制作", "项目统筹", "商务管理", "艺人管理", "预算控制", "团队协作"],
      achievements: [
        {
          title: "主要职责",
          details: [
            "艺人阶段：参演影视剧、综艺及广告项目，积累镜前经验，提升角色塑造能力。剧本内容拆解与镜前训练，深入理解技巧，熟悉影视制作流程，提高制作协作能力。",
            "商务助理阶段：商务管理：艺人及专项商务项目、预算及品牌合作，优化资源配置，提高执行效率。统筹拍摄及项目进度：协调导演、摄影、美术、造型等多个部门，管理艺人及剧组日程，确保拍摄高效推进。",
          ],
        },
      ],
    },
  ]

  const toggleExperience = (id: number) => {
    if (expandedExperience === id) {
      setExpandedExperience(null)
    } else {
      setExpandedExperience(id)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <MouseFollower variant={cursorVariant} text={cursorText} />

      {/* Hero Section */}
      <section id="home" ref={homeRef} className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10"></div>
        <ParticleBackground />
        <motion.div style={{ y: springHeroY }} className="absolute inset-0">
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
        </motion.div>
        <motion.div
          style={{ opacity: heroOpacity }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 lg:px-24 z-20"
        >
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter mb-4 md:mb-8">郭俊泽</h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-light mb-8 md:mb-12">商业化新媒体运营专家</h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => handleLinkEnter("探索")}
            onMouseLeave={handleLinkLeave}
          >
            <Link
              href="#about"
              onClick={() => scrollToSection("about")}
              className="inline-flex items-center justify-center border border-white px-6 py-2 md:px-8 md:py-3 w-40 md:w-48 hover:bg-white hover:text-black transition-colors group text-sm md:text-base"
            >
              探索我的简历
              <motion.span
                initial={{ x: 0 }}
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              >
                <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4 transition-transform group-hover:translate-x-1" />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          className="absolute bottom-8 left-0 right-0 flex justify-center z-20"
          onMouseEnter={() => handleLinkEnter("滚动")}
          onMouseLeave={handleLinkLeave}
        >
          <Link href="#about" onClick={() => scrollToSection("about")}>
            <ChevronDown className="h-8 w-8 md:h-12 md:w-12" />
          </Link>
        </motion.div>
      </section>

      {/* Header/Navigation - 移动端优化 */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrollY > 50 ? "bg-black/90 backdrop-blur-md py-2 shadow-lg" : "bg-transparent py-3 md:py-4"}`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="text-lg md:text-xl font-bold"
              onMouseEnter={() => handleLinkEnter("首页")}
              onMouseLeave={handleLinkLeave}
            >
              郭俊泽
            </Link>
            <nav className="hidden md:flex space-x-6">
              {["home", "about", "experience", "education", "contact"].map((section) => (
                <Link
                  key={section}
                  href={`#${section}`}
                  onClick={() => scrollToSection(section)}
                  className={`hover:text-gray-300 transition-colors relative ${activeSection === section ? "text-white" : "text-gray-400"}`}
                  onMouseEnter={() =>
                    handleLinkEnter(
                      section === "home"
                        ? "首页"
                        : section === "about"
                          ? "关于我"
                          : section === "experience"
                            ? "工作经历"
                            : section === "education"
                              ? "教育背景"
                              : "联系方式",
                    )
                  }
                  onMouseLeave={handleLinkLeave}
                >
                  {section === "home"
                    ? "首页"
                    : section === "about"
                      ? "关于我"
                      : section === "experience"
                        ? "工作经历"
                        : section === "education"
                          ? "教育背景"
                          : "联系方式"}
                  {activeSection === section && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white"
                    />
                  )}
                </Link>
              ))}
            </nav>
            <div className="md:hidden">
              <button
                className="p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                onMouseEnter={() => handleLinkEnter("菜单")}
                onMouseLeave={handleLinkLeave}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu - 改进移动端菜单 */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 backdrop-blur-md"
            >
              <div className="container mx-auto px-4 py-4">
                <nav className="flex flex-col space-y-4">
                  {["home", "about", "experience", "education", "contact"].map((section) => (
                    <Link
                      key={section}
                      href={`#${section}`}
                      onClick={() => {
                        scrollToSection(section)
                        setMobileMenuOpen(false) // 点击后关闭菜单
                      }}
                      className={`py-2 px-3 rounded-md ${
                        activeSection === section
                          ? "bg-zinc-800 text-white"
                          : "text-gray-400 hover:bg-zinc-900 hover:text-gray-300"
                      } transition-colors`}
                    >
                      {section === "home"
                        ? "首页"
                        : section === "about"
                          ? "关于我"
                          : section === "experience"
                            ? "工作经历"
                            : section === "education"
                              ? "教育背景"
                              : "联系方式"}
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* About Section - 移动端优化 */}
      <section id="about" ref={aboutRef} ref={aboutRefView} className="py-16 md:py-24 bg-zinc-900 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row gap-8 md:gap-12"
          >
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 relative">
                <span className="bg-white h-0.5 w-12 md:w-16 absolute -bottom-3 left-0"></span>
                个人资料
              </h2>
              <div className="space-y-6 md:space-y-8">
                <motion.div
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onMouseEnter={() => handleLinkEnter()}
                  onMouseLeave={handleLinkLeave}
                >
                  <h3 className="text-base md:text-lg font-semibold text-gray-400">姓名</h3>
                  <p className="text-lg md:text-xl">郭俊泽</p>
                </motion.div>
                <motion.div
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onMouseEnter={() => handleLinkEnter()}
                  onMouseLeave={handleLinkLeave}
                >
                  <h3 className="text-base md:text-lg font-semibold text-gray-400">出生日期</h3>
                  <p className="text-lg md:text-xl">1997/10/21</p>
                </motion.div>
                <motion.div
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onMouseEnter={() => handleLinkEnter()}
                  onMouseLeave={handleLinkLeave}
                >
                  <h3 className="text-base md:text-lg font-semibold text-gray-400">联系方式</h3>
                  <div className="flex items-center gap-2 text-lg md:text-xl">
                    <Phone className="h-4 w-4" />
                    <p>+86-13250535525</p>
                  </div>
                  <div className="flex items-center gap-2 text-lg md:text-xl mt-2">
                    <Mail className="h-4 w-4" />
                    <p className="break-all">Yvankwok@yahoo.com</p>
                  </div>
                </motion.div>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 relative">
                <span className="bg-white h-0.5 w-12 md:w-16 absolute -bottom-3 left-0"></span>
                专业技能
              </h2>

              {/* 技能分类标签 - 移动端优化 */}
              <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                {skillCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveSkillCategory(category.id)}
                    className={`flex items-center gap-1 md:gap-2 px-3 py-1 md:px-4 md:py-2 rounded-full transition-all text-xs md:text-sm ${
                      activeSkillCategory === category.id
                        ? "bg-white text-black font-medium"
                        : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                    }`}
                    onMouseEnter={() => handleLinkEnter(category.name)}
                    onMouseLeave={handleLinkLeave}
                  >
                    {category.icon}
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>

              {/* 当前选中的技能类别 */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSkillCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 md:space-y-6"
                >
                  {skillCategories
                    .find((category) => category.id === activeSkillCategory)
                    ?.skills.map((skillItem, index) => (
                      <SkillBar
                        key={index}
                        skill={skillItem.skill}
                        percentage={skillItem.percentage}
                        description={skillItem.description}
                        subSkills={skillItem.subSkills}
                      />
                    ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 md:mt-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 relative">
              <span className="bg-white h-0.5 w-12 md:w-16 absolute -bottom-3 left-0"></span>
              个人优势
            </h2>
            <div className="bg-zinc-800/50 p-4 md:p-6 rounded-xl border border-zinc-700">
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                丰富且多元的新媒体商业化与整合营销实战经验，先后任职于
                <span className="text-white font-medium">长城汽车、阿里巴巴、保时捷</span>
                等，能够灵活运用短视频、直播、信息流投放与 AI 工具，高效获客与转化。核心优势于
                <span className="text-white font-medium">数据驱动决策、创意策划、团队管理</span>
                三位一体：既能快速搭建多平台矩阵并用数据进行精细化优化，也能以创意与品牌 IP 打造深度互动场景。
              </p>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-4">
                凭借<span className="text-white font-medium">影视导演科班背景</span>以及
                <span className="text-white font-medium">意大利语 B2、英文能力</span>
                ，善于在国际化或跨行业环境中灵活融入并输出高水准成果。相信凭借扎实的商业化运营功底与对用户体验的敏锐洞察，能在任何新媒体或数字化营销岗位上持续创造更大规模与价值的增长，与优秀团队携手实现"品牌+业绩"双赢的可持续发展。
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section - 移动端优化 */}
      <section id="experience" ref={experienceRef} ref={expRefView} className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={expInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            className="mb-10 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 relative">
              <span className="bg-white h-0.5 w-12 md:w-16 absolute -bottom-3 left-0"></span>
              工作经历
            </h2>
          </motion.div>

          {/* 经验概览 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={expInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 md:mb-12"
          >
            <ExperienceOverview projects={15} onMouseEnter={handleLinkEnter} onMouseLeave={handleLinkLeave} />
          </motion.div>

          <div className="space-y-6 md:space-y-8">
            {experiences.map((exp, index) => (
              <ExperienceTimelineCard
                key={exp.id}
                experience={exp}
                index={index}
                isExpanded={expandedExperience === exp.id}
                toggleExpand={() => toggleExperience(exp.id)}
                isCurrent={exp.id === 1}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={expInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 md:mt-24"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 relative">
              <span className="bg-white h-0.5 w-12 md:w-16 absolute -bottom-3 left-0"></span>
              项目案例展示
            </h3>
            <ProjectGallery onMouseEnter={handleLinkEnter} onMouseLeave={handleLinkLeave} />
          </motion.div>
        </div>
      </section>

      {/* Education Section - 移动端优化 */}
      <section id="education" ref={educationRef} ref={eduRefView} className="py-16 md:py-24 bg-zinc-900">
        <div className="container mx-auto px-4 md:px-6">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={eduInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-4xl font-bold mb-10 md:mb-16 relative"
          >
            <span className="bg-white h-0.5 w-12 md:w-16 absolute -bottom-3 left-0"></span>
            教育背景
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={eduInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative education-card group bg-zinc-800/50 rounded-xl p-4 md:p-8 shadow-xl border border-zinc-700"
            onMouseEnter={() => handleLinkEnter()}
            onMouseLeave={handleLinkLeave}
          >
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="md:w-1/3">
                <h3 className="text-xl md:text-2xl font-bold text-white">天津传媒学院</h3>
                <p className="text-gray-400 mt-2 text-sm md:text-base">戏剧影视导演本科（统招全日制）</p>
                <div className="flex items-center text-gray-400 mt-3 md:mt-4 text-sm md:text-base">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>2018年09月 - 2022年06月</span>
                </div>
                <div className="mt-3 md:mt-4 p-2 md:p-3 bg-zinc-700/50 rounded-lg inline-block">
                  <p className="text-white font-medium text-sm md:text-base">均分：85.62/100</p>
                </div>
              </div>

              <div className="md:w-2/3">
                <div className="prose prose-invert max-w-none">
                  <div>
                    <h4 className="text-lg md:text-xl font-bold mb-3 md:mb-4 flex items-center">
                      <span className="bg-white h-4 md:h-6 w-1 mr-2 md:mr-3"></span>
                      主修科目
                    </h4>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                      戏剧影视导演，影视项目管理，影视预算与财务，影视市场营销，品牌管理与传播，网络影视内容策略，戏剧影视文学，戏剧影视美学，戏剧影视理论，艺术史，电影技术基础
                    </p>

                    <h4 className="text-lg md:text-xl font-bold mt-6 md:mt-8 mb-3 md:mb-4 flex items-center">
                      <span className="bg-white h-4 md:h-6 w-1 mr-2 md:mr-3"></span>
                      在校荣誉
                    </h4>
                    <ul className="space-y-2 md:space-y-3 text-gray-300 text-sm md:text-base">
                      <li className="flex items-start">
                        <Award className="h-4 w-4 md:h-5 md:w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          <span className="text-white font-medium">2022.8</span>{" "}
                          Google谷歌数字营销培养计划（99/120优秀）
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Award className="h-4 w-4 md:h-5 md:w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          <span className="text-white font-medium">2020.12</span> 香港当代设计奖铜奖
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Award className="h-4 w-4 md:h-5 md:w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          <span className="text-white font-medium">2020.8</span> 新加坡金沙艺术设计大赛银奖
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Award className="h-4 w-4 md:h-5 md:w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          <span className="text-white font-medium">2020.6</span> 2020 CADA国际概念设计奖银奖
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Full width video divider - 数据创新 - 移动端优化 */}
      <section className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10"></div>
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/videos/innovation-video.mp4" type="video/mp4" />
        </video>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="absolute inset-0 flex flex-col justify-center items-center px-4 md:px-16 lg:px-24 z-20"
        >
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tighter mb-4 md:mb-8 text-center">
            数据驱动创新
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl max-w-2xl text-center leading-relaxed">
            精准内容策略 + 数据驱动优化
            <br />
            <span className="text-white font-medium">持续提升社交媒体平台商业转化效率</span>
          </p>
        </motion.div>
      </section>

      {/* Contact Section - 移动端优化 */}
      <section id="contact" ref={contactRef} ref={contactRefView} className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-4xl font-bold mb-10 md:mb-16 relative"
          >
            <span className="bg-white h-0.5 w-12 md:w-16 absolute -bottom-3 left-0"></span>
            联系方式
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-8 md:gap-12"
          >
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">联系信息</h3>
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-center gap-3 md:gap-4"
                  onMouseEnter={() => handleLinkEnter("电话")}
                  onMouseLeave={handleLinkLeave}
                >
                  <div className="bg-zinc-800 p-2 md:p-3 rounded-full">
                    <Phone className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">电话</p>
                    <p className="text-lg md:text-xl">+86-13250535525</p>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-center gap-3 md:gap-4"
                  onMouseEnter={() => handleLinkEnter("邮件")}
                  onMouseLeave={handleLinkLeave}
                >
                  <div className="bg-zinc-800 p-2 md:p-3 rounded-full">
                    <Mail className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">电子邮件</p>
                    <p className="text-lg md:text-xl break-all">Yvankwok@yahoo.com</p>
                  </div>
                </motion.div>
              </div>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">发送邮件</h3>
              <form className="space-y-3 md:space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => handleLinkEnter("输入")}
                  onMouseLeave={handleLinkLeave}
                >
                  <input
                    type="text"
                    placeholder="您的姓名"
                    className="w-full p-3 bg-zinc-800 text-white border-none focus:ring-2 focus:ring-white/50 outline-none transition-all duration-300 text-sm md:text-base rounded-md"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => handleLinkEnter("输入")}
                  onMouseLeave={handleLinkLeave}
                >
                  <input
                    type="email"
                    placeholder="您的邮箱"
                    className="w-full p-3 bg-zinc-800 text-white border-none focus:ring-2 focus:ring-white/50 outline-none transition-all duration-300 text-sm md:text-base rounded-md"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => handleLinkEnter("输入")}
                  onMouseLeave={handleLinkLeave}
                >
                  <textarea
                    placeholder="您的留言"
                    rows={4}
                    className="w-full p-3 bg-zinc-800 text-white border-none focus:ring-2 focus:ring-white/50 outline-none transition-all duration-300 text-sm md:text-base rounded-md"
                  />
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-white text-black px-6 py-2 md:px-8 md:py-3 hover:bg-gray-200 transition-colors text-sm md:text-base rounded-md"
                  onMouseEnter={() => handleLinkEnter("发送")}
                  onMouseLeave={handleLinkLeave}
                >
                  发送
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer - 移动端优化 */}
      <footer className="py-8 md:py-12 bg-zinc-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm md:text-base">© {new Date().getFullYear()} 郭俊泽. 版权所有.</p>
            <div className="flex space-x-4 md:space-x-6 mt-4 md:mt-0">
              <motion.div
                whileHover={{ y: -5 }}
                onMouseEnter={() => handleLinkEnter("LinkedIn")}
                onMouseLeave={handleLinkLeave}
              >
                <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                  LinkedIn
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                onMouseEnter={() => handleLinkEnter("微信")}
                onMouseLeave={handleLinkLeave}
              >
                <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                  微信
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                onMouseEnter={() => handleLinkEnter("微博")}
                onMouseLeave={handleLinkLeave}
              >
                <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                  微博
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

