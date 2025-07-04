'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  const isActive = (path: string) => pathname === path

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 45)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-violet-700 shadow-lg' : 'bg-violet-600'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 py-4 text-white">
        {/* Logo */}
        <Link href="/">
          <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
            <Image
              src="/images/iconlogo.png"
              alt="Logo"
              width={80}
              height={80}
              priority
            />
          </motion.div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8 items-center font-medium text-white">
          {[
            { href: '/', label: 'Home' },
            { href: '/about', label: 'About' },
            { href: '/projects', label: 'Projects' },
            { href: '/blog', label: 'Blog' },
            { href: '/resume', label: 'Resume' },
            { href: '/contact', label: 'Contact' },
          ].map(({ href, label }) => (
            <NavLink key={href} href={href} label={label} active={isActive(href)} />
          ))}
        </nav>

        {/* CTA Button */}
        <Link
          href="/contact"
          className="hidden md:inline-block rounded-full bg-white py-2 px-6 font-semibold text-violet-600 hover:bg-gray-100 transition"
        >
          Get Start
        </Link>
      </div>
    </motion.header>
  )
}

interface NavLinkProps {
  href: string
  label: string
  active: boolean
}

const NavLink = ({ href, label, active }: NavLinkProps) => {
  return (
    <Link href={href} className="relative group">
      <span
        className={`relative z-10 transition-colors duration-300 ${
          active ? 'text-white font-semibold' : 'text-white/80'
        } group-hover:text-white`}
      >
        {label}
      </span>
      {/* Underline effect */}
      <span
        className={`
          absolute left-0 -bottom-1 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full
          ${active ? 'w-full' : 'w-0'}
        `}
      />
    </Link>
  )
}
