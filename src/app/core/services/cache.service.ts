import { Injectable } from '@angular/core';
import { CacheModel } from '@app/core/models/cache.model';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private readonly CACHE_PREFIX = 'weather_';
  private readonly CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes in milliseconds

  getFromCache<T>(key: string): T | null {
    try {
      const cacheKey = this.getCacheKey(key);
      const cachedItem = localStorage.getItem(cacheKey);

      if (!cachedItem) return null;

      const { data, timestamp }: CacheModel<T> = JSON.parse(cachedItem);

      if (Date.now() - timestamp > this.CACHE_EXPIRY) {
        localStorage.removeItem(cacheKey);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }

  updateCache<T>(key: string, response: T): void {
    try {
      const cacheData: CacheModel<T> = {
        data: response,
        timestamp: Date.now(),
      };

      localStorage.setItem(this.getCacheKey(key), JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }

  private getCacheKey(cacheKey: string): string {
    return this.CACHE_PREFIX + cacheKey;
  }
}
