'use client'

import Link from 'next/link'

const posts = [
  {
    id: '1',
    title: 'How to Build a Next.js Portfolio',
    date: '2024-01-15',
    summary: 'Step-by-step guide on creating a portfolio website using Next.js and Tailwind CSS.',
  },
  {
    id: '2',
    title: 'Understanding React Hooks',
    date: '2023-12-05',
    summary: 'An introduction to React Hooks and how they can simplify your components.',
  },
  {
    id: '3',
    title: 'Deploying Next.js Apps with Vercel',
    date: '2023-11-20',
    summary: 'A quick tutorial on deploying your Next.js applications to Vercel seamlessly.',
  },
]

export default function BlogPage() {
  return (
    <main className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 min-h-screen bg-gray-50 py-20 pt-35 px-6 md:px-12">
      <h1 className="text-4xl font-extrabold text-violet-600 mb-12 text-center">Blog</h1>

      <div className="max-w-4xl mx-auto space-y-10">
        {posts.map(post => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition cursor-pointer"
          >
            <Link href={`/blog/${post.id}`}>
              <h2 className="text-2xl font-semibold text-indigo-700 mb-2">{post.title}</h2>
              <p className="text-gray-500 text-sm mb-3">{new Date(post.date).toLocaleDateString()}</p>
              <p className="text-gray-700">{post.summary}</p>
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}
