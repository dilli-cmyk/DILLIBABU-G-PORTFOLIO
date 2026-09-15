import { Profile, Skill, Project, ContactMessage } from '../types';

export const initialProfile: Profile = {
  name: "DILLIBABU G",
  role: "Aspiring AI Engineer",
  degree: "BCA (Bachelor of Computer Applications)",
  email: "dillibabu2618@gmail.com",
  phone: "+91 7539949771",
  github: "https://github.com/dilli-cmyk",
  linkedin: "https://www.linkedin.com/in/dillibabu-g-395a90291/",
  location: "India",
  headline: "Building Intelligent Solutions with AI, Machine Learning & Deep Learning",
  supportingText: "Focused on Python, Machine Learning, Deep Learning and Natural Language Processing, with a passion for building practical intelligent applications.",
  bio: "I am a BCA student and passionate Aspiring AI Engineer. My primary focus is on developing robust algorithms, training neural networks, processing natural language text, and deploying machine learning models into intuitive, real-world full-stack web applications."
};

export const initialSkills: Skill[] = [
  // Programming
  {
    id: "sk-1",
    name: "Python",
    category: "Programming",
    description: "Core language for AI/ML development, data structures, OOP, NumPy, Pandas, and scripting.",
    level: "Proficient",
    icon: "Code"
  },
  {
    id: "sk-2",
    name: "Data Structures & OOP",
    category: "Programming",
    description: "Algorithmic thinking, object-oriented design in Python, clean code principles.",
    level: "Proficient",
    icon: "Terminal"
  },
  // Machine Learning
  {
    id: "sk-3",
    name: "Machine Learning",
    category: "Machine Learning",
    description: "Supervised & unsupervised learning, regression, classification, clustering with Scikit-learn.",
    level: "Proficient",
    icon: "Brain"
  },
  {
    id: "sk-4",
    name: "Model Training & Pipeline",
    category: "Machine Learning",
    description: "Feature extraction, cross-validation, hyperparameter tuning, model evaluation metrics.",
    level: "Proficient",
    icon: "Cpu"
  },
  {
    id: "sk-5",
    name: "Data Preprocessing",
    category: "Machine Learning",
    description: "Data cleaning, missing value imputation, feature scaling, encoding categorical variables.",
    level: "Proficient",
    icon: "Database"
  },
  {
    id: "sk-6",
    name: "Model Evaluation",
    category: "Machine Learning",
    description: "Confusion matrix, ROC-AUC, Precision/Recall, MSE, RMSE, and error analysis.",
    level: "Proficient",
    icon: "BarChart3"
  },
  // Deep Learning
  {
    id: "sk-7",
    name: "Neural Networks",
    category: "Deep Learning",
    description: "Multi-layer Perceptrons (MLP), forward/backward propagation, activation functions, loss optimization.",
    level: "Intermediate",
    icon: "Network"
  },
  {
    id: "sk-8",
    name: "Deep Learning Frameworks",
    category: "Deep Learning",
    description: "Model architecture design with PyTorch / TensorFlow basics, layer tuning, dropouts.",
    level: "Intermediate",
    icon: "Layers"
  },
  // NLP
  {
    id: "sk-9",
    name: "Natural Language Processing",
    category: "NLP",
    description: "Text tokenization, lemmatization, TF-IDF vectorization, word embeddings, NLTK & SpaCy.",
    level: "Intermediate",
    icon: "MessageSquareText"
  },
  {
    id: "sk-10",
    name: "Sentiment Analysis",
    category: "NLP",
    description: "Classifying user reviews and feedback into positive/negative/neutral sentiment categories.",
    level: "Intermediate",
    icon: "Smile"
  },
  {
    id: "sk-11",
    name: "Text Classification",
    category: "NLP",
    description: "Intent recognition, spam detection, topic categorization using Naive Bayes and Neural Networks.",
    level: "Intermediate",
    icon: "FileText"
  }
];

