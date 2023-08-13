import { createRouter, createWebHistory } from "vue-router"

import countriesView from "../views/CountriesView.vue"
import countryView from "../views/CountryView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", redirect: "countries" },
    { path: "/countries", name: "countries", component: countriesView },
    { path: "/countries/:id", name: "country", component: countryView, props: true },
  ],
})

export default router
