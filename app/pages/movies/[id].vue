<!-- pages/movies/[id].vue -->
<script setup lang="ts">
import type { MovieDetails } from '@lorenzopant/tmdb'

const route = useRoute()
const { data: movie } = await useFetch<MovieDetails>(`/api/movies/${route.params.id}`)
console.log('Movie details:', movie.value)
</script>

<template>
  <div v-if="movie" class="min-h-screen bg-[#070b14] text-[#e8eaf0] font-sans">

    <!-- Hero -->
    <div class="relative min-h-screen flex items-end pb-20">

      <!-- Backdrop -->
      <div class="absolute inset-0 overflow-hidden">
        <img v-if="movie.backdrop_path" :src="`https://image.tmdb.org/t/p/original${movie.backdrop_path}`"
          :alt="movie.title" class="w-full h-full object-cover object-top opacity-35 saturate-50" />
        <div class="absolute inset-0 bg-linear-to-t from-[#070b14] via-[#070b14]/60 to-transparent" />
        <div class="absolute inset-0 bg-linear-to-r from-[#070b14] via-[#070b14]/40 to-transparent" />
      </div>

      <!-- Content -->
      <div class="relative z-10 flex gap-10 items-end px-[6vw] w-full">

        <!-- Poster -->
        <div class="shrink-0 w-45 md:w-55">
          <img v-if="movie.poster_path" :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title"
            class="w-full rounded-xl shadow-[0_30px_80px_rgba(0,0,0,0.7)] border border-white/10" />
        </div>

        <!-- Info -->
        <div class="flex flex-col gap-4 max-w-2xl pb-1">

          <!-- Genres -->
          <div v-if="movie.genres?.length" class="flex flex-wrap gap-2">
            <span v-for="g in movie.genres" :key="g.id"
              class="text-[0.7rem] font-medium uppercase tracking-widest px-3 py-1 rounded-full border border-yellow-400/40 text-yellow-300 bg-yellow-400/10">
              {{ g.name }}
            </span>
          </div>

          <!-- Title -->
          <h1 class="font-black text-5xl md:text-7xl leading-none tracking-wide text-white uppercase">
            {{ movie.title }}
          </h1>

          <!-- Tagline -->
          <p v-if="movie.tagline" class="text-sm italic text-white/40 font-light">
            {{ movie.tagline }}
          </p>

          <!-- Meta -->
          <div class="flex items-center flex-wrap gap-4">
            <span class="flex items-center gap-1.5 text-sm font-medium">
              ⭐ {{ movie.vote_average?.toFixed(1) }}
              <span class="text-xs text-white/40">/10</span>
            </span>
            <span class="w-px h-4 bg-white/20" />
            <span class="flex items-center gap-1.5 text-sm font-medium">
              📅 {{ movie.release_date?.slice(0, 4) }}
            </span>
            <template v-if="movie.runtime">
              <span class="w-px h-4 bg-white/20" />
              <span class="flex items-center gap-1.5 text-sm font-medium">
                🕐 {{ Math.floor(movie.runtime / 60) }}h {{ movie.runtime % 60 }}m
              </span>
            </template>
          </div>

          <!-- Overview -->
          <p class="text-sm md:text-base leading-relaxed text-white/60 font-light max-w-lg">
            {{ movie.overview }}
          </p>

          <!-- Homepage -->
          <a
          v-if="movie.homepage"
          :href="movie.homepage"
          target="_blank"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-yellow-300 text-[#070b14] font-semibold
          text-sm
          tracking-wide w-fit hover:opacity-80 hover:-translate-y-0.5 transition-all duration-200"
          >
          Official Site ↗
          </a>
        </div>
      </div>
    </div>

    <!-- Trailer Section -->
    <div class="px-[6vw] py-16 border-t border-white/5">
      <h2 class="text-3xl font-black uppercase tracking-widest text-yellow-300 mb-6">
        Trailer
      </h2>
      <div class="max-w-4xl rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        <MovieTrailer :movieId="movie.id!" />
      </div>
    </div>

  </div>
</template>