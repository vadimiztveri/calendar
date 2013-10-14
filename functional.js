/**
 * @example
 * new_date = new  CalendarDate(11, 10, 2013);
 *
 * @param {Number} day день (например: 11)
 * @param {Number} month месяц (например: 10)
 * @param {Number} year год (например: 2013)
 * @constructor
 */
function CalendarDate(day, month, year) {
   this.day = day;
   this.month = month;
   this.year = year;
}

/**
 * Запускает отображение календаря
 *
 * @this {CalendarDate}
 * Не возвращает данные.
*/
CalendarDate.prototype.display = function () {
   display_full_date_in_area(this.day, this.month, this.year);
   draw_new_year(this.year);
   draw_new_month(this.month);
   draw_new_days(this.year, this.month);
};

/**
 * Глобальные переменные, которая хранит в себе объект даты
 * Получает из конструтора CalendarDate
 */
var New_Date;
var Old_Date;

/**
 * Создает новый календать по дате. Если дата не передана, то добавялет сегодняшний день
 *
 * @example
 * start_new_calendar("31-12-2013");
 *
 * @param {String} date дата в формате dd-mm-YYYY (например: "31-12-2013").
 * Не возвращает данные.
 */
var start_new_calendar = function(date) {
   make_calendar_visible();
   if (date) {
      var day = parseInt(date.substring(0, 2));
      var month = parseInt(date.substring(3, 5) - 1);
      var year = parseInt(date.substring(6));
   } else {
      var day = new Date().getDate();
      var month = new Date().getMonth();
      var year = new Date().getFullYear();
   }
   New_Date = new CalendarDate(day, month, year);
   Old_Date = new CalendarDate(day, month, year);
   New_Date.display();
   change_day_in_calendar(New_Date.day);
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
   New_Date.year += count;
   console.log(New_Date.year + " - " + Old_Date.year)
   New_Date.display();
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
   New_Date.month += count;
   if (New_Date.month === 12) {
      New_Date.month = 0;
      New_Date.year++;
   }
   if (New_Date.month === -1) {
      New_Date.month = 11;
      New_Date.year--;
   }
   New_Date.display();
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
   New_Date.day = number;
   Old_Date.day = number;
   Old_Date.month = New_Date.month;
   Old_Date.year = New_Date.year;
   change_day_in_calendar(New_Date.day);
}

/**
 * Возвращает день недели первого числа определенного месяца и года.
 *
 * @example
 * get_week_day();
 *
 * @returns {Number} день недели числом от 0 до 6, понедельник 0, вторник 1... воскресенье 6 (например, 1)
 */
var get_week_day_of_first_day = function(year, month) {
   var date = new Date(year, month, 1);
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
var get_all_days_in_month = function(year, month){
  var days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var all_days = days_in_month[month];
  if (year % 4 === 0 && month === 1){all_days = 29;}
  return all_days;
}