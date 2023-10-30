<template>
  <SiteTopBar />
  <div class="collection">
    <MemberCard
      first-name="Arthur"
      last-name="Gatignol"
      img-ref="src/assets/arthur_pp.JPG"
      img-alt="arthur-pp"
      git-link="github.com/arthur-gtgn"
      topic1="data analysis"
      topic2="web development"
      lang1="python"
      lang2="java"
      lang3="javascript"
    />
    <MemberCard
      first-name="Romain"
      last-name="Samson"
      img-ref="src/assets/troll.jpeg"
      img-alt="romain-pp"
      git-link="github.com/arthur-gtgn"
      topic1="cybersecurity"
      topic2="machine learning"
      lang1="C"
      lang2="java"
      lang3="MySQL"
    />
  </div>
</template>

<script>
import MemberCard from "@/components/SingleItemComponents/MemberCard.vue";
import SiteTopBar from "@/components/TopBarComponents/SiteTopBar.vue";

export default {
  name: "AboutComponent",
  components: {
    SiteTopBar,
    MemberCard,
  },
};
</script>

<style scoped>
.collection {
  display: flex;
  justify-content: center;
}
</style>
