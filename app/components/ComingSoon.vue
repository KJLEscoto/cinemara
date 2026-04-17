<script setup lang="ts">
import { BellRing } from '@lucide/vue';

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
  <main class="min-h-screen md:px-20 px-4 py-20 w-full flex flex-col items-start justify-between gap-10 relative overflow-hidden">

    <!-- blurs -->
    <div class="bg-primary md:size-52 size-32 rounded-full absolute top-60 blur-[100px] -left-40"></div>
    <!-- <div class="bg-primary md:size-52 size-32 rounded-full absolute -bottom-20 blur-[120px] right-0"></div> -->

    <div class="space-y-10 grid md:place-items-start place-items-center w-full h-full justify-between z-10">
      <section class="flex items-center md:gap-3 gap-1">
        <img class="md:size-12 size-8" src="/images/Icon.png" alt="cinemara icon">
        <p class="font-semibold md:text-3xl text-2xl">Cinemara</p>
      </section>

      <section class="font-black uppercase md:text-start text-center md:text-8xl text-5xl md:space-y-1">
        <h1>YOUR NEXT <br /> OBSESSION</h1>
        <h1 class="text-primary">IS ALMOST <br /> HERE.</h1>
      </section>

      <section class="text-center md:text-xl text-base md:-mt-4 -mt-8">
        <p class="text-muted">Explore films, browse overviews, and watch trailers — all before
          deciding what's next.</p>
      </section>

      <!-- <section class="flex items-center gap-5 w-full">
        <hr class="w-full border-white/5">
        <div class="size-3 ring-8 ring-primary/10 bg-primary rounded-full shrink-0"></div>
        <hr class="w-full border-white/5">
      </section> -->

    </div>

    <section class="space-y-2 max-w-xl w-full">
      <p class="md:text-base text-sm">Get notified when we launch!</p>
      <form @submit.prevent="notified" class="flex md:flex-row flex-col items-start gap-2 w-full">
        <div class="space-y-2 w-full">
          <input required v-model="email" class="bg-white placeholder:text-black/40 md:p-4 p-3 text-black rounded-lg w-full"
            :class="{ 'ring-2 ring-primary': error }" type="email" name="email_address" id="email_address"
            placeholder="Enter your email address">
          <p v-if="error" class="text-primary text-sm">{{ error }}</p>
        </div>
        <button type="submit"
          class="bg-primary md:py-4 py-3 px-6 rounded-lg md:w-fit w-full cursor-pointer flex items-center justify-center gap-2 text-nowrap">
          <BellRing class="pointer-events-none size-5" />
          Notify Me
        </button>
      </form>
    </section>

  </main>
</template>