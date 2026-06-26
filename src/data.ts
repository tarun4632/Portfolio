import { Project, SkillCategory, Experience, Achievement, Leadership, OrganizedEvent } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'bidding-agent',
    title: 'Real-Time Bidding Agent',
    description: 'High-throughput bid optimization.',
    tag: 'STACK: PYTHON, ML, RL',
    iconName: 'Cpu',
    githubUrl: 'https://github.com/tarun4632/AdobeDevcraft-Real-Time-Bidding-Agent'
  },
  {
    id: 'wikigpt',
    title: 'WikiGPT',
    description: 'LLM-powered knowledge retrieval.',
    tag: 'STACK: PYTHON, LLM',
    iconName: 'BookOpen',
    githubUrl: 'https://github.com/tarun4632/WikiGPT'
  },
  {
    id: 'hateshield',
    title: 'HateShield',
    description: 'AI-driven content moderation.',
    tag: 'STACK: PYTHON, JS, HUGGING FACE',
    iconName: 'ShieldAlert',
    githubUrl: 'https://github.com/tarun4632/HateShield'
  },
  {
    id: 'medilink',
    title: 'MediLink',
    description: 'Medical assistant with RAG integration.',
    tag: 'STACK: PYTHON, RAG, PINECONE',
    iconName: 'Activity',
    githubUrl: 'https://github.com/tarun4632/MediLink'
  },
  {
    id: 'linkgenie',
    title: 'LinkGenie',
    description: 'Interactive system to talk with websites.',
    tag: 'STACK: PYTHON, LANGCHAIN',
    iconName: 'Link2',
    githubUrl: 'https://github.com/tarun4632/LinkGenie'
  },
  {
    id: 'signpal',
    title: 'SignPal',
    description: 'Computer vision for sign language.',
    tag: 'STACK: OPENCV, PYTORCH',
    iconName: 'Fingerprint',
    githubUrl: 'https://github.com/tarun4632/SignPal'
  },
  {
    id: 'sentiment-analysis',
    title: 'SentimentAnalysis',
    description: 'Image-based sentiment analysis.',
    tag: 'STACK: PYTHON, PYTORCH',
    iconName: 'Image',
    githubUrl: 'https://github.com/tarun4632/SentimentAnalysis'
  },
  {
    id: 'snake-ai',
    title: 'SnakeAI',
    description: 'Reinforcement learning implementation.',
    tag: 'STACK: RL, PYTHON',
    iconName: 'Gamepad2',
    githubUrl: 'https://github.com/tarun4632/SnakeAI'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'LANGUAGES',
    items: [
      { name: 'Python' },
      { name: 'C++' },
      { name: 'Java' },
      { name: 'JavaScript' },
      { name: 'HTML/CSS' }
    ]
  },
  {
    title: 'ML / DL',
    items: [
      { name: 'PyTorch' },
      { name: 'TensorFlow' },
      { name: 'Scikit-Learn' },
      { name: 'Pandas' },
      { name: 'OpenCV' }
    ]
  },
  {
    title: 'SPECIALIZATIONS',
    items: [
      { name: 'NLP' },
      { name: 'Computer Vision' },
      { name: 'Deep Learning' },
      { name: 'Data Pipelines' }
    ]
  },
  {
    title: 'FRAMEWORKS',
    items: [
      { name: 'FastAPI' },
      { name: 'Flask' },
      { name: 'LangChain' },
      { name: 'LangGraph' },
      { name: 'CrewAI' },
      { name: 'Docker' }
    ]
  },
  {
    title: 'CLOUD',
    items: [
      { name: 'Azure' },
      { name: 'GCP' },
      { name: 'AWS' }
    ]
  },
  {
    title: 'CORE',
    items: [
      { name: 'Data Structures & Algorithms' },
      { name: 'Operating Systems' },
      { name: 'DBMS' },
      { name: 'Computer Networks' },
      { name: 'OOPs' }
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    role: 'ML Engineer',
    company: 'Wanderlust',
    location: 'Tokyo',
    period: 'Past',
    status: 'PAST',
    bullets: [
      'Developed a cloud-agnostic ETL pipeline (Ark) for high-volume data processing.',
      'Engineered a robust RAG pipeline for advanced knowledge retrieval and generation.',
      'Implemented complex P&ID (Piping and Instrumentation Diagram) analysis using computer vision models.'
    ]
  },
  {
    role: 'AI Engineer Intern',
    company: 'DroneArch Systems',
    location: 'India',
    period: 'Past',
    status: 'PAST',
    bullets: [
      'Trained and optimized crowd-counting and fire-detection models leveraging YOLO and R-CNN architectures.',
      'Deployed models to Google Cloud Platform (GCP) for scalable real-time inference.',
      'Enhanced overall model accuracy by 15% through strategic data augmentation and hyperparameter tuning.'
    ]
  },
  {
    role: 'Software Engineer Intern',
    company: 'Heuronics',
    location: 'India',
    period: 'Past',
    status: 'PAST',
    bullets: [
      'Developed a Graphical User Interface (GUI) for an Autonomous Underwater Vehicle (AUV) featuring real-time video telemetry.',
      'Fine-tuned computer vision models optimized for deployment on NVIDIA Jetson Nano edge devices.',
      'Collaborated closely with hardware teams to ensure seamless sensor integration and reliable data streams.'
    ]
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  { title: 'Adobe DevCraft 2025', detail: '2nd Place' },
  { title: 'BuildWithDelhi \'24', detail: 'Best AI Team' },
  { title: 'BrAinwave Hackathon', detail: '2nd Place' },
  { title: 'CodeCrunch ML by Microsoft', detail: '2nd Place' }
];

export const LEADERSHIPS: Leadership[] = [
  {
    role: 'Treasurer',
    organization: 'AIMS-DTU',
    description: 'Managed funds & executed 5+ events for 600+ students.'
  },
  {
    role: 'Mentor',
    organization: 'GDSC-DTU',
    description: 'Mentored 15+ juniors.'
  },
  {
    role: 'Co-Head',
    organization: 'AIMS-DTU',
    description: 'Led corporate relations and team management.'
  }
];

export const ORGANIZED_EVENTS: OrganizedEvent[] = [
  { name: 'BrAinwave', url: 'https://brainwave.devfolio.co/' },
  { name: 'BrAinwave 2.0', url: 'https://brainwave2.devfolio.co/' },
  { name: 'Synaptix Invictus 2025', url: 'https://unstop.com/hackathons/synaptix-invictus-2025-technical-council-dtu-1394662' }
];
