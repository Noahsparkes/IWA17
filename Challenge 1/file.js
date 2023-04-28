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
/*above code snippet creates an array of 5 objects, each reprisenting a week and containing 
an array of 7 objects, each representing a day with its day of the week and day of the month.*/ 

const addCell = (existing, classString, value) => {
    const result = /* html */ `
        <td ${classString}>
            ${value}
        </td>

        ${existing}
    `;
    
    return result;
};


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
}
*/

const createHtml = (data) => {
    let result = '';

    for (const { week, days } of data) {
        let inner = '';
        inner = addCell(inner, 'table__cell table__cell_sidebar', `Week ${week}`);
    
        for (const [dayOfWeek, value] of Object.entries(days)) {
            const isToday = new Date() === value;
            const isWeekend = dayOfWeek == 1 || dayOfWeek == 7;
            const isAlternate = week % 2 === 0;
            let classString = 'table__cell';

            if (isToday) {
                classString = `${classString} table__cell_today`;
            }

            if (isWeekend) {
                classString = `${classString} table__cell_weekend`;
            }

            if (isAlternate) {
                classString = `${classString} table__cell_alternate`;
            }

            inner = addCell(inner, classString, value);
        }

        result = `${result}<tr>${inner}</tr>`;
    }

    return result;
};


// Only edit above

const current = new Date()
document.querySelector('[data-title]').innerText = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`

const data = createData()
document.querySelector('[data-content]').innerHTML = createHtml(data)