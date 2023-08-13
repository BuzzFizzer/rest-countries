<script lang="ts" setup>
  // @ts-ignore
  import { vAutoAnimate } from "@formkit/auto-animate"
  import { toRefs } from "vue"

  import countryListComponent from "./country-list-component.vue"
  import { useCountriesStore } from "@/stores/countries"

  const { paginated: result } = toRefs(useCountriesStore())
</script>

<template>
  <section v-auto-animate class="countries-container wrapper">
    <country-list-component
      v-for="country of result"
      :key="country.name.common"
      :name="country.name.common"
      :capital="country.capital"
      :img="country.flags.png"
      :pop="country.population"
      :region="country.region"
    ></country-list-component>
  </section>
</template>

<style lang="scss" scoped>
  .countries-container {
    display: grid;
    grid-template-columns: repeat(4, 26.5rem);
    justify-content: space-between;
    flex-wrap: wrap;
    row-gap: 7.5rem;
  }

  @media (max-width: 1250px) {
    .countries-container {
      grid-template-columns: repeat(3, minmax(26.5rem, 30rem));
      column-gap: 7.5rem;
    }
  }

  @media (max-width: 1070px) {
    .countries-container {
      grid-template-columns: repeat(2, minmax(26.5rem, 30rem));
      justify-content: space-evenly;
    }
  }

  @media (max-width: 725px) {
    .countries-container {
      grid-template-columns: repeat(1, 26.5rem);
      justify-content: center;
    }
  }
</style>
