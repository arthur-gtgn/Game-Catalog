<template>

  <ul>
    <li>
      <h2>HOME</h2>
    </li>
    |
    <li>
      <h2>WHAT IS THIS?</h2>
    </li>
    |
    <li>
      <h2>TEAM</h2>
    </li>
  </ul>

</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>

ul {
  align-items: center;
  list-style: none;
  display: flex;
  font-family: "Baloo Bhaina 2", serif;
  color: #F4F1DE;
  margin-right: 5vw;
  margin-top: 0;
  margin-bottom: 0;
}

ul li {
  padding-left: 15px;
  padding-right: 15px;
}

</style>