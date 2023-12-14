<template>
    <SiteTopBar />
    <div class="edit-review">
      <h2>Edit Review</h2>
      <form @submit.prevent="updateReview">
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea v-model="editedReview.description" id="description" rows="4" required />
        </div>
        <div class="form-group">
          <label for="grade">Grade:</label>
          <input v-model="editedReview.grade" type="number" required />
        </div>
        <div class="form-group">
          <label for="author">Author:</label>
          <input v-model="editedReview.author" type="text" required />
        </div>
        <button type="submit">Update Review</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import SiteTopBar from "@/components/TopBarComponents/SiteTopBar.vue";
  
  export default {
    components: {
      SiteTopBar,
    },
    data() {
      return {
        editedReview: {
          description: "",
          grade: 0,
          author: "",
        },
      };
    },
    mounted() {
      const reviewId = this.$route.params.id;
    
    },
    methods: {
     
      updateReview() {
        const reviewId = this.$route.params.id;
  
        axios
          .put(`http://localhost:3000/games/review/update/${reviewId}`, this.editedReview)
          .then(() => {
            this.$router.push({ name: "GameDetails" });
          })
          .catch((error) => {
            console.error("Error updating review", error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .edit-review {
    margin: 20px;
  }
  
  form {
    position: absolute;
    padding: 20px;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: aliceblue;
    border-radius: 20px;
  }
  
  label {
    padding: 10px;
    font-weight: bold;
  }
  
  input,
  textarea {
    width: 90%;
    padding: 10px;
  }
  
  button {
    background-color: #3498db;
    color: white;
    padding: 10px;
    cursor: pointer;
    border: none;
  }
  
  button:hover {
    background-color: #2980b9;
  }
  </style>
  