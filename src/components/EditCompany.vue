<template>
    <SiteTopBar />
      <div class="edit-company">
        <h2>Edit Company</h2>
        <form @submit.prevent="updateCompany">
   <div class="form-group">
      <label for="company_name">Company Name:</label>
      <input v-model="newCompany.company_name" type="text" required>
   </div>
   <div class="form-group">
      <label for="ceo">CEO:</label>
      <input v-model="newCompany.ceo" type="text" required>
   </div>
   <div class="form-group">
      <label for="nb_employees">Number of Employees:</label>
      <input v-model="newCompany.nb_employees" type="number" required>
   </div>
   <div class="form-group">
      <label for="market_value">Market Value:</label>
      <input v-model="newCompany.market_value" type="number" required>
   </div>
   <div class="form-group">
      <label for="reseller">Reseller:</label>
      <input v-model="newCompany.reseller" type="checkbox">
   </div>
   <div class="form-group">
      <label for="price">price:</label>
      <input v-model="newCompany.price" type="number" required>
   </div>
   <button type="submit">Add Company</button>
</form>

      </div>
    </template>
    
    <script>
    import axios from "axios";
    import SiteTopBar from "@/components/TopBarComponents/SiteTopBar.vue";
  
    export default {
      components:{
          SiteTopBar,
      },
      data() {
        return {
          newCompany: {
            company_name: "",
            ceo: "",
            nb_employees: "",
            market_value: "",
            reseller: false,
            price:"",
          },
        };
      },
      mounted() {
        this.gameId = this.$route.params.id;
        this.companyId = this.$route.params.companyId;
      },
      methods: {
        updateCompany() {
            
            this.companyId = this.$route.params.companyId;
          axios
            .put(`http://localhost:3000/games/company/update/${this.gameId}/${this.companyId}`, this.newCompany)
            .then(() => {
              
                this.$router.push({ name: 'GameDetails', params: { id: this.gameId } });
            })
            .catch((error) => {
              console.error("Error updating game", error);
            });
        },
      },
    };
    </script>
    
    <style scoped>
    .edit-game {
      margin: 20px;
    }
      form {
      position:absolute;
      padding : 20px;
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
    