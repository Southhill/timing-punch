const axios = require('axios')
const schedule = require('node-schedule')

const ManJob = require('./manJob')
const { logger } = require('./log')
const { getCurrentDate } = require('./util')
const { checkDateUrl, scheduleTime } = require('./const')

const checkIsWeekDay = async function() {
    const date = getCurrentDate()
    logger.info('当前检查日期为：', date)
    const res = await axios.get(checkDateUrl, { params: { date } })
    return !res.data.data
}

schedule.scheduleJob(scheduleTime, async function() {
// schedule.scheduleJob('30 * * * * *', async function() { // '30 * * * * *'
    const isWeekDay = await checkIsWeekDay()
    logger.info('当前日期是否为工作日：', isWeekDay)
    if (isWeekDay) {
        logger.info('开始生成当日的全部定时任务')
        new ManJob('章三')
    } else {
        logger.info('当前日期不是工作日，不需要定时任务。')
    }
})
