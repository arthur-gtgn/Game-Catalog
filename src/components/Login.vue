
<template>
    <div>
      <h2>{{ mode === 'login' ? 'Login' : 'Register' }}</h2>
  
      <form @submit.prevent="submitForm">
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="userData.firstName" required>
  
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="userData.lastName" required>
  
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="userData.email" required>
  
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="userData.password" required>
  
        <button type="submit">{{ mode === 'login' ? 'Login' : 'Register' }}</button>
      </form>
  
      <p>
        {{ mode === 'login' ? 'Don\'t have an account? ' : 'Already have an account? ' }}
        <a href="#" @click="toggleMode">{{ mode === 'login' ? 'Register' : 'Login' }}</a>
      </p>
    </div>
  </template>
  
  <script>
  import SiteTopBar from "@/components/TopBarComponents/SiteTopBar.vue";


export default {
    name: "login",
    components: {
        SiteTopBar,
    },
    data() {
        return {
            mode: "login",
            userData: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
            },
        };
    },
    methods: {
      toggleMode() {
        this.mode = this.mode === 'login' ? 'register' : 'login';
        this.userData = {
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        };
      },
      submitForm() {
        console.log('Form submitted:', this.userData);
      }
    }
  };
  </script>
  