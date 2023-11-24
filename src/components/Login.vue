
<template>
  
    <SiteTopBar />
    <head>
      <link
        rel="stylesheet"
        href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"
      />
    </head>
    <div class="form_cont">
      <h2>{{ mode === 'login' ? 'Login' : 'Register' }}</h2>

      <form @submit.prevent="submitForm">
        <div v-if="mode === 'register'" class="box">
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="userData.firstName" required />
        </div>
        <div v-if="mode === 'register'" class="box">
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="userData.lastName" required />
        </div>
        <div class="box">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="userData.email" required />
          <i class="uil uil-envelope-alt email"></i>
        </div>
        <div class="box">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="userData.password" required />
          <i class="uil uil-lock password"></i>
        </div>
        <button type="submit">{{ mode === 'login' ? 'Login' : 'Register' }}</button>
      </form>

      <p>
        {{ mode === 'login' ? "Don't have an account? " : 'Already have an account? ' }}
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
        mode: 'login',
        userData: {
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        }
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
  <style scoped>
  .form_cont{
    position:absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: aliceblue;
  }
</style>