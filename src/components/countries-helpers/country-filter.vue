<script lang="ts" setup>
  // @ts-ignore
  import autoAnimate, { vAutoAnimate } from "@formkit/auto-animate"
  import { type Ref, ref, toRefs, onMounted, reactive } from "vue"

  import orderIcon from "../icons/order-icon.vue"
  import searchIcon from "../icons/search-icon.vue"
  import listArrow from "../icons/list-arrow.vue"
  import { useCountriesStore } from "../../stores/countries"

  const { continent, country, order, property, max } = toRefs(useCountriesStore())

  const resultsPerPage: number[] = [8, 16, 20, 28, 40]
  const properties: string[] = ["population", "name"]
  const continets: string[] = [
    "All",
    "Africa",
    "Americas",
    "Asia",
    "Europe",
    "Oceania",
    "Antarctic",
  ]

  const continentsElement: Ref<HTMLUListElement | null> = ref(null)
  const propertiesElement: Ref<HTMLUListElement | null> = ref(null)
  const resultsPerPageElement: Ref<HTMLUListElement | null> = ref(null)

  const lists: Record<string, boolean> = reactive({
    continent: false,
    count: false,
    sort: false,
  })

  onMounted(() => {
    if (continentsElement.value instanceof HTMLElement) autoAnimate(continentsElement.value)
    if (propertiesElement.value instanceof HTMLElement) autoAnimate(propertiesElement.value)
    if (resultsPerPageElement.value instanceof HTMLElement) autoAnimate(resultsPerPageElement.value)
  })

  const displayList = (list: string) => {
    for (const key in lists) lists[key] = key === list ? !lists[key] : false
  }

  const sort = () => {
    order.value = !order.value

    // close any other open list
    displayList("order")
  }
</script>

<template>
  <section class="countries-filter wrapper">
    <div class="input-group">
      <label for="search">
        <search-icon></search-icon>
      </label>
      <input
        placeholder="Search for a country..."
        v-model="country"
        type="text"
        id="search"
        name="search"
      />
    </div>

    <div v-auto-animate class="filtering-menus">
      <button v-if="property !== 'none'" @click="sort">
        <order-icon :class="{ 'flipped-sort-arrow': !order }"></order-icon>
      </button>

      <div @click="displayList('count')" class="dropdown-menu">
        <p class="count-selector">{{ !max ? "№" : max }}</p>
        <ul class="count-list" ref="resultsPerPageElement">
          <li
            v-if="lists.count"
            v-for="results of resultsPerPage"
            @click="max = results"
            :key="results"
          >
            {{ results }}
          </li>
        </ul>
      </div>

      <div @click="displayList('sort')" class="dropdown-menu">
        <p class="property-selector">{{ property === "none" ? "Sort" : property }}</p>
        <list-arrow
          :class="{ 'flipped-list-arrow': lists.sort }"
          class="list-arrow sort-arrow"
        ></list-arrow>

        <ul class="property-list" ref="propertiesElement">
          <li v-if="lists.sort" v-for="prop of properties" @click="property = prop" :key="prop">
            {{ prop }}
          </li>
        </ul>
      </div>

      <div @click="displayList('continent')" class="dropdown-menu">
        <p class="continents-selector">
          {{ continent === "All" ? "Filter by Region" : continent }}
        </p>
        <list-arrow
          :class="{ 'flipped-list-arrow': lists.continent }"
          class="list-arrow"
        ></list-arrow>

        <ul class="continents-list" ref="continentsElement">
          <li
            v-if="lists.continent"
            v-for="cont of continets"
            @click="continent = cont"
            :key="cont"
          >
            {{ cont }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .countries-filter {
    display: flex;
    font-weight: var(--font-weight-bold);
    justify-content: space-between;
    align-items: center;
    margin-top: 3.2rem;
    margin-bottom: 4.25rem;

    & .input-group {
      position: relative;
      & label {
        position: absolute;
        max-width: 2rem;
        max-height: 2rem;
        top: 50%;
        transform: translateY(-60%);
        margin-left: 3rem;

        & svg {
          width: 100%;
          height: 100%;
          fill: var(--color-search);
        }
      }

      & input {
        padding: 1.75rem 7.5rem;
        font-size: var(--paragraph-font-regular);
        background: var(--color-elements);
        box-shadow: var(--shadow-common);
        color: var(--color-text-input);
        margin-bottom: 0.5rem;
        border-radius: 0.5rem;
        font-weight: inherit;
        width: 48rem;
      }
    }
    & .filtering-menus {
      display: flex;
      justify-content: space-between;
      gap: 1rem;

      & button {
        background: var(--color-elements);
        box-shadow: var(--shadow-common);
        padding: 0 1.2rem;
        border-radius: 0.5rem;
        max-height: 4.9rem; // ! Fix this later
        width: 4.9rem;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        &:hover {
          background: var(--color-hover);
        }

        & svg {
          transition: transform 300ms;
          fill: var(--color-text);
          height: 2rem;
          width: 2rem;
        }
      }

      & .dropdown-menu {
        position: relative;
        user-select: none;
        cursor: pointer;

        & p {
          font-size: var(--paragraph-font-regular);
          border-radius: 0.5rem;
          pointer-events: none;
          margin-bottom: 0.5rem;
          background: var(--color-elements);
          padding: 1.2rem 1.6rem;
          user-select: inherit;
          cursor: pointer;
          box-shadow: var(--shadow-common);
          pointer-events: none;
        }

        & .list-arrow {
          transition: transform 300ms;
          position: absolute;
          max-height: 1rem;
          max-width: 1rem;
          right: 0;
          top: 50%;
          transform: translateY(-75%);
          fill: var(--color-text);
          margin-right: 2rem;
        }

        & .sort-arrow {
          margin-right: 1rem;
        }

        & .continents-selector,
        & .continents-list {
          width: 20rem;
        }

        & .property-selector,
        & .property-list {
          width: 12.5rem;
        }

        & .count-selector,
        & .count-list {
          text-align: center;
          width: 5rem;
        }

        & ul {
          font-size: var(--paragraph-font-regular);
          border-radius: 0.5rem;
          overflow: hidden;
          background: var(--color-elements);
          position: absolute;
          box-shadow: 0 0.8rem 1.6rem 0 rgba(0, 0, 0, 0.2);
          z-index: 1;

          & li {
            padding: 1.2rem 1.6rem;
            cursor: pointer;

            &:hover {
              background: var(--color-hover);
            }
          }
        }
      }

      & .filter-wrapper:last-child {
        flex-direction: row-reverse;
      }
    }
  }

  @media (max-width: 1100px) {
    .countries-filter {
      flex-direction: column;
      row-gap: 1.5rem;

      & .input-group {
        width: 100%;
        max-width: 60rem;
        min-width: 34.5rem;

        & input {
          padding: 1.4rem 7.5rem;
          width: 100%;
        }
      }
    }
  }

  @media (max-width: 550px) {
    .countries-filter {
      & .filtering-menus {
        & .dropdown-menu {
          & .continents-selector,
          & .continents-list {
            width: 10.5rem;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }

          & .property-selector,
          & .property-list {
            width: 10.5rem;
          }
        }
      }
    }
  }

  .flipped-sort-arrow {
    transform: rotateZ(180deg);
  }

  .flipped-list-arrow {
    transform: translateY(-90%) rotateZ(180deg) !important;
  }
</style>
