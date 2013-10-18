/**
 * @example
 * new Calendar(2013);
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
         for (var k = 0; k < this.year[i].month[j].get_all_days_in_month(); k++){
            console.log(this.year[i].month[j].day[k].number);
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
   for (var i = 0; i < this.get_all_days_in_month(); i++) {
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
   this.number = day + 1;
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
   draw_new_year(this.year[Operating_Date[0] - 2011].number);
   draw_new_month(this.year[Operating_Date[0] - 2011].month[Operating_Date[1]].number);
   draw_new_days(this.year[Operating_Date[0] - 2011].number, this.year[Operating_Date[0] - 2011].month[Operating_Date[1]]);
};

/**
 * Глобальная переменная, которая хранит в себе объект дат
 * Получает из конструтора Calendar
 */
var New_Calender;

/**
 * Глобальная переменная, которая хранит в себе Массив выбранной пользователем даты
 * Например: [2013, 09, 18]
 */
var Selected_Date;

/**
 * Глобальная переменная, которая хранит в себе временные месяц и год, для отображения в календаре 
 * Например: [2013, 09]
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
      var date_in_array = [parseInt(date.substring(6)), parseInt(date.substring(3, 5) - 1), parseInt(date.substring(0, 2))];
   } else {
      var date_in_array = [new Date().getFullYear(), new Date().getMonth(), new Date().getDate()];
   }
   Selected_Date = date_in_array;
   Operating_Date = [date_in_array[0], date_in_array[1]];
   New_Calender = new Calendar(date_in_array[0]);
   New_Calender.year[Selected_Date[0] - 2011].month[Selected_Date[1]].day[Selected_Date[2] - 1].selected = true;
   New_Calender.display();
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
   Operating_Date[0] += count;
   New_Calender.display();
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
   Operating_Date[1] += count;
   if (Operating_Date[1] === 12) {
      Operating_Date[1] = 0;
      Operating_Date[0]++;
   }
   if (Operating_Date[1] === -1) {
      Operating_Date[1] = 11;
      Operating_Date[0]--;
   }
   New_Calender.display();
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
   New_Calender.year[Selected_Date[0] - 2011].month[Selected_Date[1]].day[Selected_Date[2] - 1].selected = false;
   Selected_Date = [Operating_Date[0], Operating_Date[1], day];
   New_Calender.year[Selected_Date[0] - 2011].month[Selected_Date[1]].day[Selected_Date[2] - 1].selected = true;
   New_Calender.display();
   display_full_date_in_area();
}