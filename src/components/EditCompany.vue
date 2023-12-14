<template>
  <div>
    <SiteTopBar />
    <div class="edit-company">
      
      <form @submit.prevent="updateCompany" class="form-game">
        <h2 class ="edit-game-title">Edit Company</h2>
        <div class="form-group">
          <label for="company_name">Company Name:</label>
          <input v-model="newCompany.company_name" type="text" required />
        </div>
        <div class="form-group">
          <label for="ceo">CEO:</label>
          <input v-model="newCompany.ceo" type="text" required />
        </div>
        <div class="form-group">
          <label for="nb_employees">Number of Employees:</label>
          <input v-model="newCompany.nb_employees" type="number" required />
        </div>
        <div class="form-group">
          <label for="market_value">Market Value:</label>
          <input v-model="newCompany.market_value" type="number" required />
        </div>
        <div class="form-group">
          <label for="reseller">Reseller:</label>
          <input v-model="newCompany.reseller" type="checkbox" />
        </div>
        <div class="form-group">
          <label for="price">Price:</label>
          <input v-model="newCompany.price" type="number" step="any"  required />
        </div>
        <button type="submit" class="submit">Update Company</button>
      </form>
    </div>
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
      newCompany: {
        company_name: "",
        ceo: "",
        nb_employees: null,
        market_value: null,
        reseller: false,
        price: null,
      },
    };
  },
  mounted() {
    const companyId = this.$route.params.companyId;

    axios
        .get(`http://localhost:3000/games/company/fetch/${companyId}`)
        .then((response) => {
            this.newCompany = response.data.company[0];
        })
        .catch((error) => {
            console.error("Error fetching company", error);
        });
  },
  methods: {
    updateCompany() {
      const gameId = this.$route.params.id;
      const companyId = this.$route.params.companyId;
      const updatedFields = {};
        for (const key in this.newCompany) {
            if (this.newCompany[key] !== null && this.newCompany[key] !== undefined) {
                updatedFields[key] = this.newCompany[key];
            }
        }
      axios
        .put(
          `http://localhost:3000/games/company/update/${gameId}/${companyId}`,
          updatedFields
        )
        .then(() => {
          this.$router.push({
            name: "GameDetails",
            params: { id: gameId },
          });
        })
        .catch((error) => {
          console.error("Error updating company", error);
        });
    },
  },
};
</script>

<style scoped>
.edit-company {
  margin: 20px;
}


.form-game {
    font-family: "Poppins", sans-serif;
    font-weight: var(--p);
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    width:500px;
    margin: auto;
    position: relative;
    border: 1px solid black;
}

  
.form-game:after {
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

.form-game input {
    width: 250px;
    margin: 5px;
    border: none;
    background: none;
    position: relative;
    border: 2px solid black;
    border-radius: 5px;
    padding: 0.5rem;
}

.form-game textarea {
    font-family: "Arial", sans-serif;
    width: 250px;
    border: none;
    background: none;
    position: relative;
    border: 2px solid black;
    border-radius: 5px;
    padding: 0.5rem;
}
.update-game {
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

.edit-game-title {
    color: black;
    font-family: "Poppins", sans-serif;
    padding: 0px;
}
button {
    margin: 20px;
    font-family: "Poppins", sans-serif;
    padding: 10px;
    cursor: pointer;
    background-color: black;
    color: white;
    outline: 2px solid white;
    border: none;
}
.submit {
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
</style>
