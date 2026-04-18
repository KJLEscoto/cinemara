<!-- components/MovieTrailer.vue -->
<script setup lang="ts">
const props = defineProps<{ movieId: number }>()

const { fetchTrailer } = useMovieTrailer()
const trailer = await fetchTrailer(props.movieId)

const embedUrl = computed(() =>
  trailer ? `https://www.youtube.com/embed/${trailer.key}` : null
)
</script>

<template>
  <div v-if="embedUrl" class="w-full aspect-video">
    <iframe :src="embedUrl" allow="autoplay; encrypted-media" allowfullscreen frameborder="0" class="w-full h-full" />
  </div>
  <p v-else class="p-8 text-white/40 text-sm">No trailer available.</p>
</template>