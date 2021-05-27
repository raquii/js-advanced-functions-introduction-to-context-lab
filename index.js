//takes a 4 element array as an argument and returns an employee record object with corresponding properties
function createEmployeeRecord(arr){
    const employeeRecord = {
            firstName: `${arr[0]}`,
            familyName: `${arr[1]}`,
            title: `${arr[2]}`,
            payPerHour: arr[3],
            timeInEvents: [],
            timeOutEvents: []
    };
    return employeeRecord;
}

//Converts each nested Array into an employee record using createEmployeeRecord and accumulates it to a new Array
function createEmployeeRecords(arr){
    let employeeRecords = []
    arr.map(ele=>{
        employeeRecords.push(createEmployeeRecord(ele));
    }) 
    return employeeRecords;
}

//adds an object with keys to the timeInEvents array on the employee record Object
function createTimeInEvent(obj, date){
    obj["timeInEvents"].push({
        type: "TimeIn",
        hour: parseFloat(date.slice(date.length - 4)),
        date: date.slice(0,10)
    })
    return obj;
}

//adds an object with keys to the timeOutEvent array on the employee record Object
function createTimeOutEvent(obj, date){
    obj["timeOutEvents"].push({
        type: "TimeOut",
        hour: parseFloat(date.slice(date.length - 4)),
        date: date.slice(0,10)
    })
    return obj;
}

//Given a date, find the number of hours elapsed between that date's timeInEvent and timeOutEvent
function hoursWorkedOnDate(obj, date){
    let timeInTime = 0
    let timeOutTime = 0
    let timeInSearch = obj["timeInEvents"].filter(ele=>{
        if(ele["date"] === date){
            timeInTime = parseFloat(ele["hour"]);
        }
    })
    let timeOutSearch = obj["timeOutEvents"].filter(ele=>{
        if(ele["date"] === date){
            timeOutTime = parseFloat(ele["hour"]);
        }
    })
   let hoursWorked = ((timeOutTime - timeInTime)/100);
   return hoursWorked;
}

//Using hoursWorkedOnDate, multiply the hours by the record's payRate to determine amount owed. Amount should be returned as a number.
function wagesEarnedOnDate(obj, date){
    let hoursWorked = hoursWorkedOnDate(obj, date);
    let payRate = obj["payPerHour"];
    let wagesEarned = hoursWorked * payRate;
    return wagesEarned;
}

/*Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. 
Amount should be returned as a number. HINT: You will need to find the available dates somehow... */
function allWagesFor(obj){
    let datesWorked = [];
    let allWages = 0;
    obj["timeInEvents"].forEach(ele => {
        datesWorked.push(ele)
    });
    datesWorked.forEach(ele=>{
        allWages = (allWages + (wagesEarnedOnDate(obj, ele["date"])))
        return allWages;
    })
    return allWages;
}

//Test the firstName field for a match with the firstName argument
function findEmployeeByFirstName(srcArray, firstName){
    for(let i=0; i<srcArray.length; i++){
        if(srcArray[i]["firstName"] === firstName){
            return srcArray[i];
        }else{
            return undefined
        }
    }
}

/*Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. 
Amount should be returned as a number.*/

function calculatePayroll(arr){
    let payrollSum = 0;
    arr.forEach(ele=>{
       payrollSum = (payrollSum + (allWagesFor(ele)));
    })
    return payrollSum;
}