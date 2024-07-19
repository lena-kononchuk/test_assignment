import { createRouter, createWebHistory } from 'vue-router' // Import necessary functions from vue-router
import HomePage from '../view/HomePage.vue' // Import the HomePage component

// Define the routes for the application
const routes = [
   {
      path: '/', // The URL path for the route
      name: 'HomePage', // The name of the route
      component: HomePage // The component to render when this route is visited
   }
]

// Create the router instance
const router = createRouter({
   history: createWebHistory(), // Use HTML5 history mode
   routes // Array of routes
})

export default router // Export the router instance
