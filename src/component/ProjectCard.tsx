'use client'

const projects = [
  {
    id: '1',
    title: 'Portfolio Website',
    description: 'My personal portfolio built with Next.js, Tailwind CSS, and React.',
    tech: ['Next.js', 'React', 'Tailwind CSS'],
    liveUrl: 'https://yourportfolio.com',
    repoUrl: 'https://github.com/yourusername/portfolio',
  },
  {
    id: '2',
    title: 'E-commerce App',
    description: 'A full-stack e-commerce application with user authentication and payments.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    liveUrl: '',
    repoUrl: 'https://github.com/yourusername/ecommerce-app',
  },
  {
    id: '3',
    title: 'Blog Platform',
    description: 'A simple blogging platform with markdown support and rich text editing.',
    tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    liveUrl: 'https://yourblogplatform.com',
    repoUrl: '',
  },
]

export default function ProjectsPage() {
  return (
    <main className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 min-h-screen bg-gray-50 py-20 pt-35 px-6 md:px-12">
      <h1 className="text-4xl font-extrabold text-violet-600 mb-12 text-center">Projects</h1>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map(({ id, title, description, tech, liveUrl, repoUrl }) => (
          <div
            key={id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition"
          >
            <h2 className="text-2xl font-semibold text-indigo-700 mb-2">{title}</h2>
            <p className="text-gray-700 mb-4">{description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {tech.map(t => (
                <span
                  key={t}
                  className="bg-violet-100 text-violet-800 rounded-full py-1 px-3 font-semibold text-xs"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-600 hover:underline font-semibold"
                >
                  Live Demo
                </a>
              )}
              {repoUrl && (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-600 hover:underline font-semibold"
                >
                  Source Code
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
