<template>
    <SiteTopBar />
    <div class="edit-review">
        
        <form @submit.prevent="updateReview" class="form-review">
            <h2 class="edit-review-title">Edit Review</h2>
            <div class="form-group">
                <label for="author">Author:</label>
                <input v-model="editedReview.author" type="text" required />
            </div>
            <div class="form-group">
                <label for="grade">Grade:</label>
                <input v-model="editedReview.grade" type="number" required />
            </div>
            
            <div class="form-group">
                <label for="description">Description:</label>
                <textarea v-model="editedReview.description" id="description" rows="4" required />
            </div>
            <button type="submit" class = "update-review">Update Review</button>
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
    const gameId = this.$route.params.id;
    const reviewId = this.$route.params.reviewId;

    axios
        .get(`http://localhost:3000/games/review/fetch/${reviewId}`)
        .then((response) => {
            this.editedReview = response.data.reviews[0];
        })
        .catch((error) => {
            console.error("Error fetching review", error);
        });
},

methods: {
    updateReview() {
        
        // Créez un objet avec seulement les champs modifiés
        const updatedFields = {};
        for (const key in this.editedReview) {
            if (this.editedReview[key] !== null && this.editedReview[key] !== undefined) {
                updatedFields[key] = this.editedReview[key];
            }
        }
        const gameId = this.$route.params.id;
        const reviewId = this.$route.params.reviewId;

        axios
            .put(`http://localhost:3000/games/review/update/${gameId}/${reviewId}`, updatedFields)
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
  
  .form-review {
    font-family: "Poppins", sans-serif;
    font-weight: var(--p);
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    width: 400px;
    margin: auto;
    position: relative;
    border: 1px solid black;
}

  
.form-review:after {
    content: "";
    background-color: var(--primary);
    width: 100%;
    z-index: -1;
    position: absolute;
    height: 100%;
    top: 0px;
    left: 0px;
    transition: 0.2s;
    top: 7px;
    left: 7px;
}

.form-review input {
    width: 250px;
    margin: 5px;
    border: none;
    background: none;
    position: relative;
    border: 2px solid black;
    border-radius: 5px;
    padding: 0.5rem;
}

.form-review textarea {
    font-family: "Arial", sans-serif;
    width: 250px;
    border: none;
    background: none;
    position: relative;
    border: 2px solid black;
    border-radius: 5px;
    padding: 0.5rem;
}
.update-review {
    font-family: "Poppins", sans-serif;
    font-weight: var(--p);
    margin-top: 10px;
    padding: 10px;
    width: 200px;
    background-color: var(--primary);
    color: rgb(225, 224, 224);
    border: none;
    cursor: pointer;
    margin: 10px;
}
h2 {
    color: var(--text);
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
    text-align: justify;
    padding: 20px;
}

.edit-review-title {
    color: black;
    font-family: "Poppins", sans-serif;
    padding: 0px;
}
  </style>
  