import { useState, useEffect, useRef } from 'react';
import { X, Terminal, Cpu, HardDrive, Gauge, Wifi } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SystemLogsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LOG_MESSAGES = [
  '[SYSTEM] Booting quantum-encrypted kernel v4.19.12-tarun...',
  '[SYSTEM] Initializing memory matrix allocation: 64GB LPDDR5...',
  '[NETWORK] Handshaking secure proxy gateway tunnel (port: 3000)...',
  '[SECURITY] Firewalls: ACTIVE. TLS 1.3 encryption handshake complete.',
  '[MODEL] Loading Transformer weights: WikiGPT-7B (fp16 quantization)...',
  '[MODEL] WikiGPT status: ONLINE. Inference speed: 42 tokens/sec.',
  '[PIPELINE] Deploying Real-Time Bidding Agent (Go microservice)...',
  '[DB] Connecting Redis Cache clustering... PING -> PONG (0.4ms)',
  '[CV] Activating P&ID pipeline: YOLOv8 semantic segmentation model loaded.',
  '[CV] Device check: NVIDIA Jetson Nano optimization profile activated.',
  '[GAME] Colonist.io Game Engine: Handshaking Naor4242 stats API...',
  '[GAME] Naor4242 synced: Rank: Gold I, Win Rate: 53.7%, Elo: 1543.',
  '[SYSTEM] All services are NOMINAL. Standing by for client requests.'
];

