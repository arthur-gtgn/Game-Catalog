<template>
    <div class="container">
        <div class="card" ref="cardTilt">
            <div class="content">
                <h3>
                    {{ firstName }}<br />
                    {{ lastName }}
                </h3>
                <img :src="imgRef" :alt="imgAlt" />
                <p>
                    👋 Hi, I’m {{ firstName }}!<br />
                    📚 Studying engineering at EFREI Paris (L3)<br />
                    👀 I’m interested in {{ topic1 }} and {{ topic2 }}<br />
                    🌱 Coding in {{ lang1 }}, {{ lang2 }} and {{ lang3 }}<br />
                </p>
                <a href="`${gitLink}`">My GitHub</a>
            </div>
        </div>
    </div>
</template>

<script>
import VanillaTilt from "vanilla-tilt";

export default {
    name: "MemberCard",
    data: function () {
        return {};
    },
    mounted() {
        VanillaTilt.init(this.$refs.cardTilt, this.options);
    },
    props: {
        options: Object,
        parallax: Boolean,
        firstName: String,
        lastName: String,
        imgRef: String,
        imgAlt: String,
        gitLink: String,
        topic1: String,
        topic2: String,
        lang1: String,
        lang2: String,
        lang3: String,
    },
};
</script>

<style scoped>
.container {
    font-family: "Baloo Bhaina 2", sans-serif;
    line-height: 25px;
    overflow: auto;
    margin-top: 150px;
    height: 80%;
    display: flex;
    justify-content: center;
    position: relative;
    align-items: center;
    max-width: 100%;
    flex-wrap: wrap;
    z-index: 1;
}

.container .card {
    position: relative;
    width: 280px;
    height: 400px;
    margin: 30px;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
}

.container .card .content {
    padding: 20px;
    text-align: center;
    opacity: 1;
}

/*
.container .card:hover .content {
  transform: translateY(1px);
  opacity: 1;
}
*/

.container .card .content img {
    position: absolute;
    top: 5px;
    right: 10px;
    border-radius: 25%;
    opacity: 0.2;
    width: 100px;
}

.container .card .content h3 {
    font-size: 1.8em;
    color: #fff;
    z-index: -1;
}

.container .card .content p {
    font-size: 1em;
    color: #fff;
    font-weight: 300;
}

.container .card .content a {
    position: relative;
    display: inline-block;
    padding: 8px 20px;
    margin-top: 15px;
    background: #fff;
    color: #000;
    border-radius: 20px;
    font-weight: 500;
    box-shadow: rgba(0, 0, 0, 0.5);
}
</style>
