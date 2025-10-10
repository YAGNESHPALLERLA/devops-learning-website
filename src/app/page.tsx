// src/app/page.tsx
import Link from 'next/link';

// Define the props interface for TechnologyCard
interface TechnologyCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
  color: string;
}

// Technology card component
function TechnologyCard({ title, description, icon, link, color }: TechnologyCardProps) {
  return (
    <Link href={link} className="block group focus:outline-none focus:ring-2 focus:ring-gray-400/50 rounded-xl">
      <div className="bg-[#252525] rounded-xl p-8 transition-all duration-300 border border-gray-600 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400/50">
        <div className="text-center">
          <div className={`text-6xl mb-4`}>
            {icon}
          </div>
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gray-300 transition-colors">
            {title}
          </h3>
          <p className="text-white transition-colors">
            {description}
          </p>
          <div className={`mt-6 w-full h-1 bg-gray-500 rounded-full`}></div>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a]">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
            🎓 OHG 365
          </h1>
          <p className="text-xl md:text-2xl text-white mb-4">
            Master the technologies that power modern software development
          </p>
          <p className="text-lg text-white mb-12 max-w-2xl mx-auto">
            Choose your learning path and dive deep into comprehensive tutorials, hands-on projects, and real-world applications.
          </p>
        </div>
      </section>

      {/* Technologies Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Choose Your Technology</h2>
          <p className="text-white text-lg">Select a technology to start your learning journey</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <TechnologyCard
            title="DevOps"
            description="Learn containerization, CI/CD, infrastructure automation, and cloud platforms"
            icon="🚀"
            link="/devops"
            color="from-rose-500 to-red-600"
          />
          <TechnologyCard
            title="Java"
            description="Master Java programming, Spring Framework, and enterprise development"
            icon="☕"
            link="/java"
            color="from-orange-500 to-red-500"
          />
          <TechnologyCard
            title="Python"
            description="Learn Python programming, data science, web development, and automation"
            icon="🐍"
            link="/python"
            color="from-yellow-500 to-green-500"
          />
          <TechnologyCard
            title="SQL & Databases"
            description="Database design, SQL queries, optimization, and modern database technologies"
            icon="🗄️"
            link="/sql"
            color="from-purple-500 to-indigo-500"
          />
          <TechnologyCard
            title="Web Development"
            description="HTML, CSS, JavaScript, React, and full-stack web development"
            icon="🌐"
            link="/web-dev"
            color="from-green-500 to-teal-500"
          />
          <TechnologyCard
            title="Data Science"
            description="Data analysis, machine learning, statistics, and visualization"
            icon="📊"
            link="/data-science"
            color="from-pink-500 to-purple-500"
          />
          <TechnologyCard
            title="Code Terminal"
            description="Write, edit, and execute code online for Python, JavaScript, Java, SQL, and Bash"
            icon="💻"
            link="/code-terminal"
            color="from-cyan-500 to-blue-500"
          />
          <TechnologyCard
            title="Terminal"
            description="Interactive terminal environment for practicing commands and shell scripting"
            icon="⚡"
            link="/terminal"
            color="from-green-500 to-emerald-500"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#202020] py-16 border-t border-gray-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-12">Why Choose Our Learning Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-xl border border-gray-600 hover:border-gray-500 transition-all duration-300">
              <div className="text-4xl mb-4">🎥</div>
              <h3 className="text-xl font-semibold text-white mb-2">Video Tutorials</h3>
              <p className="text-white">High-quality video content with hands-on examples</p>
            </div>
            <div className="text-center p-6 rounded-xl border border-gray-600 hover:border-gray-500 transition-all duration-300">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-semibold text-white mb-2">Interactive Learning</h3>
              <p className="text-white">Practice with interactive exercises and real-world projects</p>
            </div>
            <div className="text-center p-6 rounded-xl border border-gray-600 hover:border-gray-500 transition-all duration-300">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-white mb-2">Industry Ready</h3>
              <p className="text-white">Learn skills that are in demand in the tech industry</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}