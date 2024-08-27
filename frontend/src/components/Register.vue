<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md">
      <div class="bg-white shadow-lg rounded-lg p-6">
        <h2 class="text-center text-2xl font-bold mb-4">Login</h2>
        <form @submit.prevent="registerUser">
          <div class="mb-4">
            <label for="names" class="block text-gray-700">Name:</label>
            <input
              type="text"
              v-model="User.names"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="names"
              required
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-gray-700">Email:</label>
            <input
              type="email"
              v-model="User.email"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
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
          <div class="mb-4">
            <label for="rol" class="block text-gray-700">Role:</label>
            <select
              v-model="User.rol"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="rol"
            >
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
              <option value="sale">Sale</option>
              <option value="user">User</option>
            </select>
          </div>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import { useToast } from "vue-toastification";

export default {
  name: "RegisterPage",

  setup() {
    const toast = useToast();
    return { toast };
  },

  data() {
    return {
      User: {
        names: "",
        email: "",
        pass: "",
        rol: "",
      },
    };
  },

  methods: {
    async registerUser() {
      try {
        await axios.post("http://localhost:6900/auth/register", this.User);
        this.toast.success("Registration successful!", {
          position: "top-center",
          autoClose: 3000,
        });
        this.$router.push("/"); // Redirect to login page after successful registration
      } catch (error) {
        this.toast.error("Registration failed. Please try again.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    },
  },
};
</script>
