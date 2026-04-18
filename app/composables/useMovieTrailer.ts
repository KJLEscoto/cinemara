// composables/useMovieTrailer.ts
export interface Video {
  id: string
  key: string
  name: string
  site: string
  type: string
  official: boolean
}

export function useMovieTrailer() {
  async function fetchTrailer(movieId: number): Promise<Video | null> {
    const data = await $fetch<Video | null>(`/api/movies/${movieId}/videos`)
    return data ?? null
  }

  return { fetchTrailer }
}