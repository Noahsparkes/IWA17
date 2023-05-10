// scripts.js

const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  
  const getDaysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  
  // Only edit below
  
  const createArray = (length) => {
    const result = [];
  
    for (let i = 0; i < length; i++) {
      result.push(null);
    }
    return result;
  };
  
  
  
  const createData = () => {
    const current = new Date();
    current.setDate(1);
  
    const startDay = current.getDay(); // Fixed: getDay instead of day
    const daysInMonth = getDaysInMonth(current);
  
    const weeks = createArray(5);
    const days = createArray(7);
    let value = null;
    let result = [];
  
    for (let weekIndex in weeks) {
      value = {
        week: parseInt(weekIndex) + 1, // Fixed: weekIndex is a string, need to parse to int
        days: [],
      };
  
      
      
      for (let dayIndex in days) {
        const day = dayIndex - startDay + 1; // Fixed: calculate the day correctly
        const isValid = day > 0 && day <= daysInMonth;
  
        value.days.push({
          dayOfWeek: parseInt(dayIndex) + 1, // Fixed: dayIndex is a string, need to parse to int
          value: isValid ? day : "",
        });
      }
      result.push(value);
    }
    return result;
  };
  
  
  
  const addCell = (existing, classString, value) => {
    const result = /* html */ `
      <td ${classString}>
        ${value}
      </td>
      ${existing}
    `;
    return result; // Fixed: return the result
  };
  
  
  
  
  const createHtml = (data) => {
    let result = "";
  
    for (let week of data) {
      let inner = "";
      inner = addCell(inner, "table__cell table__cell_sidebar", `Week ${week.week}`); // Fixed: interpolate the week variable correctly
  
      for (let day of week.days) {
        let classString = "table__cell";
        const isToday = new Date().getDate() === day.value && new Date().getMonth() === new Date().getMonth(); // Fixed: calculate if it's today correctly
        const isWeekend = day.dayOfWeek === 1 || day.dayOfWeek === 7; // Fixed: use || instead of &&
        const isAlternate = week.week % 2 === 0; // Fixed: use % instead of /
  
        if (isToday) classString = `${classString} table__cell_today`;
        if (isWeekend) classString = `${classString} table__cell_weekend`; // Fixed: use = instead of ===
        if (isAlternate) classString = `${classString} table__cell_alternate`; // Fixed: use = instead of ===
  
        inner = addCell(inner, classString, day.value);
      }
  
      result += `<tr>${inner}</tr>`;
    }
    return result;
  };
  
  
  
  // Only edit above
  
  const current = new Date();
  document.querySelector("[data-title]").innerText = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`;
  
  const data = createData();
  document.querySelector("[data-content]").innerHTML = createHtml(data);
  