'use client'

import { Facebook, Instagram, Linkedin, Github, Mail } from 'lucide-react'
import React, { useState } from 'react'

// Custom placeholder SVG icons for Indeed and Nacreen
const IndeedIcon = () => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
  >
    <title>Indeed</title>
    <circle cx="12" cy="12" r="10" />
  </svg>
)

const NacreenIcon = () => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
  >
    <title>Nacreen</title>
    <rect width="20" height="20" x="2" y="2" rx="4" />
  </svg>
)

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log('Subscribed with email:', email)
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <footer className="bg-violet-600 text-white py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          {/* Newsletter Section */}
          <div className="w-full lg:w-1/3">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Mail size={20} /> Newsletter
            </h3>
            <p className="text-violet-100 mb-4">
              Subscribe to our newsletter for the latest updates.
            </p>
            {subscribed ? (
              <div className="bg-green-500 text-white p-3 rounded-md">
                Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="bg-white flex-grow px-4 py-2 rounded-md text-gray-800 border border-white focus:outline-none focus:ring-2 focus:ring-violet-300"
                  required
                />
                <button
                  type="submit"
                  className="bg-white text-violet-600 px-4 py-2 rounded-md font-medium hover:bg-violet-100 transition whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

          {/* Social Links Section */}
          <div className="w-full lg:w-2/3">
            <div className="text-lg font-semibold mb-4">Connect With Me</div>
            <div className="flex flex-wrap gap-4 sm:gap-6 justify-start lg:justify-end">
              <SocialLink
                href="https://www.facebook.com/share/19iV5TEs4J/"
                label="Facebook"
                icon={<Facebook size={20} />}
              />
              <SocialLink
                href="https://www.google.com"
                label="Instagram"
                icon={<Instagram size={20} />}
              />
              <SocialLink
                href="https://www.linkedin.com/in/prakash-software-engineer-083b18256?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                label="LinkedIn"
                icon={<Linkedin size={20} />}
              />
              <SocialLink
                href="https://www.google.com"
                label="GitHub"
                icon={<Github size={20} />}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-violet-500 text-center text-sm text-violet-200">
          © {new Date().getFullYear()} MyPortfolio. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

interface SocialLinkProps {
  href: string
  label: string
  icon: React.ReactNode
}

function SocialLink({ href, label, icon }: SocialLinkProps) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-gray-300 transition flex items-center gap-2 p-2 sm:p-0"
    >
      {icon}
      <span className="text-sm sm:hidden">{label}</span>
    </a>
  )
}