/**
 * Делает календарь видимым.
 * Не получает и не возвращает значений.
 */
var make_calendar_visible = function(){
  document.getElementById("calender").style.display = "block";
}

/**
 * Делает календарь не видимым.
 * Не получает и не возвращает значений.
 */
var close_calender = function(){
  document.getElementById("calender").style.display = "none";
}

/**
 * Выводит дату текстом в поле ввода.
 * Не получает и не возвращает значений.
 */
var display_full_date_in_area = function(day, month, year){
  var month_case = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
  document.getElementById('result').value = day + " " + month_case[month] + " " + year;
}

/**
 * Переписывает год, и ближайшие два года (до и после) в календаре.
 *
 * @example
 * draw_new_year();
 *
 * Не возвращает значений.
 */
var draw_new_year = function(year) {
  var text_year = "<a onclick='chance_year(-1)' id='year-minus'>" + (year - 1) + "&nbsp;←</a> " + year + " <a onclick='chance_year(1)' id='year-plus'>→&nbsp;" + (year + 1) + "</a>";
  document.getElementById('year').innerHTML = text_year;
}

/**
 * Переписывает месяц, и ближайшие два месяца (до и после) в календаре.
 *
 * @example
 * draw_new_month();
 *
 * Не возвращает значений.
 */
var draw_new_month = function(month) {
  var monthes = ["Декабрь", "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь", "Январь"];
  var text_month = "<a onclick='chance_month(-1)' id='month-minus'>" + monthes[month] + "&nbsp;←</a> " + monthes[month + 1] + " <a onclick='chance_month(1)' id='month-plus'>→&nbsp;" + monthes[month + 2] + "</a>";
  document.getElementById('month').innerHTML = text_month;
}

/**
 * Меняет отображение всех дат в одном месяце.
 *
 * @example
 * draw_new_days();
 *
 * Не возвращает значений.
 */
var draw_new_days = function(year, month) {
   var text_days = "",
       week_day_of_first = get_week_day_of_first_day(year, month);
   for (i = 0;i < (week_day_of_first + get_all_days_in_month(year, month));i++) {
      if (i < week_day_of_first){
         text_days += "<li class='empty'>&nbsp;</li>";
      } else {
      var day = i - week_day_of_first + 1;
      if (i % 7 === 5 || i % 7 === 6) {
         text_days += "<li class='weekend'>";
         } else {
            text_days += "<li>";
         }
         text_days = text_days + "<a id='date" + day + "' onclick='change_day(" + day + ")'>" + day + "</a></li>";
      }
   }
   document.getElementById('days').innerHTML = text_days;
   if (year === Old_Date.year & month ===Old_Date.month){
      change_day_in_calendar(Old_Date.day);
   }
}

/**
 * Получает старое и новое числа даты и сменяет отображение в календаре.
 *
 * @example
 * change_day_in_calendar(13);
 *
 * @param {Number} new_day число даты, от 1 до 31 (например: 13).
 * Не возвращает значений.
 */
var change_day_in_calendar = function(day) {
   var id_new = "date" + day;
   document.getElementById(id_new).style.background = '#ccc';
}