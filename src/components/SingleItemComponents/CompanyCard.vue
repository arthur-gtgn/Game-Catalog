<template>
    <div class="card">
        <h2 class="name">{{ name }}</h2>
        <h3 class="price">Game Price: {{ price }}$</h3>
        <p class="ceo">CEO: {{ ceo }}</p>
        <p class="market-value">Market Value: {{ marketValue }}$</p>
        <p class="num-employees">N° of Employees: {{ numEmployees }}</p>
        <p class="reseller-bool">Reseller: {{ reseller ? "Yes" : "No" }}</p>
        <div class="buttons" >
            <button @click="redirectCompEdit()">EDIT</button>
            <button @click="deleteCompany()">DELETE</button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "CompanyCard",
    props: {
        role: String,
        id: Number,
        name: String,
        ceo: String,
        marketValue: Number,
        numEmployees: Number,
        reseller: Boolean,
        price: Number,
    },
    methods: {
        deleteCompany(companyId) {
            const gameId = this.$route.params.id;
            const id = this.id;

            axios
                .delete(`http://localhost:3000/games/company/${gameId}/${id}`)
                .then(() => {
                    console.log("Company deleted successfully");
                    this.$emit("company-deleted", this.id);
                })
                .catch((error) => {
                    console.error("Error while deleting company: ", error);
                });
        },
        redirectCompEdit() {
            this.$router.push({
                name: "EditCompany",
                params: { companyId: this.id },
            });
        },
    },
};
</script>

<style scoped>
.card {
    background: white;
    position: relative;
    border: 2px solid black;
    border-radius: 0;
    padding: 15px;
    box-shadow: 0 0 0 5px var(--primary);
    max-width: 300px;
}

.name {
    text-align: center;
    font-size: 1.2em;
    margin: 0 0 10px 0;
    justify-content: center;
}

.price {
    font-style: italic;
    text-align: center;
    justify-content: center;
    font-size: 1em;
    color: var(--accent);
    margin: 0 0 15px 0;
}

p {
    text-align: center;
    justify-content: center;
    padding-left: 30px;
    padding-right: 30px;
    max-width: 80%;
    font-size: 0.9em;
    margin: 0 0 15px 0;
}

.buttons {
    display: flex;
    justify-content: space-around;
}

button {
    cursor: pointer;
    background-color: black;
    color: white;
    outline: none;
    padding: 5px 10px;
    border: none;
}
</style>
