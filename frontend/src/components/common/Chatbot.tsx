import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const replies = [
  'Thank you for contacting MediCare Plus. How can we help you today?',
  'For appointments, please visit our Book Appointment page.',
  'Emergency? Please dial 108 immediately.',
  'Our team will connect you with the right department shortly.',
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'bot' | 'user'; text: string }[]>([
    { role: 'bot', text: 'Hello! I am your AI health assistant. Ask me anything about our hospital services.' },
  ]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((m) => [...m, { role: 'user', text: userMsg }]);
    setInput('');
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { role: 'bot', text: replies[Math.floor(Math.random() * replies.length)] },
      ]);
    }, 600);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 text-white shadow-xl hover:bg-primary-700"
        aria-label="Open chat"
      >
        {open ? <X /> : <MessageCircle />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-40 flex h-[420px] w-[340px] flex-col overflow-hidden rounded-2xl glass shadow-2xl"
          >
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-3 text-white">
              <p className="font-semibold">AI Health Assistant</p>
              <p className="text-xs opacity-80">Always here to help</p>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                    msg.role === 'user'
                      ? 'ml-auto bg-primary-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="flex gap-2 border-t border-slate-200 p-3 dark:border-slate-700">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Type a message..."
                className="flex-1 rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm dark:border-slate-600"
              />
              <button type="button" onClick={send} className="rounded-lg bg-primary-600 p-2 text-white">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
