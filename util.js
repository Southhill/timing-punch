function padStr(num, digit = 2, pad = '0') {
    const numStr = '' + num
    const len = numStr.length
    if (len < digit) {
        return `${pad.repeat(digit - len)}${numStr}`
    } else {
        return numStr
    }
}

function getCurrentDate() {
    const dtStr = new Date().toLocaleDateString('zh-CN', { timeZone: 'Asia/Shanghai' })
    const ymd = dtStr.split('/')
    const year = ymd[0]
    const month = padStr(ymd[1])
    const day = padStr(ymd[2])
    return `${year}${month}${day}`
}

function getRandomRange(min, max) {
    const rangeNum = max - min
    return Math.round(Math.random() * rangeNum) + min
}

module.exports = {
    padStr,
    getCurrentDate,
    getRandomRange
}
