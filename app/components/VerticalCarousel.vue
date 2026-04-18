<!-- components/VerticalCarousel.vue -->
<script setup lang="ts">
import type { MovieResultItem } from '@lorenzopant/tmdb'

const props = defineProps<{
  movies: MovieResultItem[]
  title?: string
  subtitle?: string
  speed?: number
  columns?: number
}>()

const cols = computed(() => props.columns ?? 4)
const speed = computed(() => props.speed ?? 10)

const columnGroups = computed(() => {
  const groups: MovieResultItem[][] = Array.from({ length: cols.value }, () => [])
  props.movies?.forEach((movie, i) => {
    const group = groups[i % cols.value]
    if (movie && group) group.push(movie)
  })
  return groups
})

function animationStyle(groupLength: number) {
  return {
    animationDuration: `${(groupLength * 220) / speed.value}s`,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    willChange: 'transform',
  }
}
</script>

<template>
  <div class="w-full overflow-visible">
    <div class="flex md:gap-6 gap-3" style="height: 82vh;">
      <div v-for="(group, colIdx) in columnGroups" :key="colIdx" class="flex-1 relative overflow-visible">
        <!-- Original set -->
        <div class="flex flex-col md:gap-6 gap-3 pointer-events-none"
          :class="colIdx % 2 === 0 ? 'animate-scroll-down' : 'animate-scroll-up'" :style="animationStyle(group.length)">
          <template v-for="repeat in 2" :key="repeat">
            <div v-for="movie in group" :key="`${repeat}-${movie.id}`"
              class="block md:rounded-2xl rounded-lg overflow-hidden bg-white/5 group pointer-events-auto shrink-0 relative"
              style="aspect-ratio: 2/3;">
              <img v-if="movie.poster_path" :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
                :alt="movie.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div
                class="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p class="text-white font-semibold text-xl leading-snug line-clamp-2">{{ movie.title }}</p>
                <p class="text-yellow-300 text-xs mt-1 font-bold">⭐ {{ movie.vote_average?.toFixed(1) }}</p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-scroll-down {
  animation-name: scroll-down;
}

.animate-scroll-up {
  animation-name: scroll-up;
}

@keyframes scroll-down {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-50%);
  }
}

@keyframes scroll-up {
  from {
    transform: translateY(-50%);
  }

  to {
    transform: translateY(0);
  }
}
</style>