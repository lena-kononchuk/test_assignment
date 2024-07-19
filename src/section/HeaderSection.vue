<template>
  <header>
    <div class="header">
      <div class="wrapper">
        <div class="flex middle-xs between-xs">
          <!-- Link to the home page using router-link -->
          <router-link to="/" class="logo" aria-label="logo"></router-link>
          <div class="flex" style="gap: 10px;">
            <!-- Button to scroll to the 'user' section -->
            <a @click.prevent="scrollToSection('user')" class="button" aria-label="user">Users</a>
            <!-- Button to scroll to the 'form' section -->
            <a @click.prevent="scrollToSection('form')" class="button" aria-label="form">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { inject } from 'vue'; // Import the inject function from vue

// Get the scrollToSection function from provide
const scrollToSection = inject('scrollToSection');
</script>
