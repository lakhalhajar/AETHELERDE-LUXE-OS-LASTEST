"use client";
import { useChatStream } from "@/components/chatbot/use-chat-stream";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle, Send, User, X } from "lucide-react";

export function AIChat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    isOpen,
    open,
    close,
  } = useChatStream();

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="fab"
            type="button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={open}
            className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-primary text-primary-foreground shadow-2xl shadow-primary/30"
            aria-label="Open Elite Assistant"
          >
            <MessageCircle className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 z-50 w-[22rem] sm:w-96"
          >
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
              
              {/* تفعيل الهيدر النظيف والمباشر مباشرة هنا دون أي وسوم تائهة */}
              <div className="flex items-center justify-between border-b border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Elite Assistant</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={close}
                  className="h-8 w-8 hover:bg-white/10"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <ScrollArea className="h-80 p-4">
                {messages.length === 0 && (
                  <p className="text-center text-sm text-foreground/50">
                    Ask about portfolio value, lead scores, or market analytics.
                  </p>
                )}
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={cn(
                      "mb-4 flex gap-2",
                      m.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {m.role === "assistant" && (
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
                        <Bot className="h-3.5 w-3.5 text-primary" />
                      </div>
                    )}
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                        m.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "border border-white/10 bg-white/10"
                      )}
                    >
                      {m.content}
                    </motion.div>
                    {m.role === "user" && (
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
                        <User className="h-3.5 w-3.5 text-foreground/70" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="text-xs text-foreground/50 animate-pulse">Analyzing estate data…</div>
                )}
              </ScrollArea>

              <form onSubmit={handleSubmit} className="flex gap-2 border-t border-white/10 p-4">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask anything..."
                  className="border-white/10 bg-white/5"
                />
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button type="submit" size="icon" disabled={isLoading}>
                    <Send className="h-4 w-4" />
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}