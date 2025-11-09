import type { Message, Messages } from "../types";
const EVICTION_TIME = 5 * 60 * 1000;
const EVICTION_CLOCK_TIME = 1 * 60 * 1000;

export class InMemoryStore {
  private static store: InMemoryStore;
  private store: Record<
    string,
    {
      messages: Messages;
      evictionTime: number;
    }
  >;

  private clock: NodeJS.Timeout;

  private constructor() {
    this.store = {};
    this.clock = setInterval(() => {
      Object.entries(this.store).forEach(([key, { evictionTime }]) => {
        if (evictionTime > Date.now()) {
          delete this.store[key];
        }
      });
    }, EVICTION_CLOCK_TIME);
  }

  public destroy() {
    clearInterval(this.clock);
  }

  static getInstance(): InMemoryStore {
    if (!InMemoryStore.store) {
      InMemoryStore.store = new InMemoryStore();
    }
    return InMemoryStore.store;
  }

  get(conversationId: string): Message[] {
    return InMemoryStore.store.store[conversationId]?.messages || [];
  }

  add(conversationId: string, message: Message) {
    if (!this.store[conversationId]) {
      this.store[conversationId] = {
        messages: [],
        evictionTime: Date.now() + EVICTION_TIME,
      };
    }
    this.store[conversationId].messages.push(message);
    this.store[conversationId].evictionTime - Date.now() + EVICTION_TIME;
  }
}
