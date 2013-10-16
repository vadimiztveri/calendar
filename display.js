document.getElementById('result').onclick = function(){
   document.getElementById('calendar').style.display = "block";
}

document.getElementById('close').onclick = function(){
   document.getElementById('calendar').style.display = "none";
}

document.getElementById('year-minus').onclick = function(){
   change_year(-1);
}

document.getElementById('year-plus').onclick = function(){
   change_year(1);
}

document.getElementById('month-minus').onclick = function(){
   change_month(-1);
}

document.getElementById('month-plus').onclick = function(){
   change_month(1);
}

document.getElementsByClassName('calendar-day').onclick = function(){
   console.log("!");
}

/**
 * Выводит дату текстом в поле ввода.
 * Не получает и не возвращает значений.
 */
var display_full_date_in_area = function(){
  var month_case = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
  document.getElementById('result').value = New_Date.day + " " + month_case[New_Date.month.selected] + " " + New_Date.year.selected;
}

/**
 * Переписывает год, и ближайшие два года (до и после) в календаре.
 *
 * @example
 * draw_new_year([2012, 2013, 2014]);
 *
 * Не возвращает значений.
 */
var draw_new_year = function(years) {
   document.getElementById('year-minus').innerHTML = years[0] + "&nbsp;←&nbsp;";
   document.getElementById('year-selected').innerHTML = years[1];
   document.getElementById('year-plus').innerHTML = "&nbsp;→&nbsp;" + years[2];
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
var draw_new_month = function(months) {
   document.getElementById('month-minus').innerHTML = months[0] + "&nbsp;←&nbsp;";
   document.getElementById('month-selected').innerHTML = months[1];
   document.getElementById('month-plus').innerHTML = "&nbsp;→&nbsp;" + months[2];
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
       week_day = month.get_week_day_of_first_day(year);

   for (i = 0;i < (week_day + month.get_all_days_in_month(year));i++) {
      if (i < week_day){
         text_days += "<li class='empty'>&nbsp;</li>";
      } else {
      var day = i - week_day + 1;
      if (i % 7 === 5 || i % 7 === 6) {
         text_days += "<li class='calendar-day weekend'>";
         } else {
            text_days += "<li class='calendar-day'>";
         }
         text_days = text_days + "<a id='date" + day + "' onclick='change_day(" + day + ")'>" + day + "</a></li>";
      }
   }
   document.getElementById('days').innerHTML = text_days;

   if (year === New_Date.year.selected && month.number === New_Date.month.selected){
      change_day_in_calendar(New_Date.day);
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
var change_day_in_calendar = function() {
   var id_new = "date" + New_Date.day;
   document.getElementById(id_new).style.background = '#ccc';
}