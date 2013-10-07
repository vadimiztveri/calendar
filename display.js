/**
* Получает старое число и новое число из даты и сменяет отображение в календаре
*
* @example
* change_day_in_calendar(13, 3);
*
* @param {Number} old_day число даты, от 1 до 31 (например: 3).
* @param {Number} new_day число даты, от 1 до 31 (например: 13).
* Не возвращает значений.
*/
var change_day_in_calendar = function(old_day, new_day) {
  display_full_date_in_area();
  if (old_day != 0) {
    var id_old = "date" + old_day;
    document.getElementById(id_old).style.background = 'transparent'
  };
  var id_new = "date" + new_day;
  document.getElementById(id_new).style.background = '#ccc';
}

/**
* Выводит дату текстом в поле ввода.
* Не получает и не возвращает значений. Дату берет из конфигурационных значений.
*/
var display_full_date_in_area = function(){
  var month_case = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
  document.getElementById('result').value = new_date.day + " " + month_case[(new_date.month)] + " " + new_date.year;
}

/**
* Переписывает год, и ближайшие два года в календаре.
*
* @example
* draw_new_year();
*
* Не возвращает значений. Год берет из new_date.
*/
var draw_new_year = function() {
  var text_year = "<a onclick='chance_year(-1)' id='year-minus'>" + (new_date.year - 1) + "&nbsp;←</a> " + new_date.year + " <a onclick='chance_year(1)' id='year-plus'>→&nbsp;" + (new_date.year + 1) + "</a>";
  document.getElementById('year').innerHTML = text_year;
}

/**
* Переписывает месяц, и ближайшие два месяца в календаре.
*
* @example
* draw_new_month();
*
* Не возвращает значений. Месяц берет из new_date.
*/
var draw_new_month = function() {
  var month = ["Декабрь", "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь", "Январь"];
  var text_month = "<a onclick='chance_month(-1)' id='month-minus'>" + month[new_date.month] + "&nbsp;←</a> " + month[new_date.month + 1] + " <a onclick='chance_month(1)' id='month-plus'>→&nbsp;" + month[new_date.month + 2] + "</a>";
  document.getElementById('month').innerHTML = text_month;
}

/**
* Меняет отображение всех дат в месяце.
*
* @example
* draw_new_days();
*
* Не возвращает значений. Год, месяц и дату берет из new_date.
*/
var draw_new_days = function() {
  var text_days = "";
  for (i = 0;i < (get_week_day_of_first_day() + get_all_days_in_month());i++) {
    if (i < get_week_day_of_first_day()){
      text_days = text_days + "<li class='empty'>&nbsp;</li>";
    } else {
      var day = i - get_week_day_of_first_day() + 1;
      if (i % 7 === 5 || i % 7 === 6) {
        text_days = text_days + "<li class='weekend'>";
      } else {
        text_days = text_days + "<li>";
      }
      text_days = text_days + "<a id='date" + day + "' onclick='change_day(" + day + ")'>" + day + "</a></li>";
    }
  }
  document.getElementById('days').innerHTML = text_days;
}
