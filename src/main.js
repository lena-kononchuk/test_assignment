import { createApp } from 'vue';
import HomePage from './view/HomePage.vue';
import router from './router';
import './less/app.less';


// Function for scrolling to a specific section
const scrollToSection = (id) => {
   const element = document.getElementById(id);
   if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
   }
};

const app = createApp(HomePage);

// Make the scrollToSection function globally available using provide
app.provide('scrollToSection', scrollToSection);



app.use(router).mount('#app');

