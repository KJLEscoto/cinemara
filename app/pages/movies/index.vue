<!-- pages/movies.vue -->
<script setup lang="ts">
const tmdb = useTmdb()

const { data: movies } = await useAsyncData('movies', () =>
  tmdb.movie_lists.now_playing()
)
</script>

<template>
  <div class="min-h-screen bg-[#070b14] text-white px-[6vw] py-16">

    <!-- Header -->
    <div class="mb-12">
      <p class="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-300 mb-2">Now Playing</p>
      <h1 class="text-5xl md:text-7xl font-black uppercase tracking-wide leading-none text-white">
        In Theaters
      </h1>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
      <a
      v-for="movie in movies?.results"
      :key="movie.id"
      :href="`/movies/${movie.id}`"
      class="group flex flex-col gap-3 cursor-pointer"
      >
      <!-- Poster -->
      <div class="relative overflow-hidden rounded-xl aspect-2/3 bg-white/5 border border-white/10">
        <img v-if="movie.poster_path" :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <!-- Overlay on hover -->
        <div
          class="absolute inset-0 bg-linear-to-t from-[#070b14]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <p class="text-xs text-white/70 leading-relaxed line-clamp-3">{{ movie.overview }}</p>
        </div>
        <!-- Rating badge -->
        <div
          class="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-sm text-yellow-300 text-xs font-bold px-2 py-1 rounded-lg border border-yellow-300/20">
          ⭐ {{ movie.vote_average?.toFixed(1) }}
        </div>
      </div>

      <!-- Title -->
      <div class="flex flex-col gap-0.5 px-0.5">
        <h2
          class="text-sm font-semibold leading-snug text-white/90 group-hover:text-yellow-300 transition-colors duration-200 line-clamp-2">
          {{ movie.title }}
        </h2>
        <p class="text-xs text-white/35">
          {{ movie.release_date?.slice(0, 4) }}
        </p>
      </div>
      </a>
    </div>

  </div>
</template>