// Your code here
function createEmployeeRecord(employee) {

    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}


function createEmployeeRecords(employees) {
    return employees.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employee, time) {
    let [date, hour] = time.split(" ")
    let employeeObj = {
        type: "TimeIn",
        hour: parseInt(hour),
        date
    }

    employee.timeInEvents.push(employeeObj)
    return employee
}

function createTimeOutEvent(employee, time) {
    let [date, hour] = time.split(" ")
    let employeeObj = {
        type: "TimeOut",
        hour: parseInt(hour),
        date
    }

    employee.timeOutEvents.push(employeeObj)
    return employee
}

function hoursWorkedOnDate(employee, passedDate){
    // loop through employee timeInEvents
    // find the event that matches in the passed in date
    // access hour they clocked in
    // loop through  employee timeOutEvents
    // find the event that matches the passed in date
    // access the hour they clocked out
    // subtract the timeIn from the timeOut

    let timeIn = employee.timeInEvents.find(function(e){
        return e.date === passedDate
    })
    
    let timeOut = employee.timeOutEvents.find(function(e){
        return e.date === passedDate
    })

    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employee, passedDate){
    let hoursWorked = hoursWorkedOnDate(employee, passedDate)
    return hoursWorked * employee.payPerHour
}

function allWagesFor(employee){
    let workedDates = employee.timeInEvents.map(function(e){
        return e.date
    })
    let allWages = workedDates.reduce(function(memo, date){
        return memo + wagesEarnedOnDate(employee, date)
    }, 0)

    return allWages
}

function calculatePayroll(employee){
    return employee.reduce(function(memo, records){
        return memo + allWagesFor(records)
    }, 0)
}