// server/api/movies/[id].get.ts
import { TMDB } from '@lorenzopant/tmdb'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  // Add this temporarily to debug
  console.log('token:', config.tmdbBearerToken)

  const id = getRouterParam(event, 'id')
  const tmdb = new TMDB(config.tmdbBearerToken as string)
  const data = await tmdb.movies.details({ movie_id: Number(id) })

  return data
})