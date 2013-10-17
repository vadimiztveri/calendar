document.getElementById('result').onclick = function(){
   document.getElementById('calendar').style.display = "block";
}

document.getElementById('calendar').onclick = function(){
   var clicking_element = event.target || event.srcElement;

   switch (clicking_element.id) {
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
   }

   if (clicking_element.className.substring(0, 12) === 'calendar-day'){
      change_day(clicking_element.innerHTML);
   }
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
         text_days += "<li class='calendar-day weekend";
         } else {
            text_days += "<li class='calendar-day";
         }
         if (day === New_Date.day) {
            text_days += " selected";
         }
         text_days += "'>" + day + "</li>";
      }
   }
   document.getElementById('days').innerHTML = text_days;
}