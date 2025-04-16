"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"

interface TeamMemberProps {
  name: string
  rollNo: string
  role: string
  description: string
  photo: string
  skills: string[]
  icon: LucideIcon
  gradient: string
  socialLinks: {
    github: string
    linkedin: string
    email: string
  }
  index: number
}

export default function TeamMemberCard({
  name,
  rollNo,
  role,
  description,
  photo,
  skills,
  icon: Icon,
  gradient,
  socialLinks,
  index,
}: TeamMemberProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-gradient-to-br from-[#12121a] to-[#1a1a2e] rounded-2xl overflow-hidden border border-gray-800/50"
    >
      {/* Glow effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 transition-all duration-500`}
      />

      {/* Member Photo */}
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20`} />
        <Image
          src={photo || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            const target = e.target as HTMLImageElement
            target.src = `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(name)}`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-gray-400">{rollNo}</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
              {name}
            </h3>
            <p className="text-sm text-blue-400 mt-1">{role}</p>
            <p className="text-sm text-gray-400 mt-2">{description}</p>
          </div>
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} bg-opacity-10`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Skills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.slice(0, 3).map((skill) => (
            <span key={skill} className="inline-block px-2 py-1 text-xs rounded-md bg-gray-800/50 text-gray-300">
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="inline-block px-2 py-1 text-xs rounded-md bg-gray-800/50 text-gray-300">
              +{skills.length - 3} more
            </span>
          )}
        </div>

        {/* Social Links */}
        <div className="mt-6 pt-4 border-t border-gray-800/50 flex items-center justify-between">
          <div className="flex space-x-3">
            <Link href={socialLinks.github} className="text-gray-400 hover:text-white transition-colors">
              <Github className="w-4 h-4" />
            </Link>
            <Link href={socialLinks.linkedin} className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="w-4 h-4" />
            </Link>
            <Link href={socialLinks.email} className="text-gray-400 hover:text-white transition-colors">
              <Mail className="w-4 h-4" />
            </Link>
          </div>
          <span className="text-xs text-gray-500">Team Member</span>
        </div>

        {/* Interactive hover effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />
      </div>
    </motion.div>
  )
}
