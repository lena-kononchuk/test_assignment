<template>
   <!-- Section for the form -->
   <section class="section section__footer" id="form">
      <div class="wrapper">
         <!-- Title -->
         <!-- Success message after form submission -->
         <div v-if="isSubmitted" class="center-xs">
            <div class="h1 box2x">User successfully registered</div>
            <div class="images box" style="margin: 0 auto;">
               <img :src="successImage" alt="Success Image">
            </div>
         </div>

         <!-- Form section -->
         <div v-if="!isSubmitted">
            <div class="h1 black center-xs box2x">Working with POST request</div>

            <form @submit.prevent="submitForm" enctype="multipart/form-data" method="POST" class="form">
               <!-- Input for name -->
               <div class="box2x relative">
                  <input type="text" id="name" v-model="formData.name" class="input"
                     :class="{ 'input--error': formData.name && !isNameValid }" @focus="handleFocus('name')"
                     @blur="handleBlur('name')" :maxlength="60" :disabled="formIsSubmitting || isLoading"
                     tabindex="1" />
                  <label for="name" class="input__label"
                     :class="{ 'active': isInputActive.name || formData.name, 'label--error': formData.name && !isNameValid }">
                     Your name
                  </label>
                  <span v-if="formData.name && !isNameValid" class="input__error">Name must be 2-60 characters
                     long.</span>
               </div>

               <!-- Input for email -->
               <div class="box2x relative">
                  <input type="email" id="email" v-model="formData.email" class="input"
                     :class="{ 'input--error': formData.email && !isEmailValid }" @focus="handleFocus('email')"
                     @blur="handleBlur('email')" :maxlength="160" :disabled="formIsSubmitting || isLoading"
                     tabindex="2" />
                  <label for="email" class="input__label"
                     :class="{ 'active': isInputActive.email || formData.email, 'label--error': formData.email && !isEmailValid }">
                     Email
                  </label>
                  <span v-if="formData.email && !isEmailValid" class="input__error">Enter a valid email address.</span>
               </div>

               <!-- Input for phone with masking -->
               <custom-input-phone :class="phoneClass" v-model="formData.phone" :is-valid="isPhoneValid"
                  :disabled="formIsSubmitting || isLoading" tabindex="3"></custom-input-phone>

               <!-- Radio buttons for selecting position -->
               <div class="box2x radio">
                  <div class="box-small">Select your position</div>
                  <div v-for="(position, index) in positions" :key="position.id" class="box-small">
                     <input type="radio" v-model="formData.position_id" :value="position.id" :id="'position-' + index"
                        class="radio__hidden" :disabled="formIsSubmitting || isLoading" tabindex="4" />
                     <label :for="'position-' + index" class="radio__custom">
                        <span class="radio__icon text"></span>{{ position.name }}
                     </label>
                  </div>
               </div>

               <!-- File upload input -->
               <div class="box2x file">
                  <label class="file__label">
                     <input type="file" class="pointer" @change="handleFileUpload"
                        accept="image/png, image/gif, image/jpeg" :disabled="formIsSubmitting || isLoading"
                        tabindex="5" />
                     <span>Upload</span>
                  </label>
                  <span class="file__text">{{ formData.photoName || "Upload your photo" }}</span>
                  <span v-if="fileError" class="input__error">{{ fileError }}</span>
               </div>

               <!-- Submit button -->
               <div class="flex middle-xs center-xs">
                  <button :disabled="formIsSubmitting || !isFieldValid" :class="{ loading: formIsSubmitting }"
                     type="submit" class="button" tabindex="6">
                     <span v-if="formIsSubmitting">Submitting...</span>
                     <span v-else>Sign up</span>
                  </button>
               </div>
            </form>

         </div>
      </div>
   </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import successImage from '../assets/images/success-image.png';
import CustomInputPhone from '../components/CustomInputPhone.vue';

// Reactive form data object with initial values
const formData = ref({
   name: '',
   email: '',
   phone: '',
   position_id: '',
   photo: null,
   photoName: ''
});

