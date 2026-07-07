import { create } from "zustand"
import { AIAction, Message } from "@/types"

interface AIState {
  messages: Message[]
  isStreaming: boolean
  currentAction: AIAction | null
  isPanelOpen: boolean
  addMessage: (message: Message) => void
  setIsStreaming: (isStreaming: boolean) => void
  setCurrentAction: (action: AIAction | null) => void
  togglePanel: () => void
  clearMessages: () => void
}

export const useAIStore = create<AIState>((set) => ({
  messages: [],
  isStreaming: false,
  currentAction: null,
  isPanelOpen: false,

  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setIsStreaming: (isStreaming) => set({ isStreaming }),
  setCurrentAction: (currentAction) => set({ currentAction }),
  togglePanel: () => set((state) => ({ isPanelOpen: !state.isPanelOpen })),
  clearMessages: () => set({ messages: [] }),
}))