'use client';

import TechLayout from '@/components/tech-layout';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

const ImageGallery = ({ images }: { images: GalleryImage[] }) => {
  if (!images.length) return null;

  return (
    <div className="flex flex-col gap-8 mt-8">
      {images.map((image, index) => (
        <figure
          key={`${image.src}-${index}`}
          className="overflow-hidden rounded-2xl border border-gray-600 bg-white shadow-lg shadow-purple-500/10 transition hover:shadow-purple-500/25"
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="lazy"
            sizes="(min-width: 1280px) 100vw, (min-width: 768px) 100vw, 100vw"
            className="h-auto w-full object-contain bg-white"
          />
          {image.caption && (
            <figcaption className="border-t border-gray-300 px-4 py-3 text-sm text-gray-700">
              {image.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
};

// Placeholder for LLM images - can be added later
const llmImages: Record<string, GalleryImage> = {
  // Add images as needed
};

const getImages = (...keys: (keyof typeof llmImages)[]): GalleryImage[] =>
  keys.map(key => llmImages[key]).filter(Boolean);

const PAGE_HEADINGS = [
  // Core Concepts Group
  { id: 'llm-introduction', title: 'Introduction to Large Language Models (LLMs)' },
  { id: 'foundations', title: 'Foundations of Language Modeling' },
  { id: 'transformer-architecture', title: 'Transformer Architecture (Core Foundation)' },
  { id: 'pretraining-tokenization', title: 'Pretraining and Tokenization' },
  { id: 'major-architectures', title: 'Major LLM Architectures' },
  // Training & Fine-Tuning Group
  { id: 'training-llms', title: 'Training Large Language Models' },
  { id: 'fine-tuning', title: 'Fine-Tuning and Adaptation' },
  { id: 'rlhf', title: 'Reinforcement Learning from Human Feedback (RLHF)' },
  // Practical Applications Group
  { id: 'prompt-engineering', title: 'Prompt Engineering and Context Optimization' },
  { id: 'rag', title: 'Retrieval-Augmented Generation (RAG)' },
  { id: 'evaluation-metrics', title: 'Evaluation and Metrics for LLMs' },
  // Advanced Topics Group
  { id: 'memory-reasoning', title: 'Memory, Reasoning, and Tool Use' },
  { id: 'multimodal-llms', title: 'Multimodal and Specialized LLMs' },
  { id: 'inference-deployment', title: 'Efficient LLM Inference and Deployment' },
  { id: 'safety-ethics', title: 'Safety, Ethics, and Responsible LLMs' },
  // Operations & Applications Group
  { id: 'llm-ops', title: 'LLM Ops (Operationalization of LLMs)' },
  { id: 'building-applications', title: 'Building Applications with LLMs' },
  { id: 'case-studies', title: 'Real-World Case Studies' }
];

const SUBSECTION_PARENT: Record<string, string> = {
  // Core Concepts
  'llm-introduction': 'core-concepts',
  'foundations': 'core-concepts',
  'transformer-architecture': 'core-concepts',
  'pretraining-tokenization': 'core-concepts',
  'major-architectures': 'core-concepts',
  // Training & Fine-Tuning
  'training-llms': 'training-fine-tuning',
  'fine-tuning': 'training-fine-tuning',
  'rlhf': 'training-fine-tuning',
  // Practical Applications
  'prompt-engineering': 'practical-applications',
  'rag': 'practical-applications',
  'evaluation-metrics': 'practical-applications',
  // Advanced Topics
  'memory-reasoning': 'advanced-topics',
  'multimodal-llms': 'advanced-topics',
  'inference-deployment': 'advanced-topics',
  'safety-ethics': 'advanced-topics',
  // Operations & Applications
  'llm-ops': 'operations-applications',
  'building-applications': 'operations-applications',
  'case-studies': 'operations-applications'
};

const createModuleNavigationItems = (): Array<{ id: string; title: string; href: string; icon?: string; children?: Array<{ id: string; title: string; href: string }> }> => {
  const basePath = '/tutorials/artificial-intelligence/llms';
  
  return [
    {
      id: 'core-concepts',
      title: 'Core Concepts',
      href: `${basePath}#core-concepts`,
      icon: '📚',
      children: [
        { id: 'llm-introduction', title: 'Introduction to LLMs', href: `${basePath}#llm-introduction` },
        { id: 'foundations', title: 'Foundations of Language Modeling', href: `${basePath}#foundations` },
        { id: 'transformer-architecture', title: 'Transformer Architecture', href: `${basePath}#transformer-architecture` },
        { id: 'pretraining-tokenization', title: 'Pretraining and Tokenization', href: `${basePath}#pretraining-tokenization` },
        { id: 'major-architectures', title: 'Major LLM Architectures', href: `${basePath}#major-architectures` }
      ]
    },
    {
      id: 'training-fine-tuning',
      title: 'Training & Fine-Tuning',
      href: `${basePath}#training-fine-tuning`,
      icon: '🎓',
      children: [
        { id: 'training-llms', title: 'Training Large Language Models', href: `${basePath}#training-llms` },
        { id: 'fine-tuning', title: 'Fine-Tuning and Adaptation', href: `${basePath}#fine-tuning` },
        { id: 'rlhf', title: 'RLHF (Reinforcement Learning)', href: `${basePath}#rlhf` }
      ]
    },
    {
      id: 'practical-applications',
      title: 'Practical Applications',
      href: `${basePath}#practical-applications`,
      icon: '🛠️',
      children: [
        { id: 'prompt-engineering', title: 'Prompt Engineering', href: `${basePath}#prompt-engineering` },
        { id: 'rag', title: 'Retrieval-Augmented Generation (RAG)', href: `${basePath}#rag` },
        { id: 'evaluation-metrics', title: 'Evaluation and Metrics', href: `${basePath}#evaluation-metrics` }
      ]
    },
    {
      id: 'advanced-topics',
      title: 'Advanced Topics',
      href: `${basePath}#advanced-topics`,
      icon: '🚀',
      children: [
        { id: 'memory-reasoning', title: 'Memory, Reasoning, and Tool Use', href: `${basePath}#memory-reasoning` },
        { id: 'multimodal-llms', title: 'Multimodal and Specialized LLMs', href: `${basePath}#multimodal-llms` },
        { id: 'inference-deployment', title: 'Inference and Deployment', href: `${basePath}#inference-deployment` },
        { id: 'safety-ethics', title: 'Safety, Ethics, and Responsible LLMs', href: `${basePath}#safety-ethics` }
      ]
    },
    {
      id: 'operations-applications',
      title: 'Operations & Applications',
      href: `${basePath}#operations-applications`,
      icon: '⚙️',
      children: [
        { id: 'llm-ops', title: 'LLM Ops', href: `${basePath}#llm-ops` },
        { id: 'building-applications', title: 'Building Applications', href: `${basePath}#building-applications` },
        { id: 'case-studies', title: 'Real-World Case Studies', href: `${basePath}#case-studies` }
      ]
    }
  ];
};

export default function LLMsPage() {
  const [activeSection, setActiveSection] = useState('llm-introduction');
  const [activeSubsection, setActiveSubsection] = useState<string | null>(null);
  const pageHeadings = PAGE_HEADINGS;
  const isUserScrollingRef = useRef(false);
  const shouldScrollRef = useRef(false);

  // Custom setActiveSection that handles child items correctly
  const handleSetActiveSection = (sectionId: string) => {
    // Mark that this is a user-initiated navigation (should scroll)
    shouldScrollRef.current = true;
    isUserScrollingRef.current = false;
    
    // Check if this is a direct section (not a subsection)
    if (PAGE_HEADINGS.some(heading => heading.id === sectionId)) {
      setActiveSection(sectionId);
      setActiveSubsection(null);
      // Update URL hash
      window.history.replaceState(null, '', `#${sectionId}`);
    } else {
      // It's a subsection, find its parent
      const parentSection = SUBSECTION_PARENT[sectionId] || 'llms';
      setActiveSection(parentSection);
      setActiveSubsection(sectionId);
      // Update URL hash
      window.history.replaceState(null, '', `#${sectionId}`);
    }
  };

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (!hash || hash === 'llms' || hash === 'core-concepts' || hash === 'training-fine-tuning' || hash === 'practical-applications' || hash === 'advanced-topics' || hash === 'operations-applications') {
        setActiveSection('llm-introduction');
        setActiveSubsection(null);
        return;
      }

      // Check if hash is a direct section
      if (PAGE_HEADINGS.some(heading => heading.id === hash)) {
        setActiveSection(hash);
        setActiveSubsection(null);
      } else {
        // It's a subsection or parent group, find parent
        const parentSection = SUBSECTION_PARENT[hash] || 'core-concepts';
        setActiveSection(hash);
        setActiveSubsection(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Scroll to active section after it renders - ONLY if user clicked sidebar
  useEffect(() => {
    if (activeSection && shouldScrollRef.current) {
      // Reset the flag
      shouldScrollRef.current = false;
      isUserScrollingRef.current = true;
      
      // Small delay to ensure DOM is updated
      const scrollTimeout = setTimeout(() => {
        const element = document.getElementById(activeSection);
        if (element) {
          // Use scrollIntoView with scroll-margin-top support
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (activeSubsection) {
          // Try scrolling to subsection if main section not found
          const subElement = document.getElementById(activeSubsection);
          if (subElement) {
            subElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
        
        // Reset user scrolling flag after scroll completes
        setTimeout(() => {
          isUserScrollingRef.current = false;
        }, 500);
      }, 200);
      
      return () => clearTimeout(scrollTimeout);
    }
  }, [activeSection, activeSubsection]);

  const getCurrentSectionIndex = () => {
    return PAGE_HEADINGS.findIndex(heading => heading.id === activeSection);
  };

  const goToNextSection = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex < PAGE_HEADINGS.length - 1) {
      const nextSection = PAGE_HEADINGS[currentIndex + 1];
      handleSetActiveSection(nextSection.id);
    }
  };

  const goToPreviousSection = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex > 0) {
      const prevSection = PAGE_HEADINGS[currentIndex - 1];
      handleSetActiveSection(prevSection.id);
    }
  };

  const currentIndex = getCurrentSectionIndex();
  const hasNext = currentIndex < PAGE_HEADINGS.length - 1;
  const hasPrevious = currentIndex > 0;

  return (
    <TechLayout
      technology="artificial-intelligence"
      onThisPage={pageHeadings}
      activeSection={activeSection}
      setActiveSection={handleSetActiveSection}
      activeSubsection={activeSubsection}
      setActiveSubsection={setActiveSubsection}
      customNavigationItems={createModuleNavigationItems()}
    >
      <div className="min-h-screen relative">
        <div className="text-center mb-16 relative z-10">
          <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30">
            <span className="text-purple-400 font-semibold flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Artificial Intelligence</span>
            </span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Large Language Models (LLMs) <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Module</span>
          </h1>
          <p className="text-gray-400 text-xl">Learn about Large Language Models, their architecture, training, and applications</p>
        </div>

        <section
          id="llms"
          className="bg-[#252525] rounded-xl p-8 border border-gray-600 scroll-mt-24 mb-20"
        >
          <h3 className="text-3xl font-bold text-white mb-6">Large Language Models (LLMs)</h3>
          
          <div className="space-y-12 relative z-10">
            <div id="llm-introduction" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24 relative z-10">
              <h4 className="text-2xl font-semibold text-white mb-4">1. Introduction to Large Language Models (LLMs)</h4>
              <div className="space-y-6 text-gray-300">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">What are Large Language Models?</h5>
                </div>
                <p className="mb-3">
                  Large Language Models (LLMs) are advanced artificial intelligence systems designed to understand, generate, and process human language. They are trained on massive amounts of text data such as books, articles, code, and conversations to learn patterns, meanings, and structures of language. Using deep learning techniques, especially Transformer architecture, these models can generate human-like text, answer questions, translate languages, summarize content, and even create code or images when combined with multimodal inputs. In simple terms, an LLM works by predicting the next word in a sentence based on the words before it. Over time, as it is trained on billions of examples, it develops the ability to understand context, tone, and intent behind words, making its responses natural and coherent.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Evolution of Language Models → From RNNs → Transformers → LLMs</h5>
                </div>
                <p className="mb-3">
                  The evolution of language models represents a major journey in artificial intelligence moving from simple statistical methods to today's highly capable Large Language Models (LLMs). Initially, AI systems relied on Recurrent Neural Networks (RNNs) and Long Short-Term Memory (LSTM) models to process sequences of text. These models read sentences one word at a time, remembering previous words to predict the next one. While RNNs and LSTMs helped machines understand short-term dependencies in language, they struggled with long sentences, parallel processing, and context retention, which limited their performance on large-scale language tasks.
                </p>
                <p className="mb-3">
                  To overcome these challenges, researchers introduced the Transformer architecture in 2017 through the paper "Attention Is All You Need." Transformers replaced sequential processing with self-attention mechanisms, allowing the model to focus on all words in a sentence at once. This made it possible to understand relationships between distant words, capture deeper meaning, and train models faster using parallel computing. Transformers became the foundation for many modern AI models such as BERT, GPT, and T5. LLMs like GPT-4, Claude, Gemini, and LLaMA can understand, reason, and generate language with human-like fluency.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Difference Between Traditional NLP Models and LLMs</h5>
                </div>
                <p className="mb-3">
                  Traditional NLP models were task-specific and required extensive feature engineering. LLMs, on the other hand, are general-purpose models that can be adapted to various tasks through fine-tuning or prompt engineering.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Importance and Power of LLMs in the AI Ecosystem</h5>
                </div>
                <p className="mb-3">
                  Large Language Models (LLMs) play a central and powerful role in today's artificial intelligence ecosystem. They have completely changed the way machines understand, process, and communicate in human language. Unlike traditional models that depend on fixed rules or limited training data, LLMs can learn from vast amounts of text across the internet, allowing them to understand context, meaning, and even emotion in human communication. Their importance lies in their ability to perform a wide range of tasks — such as answering questions, summarizing large documents, generating creative content, writing computer code, and supporting decision-making — all within a single unified model. This flexibility makes LLMs the foundation for intelligent systems like ChatGPT, Google Gemini, and Claude, which assist people in education, healthcare, law, business, and research. In the broader AI ecosystem, LLMs act as the "brain" that connects humans with machines through natural language, making technology more accessible, personalized, and interactive. Their power comes from combining massive computational scale with deep learning architectures, enabling them to think, reason, and communicate in ways that feel truly human-like. As a result, LLMs are not just tools — they are driving forces behind the next generation of innovation, automation, and digital intelligence.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Applications of LLMs Across Industries</h5>
                </div>
                <p className="mb-3">
                  Large Language Models (LLMs) have found applications in almost every major industry, reshaping how organizations operate, make decisions, and interact with people. In the healthcare sector, LLMs assist doctors and researchers by analyzing medical records, summarizing patient data, drafting reports, and even helping in medical research by interpreting large volumes of scientific literature. In education, they act as intelligent tutors, helping students learn concepts, write essays, and generate personalized study materials. Businesses use LLMs to automate customer support through chatbots, create marketing content, analyze feedback, and generate professional documents or emails. In the financial industry, LLMs help detect fraud, summarize financial reports, and support investment analysis by quickly processing large datasets and news articles. Similarly, in the legal field, they are used to draft contracts, review legal documents, and extract relevant case details efficiently. The technology and software sector benefits from LLMs in code generation, debugging, and automating development workflows. Even in media and entertainment, LLMs create scripts, captions, and content ideas, enhancing creativity and productivity. Overall, LLMs serve as powerful tools that improve efficiency, accuracy, and innovation across industries by automating complex language-based tasks and transforming how humans interact with digital systems.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Open-Source vs Proprietary LLMs (GPT, Claude, LLaMA, Gemini, Mistral)</h5>
                </div>
                <p className="mb-3">
                  Large Language Models (LLMs) can broadly be categorized into open-source and proprietary (closed-source) models, each offering unique advantages and limitations. Open-source LLMs are freely available for researchers, developers, and organizations to use, modify, and deploy. These models, such as Meta's LLaMA, Mistral, and Falcon, provide transparency in architecture, training data (to some extent), and parameters. They allow customization for domain-specific needs, making them highly useful for innovation, academic research, and companies that prefer building private AI solutions. Open-source models also encourage community collaboration, faster improvements, and lower costs since users can fine-tune or deploy them locally without heavy licensing fees.
                </p>
                <p className="mb-3">
                  On the other hand, proprietary LLMs are developed and maintained by private companies and are not publicly released for modification. Popular examples include OpenAI's GPT series (like GPT-4), Anthropic's Claude, and Google's Gemini. These models are usually trained on massive datasets with advanced infrastructure, providing higher accuracy, better reasoning, and more reliable safety features. However, their internal mechanisms and data sources are kept confidential, and they are accessed mainly through paid APIs or platforms. Proprietary models are ideal for businesses that prioritize performance, scalability, and compliance but may lack flexibility for deep customization.
                </p>
                <p className="mb-3">
                  In summary, open-source LLMs empower users with flexibility, transparency, and innovation potential, while proprietary LLMs offer superior performance, stability, and advanced features backed by large research investments. Both play vital roles in the AI ecosystem — open-source driving collaboration and accessibility, and proprietary models pushing the boundaries of quality, safety, and commercial deployment.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Limitations and Challenges of LLMs</h5>
                </div>
                <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                  <li><strong className="text-purple-400">Hallucination:</strong> LLMs can produce false or inaccurate information because they generate text based on patterns, not true understanding.</li>
                  <li><strong className="text-purple-400">Bias:</strong> They may reflect and amplify social or cultural biases found in their training data.</li>
                  <li><strong className="text-purple-400">High Cost and Energy Use:</strong> Training and running LLMs need massive computational power and electricity, making them expensive.</li>
                  <li><strong className="text-purple-400">Data Privacy Issues:</strong> Sensitive or confidential information might be exposed if data is not handled properly.</li>
                  <li><strong className="text-purple-400">Lack of Transparency:</strong> It's difficult to understand how LLMs make certain decisions or generate specific responses.</li>
                  <li><strong className="text-purple-400">Context Limitations:</strong> LLMs have a token limit, so they can't always handle long or complex inputs effectively.</li>
                  <li><strong className="text-purple-400">Ethical and Legal Risks:</strong> Misuse for spreading misinformation, plagiarism, or violating copyrights is a growing concern.</li>
                </ul>
              </div>
            </div>

            <div id="foundations" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24 relative z-10">
              <h4 className="text-2xl font-semibold text-white mb-4">2. Foundations of Language Modeling</h4>
              <div className="space-y-6 text-gray-300">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">What Is a Language Model?</h5>
                </div>
                <p className="mb-3">
                  A Language Model is an artificial intelligence system designed to understand, predict, and generate human language. In simple terms, it learns how words and sentences are structured by studying large amounts of text, so it can produce meaningful and natural responses. A language model works by analyzing the relationship between words — it predicts what word is most likely to come next in a sequence based on the words that came before. For example, if you type "The cat is on the…", the model predicts the next word could be "table" or "roof" depending on the context. Modern language models use deep learning, where neural networks are trained on huge text datasets to recognize grammar, tone, and meaning. Earlier models used simple statistical approaches like n-grams or Markov models, which could only look at short word sequences. But with the rise of advanced architectures like Transformers, today's models can understand long sentences, context, and even emotions behind words. A Language Model is the foundation of many AI systems that we use daily — from chatbots and virtual assistants to translators and content generators — enabling machines to communicate intelligently in human language.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Probabilistic Language Modeling (n-grams, Markov Models)</h5>
                </div>
                <p className="mb-3">
                  Probabilistic Language Modeling is an early approach to teaching computers how to understand and generate text based on probabilities of word sequences. The main idea is that the likelihood of a word appearing depends on the words that came before it. For example, in the phrase "I want to drink ___," the model assigns a higher probability to "water" or "coffee" than to unrelated words like "chair."
                </p>
                <p className="mb-3">
                  Two of the most common probabilistic models are n-grams and Markov models:
                </p>
                <p className="mb-3">
                  <strong className="text-purple-400">N-gram Models:</strong> These models predict the next word by looking at the previous n–1 words. For example, a bigram model (n=2) predicts each word based only on the one before it, while a trigram model (n=3) uses the previous two words. Though simple and effective for short contexts, n-gram models struggle with long sentences because they can only "remember" a small window of words.
                </p>
                <p className="mb-3">
                  <strong className="text-purple-400">Markov Models:</strong> These are similar in concept — they assume that the probability of each word depends only on a fixed number of previous words (the "Markov assumption"). This makes calculations simpler but limits the model's ability to understand deeper meaning or long-term dependencies in language.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Sequence Prediction and Token Probabilities</h5>
                </div>
                <p className="mb-3">
                  Sequence prediction is a core concept in how language models understand and generate text. It refers to the process of predicting the next word (or token) in a sequence based on the previous ones. For example, if the input is "The sun is shining in the", the model predicts that the next word is most likely "sky". This ability to make predictions comes from analyzing token probabilities — where each word or symbol (token) is assigned a probability score that represents how likely it is to appear next.
                </p>
                <p className="mb-3">
                  A token is the smallest unit of text that a model processes — it could be a word, subword, or even a single character, depending on the tokenizer used. The model computes a probability distribution over all possible next tokens and then selects the one with the highest likelihood. This prediction process happens repeatedly, allowing the model to generate entire sentences or paragraphs word by word.
                </p>
                <p className="mb-3">
                  In technical terms, a language model estimates the conditional probability of a word given the words before it. For example, P(sky | The sun is shining in the) is the probability that "sky" follows that sequence. The model learns these probabilities during training by analyzing millions or billions of text examples.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Next-Word Prediction Objective</h5>
                </div>
                <p className="mb-3">
                  The Next-Word Prediction Objective is one of the most fundamental goals in training a language model. It teaches the model to predict the next word in a sentence based on the words that come before it. This simple yet powerful concept allows the model to learn grammar, structure, and meaning from large amounts of text. For example, when given the sentence "She is reading a…", the model calculates probabilities for possible next words like "book," "newspaper," or "story," and chooses the most likely one based on its training. During training, the model repeatedly performs this prediction task on millions of sentences, gradually learning patterns in word usage and sentence flow. It assigns a probability distribution to every possible next word and updates its internal parameters to minimize the difference between its predictions and the actual next words in the data. This process enables the model to build a strong understanding of context — knowing which words make sense together and which do not. Models like GPT (Generative Pretrained Transformer) are built entirely around this objective, which is also known as Causal Language Modeling (CLM). It helps them generate coherent and contextually appropriate text, continuing a given prompt in a natural way.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Perplexity and Cross-Entropy Loss</h5>
                </div>
                <p className="mb-3">
                  Cross-Entropy Loss is a mathematical function that measures the difference between the model's predicted probability distribution and the actual correct word. In simple terms, it tells us how "wrong" the model's predictions are. When the model assigns a high probability to the correct next word, the loss is low — meaning it's performing well. Conversely, if the model gives the correct word a low probability, the loss increases, signaling that it needs improvement. During training, the goal is to minimize this loss so that the model becomes better at making accurate predictions.
                </p>
                <p className="mb-3">
                  Perplexity is derived from cross-entropy and serves as an interpretable metric to understand model performance. It indicates how "confused" a model is when predicting the next word. A lower perplexity means the model is more confident and accurate, while a higher perplexity suggests uncertainty. For example, a perplexity of 10 means that, on average, the model is as uncertain as if it had to choose between 10 equally likely words.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Masked Language Modeling (MLM) vs Causal Language Modeling (CLM)</h5>
                </div>
                <p className="mb-3">
                  <strong className="text-purple-400">Masked Language Modeling (MLM)</strong> is used in models like BERT, RoBERTa, and DeBERTa, which focus on understanding language rather than generating it. In MLM, some words in a sentence are hidden (or masked) during training, and the model is asked to predict those missing words using the surrounding context. For example, in the sentence "The cat is [MASK] on the mat," the model must correctly predict the masked word "sitting." This approach helps the model learn bidirectional context — meaning it understands both the words before and after the missing word — making it excellent for tasks like text classification, question answering, and sentiment analysis. MLM helps models understand language deeply by filling in missing words using full context.
                </p>
                <p className="mb-3">
                  <strong className="text-purple-400">Causal Language Modeling (CLM)</strong>, on the other hand, is used in generative models like GPT (Generative Pretrained Transformer), LLaMA, and Mistral. In CLM, the model predicts the next word in a sequence based only on the previous words. For instance, given "The dog is playing in the", it predicts what comes next — perhaps "park." This method teaches the model to generate text in a left-to-right manner, making it suitable for writing, summarizing, and conversational tasks. CLM helps models generate language by predicting the next word step-by-step.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">From Word Embeddings to Contextual Embeddings</h5>
                </div>
                <p className="mb-3">
                  Word embeddings and contextual embeddings are techniques that help language models represent words in numerical form so that computers can understand and process them. The shift from static word embeddings to dynamic, contextual embeddings marked a major advancement in natural language understanding. In traditional models, word embeddings like Word2Vec or GloVe assigned each word a fixed vector (a list of numbers) based on its overall meaning learned from large text data. For example, words like "king" and "queen" or "car" and "truck" would have similar embeddings because they appear in similar contexts. However, these static embeddings had one big limitation — they gave each word only one meaning, regardless of context. For instance, the word "bank" would have the same representation in both "river bank" and "money bank," even though the meanings are different. To solve this, modern models introduced contextual embeddings, where the meaning of a word changes depending on the sentence around it. Models like BERT, GPT, and T5 use deep neural networks (specifically the Transformer architecture) to generate unique embeddings for each word based on its context. This means that the same word will have different representations in different sentences, allowing the model to truly understand nuance and intent.
                </p>
              </div>
            </div>

            <div id="transformer-architecture" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24 relative z-10">
              <h4 className="text-2xl font-semibold text-white mb-4">3. Transformer Architecture (Core Foundation)</h4>
              <div className="space-y-6 text-gray-300">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Why Transformers Replaced RNNs and LSTMs</h5>
                </div>
                <p className="mb-3">
                  Transformers replaced Recurrent Neural Networks (RNNs) and Long Short-Term Memory networks (LSTMs) because they solved many of the limitations that earlier models faced in understanding long and complex language sequences. RNNs and LSTMs process text word by word in a sequence, meaning they must wait for each step before moving to the next. This makes them slow and inefficient, especially for long sentences or large datasets. Moreover, they struggle with long-term dependencies, meaning they often "forget" information that appeared many words earlier in a sentence.
                </p>
                <p className="mb-3">
                  Transformers, introduced in 2017 through the paper "Attention Is All You Need," changed this completely. Instead of processing words one by one, Transformers use a mechanism called self-attention, which allows them to look at all words in a sentence simultaneously and understand their relationships to one another. For example, in the sentence "The cat that chased the mouse was black," the Transformer can easily connect "cat" with "was black," even though other words come in between — something RNNs found difficult. Another major advantage of Transformers is parallel processing. Unlike RNNs and LSTMs, which work step by step, Transformers can process multiple words at the same time, making them much faster and more scalable on modern hardware like GPUs and TPUs. This efficiency enables training on massive datasets, leading to the creation of Large Language Models (LLMs) such as GPT, BERT, and T5.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Self-Attention Mechanism Explained</h5>
                </div>
                <p className="mb-3">
                  The Self-Attention Mechanism is the most important concept behind the Transformer architecture, which powers modern Large Language Models (LLMs). It allows the model to understand how each word in a sentence relates to every other word no matter how far apart they are. Unlike older models like RNNs that read text in order, self-attention helps the model "look" at the entire sentence at once and decide which words are most important for understanding the meaning of each part. Technically, self-attention assigns attention weights to every word pair in the sentence. These weights represent how much one word should influence another. Words that are closely related get higher attention scores, while unrelated words get lower ones. This mechanism helps the model capture context, meaning, and relationships between words efficiently. The power of self-attention lies in its ability to process all words in parallel, making training much faster and more accurate than older methods. It also enables the model to handle long-range dependencies, meaning it can understand connections between distant words — something traditional models struggled with. The Self-Attention Mechanism allows models to capture long-range dependencies, process text efficiently, and understand meaning at a global level — making it the foundation of today's most advanced LLMs like GPT, BERT, and Claude.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Scaled Dot-Product Attention</h5>
                </div>
                <p className="mb-3">
                  The Scaled Dot-Product Attention is a key mathematical component inside the self-attention mechanism that helps Transformers understand how strongly each word in a sentence relates to the others. It calculates how much "attention" each word should give to every other word, allowing the model to focus on the most relevant information for understanding meaning and context. Here's how it works: each word in a sentence is first represented by three vectors — Query (Q), Key (K), and Value (V). The model compares the Query of one word with the Keys of all other words by taking their dot product (a mathematical operation that measures similarity). The result shows how related the words are. These similarity scores are then divided by the square root of the vector's dimension — this step is called scaling, and it prevents the numbers from becoming too large, which could make the model unstable during training. After scaling, a softmax function is applied to convert these scores into probabilities, so that all attention values add up to 1. Finally, these probabilities are used to weight the Value (V) vectors, producing a weighted sum that represents how much information each word contributes to understanding the target word. This mechanism allows Transformers to capture contextual relationships efficiently while maintaining speed and stability during training. It is the mathematical foundation that powers higher-level components like Multi-Head Attention, making modern LLMs more accurate, scalable, and context-aware.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Multi-Head Attention</h5>
                </div>
                <p className="mb-3">
                  Multi-Head Attention is an advanced extension of the self-attention mechanism used in Transformer models. It allows the model to focus on different parts of a sentence at the same time and understand multiple types of relationships between words. Instead of using a single self-attention process, Multi-Head Attention runs several self-attention layers (called "heads") in parallel, with each head learning different aspects of the sentence — such as grammar, meaning, or relationships between distant words. Here's how it works: the input words are first converted into vectors (Query, Key, and Value). These vectors are then divided into smaller sets and sent to multiple attention heads. Each head performs Scaled Dot-Product Attention independently, learning a unique way to relate words in the sentence. For example, in the sentence "The girl who won the race smiled proudly," one attention head might focus on linking "girl" with "won," while another head connects "girl" with "smiled." After all the attention heads finish processing, their outputs are combined and passed through a linear layer to produce a single, richer representation of the sentence. The main advantage of Multi-Head Attention is that it allows the model to capture various relationships simultaneously — both local (nearby word connections) and global (distant word dependencies). This helps the Transformer understand complex sentence structures and subtle meanings far better than older models.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Position-Wise Feedforward Networks</h5>
                </div>
                <p className="mb-3">
                  Position-Wise Feedforward Networks (FFNs) are an essential part of the Transformer architecture, working alongside the attention mechanism to process and transform information after attention has been applied. While attention layers focus on relationships between words, the feedforward network helps the model refine and represent each word's meaning individually. Here's how it works: after the Multi-Head Attention layer, each token (word) passes through the same small feedforward neural network, which consists of two linear layers separated by a non-linear activation function (usually ReLU). The first layer expands the word's vector representation to a higher dimension to capture more complex features, and the second layer brings it back down to its original size. This process helps the model apply additional transformations that enhance the representation of each word before moving on to the next layer. Importantly, this operation is applied independently to every position in the sentence — hence the term "position-wise." The main purpose of Position-Wise FFNs is to improve the depth and expressiveness of the model. While self-attention helps words interact and exchange information, the feedforward network strengthens each word's individual representation based on what it has learned. This combination allows the Transformer to handle both global context (through attention) and local word meaning (through feedforward processing).
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Positional Encoding and Token Representation</h5>
                </div>
                <p className="mb-3">
                  Positional Encoding and Token Representation are two key concepts that help Transformers understand both the meaning of words and their order in a sentence. Since Transformer models process all words in parallel (unlike RNNs or LSTMs that read sequentially), they don't naturally understand which word comes first or last. To fix this, Transformers use Positional Encoding, which adds information about each word's position in the sentence to its embedding. Here's how it works: every word (or token) in a sentence is first converted into a numerical vector through token embedding. These embeddings represent the word's meaning in mathematical form, capturing relationships like similarity between "king" and "queen" or "happy" and "joyful." However, because all tokens are processed simultaneously, the model wouldn't know the difference between "the cat chased the dog" and "the dog chased the cat" without positional information. That's where positional encoding comes in — it adds a unique pattern of numbers to each token's embedding based on its position in the sentence (first, second, third, etc.). These encodings are often calculated using sine and cosine functions, which help the model detect both short and long-range word relationships smoothly. By combining token embeddings (word meaning) with positional encodings (word order), the Transformer gains a complete understanding of the sentence — knowing not only what each word means but also how the sentence is structured. This enables the model to interpret context correctly, generate grammatically accurate sentences, and maintain logical flow in text.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Encoder, Decoder, and Encoder-Decoder Architectures</h5>
                </div>
                <p className="mb-3">
                  <strong className="text-purple-400">An Encoder</strong> takes the input text and converts it into a rich internal representation that captures its meaning and context. It uses layers of self-attention and feedforward networks to analyze relationships between words in the input. Models like BERT, RoBERTa, and DeBERTa are encoder-only architectures — they focus purely on understanding language (for example, identifying sentiment or answering questions) but do not generate new text.
                </p>
                <p className="mb-3">
                  <strong className="text-purple-400">A Decoder</strong>, on the other hand, is responsible for generating output text. It predicts one word at a time while considering the words that came before it, using both self-attention and cross-attention (which connects the decoder to encoder outputs, when applicable). Decoder-only models like GPT, LLaMA, and Mistral are specialized in text generation, making them excellent for writing, summarizing, and conversational AI tasks.
                </p>
                <p className="mb-3">
                  <strong className="text-purple-400">The Encoder–Decoder architecture</strong> combines both components and is used in tasks that involve transforming one sequence into another, such as language translation, summarization, or question-answering. Here, the encoder processes the input sentence (like English text), and the decoder generates the corresponding output (like the French translation). Famous examples include T5, BART, and FLAN-T5, which excel in both comprehension and generation.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Layer Normalization and Residual Connections</h5>
                </div>
                <p className="mb-3">
                  <strong className="text-purple-400">Layer Normalization</strong> works by normalizing (balancing) the outputs of a layer so that the values don't become too large or too small. In deep neural networks like Transformers, each layer processes data differently, and without normalization, some layers might dominate others. Layer Normalization adjusts the mean and variance of the activations within each layer, keeping them consistent. This ensures that the model learns smoothly and converges faster during training. In simpler terms, it keeps the model's internal values stable, helping it understand language patterns more efficiently.
                </p>
                <p className="mb-3">
                  <strong className="text-purple-400">Residual Connections</strong>, also known as skip connections, are shortcuts that allow the input of a layer to bypass one or more layers and be added directly to the output. This technique prevents the model from "forgetting" important information as data passes through multiple layers. For example, in a Transformer block, the input is passed to both the attention mechanism and the feedforward network, and then added back to their outputs. This helps the model maintain context and learn deeper relationships without losing earlier information. Together, Layer Normalization and Residual Connections make the Transformer more reliable and powerful. Normalization ensures stable learning, while residuals preserve information flow — enabling the model to train faster, go deeper, and perform complex language tasks with high accuracy.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Computational Efficiency and Parallelization Benefits</h5>
                </div>
                <p className="mb-3">
                  One of the biggest advantages of Transformer models over older architectures like RNNs and LSTMs is their computational efficiency and ability to perform parallel processing. These two features make Transformers fast, scalable, and ideal for training massive Large Language Models (LLMs) on enormous datasets. In traditional sequence models such as RNNs, text is processed word by word, meaning each step must wait for the previous one to finish. This makes training slow and inefficient, especially for long sentences or large datasets. In contrast, Transformers use the self-attention mechanism, which allows the model to process all words in a sentence simultaneously, rather than sequentially. This parallelization means that large amounts of data can be handled at once, significantly reducing training time. Transformers also make efficient use of hardware resources like GPUs and TPUs, which are designed for parallel computation. Each Transformer layer performs matrix operations (mathematical computations) on multiple tokens at the same time, taking full advantage of modern computing power. This efficiency not only speeds up training but also makes it feasible to build and fine-tune extremely large models with billions of parameters. Another benefit of this parallel structure is scalability — Transformers can be expanded to larger architectures or trained on more data without major slowdowns. This is what enables the development of advanced models like GPT-4, Gemini, and Claude, which rely on massive datasets and powerful computing clusters.
                </p>
              </div>
            </div>

            <div id="pretraining-tokenization" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24 relative z-10">
              <h4 className="text-2xl font-semibold text-white mb-4">4. Pretraining and Tokenization</h4>
              <div className="space-y-6 text-gray-300">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Tokenization Methods</h5>
                </div>
                <div className="space-y-4">
                  <div>
                    <h6 className="text-lg font-semibold text-white mb-2">1. WordPiece</h6>
                    <p className="mb-3">Used in models like BERT, WordPiece splits words into smaller subword units to handle rare or unknown words. For example, "unbelievable" might be broken into "un," "##believ," and "##able."</p>
                  </div>
                  <div>
                    <h6 className="text-lg font-semibold text-white mb-2">2. Byte Pair Encoding (BPE)</h6>
                    <p className="mb-3">BPE, used in GPT, RoBERTa, and LLaMA, merges frequently occurring character pairs into subwords. It starts by splitting words into individual characters and then repeatedly merges the most common pairs.</p>
                  </div>
                  <div>
                    <h6 className="text-lg font-semibold text-white mb-2">3. SentencePiece</h6>
                    <p className="mb-3">SentencePiece, used in T5 and ALBERT, tokenizes text without relying on spaces, treating the entire input as a continuous stream of characters. This is especially useful for languages like Chinese or Japanese.</p>
                  </div>
                  <div>
                    <h6 className="text-lg font-semibold text-white mb-2">4. tiktoken</h6>
                    <p className="mb-3">Developed by OpenAI for GPT models, tiktoken is a fast and optimized tokenizer built for large-scale inference. It uses advanced BPE-like methods and is designed to handle long context windows efficiently.</p>
                  </div>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Pretraining Data Sources</h5>
                </div>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Text Corpora</li>
                  <li>Web Datasets</li>
                  <li>Data Curation</li>
                  <li>Multilingual Pretraining</li>
                </ul>
              </div>
            </div>

            <div id="major-architectures" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24 relative z-10">
              <h4 className="text-2xl font-semibold text-white mb-4">5. Major LLM Architectures</h4>
              <div className="space-y-6 text-gray-300">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Encoder-Only Models</h5>
                </div>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li><strong className="text-purple-400">BERT:</strong> Bidirectional Encoder Representations from Transformers</li>
                  <li><strong className="text-purple-400">RoBERTa:</strong> Robustly Optimized BERT Approach</li>
                  <li><strong className="text-purple-400">DeBERTa:</strong> Decoding-enhanced BERT with Disentangled Attention</li>
                </ul>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Decoder-Only Models</h5>
                </div>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li><strong className="text-purple-400">GPT:</strong> Generative Pretrained Transformer</li>
                  <li><strong className="text-purple-400">LLaMA:</strong> Large Language Model Meta AI</li>
                  <li><strong className="text-purple-400">Mistral:</strong> High-performance open-source LLM</li>
                  <li><strong className="text-purple-400">Claude:</strong> Anthropic's conversational AI</li>
                  <li><strong className="text-purple-400">Gemini:</strong> Google's multimodal LLM</li>
                </ul>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Encoder-Decoder Models</h5>
                </div>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li><strong className="text-purple-400">T5:</strong> Text-to-Text Transfer Transformer</li>
                  <li><strong className="text-purple-400">BART:</strong> Bidirectional and Auto-Regressive Transformer</li>
                  <li><strong className="text-purple-400">FLAN:</strong> Fine-tuned Language Net</li>
                  <li><strong className="text-purple-400">mT5:</strong> Multilingual T5</li>
                </ul>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Advanced Architectures</h5>
                </div>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li><strong className="text-purple-400">Longformer:</strong> Handles long sequences efficiently</li>
                  <li><strong className="text-purple-400">Claude 3:</strong> Advanced conversational AI</li>
                  <li><strong className="text-purple-400">Gemini 1.5:</strong> Enhanced multimodal capabilities</li>
                  <li><strong className="text-purple-400">Mamba:</strong> State space model architecture</li>
                </ul>
              </div>
            </div>

            {/* Training & Fine-Tuning Group */}
            <div id="training-fine-tuning" className="bg-[#252525] rounded-xl p-8 border border-gray-600 scroll-mt-24 mb-20 mt-20">
              <h3 className="text-3xl font-bold text-white mb-6">Training & Fine-Tuning</h3>
              
              <div className="space-y-12 relative z-10">
                <div id="training-llms" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24 relative z-10">
                  <h4 className="text-2xl font-semibold text-white mb-4">6. Training Large Language Models</h4>
                  <div className="space-y-6 text-gray-300">
                    <p className="mb-3">
                      Training Large Language Models involves several critical steps including data collection, tokenization, model training, optimization, and fine-tuning. This section covers the complete training pipeline for building powerful LLMs.
                    </p>
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <h5 className="text-xl font-semibold text-white mb-3">Key Topics</h5>
                    </div>
                    <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                      <li>Data Collection and Preparation</li>
                      <li>Tokenization Strategies</li>
                      <li>Model Training Process</li>
                      <li>Optimization Techniques</li>
                      <li>Hardware Requirements (GPUs, TPUs)</li>
                      <li>Distributed Training</li>
                      <li>Loss Functions and Optimizers</li>
                      <li>Precision Training (FP16, BF16)</li>
                    </ul>
                  </div>
                </div>

                <div id="fine-tuning" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24 relative z-10">
                  <h4 className="text-2xl font-semibold text-white mb-4">7. Fine-Tuning and Adaptation</h4>
                  <div className="space-y-6 text-gray-300">
                    <p className="mb-3">
                      Fine-tuning allows you to adapt pre-trained LLMs to specific tasks or domains. This section covers various fine-tuning techniques including full fine-tuning and parameter-efficient methods.
                    </p>
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <h5 className="text-xl font-semibold text-white mb-3">Key Topics</h5>
                    </div>
                    <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                      <li>Full Fine-Tuning</li>
                      <li>Parameter-Efficient Fine-Tuning (PEFT)</li>
                      <li>LoRA (Low-Rank Adaptation)</li>
                      <li>QLoRA (Quantized LoRA)</li>
                      <li>Adapter Layers</li>
                      <li>Prompt Tuning</li>
                      <li>Task-Specific Adaptation</li>
                    </ul>
                  </div>
                </div>

                <div id="rlhf" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24 relative z-10">
                  <h4 className="text-2xl font-semibold text-white mb-4">8. Reinforcement Learning from Human Feedback (RLHF)</h4>
                  <div className="space-y-6 text-gray-300">
                    <p className="mb-3">
                      RLHF is a technique used to align LLMs with human preferences and values. This process involves training models to produce outputs that humans find helpful, harmless, and honest.
                    </p>
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <h5 className="text-xl font-semibold text-white mb-3">Key Topics</h5>
                    </div>
                    <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                      <li>RLHF Pipeline Overview</li>
                      <li>Reward Modeling</li>
                      <li>Policy Optimization</li>
                      <li>Proximal Policy Optimization (PPO)</li>
                      <li>Human Feedback Collection</li>
                      <li>Alignment and Safety</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Practical Applications Group */}
            <div id="practical-applications" className="bg-[#252525] rounded-xl p-8 border border-gray-600 scroll-mt-24 mb-20 mt-20">
              <h3 className="text-3xl font-bold text-white mb-6">Practical Applications</h3>
              
              <div className="space-y-12 relative z-10">
                <div id="prompt-engineering" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24 relative z-10">
                  <h4 className="text-2xl font-semibold text-white mb-4">9. Prompt Engineering and Context Optimization</h4>
                  <div className="space-y-6 text-gray-300">
                    <p className="mb-3">
                      Prompt engineering is the art and science of crafting effective prompts to get the best results from LLMs. This section covers various prompting techniques and strategies.
                    </p>
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <h5 className="text-xl font-semibold text-white mb-3">Key Topics</h5>
                    </div>
                    <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                      <li>Zero-Shot, Few-Shot, and Chain-of-Thought Prompting</li>
                      <li>Prompt Templates and Patterns</li>
                      <li>Context Window Management</li>
                      <li>Memory and Context Optimization</li>
                      <li>Iterative Prompting</li>
                      <li>Prompt Frameworks (LangChain, Guidance, DSPy)</li>
                    </ul>
                  </div>
                </div>

                <div id="rag" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24 relative z-10">
                  <h4 className="text-2xl font-semibold text-white mb-4">10. Retrieval-Augmented Generation (RAG)</h4>
                  <div className="space-y-6 text-gray-300">
                    <p className="mb-3">
                      RAG combines the power of retrieval systems with LLMs to provide accurate, up-to-date information by retrieving relevant context from external knowledge bases.
                    </p>
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <h5 className="text-xl font-semibold text-white mb-3">Key Topics</h5>
                    </div>
                    <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                      <li>RAG Architecture Overview</li>
                      <li>Retrievers and Vector Databases</li>
                      <li>Embedding Models</li>
                      <li>FAISS, Pinecone, Chroma, Milvus</li>
                      <li>RAG Pipeline Implementation</li>
                      <li>Hybrid Search Strategies</li>
                    </ul>
                  </div>
                </div>

                <div id="evaluation-metrics" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24 relative z-10">
                  <h4 className="text-2xl font-semibold text-white mb-4">11. Evaluation and Metrics for LLMs</h4>
                  <div className="space-y-6 text-gray-300">
                    <p className="mb-3">
                      Evaluating LLM performance requires comprehensive metrics that measure accuracy, coherence, safety, and alignment with human values.
                    </p>
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <h5 className="text-xl font-semibold text-white mb-3">Key Topics</h5>
                    </div>
                    <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                      <li>Perplexity and Cross-Entropy Loss</li>
                      <li>BLEU, ROUGE, and METEOR Scores</li>
                      <li>Human Evaluation</li>
                      <li>Benchmark Datasets (GLUE, SuperGLUE, HELM)</li>
                      <li>Task-Specific Metrics</li>
                      <li>Bias and Fairness Evaluation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Topics Group */}
            <div id="advanced-topics" className="bg-[#252525] rounded-xl p-8 border border-gray-600 scroll-mt-24 mb-20 mt-20">
              <h3 className="text-3xl font-bold text-white mb-6">Advanced Topics</h3>
              
              <div className="space-y-12 relative z-10">
                <div id="memory-reasoning" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24 relative z-10">
                  <h4 className="text-2xl font-semibold text-white mb-4">12. Memory, Reasoning, and Tool Use</h4>
                  <div className="space-y-6 text-gray-300">
                    <p className="mb-3">
                      Advanced LLMs can maintain memory, perform complex reasoning, and use external tools to accomplish tasks beyond simple text generation.
                    </p>
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <h5 className="text-xl font-semibold text-white mb-3">Key Topics</h5>
                    </div>
                    <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                      <li>Short-Term and Long-Term Memory</li>
                      <li>Chain-of-Thought Reasoning</li>
                      <li>Tool Use and Function Calling</li>
                      <li>Agent Frameworks</li>
                      <li>Multi-Step Reasoning</li>
                    </ul>
                  </div>
                </div>

                <div id="multimodal-llms" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24 relative z-10">
                  <h4 className="text-2xl font-semibold text-white mb-4">13. Multimodal and Specialized LLMs</h4>
                  <div className="space-y-6 text-gray-300">
                    <p className="mb-3">
                      Modern LLMs can process and generate multiple types of data including text, images, audio, and video, enabling more versatile AI applications.
                    </p>
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <h5 className="text-xl font-semibold text-white mb-3">Key Topics</h5>
                    </div>
                    <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                      <li>Text and Image Integration</li>
                      <li>Text and Audio Understanding</li>
                      <li>Unified Multimodal Learning</li>
                      <li>Vision-Language Models</li>
                      <li>Specialized Domain Models</li>
                    </ul>
                  </div>
                </div>

                <div id="inference-deployment" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24 relative z-10">
                  <h4 className="text-2xl font-semibold text-white mb-4">14. Efficient LLM Inference and Deployment</h4>
                  <div className="space-y-6 text-gray-300">
                    <p className="mb-3">
                      Deploying LLMs in production requires optimization for speed, cost, and resource efficiency while maintaining model quality.
                    </p>
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <h5 className="text-xl font-semibold text-white mb-3">Key Topics</h5>
                    </div>
                    <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                      <li>Quantization Techniques</li>
                      <li>Model Compression</li>
                      <li>Inference Optimization</li>
                      <li>Batch Processing</li>
                      <li>Deployment Strategies</li>
                      <li>Cost Optimization</li>
                    </ul>
                  </div>
                </div>

                <div id="safety-ethics" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24 relative z-10">
                  <h4 className="text-2xl font-semibold text-white mb-4">15. Safety, Ethics, and Responsible LLMs</h4>
                  <div className="space-y-6 text-gray-300">
                    <p className="mb-3">
                      Building safe, ethical, and responsible LLMs is crucial for their widespread adoption and positive impact on society.
                    </p>
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <h5 className="text-xl font-semibold text-white mb-3">Key Topics</h5>
                    </div>
                    <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                      <li>Bias Detection and Mitigation</li>
                      <li>Safety Alignment</li>
                      <li>Content Filtering</li>
                      <li>Privacy and Data Protection</li>
                      <li>Ethical AI Principles</li>
                      <li>Regulatory Compliance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Operations & Applications Group */}
            <div id="operations-applications" className="bg-[#252525] rounded-xl p-8 border border-gray-600 scroll-mt-24 mb-20 mt-20">
              <h3 className="text-3xl font-bold text-white mb-6">Operations & Applications</h3>
              
              <div className="space-y-12 relative z-10">
                <div id="llm-ops" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24 relative z-10">
                  <h4 className="text-2xl font-semibold text-white mb-4">16. LLM Ops (Operationalization of LLMs)</h4>
                  <div className="space-y-6 text-gray-300">
                    <p className="mb-3">
                      LLM Ops involves the practices, tools, and processes needed to deploy, monitor, and maintain LLMs in production environments.
                    </p>
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <h5 className="text-xl font-semibold text-white mb-3">Key Topics</h5>
                    </div>
                    <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                      <li>Model Versioning and Management</li>
                      <li>Monitoring and Observability</li>
                      <li>Performance Tracking</li>
                      <li>Cost Management</li>
                      <li>Scaling Strategies</li>
                      <li>Incident Response</li>
                    </ul>
                  </div>
                </div>

                <div id="building-applications" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24 relative z-10">
                  <h4 className="text-2xl font-semibold text-white mb-4">17. Building Applications with LLMs</h4>
                  <div className="space-y-6 text-gray-300">
                    <p className="mb-3">
                      Learn how to build real-world applications using LLMs, including chatbots, content generators, code assistants, and more.
                    </p>
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <h5 className="text-xl font-semibold text-white mb-3">Key Topics</h5>
                    </div>
                    <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                      <li>Application Architecture Patterns</li>
                      <li>API Integration</li>
                      <li>User Interface Design</li>
                      <li>Error Handling</li>
                      <li>Best Practices</li>
                      <li>Common Pitfalls</li>
                    </ul>
                  </div>
                </div>

                <div id="case-studies" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24 relative z-10">
                  <h4 className="text-2xl font-semibold text-white mb-4">18. Real-World Case Studies</h4>
                  <div className="space-y-6 text-gray-300">
                    <p className="mb-3">
                      Explore real-world implementations of LLMs across various industries and use cases, learning from successful deployments and challenges.
                    </p>
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <h5 className="text-xl font-semibold text-white mb-3">Key Topics</h5>
                    </div>
                    <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                      <li>Healthcare Applications</li>
                      <li>Education and E-Learning</li>
                      <li>Customer Support Automation</li>
                      <li>Content Creation</li>
                      <li>Code Generation Tools</li>
                      <li>Research and Analysis</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-700 relative z-10">
          <button
            onClick={goToPreviousSection}
            disabled={!hasPrevious}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${hasPrevious ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 hover:border-gray-500' : 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Previous</span>
            {hasPrevious && (
              <span className="text-sm text-gray-400">
                {PAGE_HEADINGS[currentIndex - 1]?.title}
              </span>
            )}
          </button>

          <div className="text-sm text-gray-400">
            {currentIndex + 1} of {PAGE_HEADINGS.length}
          </div>

          <button
            onClick={goToNextSection}
            disabled={!hasNext}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${hasNext ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 hover:border-gray-500' : 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed'}`}
          >
            <span>Next</span>
            {hasNext && (
              <span className="text-sm text-gray-400">
                {PAGE_HEADINGS[currentIndex + 1]?.title}
              </span>
            )}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </TechLayout>
  );
}

