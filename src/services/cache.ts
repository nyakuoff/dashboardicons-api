interface Entry<T> {
  data: T
  expiresAt: number
}

export class Cache<T> {
  private store = new Map<string, Entry<T>>()

  get(key: string): T | null {
    const entry = this.store.get(key)
    if (!entry) return null
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key)
      return null
    }
    return entry.data
  }

  set(key: string, data: T, ttl: number): void {
    this.store.set(key, { data, expiresAt: Date.now() + ttl })
  }
}
