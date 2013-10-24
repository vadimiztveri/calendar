/**
 * @param {Number} year
 * @constructor
 */
function Calendar(year) {
  this.years = {};
  this.current_date = [];
  this.selected_date = [];

  for (var i = (year - 10); i < (year + 11); i++){
    this.years[i] = new Year(i);
  }
};

/**
 * @param {Number} year
 * @constructor
 */
function Year(year) {
  this.number = year;
  this.months = this.create_months();
};

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

/*
 * Смена года на предыдущий
 */
Calendar.prototype.select_previous_year = function() {
  this.current_date[0]--;
};

/*
 * Смена года на следующий
 */
 Calendar.prototype.select_next_year = function() {
  this.current_date[0]++;
};

/*
 * Смена месяца на предыдущий
 */
Calendar.prototype.select_previous_month = function() {
  this.current_date[1]--;
  if (this.current_date[1] === -1){
    this.current_date[1] = 11;
    this.current_date[0]--;
  }
};

/*
 * Смена месяца на следующий
 */
Calendar.prototype.select_next_month = function() {
  this.current_date[1]++;
  if (this.current_date[1] === 12){
    this.current_date[1] = 0;
    this.current_date[0]++;
  }
};

/*
 * Смена дня
 */
Calendar.prototype.select_day = function(day) {
    this.current_date[2] = day;
    this.selected_date[2] = day;
    this.selected_date[1] = this.current_date[1];
    this.selected_date[0] = this.current_date[0];
    this.draw_full_date_in_area();
};

/**
 * @param {Number} month
 * @param {Number} year
 * @constructor
 */
var Month = function(month, year) {
  this.number = month;
  this.name = this.NAMES[month + 1];
  this.name_case = this.NAMES_CASE[month];
  this.year = year.number;
  this.days = this.create_days();
};

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
};

/**
 * @param {Number} day (например: 17)
 * @param {Number} first_day день недели первого дня в месяце (цифрами от 0) (например: 6)
 * @constructor
 */
var Day = function (day, first_day) {
  this.number = day;
  this.week_day = (first_day + day) % 7;
};

/**
 * Проверяет, является ли день выходным
 */
Day.prototype.is_weekend = function() {
  if (this.week_day === 5 || this.week_day === 6) {
    return true;
  } else {
    return false;
  }
};

/**
 * Запускает отображение календаря
 * @param {Object} month
 */
Calendar.prototype.redraw = function () {
   this.draw_new_year();
   this.draw_new_month();
   this.draw_new_days();
};

/**
 * Переписывает год, и ближайшие два года (до и после) в календаре.
 * @example
 * draw_new_year();
 */
Calendar.prototype.draw_new_year = function() {
   document.getElementById('year-minus').innerHTML = (calendar.current_date[0] - 1);
   document.getElementById('year-selected').innerHTML = calendar.current_date[0];
   document.getElementById('year-plus').innerHTML = (calendar.current_date[0] + 1);
};

/**
 * Выводит дату текстом в поле ввода.
 */
Calendar.prototype.draw_full_date_in_area = function(){
  document.getElementById('result').value = calendar.selected_date[2] + " " + calendar.years[calendar.current_date[0]].months[calendar.current_date[1]].name_case + " " + calendar.selected_date[0];
};

/**
 * Переписывает месяц, и ближайшие два месяца (до и после) в календаре.
 * @example
 * draw_new_month();
 */
Calendar.prototype.draw_new_month = function() {
  document.getElementById('month-minus').innerHTML = calendar.years[calendar.current_date[0]].months[1].NAMES[calendar.current_date[1]];
  document.getElementById('month-selected').innerHTML = calendar.years[calendar.current_date[0]].months[1].NAMES[calendar.current_date[1] + 1];
  document.getElementById('month-plus').innerHTML = calendar.years[calendar.current_date[0]].months[1].NAMES[calendar.current_date[1] + 2];
};

/**
 * Меняет отображение всех дат в одном месяце.
 * @example
 * draw_new_days();
 */
Calendar.prototype.draw_new_days = function() {
  var text_days = "",
      month = calendar.years[calendar.current_date[0]].months[calendar.current_date[1]];

  for (i = 0; i < month.first_day(); i++) {
      text_days += "<li class='empty'>&nbsp;</li>";
  }

  for (i = 0; i < month.days_count(); i++) {
    if (month.days[i].is_weekend()) {
      text_days += "<li class='calendar-day weekend";
    } else {
        text_days += "<li class='calendar-day";
      }
      if (i === (calendar.selected_date[2] - 1) && calendar.current_date[1] === calendar.selected_date[1] && calendar.current_date[0] === calendar.selected_date[0]) {
      text_days += " selected";
    }
    text_days += "' role='day'>" + (i + 1) + "</li>";
  }
  document.getElementById('days').innerHTML = text_days;
};

