<template>
  <ul>
    <li>
      <h2>
        <button @click="homeInput" class="button-52" role="button">HOME</button>
      </h2>
    </li>
    |
    <li>
      <h2>
        <button @click="explainInput" class="button-52" role="button">
          WHAT IS THIS?
        </button>
      </h2>
    </li>
    |
    <li>
      <h2>
        <button @click="aboutInput" class="button-52" role="button">
          TEAM
        </button>
      </h2>
    </li>

    <li>
      <h2>
        <button @click="loginInput" class="button-52" role="button">LOGIN</button>
      </h2>
    </li>
  </ul>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    aboutInput() {
      this.$router.push("/about");
    },
    explainInput() {
      this.$router.push("/explain");
    },
    homeInput() {
      this.$router.push("/");
    },
    loginInput() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
ul {
  align-items: center;
  list-style: none;
  display: flex;
  color: #f4f1de;
  margin-right: 5vw;
  margin-top: 0;
  margin-bottom: 0;
}

ul li {
  padding-left: 15px;
  padding-right: 15px;
}

.button-52 {
  font-family: "Baloo Bhaina 2", serif;
  font-size: 16px;
  font-weight: 200;
  letter-spacing: 1px;
  padding: 13px 20px 13px;
  outline: 0;
  border: 1px solid black;
  cursor: pointer;
  position: relative;
  background-color: rgba(0, 0, 0, 0);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-52:after {
  content: "";
  background-color: #ffffff;
  width: 100%;
  z-index: -1;
  position: absolute;
  height: 100%;
  top: 7px;
  left: 7px;
  transition: 0.2s;
}

.button-52:hover:after {
  top: 0;
  left: 0;
}

@media (min-width: 768px) {
  .button-52 {
    padding: 13px 50px 13px;
  }
}
</style>
