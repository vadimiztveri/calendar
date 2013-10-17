/**
 * @example
 * new_date = new Calendar(2013);
 *
 * @param {Number} year (например: 2013)
 * @constructor
 */
function Calendar(year) {
   this.year = new Array();
   for (var i = 0; i < 5; i++){
      this.year.push(new Year(year - 2 + i));
   }
}


Calendar.prototype.run = function () {
   for (var i = 0; i < 5; i++){
      console.log(this.year[i].number);
      for (var j = 0; j < 12; j++){
         console.log(this.year[i].month[j].name() + " - " + this.year[i].month[j].get_week_day_of_first_day() + " - " + this.year[i].month[j].get_all_days_in_month());
         for (var k = 0; k < 30; k++){
            console.log(this.year[i].month[j].day[k].number + 1);
         }
      }
   }
}


/**
 * @example
 * new Year(2013);
 *
 * @param {Number} number год (например: 2013)
 * @constructor
 */
function Year(year) {
   this.number = year;
   this.month = new Array();
   for (var i = 0; i < 12; i++) {
      this.month.push(new Month(i, year));
   }
}

/**
 * @example
 * new Month(9);
 *
 * @param {Number} number номер месяца (например: 9)
 * @constructor
 */
var Month = function(month, year) {
   this.number = month;
   this.year = year;
   this.day = new Array();
   for (var i = 0; i < 30; i++) {
      this.day.push(new Day(i, month, year));
   }
}

/**
 * Возвращает название месяца
 *
 * @this {Month}
 * @return {String} (например: "Октябрь")
 */
Month.prototype.name = function () {
   var names_monthes = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
   return names_monthes[this.number];
};

/**
 * Возвращает название месяца c маленькой буквы в родительном падеже
 *
 * @this {Month}
 * @return {String} (например: "Октябрь")
 */
Month.prototype.name_case = function () {
   var names_monthes_case = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
   return names_monthes_case[this.number];
};


/**
 * Возвращает номер дня недели первого дня в месяца
 *
 * @this {Month}
 * @return {Number} число от 0 6 (например: 6)
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
 * @this {Month}
 * Не возвращает данные.
 */
Month.prototype.get_all_days_in_month = function () {
   var days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
   var all_days = days_in_month[this.number];
   if (this.year % 4 === 0 && this.number === 1){all_days = 29;}
   return all_days;
};

/**
 * @example
 * new Day(17, 9, 2013);
 *
 * @param {Number} day (например: 17)
 * @param {Number} month (например: 9)
 * @param {Number} year (например: 2013)
 * @constructor
 */
var Day = function (day, month, year) {
   this.number = day;
   this.month = month;
   this.year = year;
   this.selected = false;
}




/**
 * Запускает отображение календаря
 *
 * @this {CalendarDate}
 * Не возвращает данные.
 */
Calendar.prototype.display = function () {
   draw_new_year(this.year[Operating_Date[1] - 2011].number);
   draw_new_month(this.year[Operating_Date[1] - 2011].month[Operating_Date[0]].number);
/*
   draw_new_days(this.year.number, this.month);
*/
};

/**
 * Глобальная переменные, которая хранит в себе объект дат
 * Получает из конструтора CalendarDate
 */
var New_Date;

/**
 * Глобальная переменные, которая хранит в себе Массив выбранной пользователем даты
 * Например: [17, 09, 2013]
 */
var Selected_Date;

/**
 * Глобальная переменные, которая хранит в себе временные месяц и год, для отображения в календаре 
 * Например: [09, 2013]
 */
var Operating_Date;

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
   Selected_Date = date_in_array;
   Operating_Date = [date_in_array[1], date_in_array[2]];
   New_Date = new Calendar(date_in_array[2]);
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