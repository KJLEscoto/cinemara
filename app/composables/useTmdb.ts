// composables/useTmdb.ts
import { TMDB } from '@lorenzopant/tmdb'

export const useTmdb = () => {
  const { $tmdb } = useNuxtApp()
  return $tmdb as TMDB
}