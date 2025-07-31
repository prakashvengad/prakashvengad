'use client'

import Link from 'next/link'
import { Typewriter } from 'react-simple-typewriter'
import { motion } from 'framer-motion'
import AboutSection from '@/component/AboutSection'

export default function HomePage() {
  return (
    <main className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-12 py-12 sm:py-20">
      <section className="max-w-4xl w-full">

        {/* Animated Heading */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full mb-4 sm:mb-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-violet-600 leading-tight">
            <span className="inline-block">Hi, I&apos;m </span>
            <span className="inline-block text-indigo-900 bg-transparent px-0">Prakash V</span>
          </h1>
        </motion.div>

        {/* Typing Effect Intro */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 sm:mb-12 min-h-[60px] sm:min-h-[40px] flex items-center justify-center"
        >
          <Typewriter
            words={[
              'Full-Stack Developer.',
              'React & Next.js Enthusiast.',
              'Creating beautiful web apps.',
              'Always learning something new.',
              '.Net Developer',
              'SiteCore Expert',
            ]}
            loop={0} // infinite loop
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </motion.div>

        {/* Buttons with hover scale */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-5 mb-12 sm:mb-16"
        >
          <Link
            href="/projects"
            className="bg-violet-600 hover:bg-violet-700 text-white py-2 sm:py-3 px-6 sm:px-8 rounded-lg font-semibold transition transform hover:scale-105 text-sm sm:text-base"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="border-2 border-violet-600 hover:border-violet-700 text-violet-600 hover:text-violet-700 py-2 sm:py-3 px-6 sm:px-8 rounded-lg font-semibold transition transform hover:scale-105 text-sm sm:text-base"
          >
            Contact Me
          </Link>
        </motion.div>

        {/* Skill Cards with staggered fade in */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-left"
        >
          {[
            { title: 'Frontend', description: 'React, Next.js, Tailwind CSS, JavaScript, TypeScript' },
            { title: 'Backend', description: 'Node.js, Express, .NET, SQL, MongoDB' },
            { title: 'Tools', description: 'Git, Docker, CI/CD, VS Code, Jest' },
          ].map(({ title, description }, idx) => (
            <SkillCard key={idx} title={title} description={description} />
          ))}
        </motion.section>
      </section>
    </main>
  )
}

const SkillCard = ({ title, description }: { title: string; description: string }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-xl transition cursor-default"
    >
      <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-violet-600">{title}</h3>
      <p className="text-sm sm:text-base text-gray-700">{description}</p>
    </motion.div>
  )
}