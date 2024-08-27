<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md">
      <div class="bg-white shadow-md rounded px-8 py-8 pt-8">
        <div class="mb-4">
          <h2 class="text-2xl font-bold text-center">Login</h2>
          <form @submit.prevent="loginUser">
            <div class="mb-4">
              <label for="names" class="block text-gray-700">Username:</label>
              <input
                type="text"
                v-model="User.email"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="names"
                required
              />
            </div>
            <div class="mb-4">
              <label for="pass" class="block text-gray-700">Password:</label>
              <input
                type="password"
                v-model="User.pass"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="pass"
                required
              />
            </div>
            <button
              type="submit"
              class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
          </form>
          <div class="flex justify-center mt-4">
          <a href="#" class="w-24">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-Y5t2LLi-wVAs4jz_pUBY3qjTfES18lebdg&s"
              alt="Google"
              class="w-full h-auto"
            />
          </a>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";

export default {
  name: "LoginPage",
  setup() {
    const toast = useToast();
    return { toast };
  },

  data() {
    return {
      User: {
        email: "",
        pass: "",
      },
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post(
          "http://localhost:6900/auth/login",
          this.User
        );

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("rol", response.data.rol);
        localStorage.setItem("names", response.data.names);
        localStorage.setItem("email", response.data.email);

        this.toast.success("Login successful!", {
          position: "top-center",
          autoClose: 3000,
        });
        this.$router.push("/home"); // Redirect to dashboard
      } catch (error) {
        this.toast.error("Login failed. Please check your credentials.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    },
  },
};
</script>

<style scoped>
/* Add custom styles if needed */
.card {
  border-radius: 0.5rem; /* Rounded corners for card */
}

.card-body {
  padding: 2rem; /* Consistent padding inside card */
}
</style>
