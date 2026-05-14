'use client'

export const storageKeys = {
  user: 'nexus-user',
  bookmarks: 'nexus-bookmarks',
  bookmarkCollections: 'nexus-bookmark-collections',
  articles: 'nexus-articles',
  listings: 'nexus-listings',
  localPosts: 'nexus-local-posts',
  bookmarkSaves: 'nexus-bookmark-saves',
  articleLikes: 'nexus-article-likes',
  articleSaves: 'nexus-article-saves',
  listingSaves: 'nexus-listing-saves',
  theme: 'nexus-theme',
  settings: 'nexus-settings',
}

const deprecatedStorageKeys = ['nexus-ads', 'nexus-ad-saves'] as const
let didCleanupDeprecatedKeys = false

function cleanupDeprecatedStorageKeys() {
  if (typeof window === 'undefined' || didCleanupDeprecatedKeys) return
  for (const key of deprecatedStorageKeys) {
    window.localStorage.removeItem(key)
  }
  didCleanupDeprecatedKeys = true
}

export function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  cleanupDeprecatedStorageKeys()
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function saveToStorage<T>(key: string, value: T) {
  if (typeof window === 'undefined') return
  cleanupDeprecatedStorageKeys()
  window.localStorage.setItem(key, JSON.stringify(value))
}
