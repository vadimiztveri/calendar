/**
 * @example
 * new_date = new  CalendarDate(11, 10, 2013);
 *
 * @param {Array} date три значения, день, номер месяца от 0, год (например: [11, 09, 2013])
 * @constructor
 */
function CalendarDate(date) {
   this.year = new Year(date[2]);
   this.month = new Month(date[1]);
   this.day = date[0];
}

/**
 * @example
 * new Year(2013);
 *
 * @param {Number} number год (например: 9)
 * @constructor
 */
var Year = function(number) {
  this.number = number;
  this.selected = number;
}

/**
 * Отдает коллекцию лет
 *
 * @this {Year}
 * @return {Array} Три месяца строками (например: ["Сентябрь", "Октябрь", "Ноябрь"])
 */
Year.prototype.collection = function () {
   return [(this.number - 1), this.number, (this.number + 1)];
};

/**
 * @example
 * new Month(9);
 *
 * @param {Number} number номер месяца (например: 9)
 * @constructor
 */
var Month = function(number) {
  this.number = number;
  this.selected = number;
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
Month.prototype.get_week_day_of_first_day = function (year) {
   var date = new Date(year, this.number, 1);
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
Month.prototype.get_all_days_in_month = function (year) {
  var days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var all_days = days_in_month[this.number];
  if (year % 4 === 0 && this.number === 1){all_days = 29;}
  return all_days;
};

/**
 * Запускает отображение календаря
 *
 * @this {CalendarDate}
 * Не возвращает данные.
 */
CalendarDate.prototype.display = function () {
   draw_new_year(this.year.collection());
   draw_new_month(this.month.collection_name());
   draw_new_days(this.year.number, this.month);
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
   if (date) {
      var date_in_array = [parseInt(date.substring(0, 2)), parseInt(date.substring(3, 5) - 1), parseInt(date.substring(6))];
   } else {
      var date_in_array = [new Date().getDate(), new Date().getMonth(), new Date().getFullYear()];
   }
   New_Date = new CalendarDate(date_in_array);
   New_Date.display();
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
   New_Date.year.number += count;
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
   New_Date.month.number += count;
   if (New_Date.month.number === 12) {
      New_Date.month.number = 0;
      New_Date.year.number++;
   }
   if (New_Date.month.number === -1) {
      New_Date.month.number = 11;
      New_Date.year.number--;
   }
   New_Date.display();
}

/**
 * Получает новое число из даты (без месяца и года), запускает две функции: отображения смены даты и вывода новой даты в поле.
 *
 * @example
 * change_day(3);
 *
 * @param {Number} day число даты, от 1 до 31 (например: 3).
 * Не возвращает значений.
 */
var change_day = function(day) {
   New_Date.day = day;
   New_Date.year.selected = New_Date.year.number;
   New_Date.month.selected = New_Date.month.number;
   New_Date.display();
   display_full_date_in_area();
}