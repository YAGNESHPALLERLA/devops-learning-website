// src/app/data-science/page.tsx
import Link from 'next/link';
import TechLayout from '@/components/tech-layout';

// Define the props interface for TopicCard
interface TopicCardProps {
  title: string;
  description: string;
  link: string;
}

// A simple reusable card component for your topics
function TopicCard({ title, description, link }: TopicCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:ring-2 hover:ring-blue-500/30 hover:ring-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-opacity-50">
      <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
      <p className="text-gray-400 mb-4">{description}</p>
      <Link href={link} className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition">
        Learn More
      </Link>
    </div>
  );
}

export default function DataSciencePage() {
  const pageHeadings = [
    { id: 'introduction', title: 'Data Science Learning Hub' },
    { id: 'learning-path', title: 'Complete Data Science Learning Path' }
  ];

  return (
    <TechLayout onThisPage={pageHeadings} technology="data-science">
      <main>
      <section id="introduction" className="text-center py-20 px-4">
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

      <section id="learning-path" className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-white mb-10">Complete Data Science Learning Path</h2>
        <div className="space-y-8">
          <TopicCard
            title="Statistics Fundamentals"
            description="Learn descriptive statistics, probability, and statistical inference."
            link="/data-science/statistics"
          />
          <TopicCard
            title="Python for Data Science"
            description="NumPy, SciPy, Pandas, and scientific computing with Python."
            link="/data-science/python"
          />
          <TopicCard
            title="Data Analysis with Pandas"
            description="Data manipulation, cleaning, and exploratory data analysis."
            link="/data-science/data-analysis"
          />
          <TopicCard
            title="Data Visualization"
            description="Create charts and graphs with Matplotlib, Seaborn, and Plotly."
            link="/data-science/visualization"
          />
          <TopicCard
            title="Machine Learning Basics"
            description="Introduction to supervised and unsupervised learning algorithms."
            link="/data-science/ml-basics"
          />
          <TopicCard
            title="Advanced Machine Learning"
            description="Deep learning, neural networks, and advanced ML techniques."
            link="/data-science/advanced-ml"
          />
          <TopicCard
            title="Data Preprocessing"
            description="Data cleaning, feature engineering, and data transformation."
            link="/data-science/preprocessing"
          />
          <TopicCard
            title="Model Evaluation"
            description="Cross-validation, metrics, and model performance assessment."
            link="/data-science/evaluation"
          />
          <TopicCard
            title="Big Data Technologies"
            description="Introduction to Hadoop, Spark, and big data processing."
            link="/data-science/big-data"
          />
          <TopicCard
            title="Database for Data Science"
            description="SQL for data analysis, NoSQL databases, and data storage."
            link="/data-science/databases"
          />
          <TopicCard
            title="Time Series Analysis"
            description="Analyzing temporal data, forecasting, and time series models."
            link="/data-science/time-series"
          />
          <TopicCard
            title="Data Science Projects"
            description="End-to-end data science projects and case studies."
            link="/data-science/projects"
          />
        </div>
      </section>
      </main>
    </TechLayout>
  );
}
