<script lang="ts" setup>
  import lightModeIcon from "../icons/light-mode-icon.vue"
  import darkModeIcon from "../icons/dark-mode-icon.vue"

  import { type Ref, ref, onMounted, watch } from "vue"
  import { useRouter } from "vue-router"

  const theme: Ref<string> = ref("light")
  const router = useRouter()

  const swtichTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light"
  }

  const goHome = () => router.push({ name: "countries" })

  watch(theme, (value) => {
    document.documentElement.setAttribute("data-theme", value)
    localStorage.setItem("theme", value)
  })

  onMounted(() => {
    const saved = localStorage.getItem("theme")
    theme.value = saved ? saved : theme.value
  })
</script>

<template>
  <header>
    <div class="wrapper nav-container">
      <h1 @click="goHome">Where in the world?</h1>
      <button @click="swtichTheme">
        <dark-mode-icon v-if="theme === 'dark'"></dark-mode-icon>
        <light-mode-icon v-else></light-mode-icon>
        <p>{{ `${theme === "dark" ? "Dark" : "Light"}` }} Mode</p>
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
  header {
    display: flex;
    justify-content: center;
    background: var(--color-elements);
    box-shadow: var(--shadow-common);
    .nav-container {
      justify-content: space-between;
      align-items: center;
      height: 6.25rem;
      display: flex;

      & h1 {
        transition: opacity 0.3s;
        user-select: none;
        font-weight: var(--font-weight-boldest);
        font-size: var(--header-primary);
        cursor: pointer;

        &:hover {
          opacity: 0.7;
        }
      }

      & button {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: var(--font-weight-bold);
        font-size: var(--paragraph-font-regular);
        background: transparent;
        padding: 0.8rem 1.2rem;
        cursor: pointer;
        width: 13.5rem;
        gap: 1rem;

        & svg {
          transform: rotateZ(-30deg);
          fill: var(--color-text);
          max-height: 1.75rem;
          max-width: 1.75rem;
        }
      }
    }
  }

  @media (max-width: 768px) {
    header {
      .nav-container {
        & button {
          font-size: var(--paragraph-font-small);
          width: 11.75rem;
          gap: 0.5rem;

          & svg {
            max-height: 1.5rem;
            max-width: 1.5rem;
          }
        }
      }
    }
  }
</style>
