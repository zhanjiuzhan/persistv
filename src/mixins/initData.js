import { initData } from '@/api/data'
import eventBus from '@/utils/eventBus'

export default {
  data() {
    return {
      loading: false,
      size: 10,
      total: 0,
      current: 1,
      query: {},
      data: [],
      params: {},
      sizeList: [5, 10, 20, 50, 100]
    }
  },

  watch: {
    params: {
      handler() {
        this.getTableData()
      },
      deep: true
    },
    query(val) {
      this.params = {
        current: this.current,
        size: this.size,
        total: this.total,
        pages: this.pages,
        ...val }
    }
  },

  methods: {
    getTableData() {
      this.loading = true
      initData(this.url, this.params).then(res => {
        const { current, size, total, pages, records } = res
        this.current = current
        this.size = size
        this.total = total
        this.pages = pages
        this.data = records
        this.loading = false
      }).catch(error => {
        this.loading = false
        this.$message({
          message: error.message,
          type: 'error'
        })
      })
    },
    handleSelectionChange(valList) {
      this.selectValueList = valList
      if (valList.length === 1) {
        eventBus.$emit('oneSelected', valList)
      } else if (valList.length > 1) {
        eventBus.$emit('manySelected', valList)
      } else {
        eventBus.$emit('noOneSelected', valList)
      }
    },
    sizeChange(size) {
      this.size = size
      this.params = {
        ...this.params,
        size
      }
    },
    pageChange(current) {
      this.current = current
      this.params = {
        ...this.params,
        current
      }
    }
  }
}
