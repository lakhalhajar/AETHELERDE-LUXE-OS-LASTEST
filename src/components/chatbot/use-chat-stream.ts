"use client";

import { useChat } from "ai/react";
import { useCallback, useState } from "react";

export function useChatStream() {
  const [isOpen, setIsOpen] = useState(false);

  const chat = useChat({
    api: "/api/chat",
  });

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return {
    ...chat,
    isOpen,
    open,
    close,
    toggle,
  };
}