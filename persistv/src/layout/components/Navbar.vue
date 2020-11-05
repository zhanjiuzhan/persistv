<template>
  <div calss="navbar">

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
export default {
  name: 'Navbar',

  components: {
    Breadcrumb,
    Hamburger,
  },

  computed: {
    ...mapGetters([
      'sidebar',
      'device',
      'user',
      'baseApi'
    ])
  }
}
</script>

<style scoped>

</style>
