"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { Calendar, Download, Filter, Search, Users } from "lucide-react"
import Link from "next/link"

interface DashboardCardProps {
  title: string
  value: string
  label: string
  growth: string
  amount: string
}
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      duration: 1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function DashboardCards({
}: DashboardCardProps) {
  return (


    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-12"
    >
      <h1 className="font-medium text-2xl mt-10 text-gray-800 font-bold">DASHBOARD</h1>
      <div className="flex gap-8 items-center">
        <div className="flex items-center gap-2">
          <p className="text-3xl font-semibold">231</p>
          <p className="text-gray-800">All Clients</p>
          <span className="text-green-600 bg-green-100 text-xs px-2 py-1 rounded-full flex items-center">
            3
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-up-short" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5" />
            </svg>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-3xl font-semibold">11</p>
          <p className="text-gray-800">New Clients</p>
          <span className="text-green-600 bg-green-100 text-xs px-2 py-1 rounded-full flex items-center">
            3 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-up-short" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5" />
            </svg>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-3xl font-semibold">123</p>
          <p className="text-gray-800">Active Clients</p>
          <span className="text-green-600 bg-green-100 text-xs px-2 py-1 rounded-full flex items-center">
            3 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-up-short" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5" />
            </svg>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <motion.div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100 w-lg" variants={itemVariants}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">Revenue</h2>
            <button className="text-gray-500">⋮</button>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900 mb-3">$2.4 M</p>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-green-600 text-sm font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-arrow-up-short" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5" />
                  </svg>40%</span>
                <span className="text-gray-600 text-sm">this month</span>
              </div>
            </div>
            <Image
              src="/dashboard_graph.png"
              alt="Dashboard Graph"
              width={128}
              height={64}
              className="object-contain"
            />
          </div>
        </motion.div>
        <motion.div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100 w-lg" variants={itemVariants}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">Expenses</h2>
            <button className="text-gray-500">⋮</button>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-3xl font-bold mb-3">$1.5 M</p>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-green-600 text-sm font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-arrow-up-short" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5" />
                  </svg>25%</span>
                <span className="text-gray-600 text-sm">this month</span>
              </div>
            </div>
            <Image
              src="/dashboard_graph.png"
              alt="Dashboard Graph"
              width={128}
              height={64}
              className="object-contain"
            />
          </div>
        </motion.div>
        <motion.div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100 w-lg" variants={itemVariants}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">Profit</h2>
            <button className="text-gray-00">⋮</button>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-3xl font-bold mb-3">$900 K</p>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-green-600 text-sm font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-arrow-up-short" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5" />
                  </svg>15%</span>
                <span className="text-gray-600 text-sm">this month</span>
              </div>
            </div>
            <Image
              src="/dashboard_graph.png"
              alt="Dashboard Graph"
              width={128}
              height={64}
              className="object-contain"
            />
          </div>
        </motion.div>
      </div>
       <div className="flex items-center gap-5">
        <motion.div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100 w-lg" variants={itemVariants}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">Revenue</h2>
            <button className="text-gray-500">⋮</button>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900 mb-3">$2.4 M</p>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-green-600 text-sm font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-arrow-up-short" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5" />
                  </svg>40%</span>
                <span className="text-gray-600 text-sm">this month</span>
              </div>
            </div>
            <Image
              src="/dashboard_graph.png"
              alt="Dashboard Graph"
              width={128}
              height={64}
              className="object-contain"
            />
          </div>
        </motion.div>
        <motion.div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100 w-lg" variants={itemVariants}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">Expenses</h2>
            <button className="text-gray-500">⋮</button>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-3xl font-bold mb-3">$1.5 M</p>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-green-600 text-sm font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-arrow-up-short" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5" />
                  </svg>25%</span>
                <span className="text-gray-600 text-sm">this month</span>
              </div>
            </div>
            <Image
              src="/dashboard_graph.png"
              alt="Dashboard Graph"
              width={128}
              height={64}
              className="object-contain"
            />
          </div>
        </motion.div>
        <motion.div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100 w-lg" variants={itemVariants}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">Profit</h2>
            <button className="text-gray-00">⋮</button>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-3xl font-bold mb-3">$900 K</p>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-green-600 text-sm font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-arrow-up-short" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5" />
                  </svg>15%</span>
                <span className="text-gray-600 text-sm">this month</span>
              </div>
            </div>
            <Image
              src="/dashboard_graph.png"
              alt="Dashboard Graph"
              width={128}
              height={64}
              className="object-contain"
            />
          </div>
        </motion.div>
      </div>


    </motion.div>

  )
}
