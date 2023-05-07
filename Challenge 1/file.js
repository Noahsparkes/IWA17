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
        result.push(i); // returns array with numbers from 0 to lenght-1
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

    for (let weekIndex in weeks) {
        value = {
            week: parseInt(weekIndex) + 1,
            days: []
        };

        for (let dayIndex in days) {
            const day = parseInt(dayIndex) - startDay + 1;
            const isValid = day > 0 && day <= daysInMonth;

            value.days.push({
                dayOfWeek: parseInt(dayIndex) + 1,
                value: isValid ? day : null,
            });
        }

        weeks[weekIndex] = value;
    }

    return weeks;
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


/*const createHtml = (data) => {
    let result = ''

    for (week, days in data) {
        let inner = ""
        addCell(inner, 'table__cell table__cell_sidebar', 'Week {week}')
    
        for (dayOfWeek, value in days) {
            classString = table__cell
						isToday = new Date === value
            isWeekend = dayOfWeek = 1 && dayOfWeek == 7
            isAlternate = week / 2

            let classString = 'table__cell'

						if (isToday) classString = `${classString} table__cell_today`
            if (isWeekend) classString === '{classString} table__cell_weekend'
            if (isAlternate) classString === '{classString} table__cell_alternate'
            addCell(inner, classString, value)
        }

        result = `<tr>${inner}</tr>`
    }
}*/


// Takes in an array of data representing weeks and days
const createHtml = (data) => {
    let result = ''; // Initialize an empty string called result

    // Loop over each element in the data array
    for (const { week, days } of data) {
        let inner = ''; // Initialize an empty string called inner

        // Add a table cell for the week number
        inner = addCell(inner, 'table__cell table__cell_sidebar', `Week ${week}`);

        // Loop over each day in the current week
        for (const [dayOfWeek, value] of Object.entries(days)) {
            // Determine whether the day is today's date, a weekend, or falls on an alternate week
            // Set the classString variable based on these conditions
            let classString = 'table__cell';
            if (new Date() === value) classString = `${classString} table__cell_today`;
            if (dayOfWeek == 1 || dayOfWeek == 7) classString = `${classString} table__cell_weekend`;
            if (week % 2 === 0) classString = `${classString} table__cell_alternate`;

            // Add a table cell for the current day
            inner = addCell(inner, classString, value);
        }

        // Add the completed row to the result string
        result = `${result}<tr>${inner}</tr>`;
    }

    // Return the completed HTML table
    return result;
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