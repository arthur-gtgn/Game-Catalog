<template>
  <div>
    <SiteTopBar />
    <div class="edit-company">
      <h2>Edit Company</h2>
      <form @submit.prevent="updateCompany">
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
        <button type="submit">Update Company</button>
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
          this.newCompany
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

input {
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
