<template>
  <!-- Main container for sections -->
  <div>
    <!-- Include HeaderSection component -->
    <header-section></header-section>
    <!-- Include HeroSection component -->
    <hero-section></hero-section>
    <!-- Include UserSection component -->
    <user-section></user-section>
    <!-- Include FormSection component -->
    <form-section></form-section>
  </div>
</template>

<script setup>
// Import Vue components for each section
import HeaderSection from '../section/HeaderSection.vue'
import HeroSection from '../section/HeroSection.vue'
import UserSection from '../section/UserSection.vue'
import FormSection from '../section/FormSection.vue'
</script>
