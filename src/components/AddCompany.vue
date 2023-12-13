<template>
    <div>
        <SiteTopBar />
        <h2>Add Company</h2>
        <form @submit.prevent="submitCompany">
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
                <input
                    v-model="newCompany.nb_employees"
                    type="number"
                    required
                />
            </div>
            <div class="form-group">
                <label for="market_value">Market Value:</label>
                <input
                    v-model="newCompany.market_value"
                    type="number"
                    required
                />
            </div>
            <div class="form-group">
                <label for="reseller">Reseller:</label>
                <input v-model="newCompany.reseller" type="checkbox" />
            </div>
            <div class="form-group">
                <label for="price">price:</label>
                <input v-model="newCompany.price" type="number" required />
            </div>
            <button type="submit">Add Company</button>
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
        getGameDetailswithCompany() {
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
form {
    position: absolute;
    padding: 20px;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: aliceblue;
    border-radius: 20px;
}
</style>
