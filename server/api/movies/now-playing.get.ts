// server/api/movies/now-playing.get.ts
import { TMDB } from '@lorenzopant/tmdb'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const tmdb = new TMDB(config.tmdbBearerToken)

  return await tmdb.movie_lists.now_playing()
})