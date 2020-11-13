<template>
    <component v-bind="linkProps(to)">
      <slot/>
    </component>
</template>

<script>
export default {
  name: 'Link',

  props: {
    to: {
      type: String,
      required: true
    }
  },

  methods: {
    isExternalLink (routePath) {
      return isExternal(routePath)
    },
    linkProps (url) {
      if (this.isExternalLink((url))) {
        return {
          is: 'a',
          href: url,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        is: 'router-link',
        to: url
      }
    }
  }
}
</script>

<style scoped>

</style>
