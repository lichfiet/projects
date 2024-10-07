class numberWithLogs{
    constructor (number) {
        this.result = number
        this.logs = [`created number ${number}`]
    }
}

function runWithLogs (numberWithLogs, func) {
    return {
        result: func(numberWithLogs).result,
        logs: [...numberWithLogs.logs, ...func(numberWithLogs).logs]
    }

}

const add = (numberWithLogs) => {
    return {
        result: numberWithLogs.result + 1,
        logs: [`added 1 to equal ${numberWithLogs.result + 1}`] 
    }
}

const subtract = (numberWithLogs) => {
    return {
        result: numberWithLogs.result - 1,
        logs: [`subtracted 1 to equal ${numberWithLogs.result - 1}`]
    }
}

const multiply = (numberWithLogs) => {
    return {
        result: numberWithLogs.result * 2,
        logs: [`multiplied by 2 to equal ${numberWithLogs.result * 2}`]
    }
}

let number = new numberWithLogs(1)
let a = runWithLogs(number, add)
let b = runWithLogs(a, subtract)
let c = runWithLogs(b, add)
let d = runWithLogs(c, multiply)

console.log(number)
console.log(a)
console.log(b)
console.log(c)
console.log(d)