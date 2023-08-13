import { type Ref, type ComputedRef, ref, computed, watch } from "vue"
import { defineStore } from "pinia"
import axios from "axios"

export const useCountriesStore = defineStore("countries", () => {
  // ? ----- importing countries for initial display
  const countries: Ref<any[]> = ref(new Array())

  // ? ----- continent and input filter
  const continent: Ref<string> = ref("All")
  const country: Ref<string> = ref("")

  const filtered: ComputedRef<any[]> = computed(() => {
    if (!country.value && continent.value === "All") return countries.value

    return countries.value.filter(
      (el) =>
        (!country.value || el.name.common.toLowerCase().includes(country.value.toLowerCase())) &&
        (continent.value === "All" || el.region === continent.value)
    )
  })

  // ? ----- Porperty and order sorting
  const property: Ref<string> = ref("none")
  const order: Ref<boolean> = ref(true)

  // @ts-ignore // ? ts warning ignored as this will always return a value
  const sorted: ComputedRef<any[]> = computed(() => {
    if (property.value === "none") return filtered.value

    if (property.value === "name")
      if (order.value)
        return filtered.value.sort((a, b) => a.name.common.localeCompare(b.name.common))
      else return filtered.value.sort((a, b) => b.name.common.localeCompare(a.name.common))

    if (property.value === "population")
      if (order.value) return filtered.value.sort((a, b) => a.population - b.population)
      else return filtered.value.sort((a, b) => b.population - a.population)
  })

  // ? ----- Pagination
  const max: Ref<number | null> = ref(null)
  const page: Ref<number> = ref(0)

  const count: ComputedRef<number> = computed(() => {
    return !max.value ? 20 : max.value
  })

  const paginated: ComputedRef<any[]> = computed(() => {
    const start = page.value * count.value
    const end = start + count.value

    return sorted.value.slice(start, end)
  })

  const maxPage: ComputedRef<number> = computed(() => {
    return Math.ceil(sorted.value.length / count.value)
  })

  watch([continent, property, max, country], () => {
    page.value = 0
  })

  // ? ----- Getters
  const getCountry = (name: string): any => {
    return countries.value.find((country) => country.name.common === name)
  }

  const getNeighbors = (neighbors: string[]): string[] => {
    const results: string[] = new Array()

    for (const neighbor of neighbors) {
      const name = countries.value.find((el) => el.cca3 === neighbor).name.common
      results.push(name)
    }

    return results
  }

  // ? ----- API calls
  const fetchCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all")
      countries.value = response.data
      console.log("successfully updated countries list")
    } catch (err) {
      console.log("We ran into an error fetching the data.")
    }
  }

  const fetchCountry = async (name: string) => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`)
      return response.data[0]
    } catch (err) {
      console.log("We ran into an error fetching the data.")
    }
  }

  return {
    countries,
    country,
    continent,
    order,
    property,
    max,
    page,
    paginated,
    maxPage,
    fetchCountries,
    fetchCountry,
    getNeighbors,
    getCountry,
  }
})
