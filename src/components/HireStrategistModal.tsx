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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    setError(null);

    // Try to get Web3Forms Access Key from environment variables
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setError("Contact configuration missing (VITE_WEB3FORMS_ACCESS_KEY is not defined).");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `🤝 [Collaboration/Hire Message] from ${name}`,
          from_name: "Tarun Jain Portfolio",
          replyto: email,
          "Client Name": name,
          "Contact Email": email,
          "Message / Project Details": additionalInfo,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.message || "Failed to send message. Please check configuration.");
      }
    } catch (err) {
      console.error("Web3Forms submission error:", err);
      setError("Network error. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
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
                <span className="font-display font-semibold text-lg tracking-wide text-zinc-100">Work &amp; Collaborate</span>
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
                    I'm an aspiring ML and Systems Engineer passionate about computer vision, custom AI pipelines, and efficient backend architectures. Reach out for internships, project collaborations, or just to say hello!
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
                      Message &amp; Project Details
                    </label>
                    <textarea
                      rows={4}
                      value={additionalInfo}
                      onChange={(e) => setAdditionalInfo(e.target.value)}
                      placeholder="Tell me about your project idea, internship opportunity, or collaboration notes..."
                      className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-amber-500 rounded px-3 py-2 text-sm text-zinc-100 outline-none resize-none transition-all"
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded font-mono">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 font-semibold rounded-md flex items-center justify-center gap-2 text-sm transition-colors cursor-pointer ${
                      isSubmitting
                        ? "bg-amber-500/50 text-zinc-950/70 cursor-not-allowed"
                        : "bg-amber-500 hover:bg-amber-600 text-zinc-950"
                    }`}
                  >
                    <Send className={`w-4 h-4 ${isSubmitting ? "animate-pulse" : ""}`} />
                    <span>{isSubmitting ? "Sending Message..." : "Send Message"}</span>
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
                    <h3 className="font-display font-bold text-xl text-zinc-100">Message Transmitted</h3>
                    <p className="text-sm text-zinc-400">
                      Thank you, <b className="text-zinc-200">{name}</b>. Your message was sent successfully.
                    </p>
                    <p className="text-xs text-zinc-500">
                      I'll get back to you at <b className="text-zinc-400">{email}</b> as soon as possible!
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      onClose();
                    }}
                    className="mt-6 px-6 py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-200 text-xs rounded transition-colors"
                  >
                    Return to Portfolio
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