// Track which input fields are active (focused)
const isInputActive = {
   name: false,
   email: false,
   phone: false
};

// Reactive array to store positions fetched from the API
const positions = ref([]);

// Reactive variable to store the token required for API requests
const token = ref('');

// Reactive variable to store file upload errors
const fileError = ref('');

// Flag to indicate if the form is currently being submitted
const formIsSubmitting = ref(false);

// Flag to indicate if the form has been successfully submitted
const isSubmitted = ref(false);

// Fetch positions and token when the component is mounted
onMounted(async () => {
   await fetchPositions();
   await fetchToken();
});

// Fetch available positions from the API
const fetchPositions = async () => {
   try {
      const response = await axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/positions');
      positions.value = response.data.positions;
      if (positions.value.length > 0) {
         formData.value.position_id = positions.value[0].id;
      }
   } catch (error) {
      console.error('Failed to fetch positions:', error);
   }
};

// Handle focus event on input fields
const handleFocus = (field) => {
   isInputActive[field] = true;
};

// Handle blur event on input fields
const handleBlur = (field) => {
   isInputActive[field] = false;
};

// Handle file upload and validate the selected file
const handleFileUpload = (event) => {
   const file = event.target.files[0];
   if (file) {
      if (!['image/jpeg'].includes(file.type) || file.size > 5 * 1024 * 1024) {
         fileError.value = 'Please select a valid image file (JPEG, max 5MB).';
      } else {
         formData.value.photo = file;
         formData.value.photoName = file.name;
         fileError.value = '';
      }
   }
};

// Compute whether the name field is valid
const isNameValid = computed(() => formData.value.name !== '' && formData.value.name.length >= 2 && formData.value.name.length <= 60);

// Compute whether the email field is valid
const isEmailValid = computed(() => {
   const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return re.test(String(formData.value.email).toLowerCase());
});

// Compute whether the phone field is valid
const isPhoneValid = computed(() => formData.value.phone !== null && formData.value.phone.replace(/\D/g, '').length >= 10);

// Compute whether all form fields are valid
const isFieldValid = computed(() => {
   return isNameValid.value && isEmailValid.value && isPhoneValid.value && formData.value.position_id && formData.value.photo;
});

// Submit the form data to the API
const submitForm = async () => {
   if (formIsSubmitting.value || !isFieldValid.value) return;

   formIsSubmitting.value = true;

   try {
      let tokenValue = token.value;

      // Fetch a new token if the current one is expired
      if (!tokenValue || isTokenExpired(tokenValue)) {
         tokenValue = await fetchToken();
         token.value = tokenValue;
      }

      const headers = {
         'Token': tokenValue,
         'Content-Type': 'multipart/form-data',
      };

      const form = new FormData();
      form.append('name', formData.value.name);
      form.append('email', formData.value.email);
      form.append('phone', formData.value.phone);
      form.append('position_id', formData.value.position_id);
      form.append('photo', formData.value.photo);

      const response = await axios.post('https://frontend-test-assignment-api.abz.agency/api/v1/users', form, { headers });

      if (response.data.success) {
         console.log('Form submitted successfully:', response.data);
         isSubmitted.value = true;
      }
   } catch (error) {
      if (error.response) {
         console.error('Form submission error:', error.response.data);
      } else {
         console.error('Form submission error:', error);
      }
   } finally {
      formIsSubmitting.value = false;
   }
};

// Fetch a new token from the API
const fetchToken = async () => {
   try {
      const response = await axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/token');
      token.value = response.data.token;
      console.log('Fetched token:', token.value);
      return response.data.token;
   } catch (error) {
      console.error('Failed to fetch token:', error);
      throw error;
   }
};

// Check if the token is expired
const isTokenExpired = (tokenValue) => {
   try {
      const tokenData = JSON.parse(atob(tokenValue.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return tokenData.exp < currentTime;
   } catch (error) {
      console.error('Failed to decode token:', error);
      return true; // Assume token is expired if there's an error
   }
};
</script>
