<script setup lang="ts">
  import navigationControls from "@/components/country-helpers/navigation-controls.vue"
  import CountryComponent from "@/components/country-helpers/country-component.vue"

  import { onMounted } from "vue"
  import { useCountriesStore } from "@/stores/countries"

  const { fetchCountries } = useCountriesStore()
</script>

<template>
  <section class="wrapper">
    <navigation-controls></navigation-controls>
    <country-component></country-component>
  </section>
</template>
