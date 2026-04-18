// plugins/tmdb.server.ts
import { TMDB } from '@lorenzopant/tmdb'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const tmdb = new TMDB(config.tmdbBearerToken as string)

  return {
    provide: {
      tmdb,
    }
  }
})

// Augment Nuxt's plugin types
declare module '#app' {
  interface NuxtApp {
    $tmdb: TMDB
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $tmdb: TMDB
  }
}