/**
 * @example
 * new Calendar(2013);
 *
 * @param {Number} year
 * @constructor
 */
function Calendar(year) {
  this.years = {};

  for (var i = (year - 2); i < (year + 3); i++){
    this.years[i] = new Year(i);
  }
}


/**
 * Это временная функция для проверки объекта
 */
Calendar.prototype.run = function () {
  for(var kay in this.years) {
    console.log(this.years[kay].number);
    for (var j = 0; j < 12; j++){
      console.log(this.years[kay].months[j].name + " - " + this.years[kay].months[j].first_day() + " - " + this.years[kay].months[j].days_count());
      for (var k = 0; k < this.years[kay].months[j].days_count(); k++){
        console.log(this.years[kay].months[j].days[k].number);
      }
    }
  }
}



/**
 * @example
 * new Year(2013);
 *
 * @param {Number} year
 * @constructor
 */
function Year(year) {
  this.number = year;
  this.months = this.create_months();
}

/*
 * Коллекция месяцев
 */
Year.prototype.create_months = function() {
  var months = [],
      new_month;

  for (var i = 0; i < 12; i++) {
    new_month = new Month(i, this);
    months.push(new_month);
  }

  return months;
};


/**
 * @example
 * new Month(9, 2013);
 *
 * @param {Number} month
 * @param {Number} year
 * @constructor
 */
var Month = function(month, year) {
  this.number = month;
  this.name = this.NAMES[month];
  this.name_case = this.NAMES_CASE[month];
  this.year = year.number;
  this.days = this.create_days();
}

Month.prototype.NAMES = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
Month.prototype.NAMES_CASE = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

/**
 * День недели первого дня в месяца (числом от 0)
 * @return {Number}
 */
Month.prototype.first_day = function () {
  var date = new Date(this.year, this.number, 1),
      week_day = date.getDay() - 1;

  if (week_day === -1) {week_day = 6;}

  return week_day;
};

/**
 * @return {Number} количество дней
 */
Month.prototype.days_count = function () {
  var days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      all_days = days_in_month[this.number];
  
  if (this.year % 4 === 0 && this.number === 1){all_days = 29;}
  
  return all_days;
};

/*
 * Коллекция дней
 */
Month.prototype.create_days = function() {
  var days = [],
      new_day;
   
  for (var i = 0; i < this.days_count(); i++) {
    new_day = new Day(i);
    days.push(new_day);
  }
  return days;
}


/**
 * @example
 * new Day(17);
 *
 * @param {Number} day (например: 17)
 * @constructor
 */
var Day = function (day) {
  this.number = day;
}


/**
 * Запускает отображение календаря
 * @param {Object} month
 */
Calendar.prototype.display = function (month) {
   console.log(month);
/*
   draw_new_year(this.year.number);
   draw_new_month(this.years[Operating_Date[0]].months[Operating_Date[1]].number);
   draw_new_days(this.years[Operating_Date[0]].number, this.years[Operating_Date[0]].months[Operating_Date[1]]);
*/
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
var Operating_Date;
 */

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

//   Operating_Date = [date_in_array[0], date_in_array[1]];

   New_Calender = new Calendar(date_in_array[0]);

   New_Calender.display(Selected_Date[0], Selected_Date[1]);
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
  day
  day.month
  day.month.year
    
  selected_day = day
  redraw()
  
   Selected_Date = [Operating_Date[0], Operating_Date[1], day];
   New_Calender.display();
   display_full_date_in_area();
}