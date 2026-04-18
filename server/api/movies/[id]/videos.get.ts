// server/api/movies/[id]/videos.get.ts
import { TMDB } from '@lorenzopant/tmdb'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')

  const tmdb = new TMDB(config.tmdbBearerToken as string)

  const { results } = await tmdb.movies.videos({ movie_id: Number(id) })

  const trailer = results?.find((v) => v.type === 'Trailer' && v.site === 'YouTube')

  // Always return a value, never undefined
  return trailer ?? null
})