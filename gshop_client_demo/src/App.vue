<template>
  <div>
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
  import FooterGuide from "./components/footerguid/FooterGuide";
  export default {
    components: {
      FooterGuide
    },
    mounted () {
      this.$store.dispatch('getUserInfo')
    }
  }
</script>

<style lang="stylus">

</style>
