<script setup lang="ts">
  import countriesContainer from "@/components/countries-helpers/countries-container.vue"
  import countryFilter from "@/components/countries-helpers/country-filter.vue"
  import pageControls from "@/components/countries-helpers/pagination.vue"
</script>

<template>
  <countryFilter></countryFilter>
  <countries-container></countries-container>
  <page-controls></page-controls>
</template>
