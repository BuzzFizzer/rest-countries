<script lang="ts" setup>
  import router from "@/router"

  const props = defineProps(["img", "name", "pop", "region", "capital"])
  const population: number = props.pop.toLocaleString("en-US")

  const reroute = () => router.push({ name: "country", params: { id: props.name } })
</script>

<template>
  <div @click="reroute" class="country">
    <div class="flag">
      <img :src="props.img" :alt="`the flag of ${props.name}`" />
    </div>
    <div class="details">
      <h2>{{ props.name }}</h2>
      <ul>
        <li v-if="props.pop >= 0"><span>Population:</span> {{ population }}</li>
        <li v-if="props.region"><span>Region:</span> {{ props.region }}</li>
        <li v-if="props.capital">
          <span>Capital:</span>
          {{ props.capital instanceof Array ? props.capital[0] : props.capital }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .country {
    transition: transform 300ms, box-shadow 300ms, background-color 300ms;
    box-shadow: var(--shadow-common);
    background: var(--color-elements);
    border-radius: 0.5rem;
    overflow: hidden;
    cursor: pointer;
    height: 33.7rem;

    &:hover {
      transform: translateY(-1rem);
      box-shadow: var(--shadow-focued);
    }

    & .flag {
      height: 16rem;

      & img {
        -webkit-user-drag: none;
        height: 100%;
        width: 100%;
      }
    }

    .details {
      padding: 2.5rem 2.35rem;
      user-select: none;

      h2 {
        font-weight: var(--font-weight-boldest);
        font-size: var(--header-font-small);
        margin-bottom: 1.25rem;
      }

      & ul {
        & li {
          & span {
            font-weight: var(--font-weight-bold);
          }
        }
      }
    }
  }
</style>
