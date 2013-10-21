/**
 * @example
 * new Calendar(2013);
 *
 * @param {Number} year
 * @constructor
 */
function Calendar(year) {
  this.years = {};
  this.current_date = [];
  this.selected_date = [];

  for (var i = (year - 2); i < (year + 3); i++){
    this.years[i] = new Year(i);
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

Month.prototype.NAMES = ["Декабрь", "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь", "Январь"];
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
    new_day = new Day(i, this.first_day());
    days.push(new_day);
  }
  return days;
}

/**
 * @example
 * new Day(17, 6);
 *
 * @param {Number} day (например: 17)
 * @param {Number} first_day день недели первого дня в месяце (цифрами от 0) (например: 6)
 * @constructor
 */
var Day = function (day, first_day) {
  this.number = day;
  this.week_day = (first_day + day) % 7;
  if (((first_day + day) % 7) === 5 || ((first_day + day) % 7) === 6){
    this.output = true;
  } else {
    this.output = false;
  }
}


/**
 * Запускает отображение календаря
 * @param {Object} month
 */
Calendar.prototype.draw = function () {
   draw_new_year();
   draw_new_month();
   draw_new_days();
};


/**
 * Глобальная переменная, которая хранит в себе объект дат
 * Получает из конструтора Calendar
 */
var New_Calender;

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

  New_Calender = new Calendar(date_in_array[0]);

  New_Calender.current_date = [date_in_array[0], date_in_array[1], date_in_array[2]];
  New_Calender.selected_date = [date_in_array[0], date_in_array[1], date_in_array[2]];

  New_Calender.draw();
}

/**
 * Это временная функция для проверки объекта
Calendar.prototype.run = function () {
  for(var kay in this.years) {
    console.log(this.years[kay].number);
    for (var j = 0; j < 12; j++){
      console.log(this.years[kay].months[j].name + " - " + this.years[kay].months[j].first_day() + " - " + this.years[kay].months[j].days_count());
      for (var k = 0; k < this.years[kay].months[j].days_count(); k++){
        console.log(this.years[kay].months[j].days[k].number + " - " + this.years[kay].months[j].days[k].week_day + " - " + this.years[kay].months[j].days[k].output);
      }
    }
  }
}
 */