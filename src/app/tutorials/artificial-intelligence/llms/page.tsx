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
  { id: 'llm-introduction', title: 'Introduction to Large Language Models (LLMs)' },
  { id: 'foundations', title: 'Foundations of Language Modeling' },
  { id: 'transformer-architecture', title: 'Transformer Architecture (Core Foundation)' },
  { id: 'pretraining-tokenization', title: 'Pretraining and Tokenization' },
  { id: 'major-architectures', title: 'Major LLM Architectures' }
];

const SUBSECTION_PARENT: Record<string, string> = {
  'llm-introduction': 'llms',
  'foundations': 'llms',
  'transformer-architecture': 'llms',
  'pretraining-tokenization': 'llms',
  'major-architectures': 'llms'
};

const createModuleNavigationItems = (): Array<{ id: string; title: string; href: string; icon?: string; children?: Array<{ id: string; title: string; href: string }> }> => {
  const basePath = '/tutorials/artificial-intelligence/llms';
  
  return [
    {
      id: 'llms',
      title: 'Large Language Models (LLMs)',
      href: `${basePath}#llms`,
      icon: '🤖',
      children: PAGE_HEADINGS.map(heading => ({
        id: heading.id,
        title: heading.title,
        href: `${basePath}#${heading.id}`
      }))
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
      if (!hash || hash === 'llms') {
        setActiveSection('llm-introduction');
        setActiveSubsection(null);
        return;
      }

      // Check if hash is a direct section
      if (PAGE_HEADINGS.some(heading => heading.id === hash)) {
        setActiveSection(hash);
        setActiveSubsection(null);
      } else {
        // It's a subsection, find parent
        const parentSection = SUBSECTION_PARENT[hash] || 'llms';
        setActiveSection(parentSection);
        setActiveSubsection(hash);
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
                <p className="mb-3">
                  The Transformer architecture, introduced in "Attention Is All You Need" (2017), is the foundation of modern LLMs. It revolutionized natural language processing by replacing recurrent layers with self-attention mechanisms.
                </p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Key Components</h5>
                </div>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li><strong className="text-purple-400">Self-Attention:</strong> Allows the model to focus on different parts of the input sequence</li>
                  <li><strong className="text-purple-400">Multi-Head Attention:</strong> Enables the model to attend to information from different representation subspaces</li>
                  <li><strong className="text-purple-400">Positional Encoding:</strong> Provides information about the position of tokens in the sequence</li>
                  <li><strong className="text-purple-400">Feed-Forward Networks:</strong> Processes the attended information</li>
                  <li><strong className="text-purple-400">Layer Normalization:</strong> Stabilizes training</li>
                </ul>
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

