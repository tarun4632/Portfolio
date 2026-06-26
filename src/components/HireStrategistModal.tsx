import { useState, FormEvent } from 'react';
import { X, Send, Sparkles, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HireStrategistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HireStrategistModal({ isOpen, onClose }: HireStrategistModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const subject = `Lead Strategist Proposal - ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nArchitecture Notes:\n${additionalInfo}`;
    const mailtoUrl = `mailto:tarunjainjain11@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Trigger the email client
    window.location.href = mailtoUrl;

    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          {/* Overlay background click */}
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-lg bg-zinc-950 border border-amber-500/30 rounded-lg shadow-2xl overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-zinc-900 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span className="font-display font-semibold text-lg tracking-wide text-zinc-100">Hire Lead Strategist</span>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-zinc-400 hover:text-amber-500 rounded transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content body */}
            <div className="p-6">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Collaborate with Tarun Jain to design and deploy high-performance computer vision pipelines, custom RAG pipelines, or high-throughput real-time distributed backends.
                  </p>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Satoshi Nakamoto"
                      className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-amber-500 rounded px-3 py-2 text-sm text-zinc-100 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="satoshi@bitcoin.org"
                      className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-amber-500 rounded px-3 py-2 text-sm text-zinc-100 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      Architecture Notes
                    </label>
                    <textarea
                      rows={4}
                      value={additionalInfo}
                      onChange={(e) => setAdditionalInfo(e.target.value)}
                      placeholder="Brief description of database requirements or processing constraints..."
                      className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-amber-500 rounded px-3 py-2 text-sm text-zinc-100 outline-none resize-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-semibold rounded-md flex items-center justify-center gap-2 text-sm transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Project Proposal</span>
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-xl text-zinc-100">Proposal Transmission Complete</h3>
                    <p className="text-sm text-zinc-400">
                      Thank you, <b className="text-zinc-200">{name}</b>. Your system architecture specifications have been prepared.
                    </p>
                    <p className="text-xs text-zinc-500">
                      If your mail client didn't open automatically, please send your notes directly to <b className="text-zinc-400">tarunjainjain11@gmail.com</b>.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      onClose();
                    }}
                    className="mt-6 px-6 py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-200 text-xs rounded transition-colors"
                  >
                    Return to Blueprint
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
