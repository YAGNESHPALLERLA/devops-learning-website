// src/app/data-science/page.tsx
import Link from 'next/link';

interface TopicCardProps {
  title: string;
  description: string;
  status: 'coming-soon' | 'available';
}

function TopicCard({ title, description, status }: TopicCardProps) {
  return (
    <div className={`rounded-lg shadow-lg p-6 transition-all duration-300 ${
      status === 'available' 
        ? 'bg-gray-800 hover:shadow-xl' 
        : 'bg-gray-700 opacity-75'
    }`}>
      <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
      <p className="text-gray-400 mb-4">{description}</p>
      <div className={`inline-block px-4 py-2 rounded-md text-sm font-semibold ${
        status === 'available'
          ? 'bg-green-600 text-white hover:bg-green-700'
          : 'bg-gray-600 text-gray-300'
      }`}>
        {status === 'available' ? 'Available' : 'Coming Soon'}
      </div>
    </div>
  );
}

export default function DataSciencePage() {
  return (
    <main>
      <section className="text-center py-20 px-4">
        <Link href="/" className="inline-block mb-8 text-blue-400 hover:text-blue-300 transition-colors">
          ← Back to Technology Selection
        </Link>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
          📊 Data Science Learning Hub
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-8">
          Learn data analysis, machine learning, statistics, and visualization
        </p>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-white mb-10">Data Science Learning Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TopicCard
            title="Statistics Fundamentals"
            description="Learn descriptive statistics, probability, and statistical inference."
            status="coming-soon"
          />
          <TopicCard
            title="Data Analysis with Pandas"
            description="Data manipulation, cleaning, and exploratory data analysis."
            status="coming-soon"
          />
          <TopicCard
            title="Data Visualization"
            description="Create charts and graphs with Matplotlib, Seaborn, and Plotly."
            status="coming-soon"
          />
          <TopicCard
            title="Machine Learning Basics"
            description="Introduction to supervised and unsupervised learning algorithms."
            status="coming-soon"
          />
          <TopicCard
            title="Python for Data Science"
            description="NumPy, SciPy, and scientific computing with Python."
            status="coming-soon"
          />
          <TopicCard
            title="Big Data Technologies"
            description="Introduction to Hadoop, Spark, and big data processing."
            status="coming-soon"
          />
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-400 text-lg">
            Data Science content is being prepared. Check back soon!
          </p>
        </div>
      </section>
    </main>
  );
}
