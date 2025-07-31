'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface HeaderProps {
  bgTransparent?: boolean
  isOverlay?: boolean
}

export default function Header({ bgTransparent = true, isOverlay = false }: HeaderProps) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 45)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (

    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`transition-colors duration-300 z-50 w-full ${isOverlay ? 'absolute top-0' : 'fixed top-0'
        } ${isScrolled
          ? 'bg-violet-700 shadow-lg'
          : bgTransparent
            ? 'bg-transparent'
            : 'bg-violet-600'
        }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 py-4 text-white">

        <Link
          href="/contact"
          className="hidden md:inline-block rounded-full bg-white py-2 px-6 font-semibold text-violet-600 hover:bg-gray-100 transition"
        >
          Get Start
        </Link>

        {/* Desktop Navigation */}
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
        {/* Search bar (visible on desktop only) */}
        <div className="hidden md:flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search..."
            className="bg-white rounded-full px-4 py-1 text-sm text-gray-800 focus:outline-none"
          />
          <button className="text-white hover:text-gray-200">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
              />
            </svg>
          </button>
        </div>


        {/* Desktop CTA Button */}


        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-white focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4 bg-violet-700">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About' },
                { href: '/projects', label: 'Projects' },
                { href: '/blog', label: 'Blog' },
                { href: '/resume', label: 'Resume' },
                { href: '/contact', label: 'Contact' },
              ].map(({ href, label }) => (
                <MobileNavLink key={href} href={href} label={label} active={isActive(href)} />
              ))}
              <Link
                href="/contact"
                className="block w-full text-center rounded-full bg-white py-2 px-6 font-semibold text-violet-600 hover:bg-gray-100 transition"
              >
                Get Start
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
        className={`relative z-10 transition-colors duration-300 ${active ? 'text-white font-semibold' : 'text-white/80'
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

const MobileNavLink = ({ href, label, active }: NavLinkProps) => {
  return (
    <Link href={href}>
      <div
        className={`block px-4 py-3 rounded-lg transition-colors duration-300 ${active ? 'bg-violet-600 text-white font-semibold' : 'text-white/90 hover:bg-violet-600'
          }`}
      >
        {label}
      </div>
    </Link>
  )
}