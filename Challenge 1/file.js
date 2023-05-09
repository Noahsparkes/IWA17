// scripts.js

const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

// Only edit below 

const createArray = (length) => {
    const result = []   

    for (let i = 0; i < length; i++ ){
        result.push(null); // returns array with numbers from 0 to lenght-1
    }
    return result;
}//only used old for loop because of error "Uncaught SyntaxError: Invalid left-hand side in for-loop"
/*for (name.length of createArray){
    console.log(result);
}*/ 



/*following creates an array of 5 objects, each reprisenting a week and containing 
an array of 7 objects, each representing a day with its day of the week and day of the month.*/ 
getDaysInMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return new Date(year, month, 0).getDate();
};

const createData = () => {
    const current = new Date();
    current.setDate(1);

    const startDay = current.getDay();
    const daysInMonth = getDaysInMonth(current);

    const weeks = createArray(5);
    const days = createArray(7);
    let value = null;

    for (let weekIndex = 0; weekIndex < weeks.length; weekIndex++) {
        value = {
            week: weekIndex + 1,
            days: []
        }
    
        for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
            const day = dayIndex - startDay + 1
            const isValid = day > 0 && day <= daysInMonth
    
            value.days.push({
                dayOfWeek: dayIndex + 1,
                value: isValid ? day : null,
            })
        }
    
        weeks[weekIndex] = value
    }
    
    return weeks
    
}
//The purpose of this function(addCell) is to add a new HTML table cell (<td>) to an existing table row.
const addCell = (existing, classString, value) => {
    return /* html */ `
        <td class="${classString}">
            ${value}
        </td>
        ${existing}
    `
}




// Takes in an array of data representing weeks and days
const createHtml = (data) => {
    let result = ''; // Initialize an empty string called result

    for (const week of data) {
        let inner = ""
        inner = addCell(inner, 'table__cell table__cell_sidebar', `Week ${week.week}`)
    
        for (const day of week.days) {
            let classString = 'table__cell'
            const isToday = new Date().getDate() === day.value
            const isWeekend = day.dayOfWeek === 1 || day.dayOfWeek === 7
            const isAlternate = week.week % 2 !== 0
    
            if (isToday) classString += ' table__cell_today'
            if (isWeekend) classString += ' table__cell_weekend'
            if (isAlternate) classString += ' table__cell_alternate'
    
            inner = addCell(inner, classString, day.value || '')
        }
    
        result += `<tr>${inner}</tr>`
    }
    
    return result
    
};

//define the monthYear header and fetch the element id from html
const monthYearHeader = document.querySelector('[data-title]');
// Set the header to display current month and year
monthYearHeader.innerHTML = `${MONTHS[currentMonth]} ${currentYear}`;




// Only edit above

const current = new Date()
document.querySelector('[data-title]').innerText = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`

const data = createData()
document.querySelector('[data-content]').innerHTML = createHtml(data)