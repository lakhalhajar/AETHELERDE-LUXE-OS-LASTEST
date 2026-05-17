PROJECT: AETHELRED ELITE ESTATE NEXUS
1. Specific Specifications
/src Layout Mapping
text
src/
├── app/
│   ├── api/chat/route.ts (Vercel AI SDK Streaming)
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/ (Shadcn/ui primitives)
│   ├── dashboard/
│   │   ├── glass-card.tsx
│   │   ├── nav-menu.tsx
│   │   ├── property-table.tsx
│   │   └── client-leads-table.tsx
│   ├── chatbot/
│   │   ├── ai-chat.tsx
│   │   └── use-chat-stream.ts
│   └── shimmer-loader.tsx
├── lib/
│   ├── utils.ts
│   └── db.ts
└── styles/
    └── globals.css
Custom HSL Theme tailwind.config.ts
TypeScript
import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(217 20% 25%)",
        input: "hsl(217 20% 25%)",
        ring: "hsl(262 83% 58%)",
        background: "hsl(220 10% 3%)",
        foreground: "hsl(210 40% 98%)",
        primary: { DEFAULT: "hsl(262 83% 58%)", foreground: "hsl(210 40% 98%)" },
        secondary: { DEFAULT: "hsl(217 20% 15%)", foreground: "hsl(210 40% 98%)" },
        card: { DEFAULT: "hsl(220 10% 8%)", foreground: "hsl(210 40% 98%)" },
      },
      keyframes: {
        shimmer: {
          from: { backgroundPosition: "-200% 0" },
          to: { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        shimmer: "shimmer 2s infinite linear",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
Compact package.json
JSON
{
  "dependencies": {
    "next": "14.2.3",
    "react": "^18",
    "ai": "^3.1.18",
    "@ai-sdk/openai": "latest",
    "framer-motion": "^11.2.10",
    "lucide-react": "^0.390.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.3.0",
    "tailwindcss-animate": "^1.0.7"
  }
}
src/styles/globals.css (Fixed Gradient)
CSS
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-background text-foreground antialiased;
    background: linear-gradient(135deg, hsl(220 10% 3%) 0%, hsl(240 15% 8%) 100%);
    background-attachment: fixed;
    min-height: 100vh;
  }
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: radial-gradient(circle at 1px 1px, hsl(217 20% 15% / 0.2) 1px, transparent 0);
    background-size: 20px 20px;
    opacity: 0.3;
    z-index: -1;
  }
}
2. Step-by-Step Industrial Pipeline
pnpm create next-app@latest . --ts --tailwind --eslint --app --src-dir
pnpm add ai @ai-sdk/openai framer-motion lucide-react clsx tailwind-merge tailwindcss-animate
npx shadcn-ui@latest init (Target src/styles/globals.css, Dark, Slate)
npx shadcn-ui@latest add button card input table scroll-area
.env.local Injection: OPENAI_API_KEY=sk-...
mkdir -p src/{components/dashboard,components/chatbot,lib,styles}
Implement src/lib/db.ts for database abstraction.
3. The Premium UX Decree
Design Tokens: Primary Purple (hsl(262 83% 58%)), Deep Obsidian (hsl(220 10% 3%)).
Glassmorphism: backdrop-blur-xl bg-white/5 border border-white/10 for all cards.
Micro-interactions: whileHover={{ scale: 1.01 }} and whileTap={{ scale: 0.98 }} via Framer Motion.
Shimmer Loaders: Custom animate-shimmer for skeleton states.
Fixed Grid: 20px radial dot grid via body::before.
4. Core Functionality & Streaming AI
src/app/api/chat/route.ts
TypeScript
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;
const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = await streamText({
    model: openai('gpt-4o-mini'),
    system: 'You are a luxury property management AI assistant. Provide concise, professional responses regarding property data and market analytics.',
    messages,
  });
  return result.toDataStreamResponse();
}
src/components/chatbot/ai-chat.tsx
TypeScript
'use client';
import { useChat } from 'ai/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

export function AIChat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-4 right-4 z-50 w-80">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center gap-2 bg-white/5">
          <Bot className="h-5 w-5 text-primary" />
          <span className="font-semibold">Elite Assistant</span>
        </div>
        <ScrollArea className="h-80 p-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-2 mb-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`rounded-lg px-3 py-2 max-w-[80%] text-sm ${m.role === 'user' ? 'bg-primary text-white' : 'bg-white/10'}`}>
                {m.content}
              </div>
            </div>
          ))}
        </ScrollArea>
        <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 flex gap-2">
          <Input value={input} onChange={handleInputChange} placeholder="Ask anything..." className="bg-white/5 border-white/10" />
          <Button type="submit" size="icon" disabled={isLoading}><Send className="h-4 w-4" /></Button>
        </form>
      </div>
    </motion.div>
  );
}
5. Clean Slate Directive
WIPEOUT: Delete src/app/page.tsx and src/app/layout.tsx defaults.
BUILD: Reconstruct from scratch using the /src layout mapping.
THEME: Ensure globals.css and tailwind.config.ts are the first files configured