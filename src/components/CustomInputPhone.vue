<template>
   <div class="box2x relative">
      <input type="tel" id="phone" v-model="formattedValue" class="input"
         :class="{ 'input--error': !isPhoneValid && internalValue }" @input="onInput" @focus="handleFocus"
         @blur="handleBlur" :maxlength="13" :disabled="disabled" />

      <label for="phone" class="input__label"
         :class="{ 'active': isActive || internalValue, 'label--error': !isPhoneValid && internalValue }">
         {{ label }}
      </label>

      <span v-if="internalValue && !isPhoneValid" class="input__error">
         Enter a valid phone format: +380XXXXXXXXX.
      </span>
   </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
   modelValue: String,
   disabled: Boolean,
   label: {
      type: String,
      default: 'Phone'
   }
});

const internalValue = ref(props.modelValue);
const isActive = ref(false);

const handleFocus = () => {
   isActive.value = true;
};

const isPhoneValid = computed(() => {
   const phonePattern = /^\+380\d{9}$/;
   return phonePattern.test(internalValue.value);
});

const handleBlur = () => {
   isActive.value = false;
};

const onInput = (event) => {
   internalValue.value = formatPhoneNumber(event.target.value);
};

const formatPhoneNumber = (number) => {
   let cleanedNumber = number.replace(/\D/g, ''); // Удаляем все нецифровые символы
   const countryCode = '380';

   // Убеждаемся, что номер начинается с кода страны
   if (!cleanedNumber.startsWith(countryCode)) {
      cleanedNumber = countryCode + cleanedNumber;
   }

   return `+${cleanedNumber}`;
};

const formattedValue = computed({
   get() {
      return internalValue.value;
   },
   set(newValue) {
      internalValue.value = newValue;
      emit('update:modelValue', newValue);
      emit('input', newValue);
   }
});

watch(() => props.modelValue, (newValue) => {
   internalValue.value = newValue;
});

const emit = defineEmits(['update:modelValue', 'input']);
</script>
