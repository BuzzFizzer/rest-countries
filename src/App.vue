<script setup lang="ts">
  import theHeader from "./components/common/the-header.vue"

  import { useCountriesStore } from "@/stores/countries"
  import { onMounted } from "vue"

  const { fetchCountries } = useCountriesStore()

  onMounted(() => {
    fetchCountries()
  })
</script>

<template>
  <the-header></the-header>
  <main>
    <router-view></router-view>
  </main>
</template>
