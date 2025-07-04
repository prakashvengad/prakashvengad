'use client'

import Image from 'next/image'

export default function AboutPage() {
  return (
    <main className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 min-h-screen bg-gray-50 py-20 px-6 pt-35 md:px-12 flex justify-center">
      <div className="max-w-5xl w-full bg-white rounded-lg shadow-md p-10">
        <h1 className="text-4xl font-extrabold text-violet-600 mb-8 text-center">
          About Me
        </h1>

        <section className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-10">
          {/* Photo */}
          <div className="flex-shrink-0 rounded-full overflow-hidden w-48 h-48 shadow-lg mx-auto md:mx-0">
            <Image
              src="/assets/img/profile.jpg"
              alt="Your Name"
              width={192}
              height={192}
              className="object-cover"
              priority
            />
          </div>

          {/* Bio */}
          <div className="max-w-xl text-gray-700 text-lg leading-relaxed">
            <p>
              Hello! I&apos;m <strong className="text-violet-600">Your Name</strong>, a passionate full-stack developer with over X years of experience building modern and scalable web applications.
            </p>
            <p className="mt-4">
              I enjoy turning complex problems into simple, beautiful, and intuitive designs. My goal is to deliver high-quality software that improves people&apos;s lives.
            </p>
            <p className="mt-4">
              When I&apos;m not coding, I love exploring new technologies, contributing to open-source, and learning about design and UX.
            </p>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-violet-600 mb-4">Skills</h2>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700">
            {[
              'React',
              'Next.js',
              'TypeScript',
              'Tailwind CSS',
              'Node.js',
              'Express',
              '.NET',
              'SQL',
              'MongoDB',
              'Git',
              'Docker',
              'Jest',
            ].map(skill => (
              <li
                key={skill}
                className="bg-violet-100 text-violet-800 rounded-full py-2 px-4 text-center font-medium"
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>

        {/* Experience Timeline */}
        <section>
          <h2 className="text-2xl font-semibold text-violet-600 mb-6 text-center">
            Experience
          </h2>

          <div className="relative border-l-2 border-violet-300 ml-6">
            {[
              {
                year: '2023 - Present',
                role: 'Senior Developer at Awesome Company',
                desc: 'Leading frontend and backend projects with React, Next.js, and .NET Core.',
              },
              {
                year: '2020 - 2023',
                role: 'Full-stack Developer at Tech Solutions',
                desc: 'Built scalable web applications and APIs, implemented CI/CD pipelines.',
              },
              {
                year: '2018 - 2020',
                role: 'Junior Developer at Startup Inc.',
                desc: 'Contributed to product development using React and Node.js.',
              },
            ].map(({ year, role, desc }, idx) => (
              <div
                key={idx}
                className="mb-8 ml-6 relative"
              >
                <span className="absolute -left-9 top-2 w-6 h-6 bg-violet-600 rounded-full border-4 border-white"></span>
                <time className="text-sm font-semibold text-violet-700">{year}</time>
                <h3 className="text-lg font-semibold text-gray-900 mt-1">{role}</h3>
                <p className="text-gray-700 mt-2">{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
