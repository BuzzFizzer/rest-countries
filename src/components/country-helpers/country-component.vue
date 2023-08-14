<script setup lang="ts">
  import { useRoute, useRouter } from "vue-router"
  import { ref, onMounted, watch } from "vue"
  import { useCountriesStore } from "../../stores/countries"

  const { getCountry, getNeighbors, fetchCountry } = useCountriesStore()

  const router = useRouter()
  const route = useRoute()

  const country = ref<any | null>(null)
  const neighbors = ref<string[] | null>(null)
  const currency = ref<string | null>(null)
  const languages = ref<string | null>(null)

  // Load country data and neighbors
  function loadData(name: string) {
    country.value = getCountry(name)
    if (country.value?.borders) neighbors.value = getNeighbors(country.value.borders)
  }

  interface NestedObject {
    official?: string
    [key: string]: NestedObject | string | undefined
  }

  // Find the country's nativeName
  function findNativeName(obj: NestedObject): string | undefined | null {
    if ("official" in obj) return obj.official

    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        const result = findNativeName(obj[key] as NestedObject)
        if (result) return result
      }
    }

    return null
  }

  // Get country currency
  function getCurrency(obj: any): void {
    const currencies = obj.currencies
    if (typeof currencies === "object") {
      const keys = Object.keys(currencies)
      if (keys.length > 0) {
        currency.value = currencies[keys[0]].name
      }
    }
  }

  // Get languages string
  function getLanguagesString(obj: any): void {
    const languagesList = obj.languages
    if (typeof languagesList === "object") {
      const list = Object.values(languagesList)
      languages.value = list.join(", ")
    }
  }

  // Updating function, run whenever country vale changes
  function update(obj: any): void {
    getLanguagesString(obj)
    getCurrency(obj)
  }

  // Load the country data and update with API
  onMounted(async () => {
    const name = route.params.id as string
    country.value = await fetchCountry(name)
    loadData(name)
  })

  // Watch route changes and update country accordingly
  watch(route, () => {
    const name = route.params.id as string
    loadData(name)
  })

  watch(country, () => {
    update(country.value)
  })

  // Update route to selected country
  const goTo = (country: string) => router.push({ name: "country", params: { id: country } })
</script>

<template>
  <div v-if="country" class="country-component">
    <div class="country-flag">
      <img :src="country?.flags?.svg" :alt="`the flag of ${country?.name}`" />
    </div>

    <div class="country-details">
      <h2>{{ country?.name?.common }}</h2>

      <div class="traits">
        <ul class="traits-column">
          <li v-if="country?.name?.nativeName">
            <span>Native Name:</span> {{ findNativeName(country) }}
          </li>
          <li v-if="country?.population">
            <span>Population:</span> {{ country.population.toLocaleString("en-US") }}
          </li>
          <li v-if="country?.region"><span>Region:</span> {{ country.region }}</li>
          <li v-if="country?.subregion"><span>Sub Region:</span> {{ country.subregion }}</li>

          <li v-if="country?.capital">
            <span>Capital:</span>
            {{ country.capital instanceof Array ? country.capital[0] : country.capital }}
          </li>
        </ul>
        <ul class="traits-column">
          <li v-if="country?.tld?.length > 0">
            <span>Top Level Domain:</span> {{ country.tld[0] }}
          </li>
          <li v-if="currency"><span>Currencies:</span> {{ currency }}</li>
          <li v-if="languages"><span>Languages:</span> {{ languages }}</li>
        </ul>
      </div>

      <div v-if="neighbors" class="neighbors">
        <p>Bordering Countries:</p>
        <span v-for="neighbor of neighbors" @click="goTo(neighbor)">{{ neighbor }} </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .country-component {
    display: flex;
    column-gap: 14.5rem;
    min-width: 32.5rem;
    max-width: 128rem;
    width: 100%;

    & .country-flag {
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 56rem;
      height: 40rem;
      flex: 1 1;
      overflow: hidden;

      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    & .country-details {
      flex: 1 0;

      & h2 {
        font-size: var(--header-font-large);
        font-weight: var(--font-weight-boldest);
        padding-bottom: 2rem;
      }

      & .traits {
        display: flex;
        justify-content: space-between;
        margin-bottom: 7rem;
        font-size: var(--paragraph-font-regular);

        & .traits-column {
          display: flex;
          flex-direction: column;
          row-gap: 1rem;

          & span {
            font-weight: var(--font-weight-bold);
          }
        }
      }

      & .neighbors {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;

        & p {
          font-size: var(--paragraph-font-regular);
          font-weight: var(--font-weight-bold);
          margin-right: 1rem;
        }

        & span {
          box-shadow: var(--shadow-common);
          background: var(--color-elements);
          padding: 0.25rem 2.5rem;
          border-radius: 0.25rem;
          user-select: none;
          cursor: pointer;
        }
      }
    }
  }

  @media (max-width: 1368px) {
    .country-component {
      column-gap: 5rem;

      & .country-flag {
        min-width: 50.4rem;
        height: 36rem;
      }
    }
  }

  @media (max-width: 1000px) {
    .country-component {
      & .country-flag {
        min-width: unset;
      }

      flex-direction: column;
      align-items: center;
      margin-bottom: 7.5rem;
      row-gap: 3.5rem;

      & .country-details {
        max-width: 50rem;
        width: 100%;

        & .traits {
          margin-bottom: 3.5rem;
        }
      }
    }
  }

  @media (max-width: 550px) {
    .country-component {
      & .country-details {
        & .traits {
          flex-direction: column;
          row-gap: 4rem;
        }

        & .neighbors {
          gap: 0.75rem;

          & p {
            padding-bottom: 1.25rem;
            width: 100%;
          }
        }
      }
    }
  }
</style>
