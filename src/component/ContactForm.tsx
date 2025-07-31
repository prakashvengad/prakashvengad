'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { db } from '@/app/firebase/confic'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [status, setStatus] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.name || !form.email || !form.message) {
      setStatus('Please fill in all required fields.')
      return
    }

    setStatus('Sending...')

    try {
      // First store in Firestore
      await addDoc(collection(db, 'contacts'), {
        ...form,
        createdAt: serverTimestamp(),
        status: 'submitted'
      })

      // Then send email via API route
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('Message sent! Thank you.')
        setForm({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setStatus(''), 4000)
      } else {
        setStatus('Message saved but email failed. We\'ll contact you soon.')
      }
    } catch (err) {
      console.error(err)
      setStatus('Something went wrong. Please try again.')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 flex items-center justify-center px-6 py-16 sm:py-24">
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-7xl w-full bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden"
      >
        {/* Left side */}
        <div className="md:w-1/2 bg-gradient-to-tr from-indigo-600 to-purple-700 text-white p-12 flex flex-col justify-center">
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            Get in Touch
          </h1>
          <p className="text-lg opacity-90 max-w-md">
            Have questions or want to work together? Fill out the form and I&apos;ll get back to you shortly.
          </p>
          <img
            src="/images/contect2.jpg"
            alt="Contact illustration"
            className="mt-auto hidden md:block max-w-xs mx-auto"
          />
        </div>

        {/* Right side */}
        <div className="md:w-1/2 p-10 sm:p-16 bg-white">
          <form onSubmit={handleSubmit} className="space-y-8">
            {['name', 'email', 'subject'].map((field) => (
              <LandingInput
                key={field}
                name={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                required={field !== 'subject'}
                value={form[field as keyof typeof form]}
                onChange={handleChange}
                type={field === 'email' ? 'email' : 'text'}
                placeholder={
                  field === 'name'
                    ? 'Your full name'
                    : field === 'email'
                    ? 'you@example.com'
                    : 'Subject (optional)'
                }
              />
            ))}

            <LandingTextarea
              name="message"
              label="Message"
              required
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message here..."
            />

            <motion.button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:bg-indigo-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>

            <AnimatePresence>
              {status && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className={`mt-6 text-center font-medium select-none ${
                    status.includes('Thank you') 
                      ? 'text-green-600' 
                      : status.includes('failed') 
                        ? 'text-amber-600' 
                        : 'text-indigo-700'
                  }`}
                >
                  {status}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </div>
      </motion.section>
    </main>
  )
}

interface LandingInputProps {
  name: string
  label: string
  required?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  placeholder?: string
}

const LandingInput = ({
  name,
  label,
  required = false,
  value,
  onChange,
  type = 'text',
  placeholder,
}: LandingInputProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-3 font-semibold text-gray-900">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="rounded-lg border border-gray-300 px-5 py-3 placeholder-gray-400
          focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-50
          transition-shadow duration-300 text-gray-900" // Added text-gray-900 for black text
        autoComplete="off"
      />
    </div>
  )
}

interface LandingTextareaProps {
  name: string
  label: string
  required?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
}

const LandingTextarea = ({
  name,
  label,
  required = false,
  value,
  onChange,
  placeholder,
}: LandingTextareaProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-3 font-semibold text-gray-900">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        rows={5}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="rounded-lg border border-gray-300 px-5 py-3 placeholder-gray-400
          focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-50
          transition-shadow duration-300 resize-none text-gray-900" // Added text-gray-900 for black text
      />
    </div>
  )
}