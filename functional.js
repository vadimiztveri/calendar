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
   this.year = year;
   this.month = new Month(month, year);
   this.day = day;
   this.year_for_display = year;
   this.month_for_display = month;
   this.day_for_display = day;
}

/**
 * Отдает коллекцию годов
 *
 * @this {CalendarDate}
 * @return {Array} Три числа, предыдущий год, настоящий год, последующий год (например: [2012, 2013, 2014])
 */
CalendarDate.prototype.year_collection = function () {
   return [(this.year - 1), this.year, (this.year + 1)];
};

/**
 * @example
 * new Month(9);
 *
 * @param {Number} number номер месяца (например: 9)
 * @constructor
 */
var Month = function(number, year) {
  this.number = number;
  this.year = year;
}

/**
 * Отдает коллекцию месяцев
 *
 * @this {Month}
 * @return {Array} Три месяца строками (например: ["Сентябрь", "Октябрь", "Ноябрь"])
 */
Month.prototype.collection_name = function () {
   var monthes = ["Декабрь", "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь", "Январь"];
   return [monthes[this.number], monthes[this.number + 1], monthes[this.number + 2]];
};

/**
 * Возвращает номер дня недели первого дня в месяца
 *
 * @this {CalendarDate}
 * Не возвращает данные.
 */
Month.prototype.get_week_day_of_first_day = function () {
   var date = new Date(this.year, this.number, 1);
   var week_day = date.getDay() - 1;
   if (week_day === -1) {week_day = 6;}
   return week_day;
};

/**
 * Возвращает номер дня недели первого дня в месяца
 *
 * @this {CalendarDate}
 * Не возвращает данные.
 */
Month.prototype.get_all_days_in_month = function () {
  var days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var all_days = days_in_month[this.number];
  if (this.year % 4 === 0 && this.number === 1){all_days = 29;}
  return all_days;
};

/**
 * Запускает отображение календаря
 *
 * @this {CalendarDate}
 * Не возвращает данные.
 */
CalendarDate.prototype.display = function () {
   draw_new_year(this.year_collection());
   draw_new_month(this.month.collection_name());
   draw_new_days(this.year, this.month);
};

/**
 * Глобальные переменные, которая хранит в себе объект даты
 * Получает из конструтора CalendarDate
 */
var New_Date;

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

   console.log(New_Date.month.collection_name());


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
var change_year = function(count){
   New_Date.year += count;
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
var change_month = function(count){
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
   New_Date.year_for_display = New_Date.year;
   New_Date.month_for_display = New_Date.month;
   New_Date.year_for_display = number;
   New_Date.display();
   display_full_date_in_area(New_Date.day_for_display, New_Date.month_for_display, New_Date.year_for_display);
   change_day_in_calendar(New_Date.day);
}