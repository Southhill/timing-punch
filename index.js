const axios = require('axios')
const schedule = require('node-schedule')
const { logger, errorLogger } = require('./log')

const { getCurrentDate, getRandomRange } = require('./util')
const { checkDateUrl, punchUrl, scheduleTime, punchRequestBody } = require('./const')

const currentDate = getCurrentDate()
const checkIsWeekDay = async function() {
    const res = await axios.get(checkDateUrl, { params: { date: currentDate } })
    return !res.data.data
}
const fetchPunch = async function() {
    try {
        await axios.post(punchUrl, punchRequestBody)
        logger.info(`${new Date().toLocaleString()}时刻打卡成功！`)
    } catch(err) {
        errorLogger.error(`punch error: `, err)
    }
}
schedule.scheduleJob(scheduleTime, async function() {
// schedule.scheduleJob('30 * * * * *', async function() {
    const isWeekDay = await checkIsWeekDay()
    logger.info('当前日期是否为工作日：', isWeekDay)
    if (isWeekDay) {
        logger.info('开始生成当日的定时任务')
        const [firstTime, lastTime] = getPunchTime()
        logger.info('当日定时任务时间为：', firstTime.toLocaleString(), lastTime.toLocaleString())
        // schedule.scheduleJob(new Date(), await fetchPunch)
        schedule.scheduleJob(firstTime, await fetchPunch)
        schedule.scheduleJob(lastTime, await fetchPunch)
    }
})

function getPunchTime() {
    let firstTime, lastTime
    let dt = new Date()
    let firstHour = getRandomRange(8, 9)
    dt.setHours(firstHour)
    dt.setMinutes(getRandomRange(0, 59))
    dt.setSeconds(getRandomRange(0, 59))
    firstTime = new Date(dt)
    dt.setHours(firstHour + 10)
    dt.setMinutes(getRandomRange(0, 59))
    dt.setSeconds(getRandomRange(0, 59))
    lastTime = new Date(dt)
    return [firstTime, lastTime]
}
