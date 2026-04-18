<!-- pages/movies.vue -->
<script setup lang="ts">
const tmdb = useTmdb()

const { data: movies } = await useAsyncData('movies', () =>
  tmdb.movie_lists.now_playing()
)
</script>

<template>
  <div class="min-h-screen overflow-hidden bg-[#070b14] text-white px-[4vw] py-16">
    <div class="-rotate-12">
      <VerticalCarousel :movies="movies?.results ?? []" :speed="10"
        :columns="5" />
    </div>
  </div>
</template>