export const initialProjects: Project[] = [
  {
    id: "proj-1",
    title: "NLP Text Sentiment & Classifier Laboratory",
    slug: "nlp-text-sentiment-classifier",
    description: "An interactive NLP text classification application built with Python and Natural Language Processing pipelines.",
    problem: "Analyzing large volumes of unstructured text data manually is slow and prone to subjective bias in customer feedback.",
    solution: "Developed an automated NLP text processor that tokenizes, cleans, and applies machine learning classifiers to determine sentiment and topic categories.",
    technologies: ["Python", "NLTK", "Scikit-Learn", "NLP", "TF-IDF", "Express", "React"],
    githubUrl: "https://github.com/dilli-cmyk/nlp-text-classifier",
    liveUrl: "https://github.com/dilli-cmyk",
    imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80",
    featured: true,
    status: "Completed",
    category: "NLP",
    aiMlApproach: "Text pre-processing using tokenization, stop-word filtering, TF-IDF feature extraction, and Naive Bayes / SVM classifier models.",
    keyFeatures: [
      "Real-time sentiment score analysis",
      "Topic tag extraction from user text",
      "Interactive confidence metric visualization",
      "Batch text file upload processing"
    ],
    results: "Achieved reliable text classification accuracy on standard evaluation datasets during model training."
  },
  {
    id: "proj-2",
    title: "Predictive Analytics & ML Model Suite",
    slug: "predictive-analytics-ml-suite",
    description: "A machine learning workspace demonstrating model training, hyperparameter tuning, and regression/classification benchmarks.",
    problem: "Businesses need clean, interpretable machine learning models to forecast outcomes from complex historical tabular datasets.",
    solution: "Engineered a Python machine learning pipeline that handles feature scaling, cross-validation, and multi-model performance benchmarking.",
    technologies: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Matplotlib", "Machine Learning"],
    githubUrl: "https://github.com/dilli-cmyk/ml-predictive-suite",
    liveUrl: "https://github.com/dilli-cmyk",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    featured: true,
    status: "Completed",
    category: "Machine Learning",
    aiMlApproach: "Supervised machine learning pipeline combining Decision Trees, Random Forests, and Ridge Regression with standard scaler preprocessing.",
    keyFeatures: [
      "Automated feature correlation matrix calculation",
      "Model benchmarking (RMSE, R2 score, F1-Score)",
      "Cross-validation performance plotting",
      "Clean parameter selection"
    ],
    results: "Provided clear model comparison metrics showing optimal trade-offs between speed and accuracy."
  },
  {
    id: "proj-3",
    title: "Deep Learning Neural Network Classifier",
    slug: "deep-learning-neural-network-classifier",
    description: "A custom multi-layer perceptron neural network implementation exploring deep learning activation functions and epoch optimization.",
    problem: "Understanding internal weights, gradient updates, and loss convergence in deep neural networks.",
    solution: "Constructed a multi-layer neural network architecture from foundational Python primitives, visualizing epoch loss curves and accuracy metrics.",
    technologies: ["Python", "PyTorch", "Deep Learning", "Neural Networks", "NumPy"],
    githubUrl: "https://github.com/dilli-cmyk/deep-learning-nn",
    liveUrl: "https://github.com/dilli-cmyk",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    featured: true,
    status: "Completed",
    category: "Deep Learning",
    aiMlApproach: "Designed input-hidden-output neural architectures with ReLU/Sigmoid activations, Adam optimizer, and cross-entropy loss tracking.",
    keyFeatures: [
      "Epoch-by-epoch loss curve plotting",
      "Layer weight inspection and activation visuals",
      "Flexible learning rate scheduler support",
      "Synthetic dataset classification demo"
    ],
    results: "Demonstrated stable loss convergence and accurate decision boundaries on test sets."
  },
  {
    id: "proj-4",
    title: "AI Engineer Assistant & Portfolio Hub",
    slug: "ai-engineer-assistant-portfolio-hub",
    description: "A full-stack 3D interactive web workspace featuring a custom Gemini AI chatbot lab, REST APIs, and admin dashboard.",
    problem: "Recruiters and hiring managers need an interactive way to explore an applicant's skills, code, and project capabilities in real time.",
    solution: "Built a full-stack portfolio app integrated with 3D Canvas visualizers, REST APIs, and an AI assistant that answers recruiter questions.",
    technologies: ["TypeScript", "Express", "React", "Three.js", "Gemini AI API", "Tailwind CSS"],
    githubUrl: "https://github.com/dilli-cmyk/3d-ai-portfolio",
    liveUrl: "https://github.com/dilli-cmyk",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    featured: true,
    status: "Featured",
    category: "Python App",
    aiMlApproach: "Server-side integration with Gemini 3.6 Flash LLM configured with structured portfolio context and strict prompt constraints.",
    keyFeatures: [
      "Interactive 3D neural network sphere hero scene",
      "AI LAB terminal powered by Gemini API",
      "REST API server with OpenAPI docs",
      "Secure Admin Dashboard for content management"
    ],
    results: "Delivers an engaging full-stack experience for prospective employers and collaborators."
  }
];

export const initialMessages: ContactMessage[] = [
  {
    id: "msg-1",
    name: "Recruiter / Hiring Manager",
    email: "recruiter@example.com",
    subject: "AI Internship / Job Opportunity",
    message: "Hi DILLIBABU, we reviewed your profile in Python and ML/NLP. We'd love to connect regarding opportunities!",
    status: "unread",
    createdAt: new Date().toISOString()
  }
];