export default function SystemLogsModal({ isOpen, onClose }: SystemLogsModalProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [cpuUsage, setCpuUsage] = useState(12);
  const [ramUsage, setRamUsage] = useState(4.2);
  const [inputValue, setInputValue] = useState('');
  const [isBooted, setIsBooted] = useState(false);
  const [ping, setPing] = useState<number | string>('...');
  const [speed, setSpeed] = useState<string>('...');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [tempDraft, setTempDraft] = useState('');
  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Measure Real Network Ping (Round-Trip Latency)
  useEffect(() => {
    if (!isOpen) return;

    const measurePing = async () => {
      try {
        const start = performance.now();
        // Fetch root with a cache-buster query parameter to force round-trip
        await fetch('/?t=' + Date.now(), { method: 'HEAD', cache: 'no-store' });
        const end = performance.now();
        const latency = Math.round(end - start);
        console.log(`[Telemetry] Real ping measured: ${latency}ms`);
        setPing(latency);
      } catch (e) {
        console.warn("[Telemetry] Latency check failed, using fallback 12ms", e);
        setPing(12); // Fallback ping in ms
      }
    };

    measurePing();
    const interval = setInterval(measurePing, 5000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Measure Real Download Speed from a remote CDN
  const measureSpeed = async () => {
    try {
      const start = performance.now();
      // Fetch a small JS library from Cloudflare CDN with cache busting to test raw bandwidth
      const response = await fetch('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js?cb=' + Date.now(), {
        cache: 'no-store'
      });
      
      if (!response.ok) throw new Error("CDN speed test request failed");
      
      const blob = await response.blob();
      const end = performance.now();
      const durationSec = (end - start) / 1000;
      
      if (durationSec > 0) {
        const sizeInBits = blob.size * 8;
        const speedMbps = (sizeInBits / durationSec) / (1000 * 1000);
        
        // Show a realistic float format for network telemetry
        const formatted = `${speedMbps.toFixed(1)}Mbps`;
        console.log(`[Telemetry] Real speed test completed: ${formatted} (${blob.size} bytes in ${durationSec.toFixed(3)}s)`);
        setSpeed(formatted);
        return formatted;
      }
    } catch (e) {
      console.warn("[Telemetry] Real speed test failed, using fallback connection details", e);
      const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      let fallbackVal = '4G (15Mbps)';
      if (conn) {
        const type = conn.effectiveType ? conn.effectiveType.toUpperCase() : 'NET';
        const downlink = conn.downlink ? `${conn.downlink}Mbps` : '15Mbps';
        fallbackVal = `${type} (${downlink})`;
      }
      setSpeed(fallbackVal);
      return fallbackVal;
    }
    return '4G (15Mbps)';
  };

  useEffect(() => {
    if (!isOpen) return;
    measureSpeed();
  }, [isOpen]);

  // Simulate log typing
  useEffect(() => {
    if (!isOpen) {
      setLogs([]);
      setIsBooted(false);
      return;
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < LOG_MESSAGES.length) {
        setLogs((prev) => [...prev, `${new Date().toLocaleTimeString()} ${LOG_MESSAGES[currentIndex]}`]);
        currentIndex++;
      } else {
        setIsBooted(true);
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Simulate resource utilization fluctuations
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setCpuUsage(Math.floor(8 + Math.random() * 25));
      setRamUsage(parseFloat((4.1 + Math.random() * 0.4).toFixed(2)));
    }, 1500);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Auto scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Handle command history navigation using Up/Down arrow keys
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;

      let newIndex = historyIndex;
      if (historyIndex === -1) {
        setTempDraft(inputValue);
        newIndex = history.length - 1;
      } else if (historyIndex > 0) {
        newIndex = historyIndex - 1;
      } else {
        return; // Reach the oldest command
      }

      setHistoryIndex(newIndex);
      setInputValue(history[newIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;

      let newIndex = historyIndex + 1;
      if (newIndex < history.length) {
        setHistoryIndex(newIndex);
        setInputValue(history[newIndex]);
      } else {
        // Back to the original draft text
        setHistoryIndex(-1);
        setInputValue(tempDraft);
      }
    }
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = inputValue.trim();
    if (!cleanInput) return;

    const cmd = cleanInput.toLowerCase();
    const timeStr = new Date().toLocaleTimeString();

    // 1. Add the user's input line to the log
    setLogs((prev) => [...prev, `${timeStr} ROOT@TARUN-SYS-NODE:~# ${cleanInput}`]);
    setInputValue('');

    // Add command to history (excluding duplicate consecutive entries)
    setHistory((prev) => {
      if (prev.length > 0 && prev[prev.length - 1] === cleanInput) {
        return prev;
      }
      return [...prev, cleanInput];
    });
    setHistoryIndex(-1);
    setTempDraft('');

    // If it is a speedtest command, execute the measurement asynchronously
    if (cmd === 'speedtest') {
      setLogs((prev) => [...prev, `${timeStr} [SYSTEM] Initializing network download test to Cloudflare edge...`]);
      setTimeout(async () => {
        const resultVal = await measureSpeed();
        const finishTime = new Date().toLocaleTimeString();
        setLogs((prev) => [
          ...prev,
          `${finishTime} [SYSTEM] Speed test complete. Value: ${resultVal}`,
          `${finishTime} [SYSTEM] Telemetry dashboard bandwidth sync successful.`
        ]);
      }, 150);
      return;
    }

    // 2. Process commands with a slight simulated system latency
    setTimeout(() => {
      let response: string[] = [];

      switch (cmd) {
        case 'help':
          response = [
            `[SYSTEM] Available commands:`,
            `  about     - Learn about Tarun Jain as a person`,
            `  socials   - Find contact info & links`,
            `  neofetch  - Display system specs & technical profile`,
            `  stats     - Show core portfolio metrics`,
            `  ping      - Run network diagnostic latency test`,
            `  speedtest - Run manual download bandwidth speed test`,
            `  clear     - Clear terminal buffer`,
            `  help      - Display this help documentation`
          ];
          break;
        case 'about':
          response = [
            `[ABOUT] Tarun Jain | Machine Learning & Systems Engineer`,
            `  Hey, I'm Tarun! I'm a builder who loves constructing scalable systems.`,
            `  When I'm not training ML models or optimizing ETL pipelines, you can find`,
            `  me playing Settlers of Catan 1v1. As a Catan duelist, I approach game layout`,
            `  through probability modeling and resource velocity optimization.`,
            `  I love solving complex, high-stakes puzzles—both in code and in strategy games.`
          ];
          break;
        case 'socials':
          response = [
            `[SOCIALS] Contact details & social links:`,
            `  - Email: tarunjainjain11@gmail.com`,
            `  - LinkedIn: linkedin.com/in/tarun-jain07`,
            `  - GitHub: github.com/tarun4632`
          ];
          break;
        case 'neofetch':
          response = [
            `[SYSTEM] System report compiled:`,
            `  tarun@tarun-sys-node`,
            `  --------------------`,
            `  OS: TarunOS x86_64`,
            `  Kernel: v4.19.12-tarun-ML`,
            `  Uptime: 32 mins`,
            `  Shell: zsh 5.8`,
            `  CPU: NVIDIA Jetson Nano GPU-Optimized`,
            `  Memory: 64GB LPDDR5`,
            `  Specialization: Machine Learning / AI / Systems`,
            `  Status: Online & Nominal`
          ];
          break;
        case 'stats':
          response = [
            `[SYSTEM] Fetching real-time subsystem stats:`,
            `  - RTB Bidding Agent: 15,400 events/sec`,
            `  - HateShield API: 99.8% precision rating`,
            `  - WikiGPT Model Size: 7 Billion parameters`,
            `  - RAG Search: 0.12s mean latency`,
            `  - Colonist Rank: Gold I (win rate 53.7%)`
          ];
          break;
        case 'ping': {
          const latencyVal = typeof ping === 'number' ? `${ping}.0` : '12.4';
          response = [
            `[NETWORK] PING google.com (142.250.190.46): 56 data bytes`,
            `  64 bytes from 142.250.190.46: icmp_seq=1 ttl=116 time=${latencyVal} ms`,
            `  64 bytes from 142.250.190.46: icmp_seq=2 ttl=116 time=${(parseFloat(latencyVal) + 0.6).toFixed(1)} ms`,
            `[NETWORK] --- google.com ping stats ---`,
            `  2 packets transmitted, 2 received, 0% packet loss`
          ];
          break;
        }
        case 'clear':
          setLogs([]);
          return;
        default:
          response = [
            `[ERROR] Command not found: '${cleanInput}'. Type 'help' for options.`
          ];
      }

      setLogs((prev) => [
        ...prev,
        ...response.map((line) => `${new Date().toLocaleTimeString()} ${line}`)
      ]);
    }, 150);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          {/* Overlay click */}
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-slate-950/95 border border-cyan-500/30 rounded-lg shadow-2xl shadow-cyan-950/40 overflow-hidden font-mono text-xs text-cyan-400"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-cyan-900/40">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="font-bold tracking-wider uppercase text-cyan-200">Terminal Core Logs</span>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-slate-400 hover:text-cyan-400 rounded transition-colors"
                aria-label="Close terminal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Hardware Telemetry Bar */}
            <div className="grid grid-cols-4 gap-2 px-4 py-3 bg-slate-900/60 border-b border-cyan-950/60 text-[10px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>CPU: <b className="text-cyan-300">{cpuUsage}%</b></span>
              </div>
              <div className="flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
                <span>RAM: <b className="text-emerald-300">{ramUsage}GB</b></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-yellow-400" />
                <span>SPEED: <b className="text-yellow-300">{speed}</b></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Wifi className="w-3.5 h-3.5 text-blue-400" />
                <span>PING: <b className="text-blue-300">{typeof ping === 'number' ? `${ping}ms` : ping}</b></span>
              </div>
            </div>

            {/* Logs Area */}
            <div 
              className="p-4 h-80 overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-cyan-950 scrollbar-track-transparent cursor-text"
              onClick={() => inputRef.current?.focus()}
            >
              {logs.map((log, index) => {
                const time = log.slice(0, 8);
                const message = log.slice(9);
                const isUserInput = message.startsWith('ROOT@TARUN-SYS-NODE');
                
                return (
                  <div key={index} className="leading-5 border-l border-cyan-500/10 pl-2">
                    <span className="text-slate-500">[{time}]</span>{' '}
                    {isUserInput ? (
                      <span className="text-amber-500 font-bold">{message}</span>
                    ) : (
                      <span className={
                        message.includes('[SYSTEM]') 
                          ? 'text-cyan-300 font-semibold' 
                          : message.includes('[SECURITY]') 
                            ? 'text-emerald-400' 
                            : message.includes('[GAME]') 
                              ? 'text-amber-400' 
                              : message.includes('[ERROR]')
                                ? 'text-red-400 font-bold animate-pulse'
                                : 'text-slate-300'
                      }>
                        {message}
                      </span>
                    )}
                  </div>
                );
              })}
              
              {!isBooted ? (
                <div className="flex items-center gap-1 text-cyan-500 animate-pulse">
                  <span>&gt; Executing pipeline sync...</span>
                  <span className="w-1.5 h-3 bg-cyan-500 inline-block animate-ping"></span>
                </div>
              ) : (
                <form onSubmit={handleCommandSubmit} className="flex items-center gap-1 text-cyan-300 border-l border-cyan-500/10 pl-2 pt-1">
                  <span className="text-amber-500 font-bold">ROOT@TARUN-SYS-NODE:~#</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent border-none outline-none text-cyan-300 font-mono"
                    autoFocus
                    placeholder="type 'help'..."
                  />
                </form>
              )}
              <div ref={terminalEndRef} />
            </div>

            {/* Footer Prompt */}
            <div className="px-4 py-2.5 bg-slate-900/80 border-t border-cyan-900/30 text-[10px] text-slate-500 flex justify-between">
              <span>ROOT@TARUN-SYS-NODE:~#</span>
              <span className="animate-pulse text-cyan-500/80">SESSION ACTIVE // INTERACTIVE</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
