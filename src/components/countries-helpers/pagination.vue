<script lang="ts" setup>
  import { type Ref, ref, computed, toRefs, onMounted, onUnmounted, type ComputedRef } from "vue"
  import { useCountriesStore } from "@/stores/countries"

  const { page, maxPage } = toRefs(useCountriesStore())

  const width: Ref<number | null> = ref(null)
  const max: ComputedRef<number> = computed(() => {
    return width.value && width.value >= 550 ? 5 : 3
  })

  const pages: Ref<Array<number>> = computed(() => {
    const current = page.value + 1

    let start = Math.max(1, current - Math.floor(max.value / 2))
    let end = start + max.value - 1

    if (end > maxPage.value) {
      end = maxPage.value
      start = Math.max(1, end - max.value + 1)
    }

    return Array.from({ length: end - start + 1 }, (_, index) => start + index)
  })

  const updateWidth = () => {
    width.value = window.innerWidth
  }

  onMounted(() => {
    width.value = window.innerWidth
    window.addEventListener("resize", updateWidth)
  })

  onUnmounted(() => {
    window.removeEventListener("resize", updateWidth)
  })

  const navigate = (arg: number) => {
    page.value = page.value >= 0 && page.value <= maxPage.value ? arg : page.value
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
</script>

<template>
  <section v-if="maxPage > 1" class="wrapper pagination-section">
    <ul class="pagination-bar">
      <li @click="page > 0 && page--" v-if="max !== 3">&#x3c;</li>
      <li @click="page = 0" v-if="pages[0] > 1">1</li>
      <li class="disabled" v-if="pages[0] > 2">...</li>
      <li
        v-for="number in pages"
        :class="{ active: number - 1 === page }"
        @click="navigate(number - 1)"
        :key="number"
      >
        {{ number }}
      </li>
      <li class="disabled" v-if="pages[pages.length - 1] < maxPage - 1">...</li>
      <li @click="page = maxPage - 1" v-if="pages[pages.length - 1] < maxPage">{{ maxPage }}</li>
      <li @click="page < maxPage - 1 && page++" v-if="max !== 3">&#62;</li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
  .pagination-section {
    display: flex;
    justify-content: center;
    .pagination-bar {
      margin: 4.25rem 0;
      display: flex;
      gap: 0.5rem;

      & li {
        box-shadow: var(--shadow-common);
        background: var(--color-elements);
        font-size: var(--paragraph-font-regular);
        font-weight: var(--font-weight-bold);
        height: 4.5rem;
        aspect-ratio: 1 / 1;
        border-radius: 0.5rem;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
      }
    }
  }
  .active {
    background: var(--color-hover) !important;
  }

  .disabled {
    cursor: unset !important;
  }
</style>
