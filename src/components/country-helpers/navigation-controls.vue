<script setup lang="ts">
  import backArrowIcon from "../icons/back-arrow-icon.vue"

  import { useRouter } from "vue-router"

  const router = useRouter()
  const goBack = () => router.back()
</script>

<template>
  <nav class="country-navigation">
    <button @click="goBack">
      <back-arrow-icon></back-arrow-icon>
      Back
    </button>
  </nav>
</template>

<style lang="scss" scoped>
  .country-navigation {
    font-size: var(--paragraph-font-regular);
    font-weight: var(--font-weight-bold);
    color: var(--color-text);
    margin: 7.5rem 0;

    & button {
      box-shadow: var(--shadow-common);
      background: var(--color-elements);
      padding: 0.9rem 3.5rem;
      border-radius: 0.5rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 1rem;

      &:hover {
        background: var(--color-hover);
      }

      & svg {
        width: 1.75rem;
        height: 1.75rem;
      }
    }
  }
</style>
