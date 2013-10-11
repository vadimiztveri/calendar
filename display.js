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
 * Вызывает все 5 функций, которые добавляют в календарь новые данные
 * Не получает и возвращает данные.
 */
var drow_entire_calendar = function(){
  display_full_date_in_area();
  draw_new_year();
  draw_new_month();
  draw_new_days();
  change_day_in_calendar(new_date.day);
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
 * Переписывает год, и ближайшие два года (до и после) в календаре.
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
 * Переписывает месяц, и ближайшие два месяца (до и после) в календаре.
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
  var text_days = "",
      week_day_of_first = get_week_day_of_first_day();
  for (i = 0;i < (week_day_of_first + get_all_days_in_month());i++) {
    if (i < week_day_of_first){
      text_days = text_days + "<li class='empty'>&nbsp;</li>";
    } else {
      var day = i - week_day_of_first + 1;
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

/**
 * Получает старое и новое числа даты и сменяет отображение в календаре.
 *
 * @example
 * change_day_in_calendar(13, 3);
 *
 * @param {Number} new_day число даты, от 1 до 31 (например: 13).
 * @param {Number} old_day число даты, от 1 до 31 (например: 3).
 * Не возвращает значений.
 */
var change_day_in_calendar = function(new_day, old_day) {
  var id_new = "date" + new_day;
  document.getElementById(id_new).style.background = '#ccc';
  if (old_day) {
    var id_old = "date" + old_day;
    document.getElementById(id_old).style.background = 'transparent'
  };
}
