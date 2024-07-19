<template>
   <section class="section relative" id="user">
      <div class="wrapper">
         <!-- Section title -->
         <div class="h1 black center-xs box2x">Working with GET request</div>
         <div class="row">
            <!-- Display users -->
            <div v-for="user in users" :key="user.id" class="col-xs-12 col-sm-6 col-md-4 box2x"
               style="padding-right: 14.5px; padding-left: 14.5px; margin-bottom: 29px;">
               <article class="card center-xs flex flex-vertical">
                  <!-- User photo -->
                  <div class="images">
                     <img :src="user.photo" loading="lazy" alt="User Photo" class="images" />
                  </div>
                  <!-- User name -->
                  <div class="text text--ellipsis">{{ user.name }}</div>
                  <div class="text flex-vertical" style="gap: 0;">
                     <!-- User position -->
                     <div class="text--ellipsis">{{ user.position }}</div>
                     <!-- User email -->
                     <a :href="'mailto:' + user.email" class="link black text--ellipsis">{{ user.email }}</a>
                     <!-- User phone -->
                     <a :href="'tel:' + user.phone" class="link black">{{ user.phone }}</a>
                  </div>
               </article>
            </div>

            <!-- Loader -->
            <div v-if="isLoading" class="loading"></div>

            <!-- Show more button -->
            <div v-else style="margin: 0 auto;">
               <button v-if="showMoreButton" @click="loadMoreUsers" class="button" aria-label="Show more user">Show
                  more</button>
            </div>
         </div>
      </div>
   </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'; // Import ref and onMounted from Vue
import axios from 'axios'; // Import axios for HTTP requests

const users = ref([]); // Array of users
const showMoreButton = ref(true); // Show more button visibility
const currentPage = ref(1); // Current page of users
const totalPages = ref(1); // Total pages of users
const isLoading = ref(false); // Loading state for loader

// Function to fetch users from the API
const fetchUsers = async (page = 1) => {
   isLoading.value = true; // Show loader
   try {
      const response = await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/users`, {
         params: {
            page,
            count: 6,
         },
      });
      console.log(response);
      // Update users array with fetched data
      users.value = [...users.value, ...response.data.users];
      totalPages.value = response.data.total_pages; // Update total pages
      showMoreButton.value = page < totalPages.value; // Show more button logic
   } catch (error) {
      console.error('Failed to fetch users:', error);
      // Handle error gracefully
   } finally {
      isLoading.value = false; // Hide loader
   }
};

// Function to load more users
const loadMoreUsers = () => {
   if (currentPage.value < totalPages.value) {
      currentPage.value++; // Increment current page
      fetchUsers(currentPage.value); // Fetch more users
   }
};

// Fetch users on component mount
onMounted(() => {
   fetchUsers();
});
</script>
