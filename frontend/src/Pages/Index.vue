<template>
  <div>
    <!-- Content here -->
  </div>
</template>

<script>
export default {
      name: 'IndexPage',
  mounted() {
    // Navigate to login page when component is mounted
    this.$router.push('/home');
  }
};
</script>
