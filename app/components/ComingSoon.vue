<!-- components/ComingSoon.vue -->
<script setup lang="ts">
import { BellRing } from '@lucide/vue';
const tmdb = useTmdb()

const { data: movies } = await useAsyncData('movies', () =>
  tmdb.movie_lists.now_playing()
)

const email = ref('');
const error = ref('');

function notified() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.value) {
    error.value = 'Email is required.';
    return;
  }

  if (!emailRegex.test(email.value)) {
    error.value = 'Please enter a valid email address.';
    return;
  }

  error.value = '';
  alert(`We'll notify ${email.value} when we launch!`);
  email.value = '';
}


</script>

<template>
  <main class="min-h-screen w-full flex flex-col items-start justify-between gap-10 relative overflow-hidden pointer-events-none">

    <div class="-rotate-12 absolute right-0 top-0 z-10">
      <VerticalCarousel :movies="movies?.results ?? []" :speed="10" :columns="4" />
    </div>

    <!-- gradient -->
    <img src="/images/carousel-gradient.png" alt="Coming Soon"
      class="absolute w-full h-full top-0 z-20" />

    <!-- blurs -->
    <div class="bg-primary md:size-52 size-32 rounded-full absolute top-60 blur-[100px] -left-40 z-30"></div>

    <div class="space-y-10 grid place-items-start w-full h-full justify-between z-30 md:px-20 px-4 md:pt-20 pt-14">
      <section class="flex items-center md:gap-3 gap-1">
        <img class="md:size-12 size-8" src="/images/Icon.png" alt="cinemara icon">
        <p class="font-semibold md:text-3xl text-2xl">Cinemara</p>
      </section>

      <section class="font-black uppercase text-start md:text-9xl text-5xl md:space-y-1">
        <h1 class="text-white text-shadow-lg/30">
          YOUR NEXT <br /> OBSESSION
        </h1>
        <h1 class="text-primary text-shadow-lg/30">
          IS ALMOST <br /> HERE.
        </h1>
      </section>

      <section class="text-start md:text-xl text-base md:-mt-4 -mt-8">
        <p class="text-muted text-shadow-md/30">
          Explore films, browse overviews, and watch trailers — <br class="md:block hidden" /> all before
          deciding what's next.
        </p>
      </section>
    </div>

    <!-- Notification Form -->
    <section class="space-y-2 max-w-2xl w-full z-30 md:px-20 px-4 md:pb-20 pb-14">
      <p class="md:text-base text-sm">Be the first to know when it launches!</p>
      <form @submit.prevent="notified" class="flex md:flex-row flex-col items-start gap-2 w-full">
        <div class="space-y-2 w-full">
          <input required v-model="email" class="bg-white placeholder:text-black/40 md:p-4 p-3 text-black rounded-lg w-full pointer-events-auto"
            :class="{ 'ring-2 ring-primary': error }" type="email" name="email_address" id="email_address"
            placeholder="Enter your email address">
          <p v-if="error" class="text-primary text-sm">{{ error }}</p>
        </div>
        <button type="submit"
          class="bg-primary md:py-4 py-3 px-6 rounded-lg md:w-fit w-full cursor-pointer flex items-center justify-center gap-2 text-nowrap pointer-events-auto">
          <BellRing class="pointer-events-none size-5" />
          Notify Me
        </button>
      </form>
    </section>

  </main>
</template>