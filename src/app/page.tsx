'use client'

import Link from 'next/link'
import { Typewriter } from 'react-simple-typewriter'
import { motion } from 'framer-motion'
import AboutSection from '@/component/AboutSection'

export default function HomePage() {
  return (
    <main className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 min-h-screen bg-gray-50 flex flex-col justify-center items-center text-center px-6 md:px-12 py-20">
      <section className="max-w-4xl">

        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold text-violet-600 mb-6"
        >
          Hi, I&apos;m <span className="text-indigo-900">Prakash v</span>
        </motion.h1>

        {/* Typing Effect Intro */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-lg md:text-xl text-gray-700 mb-12 min-h-[40px]"
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
          className="flex flex-col sm:flex-row justify-center gap-5 mb-16"
        >
          <Link
            href="/projects"
            className="bg-violet-600 hover:bg-violet-700 text-white py-3 px-8 rounded-lg font-semibold transition transform hover:scale-105"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="border-2 border-violet-600 hover:border-violet-700 text-violet-600 hover:text-violet-700 py-3 px-8 rounded-lg font-semibold transition transform hover:scale-105"
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
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
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition cursor-default"
    >
      <h3 className="text-xl font-semibold mb-3 text-violet-600">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </motion.div>
  )
} 