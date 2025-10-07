type EventMap = {
  [key: string]: (...args: any[]) => void;
};

export class EventEmitter<T extends EventMap> {
  private listeners: Record<keyof T, T[keyof T][]> = {} as Record<keyof T, T[keyof T][]>;
  private onceListeners: Record<keyof T, T[keyof T][]> = {} as Record<keyof T, T[keyof T][]>;

  public constructor() { }

  public on<Event extends keyof T>(event: Event, listener: T[Event]) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(listener);
  }

  public once<Event extends keyof T>(event: Event, listener: T[Event]) {
    if (!this.onceListeners[event]) {
      this.onceListeners[event] = [];
    }

    this.onceListeners[event].push(listener);
  }

  public removeListener<Event extends keyof T>(event: Event, listener: T[Event]) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(item => item != listener);
    }

    if (this.onceListeners[event]) {
      this.onceListeners[event] = this.onceListeners[event].filter(item => item != listener);
    }
  }

  public async emit<
    Event extends keyof T,
    Params extends Parameters<T[Event]> = Parameters<T[Event]>
  >(event: Event, ...args: Params) {
    const listeners = [
      ...(this.listeners[event] ?? []),
      ...(this.onceListeners[event] ?? [])
    ]

    this.onceListeners[event] = [];

    await Promise.all(listeners.map(async listener => listener(args)));
  }
}