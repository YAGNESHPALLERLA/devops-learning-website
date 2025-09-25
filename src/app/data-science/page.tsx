// src/app/data-science/page.tsx
import Link from 'next/link';

// Define the props interface for TopicCard
interface TopicCardProps {
  title: string;
  description: string;
  link: string;
}

// A simple reusable card component for your topics
function TopicCard({ title, description, link }: TopicCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
      <p className="text-gray-400 mb-4">{description}</p>
      <Link href={link} className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition">
        Learn More
      </Link>
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
        <h2 className="text-3xl font-bold text-center text-white mb-10">Complete Data Science Learning Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
  );
}
