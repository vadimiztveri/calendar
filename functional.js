/**
* Основные данные, с которыми работает календарь.
* При запуске получает текущую дату, прикаждом дейтвии пользователя сюда записывается новая дата.
*
* new_date.day - число
* new_date.month - месяц
* new_date.year - год
*
* Да, я капитан Очевидность. Но пусть хоть какой-нибудь программист потом скажет, что чего-то не понимает в моем коде.
*/
var new_date = {
  date : new Date(),
  day : new Date().getDate(),
  month : new Date().getMonth(),
  year : new Date().getFullYear()
}

/**
* Запускает прорисовку нового календаря.
* Дату месяца берет из конфигурационных файлов.
* Не получает и возвращает данные.
*/
var start_new_calendar = function(){
  document.getElementById("calender").style.display = "block";
  draw_new_year();
  draw_new_month();
  draw_new_days();
  change_day_in_calendar(0, new_date.day);
  display_full_date_in_area();
}

/**
* Получает новое число из даты (без месяца и года), запускает функцию отображения смены даты.
*
* @example
* change_day(3);
*
* @param {Number} number число даты, от 1 до 31 (например: 3).
* Не возвращает значений.
*/
var change_day = function(number) {
  var old_day = new_date.day;
  new_date.day = number;
  change_day_in_calendar(old_day, new_date.day)
}

/**
* Возвращает день недели первого числа определенного числа месяца и года.
*
* @example
* get_week_day();
*
* @returns {Number} день недели числом от 0 до 6, понедельник 0, вторник 1... воскресенье 6 (например, 1)
*/
var get_week_day_of_first_day = function() {
  var date = new Date(new_date.year, new_date.month, 1);
  var week_day = date.getDay() - 1;
  if (week_day === -1) {week_day = 6;}
  return week_day;
}

/**
* Возвращает количество дней в месяце.
*
* @example
* get_days_in_month();
*
* @returns {Number} количество дней (например, 31)
*/
var get_all_days_in_month = function(){
  var days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var all_days = days_in_month[new_date.month];
  if (new_date.year % 4 === 0 && new_date.month === 1){all_days = 29;}
  return all_days;
}

/**
* Прибавляет или вычитает 1 год и вызывает функции отображения календаря и даты текстом
*
* @example
* chance_year(-1);
*
* @param {Number} count или 1, или -1 (например: -1).
* Не возвращает данные.
*/
var chance_year = function(count){
  new_date.year = new_date.year + count;
  draw_new_year();
  draw_new_days();
  change_day_in_calendar(0, new_date.day);
  display_full_date_in_area();
}

/**
* Прибавляет или вычитает 1 месяц и вызывает функции отображения календаря и даты текстом
*
* @example
* chance_month(-1);
*
* @param {Number} count или 1, или -1 (например: -1).
* Не возвращает данные.
*/
var chance_month = function(count){
  new_date.month = new_date.month + count;
  if (new_date.month === 12) {
    new_date.month = 0;
    new_date.year++;
  }
  if (new_date.month === -1) {
    new_date.month = 11;
    new_date.year--;
  }
  draw_new_month();
  draw_new_days();
  change_day_in_calendar(0, new_date.day);
  display_full_date_in_area();
}
