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
    const dt = new Date()
    const year = dt.getFullYear()
    const month = padStr(dt.getMonth() + 1)
    const day = padStr(dt.getDate())
    return `${year}${month}${day}`
}

function getRandomRange(min, max) {
    const rangeNum = max - min
    return Math.floor(Math.random() * rangeNum) + min
}

module.exports = {
    padStr,
    getCurrentDate,
    getRandomRange
}
