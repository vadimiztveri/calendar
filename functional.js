/**
 * Основные данные, с которыми работает календарь.
 * При запуске получает текущую дату, прикаждом действии пользователя сюда записываются новые данные.
 */
var new_date = {
  day : new Date().getDate(),
  month : new Date().getMonth(),
  year : new Date().getFullYear()
}

/**
 * Создает новый календать по дате. Если дата не передана, то остается сегодняшняя дата.
 *
 * @example
 * start_new_calendar("31-12-2013");
 *
 * @param {String} date дата в формате dd-mm-YYYY (например: "31-12-2013").
 * Не возвращает данные.
 */
var start_new_calendar = function(date){
  make_calendar_visible();
  if (date) {
    new_date.day = parseInt(date.substring(0, 2));
    new_date.month = parseInt(date.substring(3, 5) - 1);
    new_date.year = parseInt(date.substring(6));
  }
  drow_entire_calendar();
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
  drow_entire_calendar();
}

/**
 * Получает новое число из даты (без месяца и года), запускает две функции: отображения смены даты и вывода новой даты в поле.
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
  display_full_date_in_area();
  change_day_in_calendar(new_date.day, old_day);
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
  drow_entire_calendar();
}

/**
 * Возвращает день недели первого числа определенного месяца и года.
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
 * get_all_days_in_month(); return 31
 *
 * @returns {Number} количество дней (например, 31)
 */
var get_all_days_in_month = function(){
  var days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var all_days = days_in_month[new_date.month];
  if (new_date.year % 4 === 0 && new_date.month === 1){all_days = 29;}
  return all_days;
}
