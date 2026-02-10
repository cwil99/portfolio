import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-slate-700 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900 dark:text-white">Caulton (CJ) Wilson</span>
          <div className="flex gap-6">
            <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">About</a>
            <a href="#projects" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Projects</a>
            <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Hi, I'm Caulton (CJ) Wilson
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {/* Add your bio here */}
              Welcome to my portfolio. I am a software engineer, computer science student, and enthusiastic learner. I want to improve my coding skills, create robust and powerful applications, and make my mark on the software world.
            </p>
            <div className="flex gap-4">
              <a
                href="#projects"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gray-50 dark:bg-slate-800/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">About Me</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="indent-12 text-gray-600 dark:text-gray-300">
              {/* Add your detailed bio here */}
              I'm a young professional from Alexandria, Virginia. I graduated high school from Thomas Jefferson High School S&T. I completed an Associate's Degree from Northern Virginia Community College, and am currently pursuing my bachelor's degree at George Mason University. I love solving problems and creating things with code. I love to learn both inside and outside of the classroom. My fantasy football compare tool, as well as this website have been avenues for me to learn and grow my software development skills. My classroom coding experience has largely been Java and C. I have spent time personally learning Python, Typescript and Javascript as well as learning to use tools like git, Claude Code, Vercel, and PostgresSQL. 
              
            </p>
            <p className="indent-12 text-gray-600 dark:text-gray-300">
              {/* Add your detailed bio here */}
              My work experience consists of year in high volume resturants, as well as 3 years as an Elementary School Special Education Assistant. Both industries, service and education, have taught me valuble lessons in collaboration, handling conflict, and handling pressure. I have mastered the skills of rapid problem solving, and finding creative solutions to meet the needs of those around me though my years in service and education.
            </p>
            <p className="indent-12 text-gray-600 dark:text-gray-300">
              {/* Add your detailed bio here */}
              In my free time, I love to watch sports, play golf, and spend time with my friends and family. I enjoy traveling anywhere I can meet new people or spend time with old friends. 
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Fantasy Football Compare Project */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🏈</span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Fantasy Football Compare
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Compare NFL players and predict fantasy points for the upcoming week. Built with Next.js, TypeScript, and Tailwind CSS.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full">Next.js</span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full">TypeScript</span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full">Tailwind</span>
                </div>
                <Link
                  href="/fantasy-football-compare"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                  View Project
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Placeholder for future projects */}
            <div className="bg-gray-100 dark:bg-slate-800/50 rounded-xl border-2 border-dashed border-gray-300 dark:border-slate-600 p-6 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400 text-center">
                More projects coming soon...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gray-50 dark:bg-slate-800/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Get in Touch</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Feel free to reach out if you'd like to connect or collaborate.
          </p>
          <div className="flex gap-4">
            {/* Add your contact links here */}
            <a
              href="mailto:caultonwilson@gmail.com"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </a>
            <a
              href="https://github.com/cjwil99"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200 dark:border-slate-700">
        <div className="max-w-5xl mx-auto text-center text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Caulton (CJ) Wilson.</p>
        </div>
      </footer>
    </div>
  );
}
