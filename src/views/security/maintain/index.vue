<template>
  <div class="page-content">
    <el-scrollbar class="scrollbar-wrapper">
      <div v-loading="loadingForm" class="maintain-content">
        <el-form label-position="top">
          <el-form-item label="密码复杂性">
            <el-checkbox-group v-model="checkboxList" @change="changePwdSetting">
              <!--<el-checkbox v-model="maintainForm.includeCase" :label="caseSense"/>-->
              <el-checkbox v-model="maintainForm.includeLetter" :label="containLetter"/>
              <el-checkbox v-model="maintainForm.includeDigital" :label="containNumber"/>
              <el-checkbox v-model="maintainForm.includeSpecialSymbol" :label="specialSymbol"/>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="密码长度（最小密码长度）">
            <el-input-number
              v-model="maintainForm.minLength"
              :min="lengthRange.minValue"
              :max="lengthRange.maxValue"
            />
          </el-form-item>
          <el-form-item label="强制更新密码周期">
            <el-input-number
              v-model="maintainForm.changeCycle"
              :min="changeCycleRange.min"
              :max="changeCycleRange.max"/>
            <div class="suffix">
              <!-- <el-select-->
              <!--   v-model="changeCycleRange.label"-->
              <!--   @change="(val) => changeRangeHandler('change', val)"-->
              <!-- >-->
              <!--   <el-option-->
              <!--     v-for="item in changeCycleOption"-->
              <!--     :key="item.value"-->
              <!--     :value="item"-->
              <!--     :label="item.label"-->
              <!--   />-->
              <!-- </el-select>-->
              <label>
                日
              </label>
            </div>
          </el-form-item>
          <el-form-item label="密码禁止复用限制周期">
            <el-input-number
              v-model="maintainForm.reuseCycle"
              :min="reuseCycleOption.min"
              :max="reuseCycleRange.max"
            />
            <div class="suffix">
              <!-- <el-select-->
              <!--   v-model="reuseCycleRange.label"-->
              <!--   @change="(val) => changeRangeHandler('reuse', val)"-->
              <!-- >-->
              <!--   <el-option-->
              <!--     v-for="item in reuseCycleOption"-->
              <!--     :key="item.value"-->
              <!--     :value="item"-->
              <!--     :label="item.label"-->
              <!--   />-->
              <!-- </el-select>-->
              <div>
                日
              </div>
            </div>
          </el-form-item>
          <el-form-item label="自动注销时间（系统无操作自动注销账号时间）">
            <el-input-number
              v-model="maintainForm.logoutTime"
              :min="logoutTimeRange.minValue"
              :max="logoutTimeRange.maxValue"
            />
            <div class="suffix">
              <label>分</label>
            </div>
          </el-form-item>
          <el-form-item label="允许错误密码尝试次数（达到限度时锁定）">
            <el-input-number
              v-model="maintainForm.errorsNumber"
              :min="errorCountRange.minValue"
              :max="errorCountRange.maxValue"
            />
            <div class="suffix">
              <label>次</label>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="submitMaintainSetting">应用</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { getStrategy, setStrategy } from '@/api/strategy'

export default {
  name: 'MaintainManagement',

  data() {
    return {
      loadingForm: false,
      checkboxList: [],
      caseSense: '大小写敏感',
      containLetter: '应包含字母',
      containNumber: '应包含数字',
      specialSymbol: '应包含特殊符号',
      lengthRange: {
        minValue: 1,
        maxValue: 30
      },
      logoutTimeRange: {
        minValue: 1,
        maxValue: 60
      },
      errorCountRange: {
        minValue: 3,
        maxValue: 10
      },
      changeCycleRange: {
        label: '日',
        value: 'day',
        min: 1,
        max: 31
      },
      changeCycleOption: {
        label: '日',
        value: 'day',
        min: 1,
        max: 31
      },
      reuseCycleRange: {
        label: '日',
        value: 'day',
        min: 1,
        max: 31
      },
      reuseCycleOption: {
        label: '日',
        value: 'day',
        min: 1,
        max: 31
      },
      maintainForm: {
        id: '',
        minLength: 0,
        includeCase: 'Y',
        includeLetter: 'Y',
        includeDigital: 'Y',
        includeSpecialSymbol: 'Y',
        changeCycle: 0,
        reuseCycle: 0,
        errorsNumber: 0,
        logoutTime: 0,
        regularExpression: ''
      }
    }
  },

  created() {
    this.init()
  },

  methods: {
    init() {
      getStrategy().then(res => {
        this.maintainForm = res
        this.checkboxList = []
        if (res.includeCase === 'Y') {
          this.checkboxList.push(this.caseSense)
        }
        if (res.includeLetter === 'Y') {
          this.checkboxList.push(this.containLetter)
        }
        if (res.includeDigital === 'Y') {
          this.checkboxList.push(this.containNumber)
        }
        if (res.includeSpecialSymbol === 'Y') {
          this.checkboxList.push(this.specialSymbol)
        }
      })
    },
    changeRangeHandler(target, val) {
      if (target === 'change') {
        this.changeCycleRange = val
      } else if (target === 'reuse') {
        this.reuseCycleRange = val
      } else {
        return
      }
    },
    submitMaintainSetting() {
      this.$confirm('确定提交以上设置？', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        this.loadingForm = true
        let containLetter = ''
        let containNumber = ''
        let specialSymbol = ''
        this.checkboxList.forEach(item => {
          if (item === this.containLetter) {
            containLetter = '(?=.*[a-zA-Z])'
          }
          if (item === this.containNumber) {
            containNumber = '(?=.*[0-9])'
          }
          if (item === this.specialSymbol) {
            specialSymbol = '(?=.*[~`!@#$%^&*_+=-])'
          }
        })
        const regExpString = `^(${containLetter}${containNumber}${specialSymbol}).{${this.maintainForm.minLength},}$`
        this.maintainForm.regularExpression = regExpString
        setStrategy(this.maintainForm).then(res => {
          this.loadingForm = false
          this.$message({
            message: '变更成功',
            type: 'success'
          })
          this.init()
        }).catch(error => {
          this.loadingForm = false
          this.$message({
            message: error.message,
            type: 'error'
          })
        })
      })
    },
    changePwdSetting(valueList) {
      this.maintainForm.includeSpecialSymbol = 'N'
      this.maintainForm.includeDigital = 'N'
      this.maintainForm.includeLetter = 'N'
      this.maintainForm.includeCase = 'N'
      valueList.forEach(value => {
        if (value === this.caseSense) {
          this.maintainForm.includeCase = 'Y'
        } else if (value === this.containNumber) {
          this.maintainForm.includeDigital = 'Y'
        } else if (value === this.containLetter) {
          this.maintainForm.includeLetter = 'Y'
        } else if (value === this.specialSymbol) {
          this.maintainForm.includeSpecialSymbol = 'Y'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.maintain-content {
  padding: 15px;

  .suffix {
    display: inline-block;
    width: 70px;
    margin-left: 10px;

    label {
      font-weight: 500;
    }
  }
}
</style>
