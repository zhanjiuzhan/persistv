<template>
  <div id="changeContab">
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"/> {{ Seconds.name }}</span>
        <div class="tabBody">
          <el-row>
            <el-radio v-model="second.cronEvery" label="1">{{ Seconds.every }}</el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="second.cronEvery" label="2">{{ Seconds.interval[0] }}
              <el-input-number v-model="second.incrementIncrement" :min="1" :max="60" size="small"/>
              {{ Seconds.interval[1] || '' }}
              <el-input-number v-model="second.incrementStart" :min="0" :max="59" size="small"/>
              {{ Seconds.interval[2] || '' }}
            </el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="second.cronEvery" class="long" label="3">{{ Seconds.specific }}
              <el-select v-model="second.specificSpecific" size="small" multiple>
                <el-option v-for="(val, index) in 60" :key="index" :value="val-1">{{ val - 1 }}</el-option>
              </el-select>
            </el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="second.cronEvery" label="4">{{ Seconds.cycle[0] }}
              <el-input-number v-model="second.rangeStart" :min="1" :max="60" size="small"/>
              {{ Seconds.cycle[1] || '' }}
              <el-input-number v-model="second.rangeEnd" :min="0" :max="59" size="small"/>
              {{ Seconds.cycle[2] || '' }}
            </el-radio>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"/> {{ Minutes.name }}</span>
        <div class="tabBody">
          <el-row>
            <el-radio v-model="minute.cronEvery" label="1">{{ Minutes.every }}</el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="minute.cronEvery" label="2">{{ Minutes.interval[0] }}
              <el-input-number v-model="minute.incrementIncrement" :min="1" :max="60" size="small"/>
              {{ Minutes.interval[1] }}
              <el-input-number v-model="minute.incrementStart" :min="0" :max="59" size="small"/>
              {{ Minutes.interval[2] || '' }}
            </el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="minute.cronEvery" class="long" label="3">{{ Minutes.specific }}
              <el-select v-model="minute.specificSpecific" size="small" multiple>
                <el-option v-for="(val, index) in 60" :key="index" :value="val-1">{{ val - 1 }}</el-option>
              </el-select>
            </el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="minute.cronEvery" label="4">{{ Minutes.cycle[0] }}
              <el-input-number v-model="minute.rangeStart" :min="1" :max="60" size="small"/>
              {{ Minutes.cycle[1] }}
              <el-input-number v-model="minute.rangeEnd" :min="0" :max="59" size="small"/>
              {{ Minutes.cycle[2] }}
            </el-radio>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"/> {{ Hours.name }}</span>
        <div class="tabBody">
          <el-row>
            <el-radio v-model="hour.cronEvery" label="1">{{ Hours.every }}</el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="hour.cronEvery" label="2">{{ Hours.interval[0] }}
              <el-input-number v-model="hour.incrementIncrement" :min="0" :max="23" size="small"/>
              {{ Hours.interval[1] }}
              <el-input-number v-model="hour.incrementStart" :min="0" :max="23" size="small"/>
              {{ Hours.interval[2] }}
            </el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="hour.cronEvery" class="long" label="3">{{ Hours.specific }}
              <el-select v-model="hour.specificSpecific" size="small" multiple>
                <el-option v-for="(val, index) in 24" :key="index" :value="val-1">{{ val - 1 }}</el-option>
              </el-select>
            </el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="hour.cronEvery" label="4">{{ Hours.cycle[0] }}
              <el-input-number v-model="hour.rangeStart" :min="0" :max="23" size="small"/>
              {{ Hours.cycle[1] }}
              <el-input-number v-model="hour.rangeEnd" :min="0" :max="23" size="small"/>
              {{ Hours.cycle[2] }}
            </el-radio>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"/> {{ Day.name }}</span>
        <div class="tabBody">
          <el-row>
            <el-radio v-model="day.cronEvery" label="1">{{ Day.every }}</el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="day.cronEvery" label="2">{{ Day.intervalWeek[0] }}
              <el-input-number v-model="week.incrementIncrement" :min="1" :max="7" size="small"/>
              {{ Day.intervalWeek[1] }}
              <el-select v-model="week.incrementStart" size="small">
                <el-option v-for="(val, index) in 7" :key="index" :label="Week[val-1]" :value="val"/>
              </el-select>
              {{ Day.intervalWeek[2] }}
            </el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="day.cronEvery" label="3">{{ Day.intervalDay[0] }}
              <el-input-number v-model="day.incrementIncrement" :min="1" :max="31" size="small"/>
              {{ Day.intervalDay[1] }}
              <el-input-number v-model="day.incrementStart" :min="1" :max="31" size="small"/>
              {{ Day.intervalDay[2] }}
            </el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="day.cronEvery" class="long" label="4">{{ Day.specificWeek }}
              <el-select v-model="week.specificSpecific" size="small" multiple>
                <el-option
                  v-for="(val, index) in 7"
                  :key="index"
                  :label="Week[val-1]"
                  :value="['SUN','MON','TUE','WED','THU','FRI','SAT'][val-1]"
                />
              </el-select>
            </el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="day.cronEvery" class="long" label="5">{{ Day.specificDay }}
              <el-select v-model="day.specificSpecific" size="small" multiple>
                <el-option v-for="(val, index) in 31" :key="index" :value="val">{{ val }}</el-option>
              </el-select>
            </el-radio>
          </el-row>
          <!--          <el-row>-->
          <!--            <el-radio v-model="day.cronEvery" label="6">{{ Day.lastDay }}</el-radio>-->
          <!--          </el-row>-->
          <!--          <el-row>-->
          <!--            <el-radio v-model="day.cronEvery" label="7">{{ Day.lastWeekday }}</el-radio>-->
          <!--          </el-row>-->
          <!--          <el-row>-->
          <!--            <el-radio v-model="day.cronEvery" label="8">{{ Day.lastWeek[0] }}-->
          <!--              <el-select v-model="day.cronLastSpecificDomDay" size="small">-->
          <!--                <el-option v-for="(val, index) in 7" :key="index" :label="Week[val-1]" :value="val"/>-->
          <!--              </el-select>-->
          <!--              {{ Day.lastWeek[1] || '' }}-->
          <!--            </el-radio>-->
          <!--          </el-row>-->
          <!--          <el-row>-->
          <!--            <el-radio v-model="day.cronEvery" label="9">-->
          <!--              <el-input-number v-model="day.cronDaysBeforeEomMinus" :min="1" :max="31" size="small"/>-->
          <!--              {{ Day.beforeEndMonth[0] }}-->
          <!--            </el-radio>-->
          <!--          </el-row>-->
          <!--          <el-row>-->
          <!--            <el-radio v-model="day.cronEvery" label="10">{{ Day.nearestWeekday[0] }}-->
          <!--              <el-input-number v-model="day.cronDaysNearestWeekday" :min="1" :max="31" size="small"/>-->
          <!--              {{ Day.nearestWeekday[1] }}-->
          <!--            </el-radio>-->
          <!--          </el-row>-->
          <!--          <el-row>-->
          <!--            <el-radio v-model="day.cronEvery" label="11">{{ Day.someWeekday[0] }}-->
          <!--              <el-input-number v-model="week.cronNthDayNth" :min="1" :max="5" size="small"/>-->
          <!--              <el-select v-model="week.cronNthDayDay" size="small">-->
          <!--                <el-option v-for="(val, index) in 7" :key="index" :label="Week[val-1]" :value="val"/>-->
          <!--              </el-select>-->
          <!--              {{ Day.someWeekday[1] }}-->
          <!--            </el-radio>-->
          <!--          </el-row>-->
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"/> {{ Month.name }}</span>
        <div class="tabBody">
          <el-row>
            <el-radio v-model="month.cronEvery" label="1">{{ Month.every }}</el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="month.cronEvery" label="2">{{ Month.interval[0] }}
              <el-input-number :min="0" :max="12" v-model="month.incrementIncrement" size="small"/>
              {{ Month.interval[1] }}
              <el-input-number :min="0" :max="12" v-model="month.incrementStart" size="small"/>
            </el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="month.cronEvery" class="long" label="3">{{ Month.specific }}
              <el-select v-model="month.specificSpecific" size="small" multiple>
                <el-option v-for="(val, index) in 12" :key="index" :label="val" :value="val"/>
              </el-select>
            </el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="month.cronEvery" label="4">{{ Month.cycle[0] }}
              <el-input-number :min="1" :max="12" v-model="month.rangeStart" size="small"/>
              {{ Month.cycle[1] }}
              <el-input-number :min="1" :max="12" v-model="month.rangeEnd" size="small"/>
            </el-radio>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"/> {{ Year.name }}</span>
        <div class="tabBody">
          <el-row>
            <el-radio v-model="year.cronEvery" label="1">{{ Year.every }}</el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="year.cronEvery" label="2">{{ Year.interval[0] }}
              <el-input-number :min="1" :max="99" v-model="year.incrementIncrement" size="small"/>
              {{ Year.interval[1] }}
              <el-input-number :min="2018" :max="2118" v-model="year.incrementStart" size="small"/>
            </el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="year.cronEvery" class="long" label="3">{{ Year.specific }}
              <el-select v-model="year.specificSpecific" size="small" filterable multiple>
                <el-option v-for="(val, index) in 100" :key="index" :label="2017+val" :value="2017+val"/>
              </el-select>
            </el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="year.cronEvery" label="4">{{ Year.cycle[0] }}
              <el-input-number v-model="year.rangeStart" :min="2018" :max="2118" size="small"/>
              {{ Year.cycle[1] }}
              <el-input-number v-model="year.rangeEnd" :min="2018" :max="2118" size="small"/>
            </el-radio>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Cron',

  props: {
    cron: {
      type: String,
      default: '* * * * * ? *'
    }
  },

  data() {
    return {
      Seconds: {
        name: '秒',
        every: '每一秒钟',
        interval: ['每隔', '秒执行 从', '秒开始'],
        specific: '具体秒数(可多选)',
        cycle: ['周期从', '到', '秒']
      },
      Minutes: {
        name: '分',
        every: '每一分钟',
        interval: ['每隔', '分执行 从', '分开始'],
        specific: '具体分钟数(可多选)',
        cycle: ['周期从', '到', '分']
      },
      Hours: {
        name: '时',
        every: '每一小时',
        interval: ['每隔', '小时执行 从', '小时开始'],
        specific: '具体小时数(可多选)',
        cycle: ['周期从', '到', '小时']
      },
      Day: {
        name: '天',
        every: '每一天',
        intervalWeek: ['每隔', '周执行 从', '开始'],
        intervalDay: ['每隔', '天执行 从', '天开始'],
        specificWeek: '具体星期几(可多选)',
        specificDay: '具体天数(可多选)',
        lastDay: '在这个月的最后一天',
        lastWeekday: '在这个月的最后一个工作日',
        lastWeek: ['在这个月的最后一个'],
        beforeEndMonth: ['在本月底前', '天'],
        nearestWeekday: ['最近的工作日（周一至周五）至本月', '日'],
        someWeekday: ['在这个月的第', '个']
      },
      Week: ['天', '一', '二', '三', '四', '五', '六'].map(function (e) {
        return '星期' + e
      }),
      Month: {
        name: '月',
        every: '每一月',
        interval: ['每隔', '月执行 从', '月开始'],
        specific: '具体月数(可多选)',
        cycle: ['从', '到', '月之间的每个月']
      },
      Year: {
        name: '年',
        every: '每一年',
        interval: ['每隔', '年执行 从', '年开始'],
        specific: '具体年份(可多选)',
        cycle: ['从', '到', '年之间的每一年']
      },
      second: {
        cronEvery: '',
        incrementStart: '3',
        incrementIncrement: '5',
        rangeStart: '',
        rangeEnd: '',
        specificSpecific: []
      },
      minute: {
        cronEvery: '',
        incrementStart: '3',
        incrementIncrement: '5',
        rangeStart: '',
        rangeEnd: '',
        specificSpecific: []
      },
      hour: {
        cronEvery: '',
        incrementStart: '3',
        incrementIncrement: '5',
        rangeStart: '',
        rangeEnd: '',
        specificSpecific: []
      },
      day: {
        cronEvery: '',
        incrementStart: '1',
        incrementIncrement: '1',
        rangeStart: '',
        rangeEnd: '',
        specificSpecific: [],
        cronLastSpecificDomDay: 1,
        cronDaysBeforeEomMinus: '',
        cronDaysNearestWeekday: ''
      },
      week: {
        cronEvery: '',
        incrementStart: '1',
        incrementIncrement: '1',
        specificSpecific: [],
        cronNthDayDay: 1,
        cronNthDayNth: '1'
      },
      month: {
        cronEvery: '',
        incrementStart: '3',
        incrementIncrement: '5',
        rangeStart: '',
        rangeEnd: '',
        specificSpecific: []
      },
      year: {
        cronEvery: '',
        incrementStart: '2017',
        incrementIncrement: '1',
        rangeStart: '',
        rangeEnd: '',
        specificSpecific: []
      }
    }
  },
  computed: {
    secondsText() {
      let seconds = ''
      const cronEvery = this.second.cronEvery
      switch (cronEvery.toString()) {
        case '1':
          seconds = '*'
          break
        case '2':
          seconds = this.second.incrementStart + '/' + this.second.incrementIncrement
          break
        case '3':
          this.second.specificSpecific.map(val => {
            seconds += val + ','
          })
          seconds = seconds.slice(0, -1)
          break
        case '4':
          seconds = this.second.rangeStart + '-' + this.second.rangeEnd
          break
      }
      return seconds
    },
    minutesText() {
      let minutes = ''
      const cronEvery = this.minute.cronEvery
      switch (cronEvery.toString()) {
        case '1':
          minutes = '*'
          break
        case '2':
          minutes = this.minute.incrementStart + '/' + this.minute.incrementIncrement
          break
        case '3':
          this.minute.specificSpecific.map(val => {
            minutes += val + ','
          })
          minutes = minutes.slice(0, -1)
          break
        case '4':
          minutes = this.minute.rangeStart + '-' + this.minute.rangeEnd
          break
      }
      return minutes
    },
    hoursText() {
      let hours = ''
      const cronEvery = this.hour.cronEvery
      switch (cronEvery.toString()) {
        case '1':
          hours = '*'
          break
        case '2':
          hours = this.hour.incrementStart + '/' + this.hour.incrementIncrement
          break
        case '3':
          this.hour.specificSpecific.map(val => {
            hours += val + ','
          })
          hours = hours.slice(0, -1)
          break
        case '4':
          hours = this.hour.rangeStart + '-' + this.hour.rangeEnd
          break
      }
      return hours
    },
    daysText() {
      let days = ''
      const cronEvery = this.day.cronEvery
      switch (cronEvery.toString()) {
        case '1':
          break
        case '2':
        case '4':
        case '11':
          days = '?'
          break
        case '3':
          days = this.day.incrementStart + '/' + this.day.incrementIncrement
          break
        case '5':
          this.day.specificSpecific.map(val => {
            days += val + ','
          })
          days = days.slice(0, -1)
          break
        case '6':
          days = 'L'
          break
        case '7':
          days = 'LW'
          break
        case '8':
          days = this.day.cronLastSpecificDomDay + 'L'
          break
        case '9':
          days = 'L-' + this.day.cronDaysBeforeEomMinus
          break
        case '10':
          days = this.day.cronDaysNearestWeekday + 'W'
          break
      }
      return days
    },
    weeksText() {
      let weeks = ''
      const cronEvery = this.day.cronEvery
      switch (cronEvery.toString()) {
        case '1':
        case '3':
        case '5':
          weeks = '?'
          break
        case '2':
          weeks = this.week.incrementStart + '/' + this.week.incrementIncrement
          break
        case '4':
          this.week.specificSpecific.map(val => {
            weeks += val + ','
          })
          weeks = weeks.slice(0, -1)
          break
        case '6':
        case '7':
        case '8':
        case '9':
        case '10':
          weeks = '?'
          break
        case '11':
          weeks = this.week.cronNthDayDay + '#' + this.week.cronNthDayNth
          break
      }
      return weeks
    },
    monthsText() {
      let months = ''
      const cronEvery = this.month.cronEvery
      switch (cronEvery.toString()) {
        case '1':
          months = '*'
          break
        case '2':
          months = this.month.incrementStart + '/' + this.month.incrementIncrement
          break
        case '3':
          this.month.specificSpecific.map(val => {
            months += val + ','
          })
          months = months.slice(0, -1)
          break
        case '4':
          months = this.month.rangeStart + '-' + this.month.rangeEnd
          break
      }
      return months
    },
    yearsText() {
      let years = ''
      const cronEvery = this.year.cronEvery
      switch (cronEvery.toString()) {
        case '1':
          years = '*'
          break
        case '2':
          years = this.year.incrementStart + '/' + this.year.incrementIncrement
          break
        case '3':
          this.year.specificSpecific.map(val => {
            years += val + ','
          })
          years = years.slice(0, -1)
          break
        case '4':
          years = this.year.rangeStart + '-' + this.year.rangeEnd
          break
      }
      return years
    },
    cronExp() {
      return `${this.secondsText || '*'} ${this.minutesText || '*'} ${this.hoursText || '*'} ${this.daysText || '*'} ${this.monthsText || '*'} ${this.weeksText || '?'} ${this.yearsText || '*'}`
    }
  },
  watch: {
    data() {
      this.rest(this.$data)
    },
    cron: {
      handler() {
        if (this.cron) {
          const cronUnit = this.cron.split(' ')
          // 0. 秒
          this.parseCron(cronUnit[0], this.second)
          // 1. 分
          this.parseCron(cronUnit[1], this.minute)
          // 2. 时
          this.parseCron(cronUnit[2], this.hour)
          // 3. 天, 4. 周
          this.parseDayCron(cronUnit[3], cronUnit[5])
          // 4. 月
          this.parseCron(cronUnit[4], this.month)
          // 6. 年
          this.parseCron(cronUnit[6], this.year)
        }
      }
    }
  },
  methods: {
    getValue() {
      return this.cronExp
    },
    change() {
      this.$emit('change', this.cronExp)
      this.close()
    },
    close() {
      this.$emit('close')
    },
    rest(data) {
      for (const i in data) {
        if (data[i] instanceof Object) {
          this.rest(data[i])
        } else {
          switch (typeof data[i]) {
            case 'object':
              data[i] = []
              break
            case 'string':
              data[i] = ''
              break
          }
        }
      }
    },
    parseCron(cronExp, date) {
      if (cronExp === '*') {
        date.cronEvery = '1'
      } else if (RegExp(/^\w+\/\w+$/).test(cronExp)) {
        date.cronEvery = '2'
        const [incrementIncrement, incrementStart] = cronExp.split('/')
        date.incrementIncrement = incrementIncrement
        date.incrementStart = incrementStart
      } else if (RegExp(/^\w+(,\w+)?$/).test(cronExp)) {
        date.cronEvery = '3'
        date.specificSpecific = cronExp.split(',')
      } else if (RegExp(/^\w+\-\w+$/).test(cronExp)) {
        date.cronEvery = '4'
        const [rangeStart, rangeEnd] = cronExp.split('-')
        date.rangeStart = rangeStart
        date.rangeEnd = rangeEnd
      }
    },
    parseDayCron(cronDayExp, cronWeekExp) {
      if (cronDayExp === '*' && cronWeekExp === '?') {
        this.day.cronEvery = '1'
      } else if (cronDayExp === '?' && RegExp(/^\w+\/\w+$/).test(cronWeekExp)) {
        this.day.cronEvery = '2'
        const [incrementStart, incrementIncrement] = cronWeekExp.split('/')
        this.week.incrementIncrement = incrementIncrement
        this.week.incrementStart = incrementStart
      } else if (RegExp(/^\w+\/\w+$/).test(cronDayExp) && cronWeekExp === '?') {
        this.day.cronEvery = '3'
        const [incrementStart, incrementIncrement] = cronDayExp.split('/')
        this.day.incrementIncrement = incrementIncrement
        this.day.incrementStart = incrementStart
      } else if (cronDayExp === '?' && cronWeekExp === '?') {
        this.day.cronEvery = '4'
        this.week.specificSpecific = ''
      } else if (cronDayExp === '?' && ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].indexOf(cronWeekExp) !== -1) {
        this.day.cronEvery = '4'
        this.week.specificSpecific = cronWeekExp
      } else if (RegExp(/^\w+(,\w+)?$/).test(cronDayExp) && cronWeekExp === '?') {
        this.day.cronEvery = '5'
        this.day.specificSpecific = cronDayExp.split(',')
      } else if (cronDayExp === 'L' && cronWeekExp === '?') {
        this.day.cronEvery = '6'
      } else if (cronDayExp === 'LW' && cronWeekExp === '?') {
        this.day.cronEvery = '7'
      } else if (RegExp(/^\wL$/).test(cronDayExp) && cronWeekExp === '?') {
        this.day.cronEvery = '8'
        this.day.cronLastSpecificDomDay = cronDayExp.match(RegExp(/^(\w)L$/))[1]
      } else if (RegExp(/^L-\w+$/).test(cronDayExp) && cronWeekExp === '?') {
        this.day.cronEvery = '9'
        this.day.cronDaysBeforeEomMinus = cronDayExp.match(RegExp(/^L-(\w)+$/))[1]
      } else if (RegExp(/^\w+W$/).test(cronDayExp) && cronWeekExp === '?') {
        this.day.cronEvery = '10'
        this.day.cronDaysNearestWeekday = cronDayExp.match(RegExp(/^(\w)+W$/))[1]
      } else if (cronDayExp === '?' && RegExp(/^\w+#\w+$/).test(cronWeekExp)) {
        this.day.cronEvery = '11'
        const [cronNthDayNth, cronNthDayDay] = cronWeekExp.split('#')
        this.week.cronNthDayDay = cronNthDayDay
        this.week.cronNthDayNth = cronNthDayNth
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#changeContab {
  .language {
    position: absolute;
    right: 25px;
    z-index: 1;
  }

  .el-tabs {
    box-shadow: none;
  }

  .tabBody {
    .el-row {
      margin: 10px 0;

      .long {
        .el-select {
          width: 350px;
        }
      }

      .el-input-number {
        width: 110px;
      }
    }
  }

  .bottom {
    width: 100%;
    text-align: center;
    margin-top: 5px;
    position: relative;

    .value {
      font-size: 18px;
      vertical-align: middle;
    }
  }
}
</style>
