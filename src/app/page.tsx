'use client'

import Link from 'next/link'
import { Typewriter } from 'react-simple-typewriter'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './SwiperOverrides.css'; 

export default function HomePage() {

  const slideContent = [
    {
      image: "/images/contect2.jpg",
      title: "Crafting Modern Web Experiences",
      subtitle: "Responsive, fast, and scalable websites with Next.js & Tailwind CSS.",
      button1: { text: "View Projects", link: "/projects" },
      button2: { text: "Hire Me", link: "/contact" },
    },
    {
      image: "/images/contect2.jpg",
      title: "End-to-End Development",
      subtitle: "From frontend to backend — I build complete, robust solutions.",
      button1: { text: "My Services", link: "/services" },
      button2: { text: "Let’s Talk", link: "/contact" },
    },
    {
      image: "/images/contect2.jpg",
      title: "Optimized for Performance",
      subtitle: "Fast load times, SEO-ready, and accessible designs for all users.",
      button1: { text: "Explore Skills", link: "/about" },
      button2: { text: "See Resume", link: "/resume" },
    },
    {
      image: "/images/contect2.jpg",
      title: "Creative & Functional UI",
      subtitle: "Bringing ideas to life with elegant user interfaces.",
      button1: { text: "UI Showcase", link: "/projects" },
      button2: { text: "Start a Project", link: "/contact" },
    },
    {
      image: "/images/contect2.jpg",
      title: "Built with Latest Tech",
      subtitle: "React, Next.js, TypeScript, .NET, Firebase & more.",
      button1: { text: "Tech Stack", link: "/about" },
      button2: { text: "Request a Demo", link: "/contact" },
    },
    {
      image: "/images/contect2.jpg",
      title: "Let’s Build Something Great",
      subtitle: "Open to freelance, remote, and full-time opportunities.",
      button1: { text: "Let’s Collaborate", link: "/contact" },
      button2: { text: "Download Resume", link: "/resume" },
    },
  ];


  return (
    <>

      <div className="relative w-full h-[600px] mt-[100px]">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 10000 }}
          loop
          className="h-full w-full"
        >
          {slideContent.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                {/* Full-width background image */}
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover object-left md:object-center"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center md:justify-end px-4 md:px-10 py-6">
                  <div className="text-white w-full md:max-w-md text-center md:text-right space-y-4 overflow-hidden px-4 lg:px-0 lg:mx-[200px] ">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-snug">
                      {slide.title}
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                      {slide.subtitle}
                    </p>
                    <div className="flex flex-row flex-wrap justify-center md:justify-end gap-4">
                      <a
                        href={slide.button1.link}
                        className="bg-purple px-5 py-3 bg-secondary text-black hover:bg-gray-200 rounded-full font-semibold text-sm"
                      >
                        {slide.button1.text}
                      </a>
                      <a
                        href={slide.button2.link}
                        className="px-5 py-3 bg-white text-black hover:bg-gray-200 rounded-full font-semibold text-sm"
                      >
                        {slide.button2.text}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <main className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-12 py-12 sm:py-20 mt-[-100px]">
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
    </>
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