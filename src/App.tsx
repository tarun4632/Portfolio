import { useState, useEffect } from 'react';
import {
  Cpu,
  BookOpen,
  ShieldAlert,
  Activity,
  Link2,
  Fingerprint,
  Image as ImageIcon,
  Gamepad2,
  ExternalLink,
  ChevronRight,
  Terminal,
  ArrowUpRight,
  Award,
  Users,
  Calendar,
  Briefcase,
  MapPin,
  Github,
  Linkedin,
  Sparkles,
  Mail,
  Flame,
  TrendingUp,
  Award as AwardIcon
} from 'lucide-react';

import ShaderBackground from './components/ShaderBackground';
import SystemLogsModal from './components/SystemLogsModal';
import HireStrategistModal from './components/HireStrategistModal';
import profileImage from '../assets/profile.png';

import {
  PROJECTS,
  SKILL_CATEGORIES,
  EXPERIENCES,
  ACHIEVEMENTS,
  LEADERSHIPS,
  ORGANIZED_EVENTS
} from './data';

export default function App() {
  const [logsOpen, setLogsOpen] = useState(false);
  const [hireOpen, setHireOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('ABOUT');

  useEffect(() => {
    const sections = [
      { id: 'about', name: 'ABOUT' },
      { id: 'projects', name: 'PROJECTS' },
      { id: 'stack', name: 'STACK' },
      { id: 'experience', name: 'EXPERIENCE' }
    ];

    const handleScroll = () => {
      // Check if we are close to the bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      if (isAtBottom) {
        setActiveTab('EXPERIENCE');
        return;
      }

      // Check if we are near the top of the page
      if (window.scrollY < 100) {
        setActiveTab('ABOUT');
        return;
      }

      let activeSection = 'ABOUT';
      for (const sec of sections) {
        const element = document.getElementById(sec.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the element's top is less than 150px from the viewport top,
          // it means we have scrolled past or into this section.
          if (rect.top <= 150) {
            activeSection = sec.name;
          }
        }
      }
      setActiveTab(activeSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to set correct state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper to map string to Lucide Icon for Project Repository
  const getProjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5 text-amber-500" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-emerald-500" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-red-500" />;
      case 'Activity': return <Activity className="w-5 h-5 text-sky-500" />;
      case 'Link2': return <Link2 className="w-5 h-5 text-indigo-500" />;
      case 'Fingerprint': return <Fingerprint className="w-5 h-5 text-purple-500" />;
      case 'Image': return <ImageIcon className="w-5 h-5 text-pink-500" />;
      case 'Gamepad2': return <Gamepad2 className="w-5 h-5 text-teal-500" />;
      default: return <Cpu className="w-5 h-5 text-zinc-400" />;
    }
  };

  const handleNavClick = (sectionId: string, tabName: string) => {
    setActiveTab(tabName);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen text-zinc-300 font-sans selection:bg-amber-500/30 selection:text-white pb-12 overflow-x-hidden">
      {/* Interactive WebGL Hexagon Grid Background */}
      <ShaderBackground />

      {/* HEADER NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-zinc-950/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo Name */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img
              src="https://github.com/tarun4632.png"
              alt="Tarun Jain"
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full border border-amber-500/40 object-cover bg-zinc-900 shadow-md shadow-amber-500/10"
            />
            <span className="font-display font-bold tracking-widest text-lg text-white uppercase">
              TARUN JAIN
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 font-mono text-xs font-semibold tracking-wider">
            {[
              { name: 'ABOUT', id: 'about' },
              { name: 'PROJECTS', id: 'projects' },
              { name: 'STACK', id: 'stack' },
              { name: 'EXPERIENCE', id: 'experience' }
            ].map((tab) => (
              <button
                key={tab.name}
                onClick={() => handleNavClick(tab.id, tab.name)}
                className={`transition-colors duration-200 cursor-pointer py-1 border-b-2 ${activeTab === tab.name
                  ? 'text-amber-500 border-amber-500'
                  : 'text-zinc-400 hover:text-white border-transparent'
                  }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>

          {/* Call to Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setHireOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-lg shadow-amber-500/10 cursor-pointer"
            >
              <span>HIRE LEAD STRATEGIST</span>
              <Mail className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setLogsOpen(true)}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-zinc-900/40 hover:bg-zinc-800/60 text-cyan-400 border border-cyan-500/20 hover:border-cyan-400/40 font-mono text-xs font-bold uppercase tracking-wider rounded transition-all cursor-pointer shadow-lg shadow-cyan-500/5"
            >
              <span>TERMINAL</span>
              <Terminal className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 space-y-24">

        {/* HERO SECTION / ABOUT */}
        <section id="about" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4 scroll-mt-24">

          {/* Hero Left Info */}
          <div className="lg:col-span-7 space-y-6">
            {/* System Online Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded font-mono text-[10px] text-emerald-400 uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              SYSTEM ONLINE
            </div>

            {/* Title Block */}
            <div className="space-y-2">
              <h1 className="font-display font-black text-5xl sm:text-6xl text-white tracking-tight leading-tight">
                Machine<br />
                Learning <span className="text-amber-500">&amp;</span><br />
                Systems<br />
                Engineer
              </h1>
              <h2 className="text-xl font-mono text-amber-500 font-medium tracking-wide">
                Tarun Jain
              </h2>
            </div>

            {/* Description */}
            <p className="text-zinc-400 text-base max-w-lg leading-relaxed">
              Building Scalable AI Pipelines and Real-Time Architectures. Transforming complex data into high-performance systems.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => handleNavClick('projects', 'PROJECTS')}
                className="flex items-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-mono text-xs font-bold uppercase tracking-widest rounded transition-colors shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                <span>VIEW WORK</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleNavClick('stack', 'STACK')}
                className="flex items-center gap-2 px-5 py-3 bg-zinc-900/40 hover:bg-zinc-800/60 text-zinc-100 border border-white/5 hover:border-white/10 font-mono text-xs font-bold uppercase tracking-widest rounded backdrop-blur-lg transition-colors cursor-pointer"
              >
                <span>VIEW STACK</span>
                <Terminal className="w-4 h-4 text-amber-500" />
              </button>
            </div>
          </div>

          {/* Hero Right Card (Hexagon Profile) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-80 h-[23rem] bg-zinc-950/40 border border-white/10 rounded-lg p-6 flex flex-col items-center justify-between shadow-2xl backdrop-blur-lg group hover:border-amber-500/40 transition-all duration-300">

              {/* Level Tag (Top Right) */}
              <div className="absolute top-4 right-4 px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/30 rounded font-mono text-[9px] text-emerald-400 uppercase tracking-wider">
                Lvl 20
              </div>

              {/* Styled Hexagon Profile Frame */}
              <div className="relative mt-4 w-52 h-52 flex items-center justify-center">
                {/* Outer glowing hexagon background decoration */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-cyan-500/20 opacity-40 blur-md transition-transform group-hover:scale-105 duration-300"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                  }}
                />

                {/* Inner Hexagon Frame border */}
                <div
                  className="absolute inset-0.5 bg-zinc-900 border border-amber-500/30 p-1 transition-transform group-hover:scale-102 duration-300"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    transform: 'scale(1.06)', // Try 1.02–1.05
                    transformOrigin: 'center'
                  }}
                >
                  <a
                    href="https://www.linkedin.com/in/tarun-jain07/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full cursor-pointer overflow-hidden"
                    style={{
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                    }}
                  >
                    <img
                      src={profileImage}
                      alt="Tarun Jain Profile"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top scale-95 grayscale brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-300"
                      style={{ objectPosition: "center 30%" }}
                    />
                  </a>
                </div>
              </div>

              {/* Card Meta Footer */}
              <div className="text-center space-y-1">
                <span className="block text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                  CLASS
                </span>
                <span className="block font-display font-semibold text-amber-500 tracking-widest text-sm uppercase">
                  Architect
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* COLONIST PROFILE SECTION */}
        <section id="performance" className="space-y-6 pt-12 scroll-mt-24">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-900 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-amber-500 animate-pulse" />
                <h3 className="font-display font-bold text-lg text-white tracking-wide">
                  Colonist Strategic Profile
                </h3>
              </div>
              <p className="text-xs text-zinc-500">
                Competitive analytics &amp; game-theoretic decision metrics.
              </p>
            </div>
            <a
              href="https://colonist.io/profile/Naor4242#overview"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-zinc-950 border border-amber-500/30 rounded text-xs font-mono font-bold transition-all uppercase tracking-wider cursor-pointer"
            >
              <span>VIEW REAL PROFILE ON COLONIST</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Explanation Banner */}
          <div className="p-4 bg-zinc-900/30 border border-white/5 backdrop-blur-md rounded-lg space-y-2 text-xs text-zinc-400 leading-relaxed">
            <h4 className="font-mono text-amber-500 font-bold tracking-wider uppercase text-[10px] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
              VERIFIED 1v1 RANKED PERFORMANCE
            </h4>
            <p>
              This leaderboard tracks official competitive analytics from <strong className="text-zinc-200">Colonist.io</strong> for high-level <strong className="text-zinc-200">1v1 Duels</strong>.
              Settlers of Catan 1v1 is a battle of spatial strategy, resource velocity optimization, and rigorous probability modeling.
              The verified metrics below represent exact high-stakes competitive data.
            </p>
          </div>

          {/* Gamers Profile Card - Glassmorphic Dashboard */}
          <div className="relative overflow-hidden bg-zinc-950/40 border border-white/10 rounded-xl p-6 md:p-8 shadow-2xl backdrop-blur-lg hover:border-amber-500/20 transition-all duration-300">
            {/* Glow light effect */}
            <div className="absolute -left-16 -top-16 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -right-16 -bottom-16 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Profile Card Left Summary */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 border-b lg:border-b-0 lg:border-r border-zinc-900 pb-6 lg:pb-0 lg:pr-8">

                {/* Profile Avatar Badge with Catan Hex Theme */}
                <div className="relative w-20 h-20 rounded-full bg-zinc-900/60 border border-white/10 flex items-center justify-center shadow-lg group">
                  <div className="grid grid-cols-3 gap-0.5 p-2 rotate-12 transition-transform group-hover:rotate-45 duration-500">
                    <div className="w-4 h-4 bg-amber-600/60 rounded" title="Clay" />
                    <div className="w-4 h-4 bg-emerald-600/60 rounded" title="Wood" />
                    <div className="w-4 h-4 bg-sky-600/60 rounded" title="Ore" />
                    <div className="w-4 h-4 bg-yellow-500/60 rounded" title="Wheat" />
                    <div className="w-4 h-4 bg-orange-600/60 rounded" title="Sheep" />
                    <div className="w-4 h-4 bg-zinc-700/60 rounded" title="Desert" />
                  </div>
                  <div className="absolute -bottom-1 px-2.5 py-0.5 bg-amber-500 text-[9px] text-zinc-950 font-mono font-black uppercase rounded tracking-wider shadow">
                    1V1 DUELS
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="font-display font-black text-xl text-white tracking-wide">
                    Naor4242
                  </h4>
                  <p className="text-xs font-mono text-zinc-400 flex items-center justify-center lg:justify-start gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Karma Status: <span className="text-emerald-400 font-bold">10 / 10 Excellent</span>
                  </p>
                </div>

                <div className="pt-2 w-full">
                  <div className="flex justify-between text-xs py-1.5 border-b border-zinc-900/50">
                    <span className="text-zinc-500">Fav Color:</span>
                    <span className="text-orange-500 font-bold uppercase tracking-wider">Orange</span>
                  </div>
                  <div className="flex justify-between text-xs py-1.5 border-b border-zinc-900/50">
                    <span className="text-zinc-500">Style:</span>
                    <span className="text-white font-semibold">Ore-Wheat-Sheep Build</span>
                  </div>
                </div>
              </div>

              {/* Profile Card Right detailed Stats */}
              <div className="lg:col-span-8 space-y-6">

                {/* Rank Header matching the upload layout */}
                <div className="flex items-center gap-4 bg-zinc-900/50 border border-white/5 rounded-lg p-4">
                  {/* Stylized Helmet Emblem */}
                  <div className="relative w-14 h-14 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 rounded-xl flex flex-col items-center justify-center shadow-lg border border-yellow-300/30">
                    {/* Helmet/Shield vector design */}
                    <svg className="w-8 h-8 text-zinc-950" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 12c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    <span className="absolute bottom-1 font-serif font-black text-xs text-zinc-950">I</span>
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-black text-xl text-amber-400 uppercase tracking-wider">
                        Gold I
                      </span>
                      <span className="px-2 py-0.5 bg-zinc-800 border border-white/5 rounded font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                        Tier I Ranked
                      </span>
                    </div>
                    {/* Progress Bar resembling the screenshot */}
                    <div className="w-full bg-zinc-950 rounded-full h-2 overflow-hidden border border-white/5">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '45%' }} />
                    </div>
                  </div>
                </div>

                {/* Tab Content Panels - Exact Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  <div className="bg-zinc-900/30 border border-white/5 p-4 rounded-lg space-y-1">
                    <span className="block text-[9px] font-mono tracking-widest text-zinc-500 uppercase">RATING</span>
                    <span className="block font-display font-black text-lg text-white">1,543</span>
                  </div>
                  <div className="bg-zinc-900/30 border border-white/5 p-4 rounded-lg space-y-1">
                    <span className="block text-[9px] font-mono tracking-widest text-zinc-500 uppercase">GAMES</span>
                    <span className="block font-display font-black text-lg text-white">203</span>
                  </div>
                  <div className="bg-zinc-900/30 border border-white/5 p-4 rounded-lg space-y-1">
                    <span className="block text-[9px] font-mono tracking-widest text-zinc-500 uppercase">WIN %</span>
                    <span className="inline-flex items-center gap-1 font-display font-black text-lg text-amber-500 tracking-wide">
                      <TrendingUp className="w-4 h-4 text-amber-500" />
                      53.7%
                    </span>
                  </div>
                  <div className="bg-zinc-900/30 border border-white/5 p-4 rounded-lg space-y-1">
                    <span className="block text-[9px] font-mono tracking-widest text-zinc-500 uppercase">INDIA</span>
                    <span className="block font-display font-black text-lg text-zinc-300">#652</span>
                  </div>
                  <div className="bg-zinc-900/30 border border-white/5 p-4 rounded-lg space-y-1">
                    <span className="block text-[9px] font-mono tracking-widest text-zinc-500 uppercase">DELHI</span>
                    <span className="block font-display font-black text-lg text-emerald-400">#47</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* PROJECT REPOSITORY SECTION */}
        <section id="projects" className="space-y-4 pt-12 scroll-mt-24">
          {/* Header */}
          <div className="border-b border-zinc-900 pb-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-amber-500" />
              <h3 className="font-display font-bold text-lg text-white tracking-wide">
                Project Repository
              </h3>
            </div>
            <p className="text-xs text-zinc-500">
              Inventory of deployed systems and AI models. Click any card to inspect the codebase on GitHub.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROJECTS.map((project) => (
              <a
                key={project.id}
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-zinc-950/40 border border-white/5 backdrop-blur-lg hover:border-amber-500/40 rounded-lg p-5 flex flex-col justify-between h-48 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 hover:-translate-y-1 cursor-pointer"
              >
                {/* Header Icon */}
                <div className="flex justify-between items-start">
                  <div className="p-2.5 bg-zinc-900/60 border border-zinc-850 rounded group-hover:bg-amber-500/10 group-hover:border-amber-500/25 transition-all duration-300">
                    {getProjectIcon(project.iconName)}
                  </div>
                  {/* Link indicator & subtle tag */}
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[9px] text-zinc-600 font-bold tracking-wider group-hover:text-amber-500/50 transition-colors">
                      SRC-0{project.id.length % 9}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-amber-500 transition-all duration-200" />
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <h4 className="font-display font-semibold text-white group-hover:text-amber-500 transition-colors text-sm tracking-wide">
                    {project.title}
                  </h4>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tag Footer */}
                <div className="border-t border-zinc-900/50 pt-2.5">
                  <div className="flex items-center gap-1.5 text-[9px] font-mono tracking-wider font-semibold text-amber-500/80 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                    {project.tag}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* STRATEGIC STACK SECTION */}
        <section id="stack" className="space-y-4 pt-12 scroll-mt-24">
          {/* Header */}
          <div className="border-b border-zinc-900 pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-amber-500" />
              <h3 className="font-display font-bold text-lg text-white tracking-wide">
                Strategic Stack
              </h3>
            </div>
            <p className="text-xs text-zinc-500">
              Core technologies and tactical specializations.
            </p>
          </div>

          {/* Stacks Grid */}
          <div className="space-y-6">
            {SKILL_CATEGORIES.map((category) => (
              <div key={category.title} className="space-y-2">
                {/* Category label */}
                <h4 className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase">
                  {category.title}
                </h4>

                {/* Skill Capsules */}
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <div
                      key={skill.name}
                      className="group flex items-center gap-1.5 px-3 py-1.5 bg-zinc-950/30 hover:bg-zinc-900/50 border border-white/5 hover:border-amber-500/30 backdrop-blur-sm text-zinc-300 hover:text-white rounded text-xs font-semibold tracking-wide transition-all duration-200 cursor-default"
                    >
                      <ChevronRight className="w-3 h-3 text-amber-500 group-hover:translate-x-0.5 transition-transform" />
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ENGINEERING EXPERIENCE */}
        <section id="experience" className="space-y-4 pt-12 scroll-mt-24">
          {/* Header */}
          <div className="border-b border-zinc-900 pb-3">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-amber-500" />
              <h3 className="font-display font-bold text-lg text-white tracking-wide">
                Engineering Experience
              </h3>
            </div>
            <p className="text-xs text-zinc-500">
              Professional deployments and operational history.
            </p>
          </div>

          {/* Vertical Timeline */}
          <div className="relative border-l border-zinc-900/80 ml-3 pl-8 py-2 space-y-12">
            {EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="relative group">
                {/* Indicator Circle */}
                <div className={`absolute -left-[39px] top-1.5 w-[14px] h-[14px] rounded-full border-2 bg-zinc-950 z-10 transition-colors duration-300 ${exp.status === 'CURRENT'
                  ? 'border-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                  : 'border-amber-500/70 group-hover:border-amber-500'
                  }`} />

                {/* Main Card */}
                <div className="bg-zinc-950/40 border border-white/5 hover:border-white/10 p-6 rounded-lg space-y-4 transition-all duration-300 shadow-lg backdrop-blur-lg">
                  {/* Title & Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                    <div>
                      <h4 className="font-display font-bold text-base text-white tracking-wide group-hover:text-amber-500 transition-colors">
                        {exp.role}
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-400 font-medium">
                        <span className="text-amber-500 font-semibold">{exp.company}</span>
                        <span className="text-zinc-650">•</span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className={`self-start sm:self-center px-2.5 py-0.5 rounded font-mono text-[9px] font-bold tracking-widest uppercase border ${exp.status === 'CURRENT'
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      : 'bg-zinc-900/40 border-white/5 text-zinc-500'
                      }`}>
                      {exp.period}
                    </div>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-2 text-xs text-zinc-400 leading-relaxed list-none">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex gap-2.5 items-start">
                        <span className="text-amber-500 select-none mt-0.5 font-bold">▪</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* THREE COLUMN GRID: ACHIEVEMENTS, LEADERSHIP, ORGANIZED EVENTS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">

          {/* Column 1: Achievements */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-900 pb-2.5">
              <Award className="w-4.5 h-4.5 text-amber-500" />
              <h4 className="font-display font-bold text-sm tracking-wide text-white uppercase">
                Achievements
              </h4>
            </div>

            <div className="space-y-3">
              {ACHIEVEMENTS.map((ach, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-zinc-950/40 border border-white/5 rounded flex items-center justify-between gap-4 hover:border-amber-500/20 backdrop-blur-md transition-colors"
                >
                  <div className="space-y-0.5 text-left">
                    <p className="text-xs font-semibold text-white tracking-wide">{ach.title}</p>
                    <p className="text-[10px] font-mono text-amber-500 uppercase tracking-wider font-bold">{ach.detail}</p>
                  </div>
                  <div className="p-1.5 bg-amber-500/5 rounded border border-amber-500/10">
                    <AwardIcon className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Leadership */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-900 pb-2.5">
              <Users className="w-4.5 h-4.5 text-amber-500" />
              <h4 className="font-display font-bold text-sm tracking-wide text-white uppercase">
                Leadership
              </h4>
            </div>

            <div className="space-y-3">
              {LEADERSHIPS.map((lead, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-zinc-950/40 border border-white/5 rounded space-y-1 text-left hover:border-amber-500/20 backdrop-blur-md transition-colors"
                >
                  <p className="text-xs font-bold text-white tracking-wide">{lead.role} at {lead.organization}</p>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">{lead.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Organized Events */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-900 pb-2.5">
              <Calendar className="w-4.5 h-4.5 text-amber-500" />
              <h4 className="font-display font-bold text-sm tracking-wide text-white uppercase">
                Organized Events
              </h4>
            </div>

            <div className="space-y-3">
              {ORGANIZED_EVENTS.map((event, idx) => (
                <a
                  key={idx}
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-zinc-950/40 border border-white/5 rounded flex items-center justify-between hover:border-amber-500/35 backdrop-blur-md transition-all group cursor-pointer"
                >
                  <span className="text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors">
                    {event.name}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-amber-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              ))}
            </div>
          </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer className="mt-24 border-t border-zinc-900 bg-zinc-950/90 pt-8 pb-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6">

            {/* Left Info */}
            <div className="text-center md:text-left space-y-2">
              <span className="font-display font-black tracking-widest text-base text-white">
                TARUN JAIN
              </span>
              <p className="text-[10px] font-mono text-zinc-500 tracking-wider">
                © 2024. ALL SYSTEMS NOMINAL.
              </p>
            </div>

            {/* Social Links & System Logs trigger */}
            <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-zinc-500">
              <a
                href="https://github.com/tarun4632"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/tarun-jain07/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <button
                onClick={() => setLogsOpen(true)}
                className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 font-semibold text-zinc-400 hover:scale-105 duration-150 cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>System Logs</span>
              </button>
            </div>

          </div>
        </div>
      </footer>

      {/* INTERACTIVE MODALS */}
      <SystemLogsModal isOpen={logsOpen} onClose={() => setLogsOpen(false)} />
      <HireStrategistModal isOpen={hireOpen} onClose={() => setHireOpen(false)} />
    </div>
  );
}
