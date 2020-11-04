import store from '@/store'

const WIDTH = 992

export default {
  watch: {
    $route (route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('closeSideBar', { withoutAnimation: false })
      }
    }
  },

  beforeMount () {
    window.addEventListener('resize', this.$_resizeHandler)
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.$_resizeHandler)
  },

  mounted () {
    const isMobile = this.$_isMoible()
    if (isMobile) {
      store.dispatch('toggleDevice', 'mobile')
      store.dispatch('closeSideBar', { withoutAnimation: true })
    }
  },

  methods: {
    $_isMoible() {
      const rect = document.body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMoible()
        store.dispatch('toggleDevice', isMobile ? 'mobile' : 'desktop')
        if (isMobile) {
          store.dispatch('closeSideBar', { withoutAnimation: true })
        }
      }
    }
  }
}
