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
  <main class="min-h-screen p-4 w-full flex items-center justify-center relative overflow-hidden">

    <!-- blurs -->
    <div class="bg-primary size-52 rounded-full absolute -top-20 blur-[120px] left-40"></div>
    <div class="bg-primary size-52 rounded-full absolute -bottom-20 blur-[120px] right-0"></div>

    <div class="space-y-10 grid place-items-center max-w-4xl w-full z-10">
      <section class="flex items-center gap-3">
        <img class="w-12 h-12" src="/images/Icon.png" alt="cinemara icon">
        <p class="font-semibold text-3xl">Cinemara</p>
      </section>

      <section class="font-black uppercase text-center text-5xl space-y-1">
        <h1>YOUR NEXT OBSESSION</h1>
        <h1 class="text-primary">IS ALMOST HERE.</h1>
      </section>

      <section class="text-center text-lg -mt-4">
        <p class="text-muted">Cinemara is where you explore films, browse overviews, and watch trailers — all before
          deciding what's next. Drop your email and we'll tell you the moment we go live.</p>
      </section>

      <section class="flex items-center gap-5 w-full">
        <hr class="w-full border-white/5">
        <div class="size-3 ring-8 ring-primary/10 bg-primary rounded-full shrink-0"></div>
        <hr class="w-full border-white/5">
      </section>

      <section class="space-y-2 max-w-xl w-full">
        <p>Get notified when we launch</p>
        <form @submit.prevent="notified" class="flex items-center gap-2 w-full">
          <input v-model="email" class="bg-white placeholder:text-black/40 p-4 text-black rounded-lg w-full"
            :class="{ 'ring-2 ring-primary': error }" type="email" name="email_address" id="email_address"
            placeholder="Enter your email address">
          <button type="submit"
            class="bg-primary py-4 px-6 rounded-lg w-fit cursor-pointer flex items-center gap-2 text-nowrap">
            <BellRing class="pointer-events-none size-5" />
            Notify Me
          </button>
        </form>
        <p v-if="error" class="text-primary text-sm">{{ error }}</p>
      </section>
    </div>

  </main>
</template>