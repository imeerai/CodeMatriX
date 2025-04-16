"use client"

import { motion } from "framer-motion"
import { Code, Github, Linkedin, Mail, Server, Globe, Rocket } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import NavigationHeader from "@/components/NavigationHeader"

const teamMembers = [
  {
    name: "Zameer Abbas",
    rollNo: "22CS078",
    role: "Backend & Database",
    description: "Responsible for Convex, APIs, and Authentication",
    photo: "/zameer.jpg", // Replace with actual photo path
    skills: ["Convex", "Node.js", "Authentication", "API Development", "Database Design"],
    icon: Server,
    gradient: "from-blue-500 to-cyan-500",
    socialLinks: {
      github: "https://github.com/imeerai",
      linkedin: "https://linkedin.com/in/",
      email: "mailto:abbaszameer234@gmail.com",
    },
  },
  {
    name: "Anaz Arain",
    rollNo: "22CS074",
    role: "Frontend Development",
    description: "Specializes in Next.js, UI/UX, and Tailwind CSS",
    photo: "/anaz.jpg", // Replace with actual photo path
    skills: ["Next.js", "React", "Tailwind CSS", "UI/UX Design", "Responsive Design"],
    icon: Globe,
    gradient: "from-purple-500 to-pink-500",
    socialLinks: {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/in/",
      email: "mailto:anaz@example.com",
    },
  },
  {
    name: "Alishba Choti",
    rollNo: "22CS040",
    role: "Integrations & Deployment",
    description: "Handles Webhooks, Payment systems, and Hosting",
    photo: "/alishba.jpg", // Replace with actual photo path
    skills: ["Webhooks", "Payment Integration", "Cloud Hosting", "CI/CD", "DevOps"],
    icon: Rocket,
    gradient: "from-yellow-500 to-orange-500",
    socialLinks: {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/in/",
      email: "mailto:alishba@example.com",
    },
  },
]

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <NavigationHeader />

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 md:py-12">
        {/* Team Header */}
        <div className="relative mb-8 bg-gradient-to-br from-[#12121a] to-[#1a1a2e] rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-800/50 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px]" />
          <div className="relative">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="inline-block rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-400 mb-2">
                Our Team
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Meet the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Developers
                </span>
              </h1>
              <p className="max-w-2xl text-gray-400 text-sm sm:text-base md:text-lg">
                Our talented team of developers working together to create amazing experiences. Each member brings
                unique skills and expertise to the project.
              </p>
            </div>

            <div className="mt-6 md:mt-8 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl p-4 text-center">
                  <h3 className="text-xl font-semibold text-white mb-1">Backend</h3>
                  <p className="text-gray-400 text-sm">APIs & Database</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-xl p-4 text-center">
                  <h3 className="text-xl font-semibold text-white mb-1">Frontend</h3>
                  <p className="text-gray-400 text-sm">UI/UX & Design</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 rounded-xl p-4 text-center">
                  <h3 className="text-xl font-semibold text-white mb-1">DevOps</h3>
                  <p className="text-gray-400 text-sm">Deployment & Integration</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.rollNo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-gradient-to-br from-[#12121a] to-[#1a1a2e] rounded-2xl overflow-hidden border border-gray-800/50"
            >
              {/* Glow effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${member.gradient} opacity-0 group-hover:opacity-10 transition-all duration-500`}
              />

              {/* Member Photo */}
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-20`} />
                <Image
                  src={member.photo || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    const target = e.target as HTMLImageElement
                    target.src = `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(member.name)}`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-400">{member.rollNo}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm text-blue-400 mt-1">{member.role}</p>
                    <p className="text-sm text-gray-400 mt-2">{member.description}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${member.gradient} bg-opacity-10`}>
                    <member.icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Skills */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {member.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="inline-block px-2 py-1 text-xs rounded-md bg-gray-800/50 text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                  {member.skills.length > 3 && (
                    <span className="inline-block px-2 py-1 text-xs rounded-md bg-gray-800/50 text-gray-300">
                      +{member.skills.length - 3} more
                    </span>
                  )}
                </div>

                {/* Social Links */}
                <div className="mt-6 pt-4 border-t border-gray-800/50 flex items-center justify-between">
                  <div className="flex space-x-3">
                    <Link href={member.socialLinks.github} className="text-gray-400 hover:text-white transition-colors">
                      <Github className="w-4 h-4" />
                    </Link>
                    <Link
                      href={member.socialLinks.linkedin}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </Link>
                    <Link href={member.socialLinks.email} className="text-gray-400 hover:text-white transition-colors">
                      <Mail className="w-4 h-4" />
                    </Link>
                  </div>
                  <span className="text-xs text-gray-500">Team Member</span>
                </div>

                {/* Interactive hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Stats */}
        <div className="bg-gradient-to-br from-[#12121a] to-[#1a1a2e] rounded-2xl p-6 md:p-8 border border-gray-800/50 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-black/20">
              <Code className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="text-2xl font-bold text-white">3</h3>
              <p className="text-gray-400 text-sm">Team Members</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-black/20">
              <Server className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="text-2xl font-bold text-white">15+</h3>
              <p className="text-gray-400 text-sm">Technologies</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-black/20">
              <Rocket className="w-8 h-8 text-orange-400 mb-3" />
              <h3 className="text-2xl font-bold text-white">100%</h3>
              <p className="text-gray-400 text-sm">Commitment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
