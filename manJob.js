const schedule = require('node-schedule')
const axios = require('axios')

const { logger, errorLogger } = require('./log')
const { punchListRequestBody, punchUrl } = require('./const')
const { getRandomRange } = require('./util')

class ManJob {
    constructor(name) {
        this.name = name

        logger.info(`当前定时任务的属主是：${this.name}`)
        const [firstTime, lastTime] = getPunchTime()
        logger.info('当日定时任务时间为：', firstTime.toLocaleString(), lastTime.toLocaleString())
        // schedule.scheduleJob(new Date(), this.fetchPunch.bind(this))
        schedule.scheduleJob(firstTime, this.fetchPunch.bind(this))
        schedule.scheduleJob(lastTime, this.fetchPunch.bind(this))
        logger.info(`属主${this.name}的定时任务生成完成`)
    }

    async fetchPunch() {
        const name = this.name
        try {
            await axios.post(punchUrl, punchListRequestBody[name])
            logger.info(`${new Date().toLocaleString()}时刻属主${name}打卡成功！`)
        } catch(err) {
            logger.error(`${new Date().toLocaleString()}时刻属主${name}打卡失败, 失败原因请查看error.log文件`)
            errorLogger.error(`punch error: `, err)
        }
    }
}

function getPunchTime() {
    let firstTime, lastTime
    const cudt = new Date().toLocaleDateString()
    const dt = new Date(cudt)
    const firstHour = getRandomRange(8, 9)
    const firstMinute = getRandomRange(0, 59)
    const lastMinute = firstMinute + getRandomRange(1, 59)
    dt.setHours(firstHour)
    dt.setMinutes(firstMinute)
    dt.setSeconds(getRandomRange(0, 59))
    firstTime = new Date(dt)

    dt.setHours(firstHour + 9 + getRandomRange(0, 2))
    dt.setMinutes(lastMinute)
    dt.setSeconds(getRandomRange(0, 59))
    lastTime = new Date(dt)

    return [firstTime, lastTime]
}

module.exports = ManJob
