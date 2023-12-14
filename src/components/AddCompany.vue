<template>
    <div>
        <SiteTopBar />
        <form @submit.prevent="submitCompany" class = "form-company">
            <h2 class="edit-company-title">Add Company</h2>
            <div class="form-group">
                <label for="company_name"></label>
                <input v-model="newCompany.company_name" type="text" required placeholder="Company name"/>
            </div>
            <div class="form-group">
                <label for="ceo"></label>
                <input v-model="newCompany.ceo" type="text" required placeholder="CEO"/>
            </div>
            <div class="form-group">
                <label for="nb_employees"></label>
                <input
                    v-model="newCompany.nb_employees"
                    type="number"
                    required placeholder="nb employees"
                />
            </div>
            <div class="form-group">
                <label for="market_value"></label>
                <input
                    v-model="newCompany.market_value"
                    type="number"
                    required placeholder="Market value"
                />
            </div>

            <div class="form-group">
                <label for="price"></label>
                <input v-model="newCompany.price" type="number" required placeholder="Price" />
            </div>
            <div class="form-group">
                <label for="reseller">Reseller</label>
                <input v-model="newCompany.reseller" type="checkbox" />
            </div>
            <button type="submit" class="submit">Add Company</button>
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
            newCompany: {
                company_name: "",
                ceo: "",
                nb_employees: null,
                market_value: null,
                reseller: false,
                price: null,
            },
            company: {},
        };
    },
    methods: {
        submitCompany() {
            const gameId = this.$route.params.id;

            axios
                .post(
                    `http://localhost:3000/games/AddCompany/${gameId}`,
                    this.newCompany
                )
                .then((response) => {
                    if (
                        response.data &&
                        response.data.message ===
                            "Company added successfully to the game"
                    ) {
                        console.log("Entreprise ajoutée avec succès");
                        this.$router.push({
                            name: "GameDetails",
                            params: { id: gameId },
                        });
                    } else {
                        console.error("Réponse inattendue du serveur");
                    }
                })
                .catch((error) => {
                    console.error("Error submitting company", error);
                });
        },
        getGameDetailsWithCompany() {
            const gameId = this.$route.params.id;
            axios
                .get(`http://localhost:3000/games/company/${gameId}`, {
                    withCredentials: true,
                })
                .then((response) => {
                    this.company = response.data.company;
                });
        },
    },
};
</script>

<style scoped>
.form-company {
    font-family: "Poppins", sans-serif;
    font-weight: var(--p);
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    width:400px;
    margin: auto;
    position: relative;
    border: 1px solid black;
}

  
.form-company:after {
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
.form-group {
  margin-bottom: 20px;
}
.form-company input {
    width: 250px;
    margin: 5px;
    border: none;
    background: none;
    position: relative;
    border: 2px solid black;
    border-radius: 5px;
    padding: 0.5rem;
}

.form-company textarea {
    font-family: "Arial", sans-serif;
    width: 250px;
    border: none;
    background: none;
    position: relative;
    border: 2px solid black;
    border-radius: 5px;
    padding: 0.5rem;
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
h2 {
    color: var(--text);
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
    text-align: justify;
    padding: 20px;
}

.edit-company-title {
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
