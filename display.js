
document.getElementById('result').onclick = function(){
   document.getElementById('calendar').style.display = "block";
}

document.getElementById('close').onclick = function(){
   document.getElementById('calendar').style.display = "none";
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
  var text_year = "<a onclick='change_year(-1)' id='year-minus'>" + years[0] + "&nbsp;←</a> " + years[1] + " <a onclick='change_year(1)' id='year-plus'>→&nbsp;" + years[2] + "</a>";
  document.getElementById('year').innerHTML = text_year;
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
  var text_month = "<a onclick='change_month(-1)' id='month-minus'>" + months[0] + "&nbsp;←</a> " + months[1] + " <a onclick='change_month(1)' id='month-plus'>→&nbsp;" + months[2] + "</a>";
  document.getElementById('month').innerHTML = text_month;
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
         text_days += "<li class='weekend'>";
         } else {
            text_days += "<li>";
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