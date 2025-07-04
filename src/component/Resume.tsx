'use client'

export default function ResumePage() {
  return (
    <main className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 min-h-screen py-20 px-6 md:px-12 pt-35 flex justify-center">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-10">
        <h1 className="text-4xl font-extrabold text-violet-600 mb-4 text-center">
          My Resume
        </h1>



        {/* Education */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Education</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <strong>Bachelor of Computer Science</strong> — University XYZ, 2015 - 2019
            </li>
            <li>
              <strong>Full Stack Development Bootcamp</strong> — Online Course, 2020
            </li>
          </ul>
        </section>

        {/* Skills */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {[
              'React',
              'Next.js',
              'TypeScript',
              'Tailwind CSS',
              'Node.js',
              '.NET',
              'SQL',
              'MongoDB',
              'Docker',
              'Git',
            ].map(skill => (
              <span
                key={skill}
                className="bg-violet-100 text-violet-800 rounded-full py-2 px-4 font-semibold text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Work Experience */}
        <section>
          <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Work Experience</h2>
          <div className="space-y-8">
            <JobItem
              role="Senior Developer"
              company="Awesome Company"
              period="2023 - Present"
              description="Leading web app projects using React, Next.js, and .NET Core."
            />
            <JobItem
              role="Full-stack Developer"
              company="Tech Solutions"
              period="2020 - 2023"
              description="Built scalable applications and APIs with Node.js and .NET."
            />
            <JobItem
              role="Junior Developer"
              company="Startup Inc."
              period="2018 - 2020"
              description="Worked on frontend features with React and backend APIs."
            />
          </div><br /><br />
          <div>{/* Download Resume Button */}
            <div className="flex justify-center mb-10">
              <a
                href="/resume.pdf"
                download
                className="inline-block bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition transform hover:scale-105"
              >
                Download Resume (PDF)
              </a>
            </div></div>
        </section>
      </div>
    </main>

  )
}

function JobItem({
  role,
  company,
  period,
  description,
}: {
  role: string
  company: string
  period: string
  description: string
}) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-violet-600">{role}</h3>
      <p className="text-indigo-800 font-medium">{company} | {period}</p>
      <p className="text-gray-700 mt-2">{description}</p>
    </div>
  )
}
