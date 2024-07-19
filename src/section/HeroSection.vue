<template>
  <div class="wrapper wrapper__full">
    <!-- Hero section with dynamic background image -->
    <div class="hero" loading="lazy" :style="{ backgroundImage: `url(${heroImage})` }">
      <!-- Content overlay on the hero image -->
      <div class="white center-xs wrapper__small section__hero" style="padding-left: 16px; padding-right: 16px">
        <!-- Main headline -->
        <div class="h1 box">Test assignment for front-end developer</div>
        <!-- Description text -->
        <div class="text box3x" style="max-width: 380px">
          What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS
          with a vast understanding of User design thinking as they'll be building web interfaces
          with accessibility in mind. They should also be excited to learn, as the world of
          Front-End Development keeps evolving.
        </div>
        <!-- Button to scroll to the sign-up form -->
        <a href="#form" class="button" @click.prevent="scrollToSection('form')" aria-label="Sign up for the form">Sign
          up</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue' // Import the ref function from vue
import { inject } from 'vue' // Import the inject function from vue
import heroImage from '../assets/images/hero.jpg'

const backgroundImage = ref(null) // Reference to the hero background image element
const scrollToSection = inject('scrollToSection') // Get the scrollToSection function from provide
</script>
