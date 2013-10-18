document.getElementById('result').onclick = function(){
   document.getElementById('calendar').style.display = "block";
}

document.getElementById('calendar').onclick = function(){
  var clicking_element = event.target || event.srcElement;
  switch (clicking_element.getAttribute('role')) {
    case "year-minus":
      change_year(-1);
      break;
    case "year-plus":
      change_year(1);
      break;
    case "month-minus":
      change_month(-1);
      break;
    case "month-plus":
      change_month(1);
      break;
    case "close":
      document.getElementById('calendar').style.display = "none";
      break;
    case "day":
      change_day(clicking_element.innerHTML);
      break;
  }
}

/**
 * Выводит дату текстом в поле ввода.
 * Не получает и не возвращает значений.
 */
var display_full_date_in_area = function(){
  document.getElementById('result').value = New_Calender.year[Selected_Date[0] - 2011].month[Selected_Date[1]].day[Selected_Date[2] - 1].number + " " + New_Calender.year[Selected_Date[0] - 2011].month[Selected_Date[1]].name_case() + " " + New_Calender.year[Selected_Date[0] - 2011].number;
}

/**
 * Переписывает год, и ближайшие два года (до и после) в календаре.
 *
 * @example
 * draw_new_year([2012, 2013, 2014]);
 *
 * Не возвращает значений.
 */
var draw_new_year = function(year) {
   document.getElementById('year-minus').innerHTML = (year - 1) + "&nbsp;←&nbsp;";
   document.getElementById('year-selected').innerHTML = year;
   document.getElementById('year-plus').innerHTML = "&nbsp;→&nbsp;" + (year + 1);
}

/**
 * Переписывает месяц, и ближайшие два месяца (до и после) в календаре.
 *
 * @example
 * draw_new_month(["Сентярь", "Октябрь", "Ноябрь"]);
 *
 * @param {Array} months Колелкция наименований месяцев (например: ["Сентярь", "Октябрь", "Ноябрь"])
 * Не возвращает значений.
 */
var draw_new_month = function(month) {
   months_name = ["Декабрь", "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь", "Январь"];
   document.getElementById('month-minus').innerHTML = months_name[month] + "&nbsp;←&nbsp;";
   document.getElementById('month-selected').innerHTML = months_name[month + 1];
   document.getElementById('month-plus').innerHTML = "&nbsp;→&nbsp;" + months_name[month + 2];
}

/**
 * Меняет отображение всех дат в одном месяце.
 *
 * @example
 * draw_new_days(2013, month);
 *
 * @param {Number} year (например: 2013)
 * @param {Object} month Объект, содержащий данные о месяце, класса Month
 * Не возвращает значений.
 */
var draw_new_days = function(year, month) {
   var text_days = "",
       week_day = month.first_day(year);

   for (i = 0;i < (week_day + month.days_count(year));i++) {
      if (i < week_day){
         text_days += "<li class='empty'>&nbsp;</li>";
      } else {
      var day = i - week_day;
      if (i % 7 === 5 || i % 7 === 6) {
         text_days += "<li class='calendar-day weekend";
         } else {
            text_days += "<li class='calendar-day";
         }
/*
         if (month.days[day] === Selected_Date(2)) {
            text_days += " selected";
         }
*/
         text_days += "' role='day'>" + (day + 1) + "</li>";
      }
   }
   document.getElementById('days').innerHTML = text_days;
}