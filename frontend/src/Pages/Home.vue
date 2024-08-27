
<template>
  <div>
    <Slidebar />
    <div class="p-4 lg:ml-64">
      <div
        class="border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"
      >
        <h1 class="text-3xl font-bold underlin">
          Hello world!
          <button @click="logout">Logout</button>
          <h1>Name : {{ user.names }}</h1>
          <p>Your role is: {{ user.rol }}</p>
          <p>Your role is: {{ user.email }}</p>
        </h1>
        <div class="grid grid-cols-3 gap-4">
          <div
          class="bg-blue-500 text-white p-6 rounded-lg shadow-lg flex items-center justify-between"
        >
          <div class="flex flex-col">
            <h3 class="text-4xl font-bold">150</h3>
            <p class="text-lg">New Orders</p>
          </div>
          <div class="text-5xl">
            <img width="64" height="64" src="https://img.icons8.com/glyph-neue/64/shopping-cart.png" alt="shopping-cart"/>
          </div>
          <a
            href="#"
            class="text-blue-200 hover:text-white text-sm flex items-center"
          >
            More info <i class="fas fa-arrow-circle-right ml-1"></i>
          </a>
        </div>
        <div
          class="bg-blue-500 text-white p-6 rounded-lg shadow-lg flex items-center justify-between"
        >
          <div class="flex flex-col">
            <h3 class="text-4xl font-bold">150</h3>
            <p class="text-lg">New Orders</p>
          </div>
          <div class="text-5xl">
            <i class="fas fa-shopping-cart"></i>
          </div>
          <a
            href="#"
            class="text-blue-200 hover:text-white text-sm flex items-center"
          >
            More info <i class="fas fa-arrow-circle-right ml-1"></i>
          </a>
        </div>

        <div
          class="bg-blue-500 text-white p-6 rounded-lg shadow-lg flex items-center justify-between"
        >
          <div class="flex flex-col">
            <h3 class="text-4xl font-bold">150</h3>
            <p class="text-lg">New Orders</p>
          </div>
          <div class="text-5xl">
            <i class="fas fa-shopping-cart"></i>
          </div>
          <a
            href="#"
            class="text-blue-200 hover:text-white text-sm flex items-center"
          >
            More info <i class="fas fa-arrow-circle-right ml-1"></i>
          </a>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Slidebar from "../components/Slidebar.vue";
export default {
  name: "CategoryPage",
  components: { Slidebar },
  data() {
    return {
      user: {
        names: localStorage.getItem("names") || "",
        email: localStorage.getItem("email") || "",
        rol: localStorage.getItem("rol") || "",
      },
      // user: JSON.parse(localStorage.getItem("user")),
      products: [],
      searchQuery: "",
      currentPage: 1,
      itemsPerPage: 20, // Default value
      totalProducts: 0,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
  },
};
</script>