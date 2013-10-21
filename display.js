document.getElementById('result').onclick = function(){
   document.getElementById('calendar').style.display = "block";
}

/**
 * По клику в календарь меняет дату
 */
document.getElementById('calendar').onclick = function(){
  var clicking_element = event.target || event.srcElement;
  switch (clicking_element.getAttribute('role')) {
    case "year-minus":
      New_Calender.current_date[0]--;
      break;
    case "year-plus":
      New_Calender.current_date[0]++;
      break;
    case "month-minus":
      New_Calender.current_date[1]--;
      if (New_Calender.current_date[1] === -1){
        New_Calender.current_date[1] = 11;
        New_Calender.current_date[0]--;
      }
      break;
    case "month-plus":
      New_Calender.current_date[1]++;
      if (New_Calender.current_date[1] === 12){
        New_Calender.current_date[1] = 0;
        New_Calender.current_date[0]++;
      }
      break;
    case "day":
      New_Calender.current_date[2] = clicking_element.innerHTML;
      New_Calender.selected_date[2] = clicking_element.innerHTML;
      New_Calender.selected_date[1] = New_Calender.current_date[1];
      New_Calender.selected_date[0] = New_Calender.current_date[0];
      draw_full_date_in_area()
      break;
    case "close":
      document.getElementById('calendar').style.display = "none";
      break;
  }
  New_Calender.draw();
}

/**
 * Выводит дату текстом в поле ввода.
 * Не получает и не возвращает значений.
 */
var draw_full_date_in_area = function(){
  document.getElementById('result').value = New_Calender.selected_date[2] + " " + New_Calender.years[New_Calender.current_date[0]].months[New_Calender.current_date[1]].name_case + " " + New_Calender.selected_date[0];
}

/**
 * Переписывает год, и ближайшие два года (до и после) в календаре.
 * @example
 * draw_new_year();
 */
var draw_new_year = function() {
   document.getElementById('year-minus').innerHTML = (New_Calender.current_date[0] - 1);
   document.getElementById('year-selected').innerHTML = New_Calender.current_date[0];
   document.getElementById('year-plus').innerHTML = (New_Calender.current_date[0] + 1);
}

/**
 * Переписывает месяц, и ближайшие два месяца (до и после) в календаре.
 * @example
 * draw_new_month();
 */
var draw_new_month = function() {
  document.getElementById('month-minus').innerHTML = New_Calender.years[New_Calender.current_date[0]].months[1].NAMES[New_Calender.current_date[1]];
  document.getElementById('month-selected').innerHTML = New_Calender.years[New_Calender.current_date[0]].months[1].NAMES[New_Calender.current_date[1] + 1];
  document.getElementById('month-plus').innerHTML = New_Calender.years[New_Calender.current_date[0]].months[1].NAMES[New_Calender.current_date[1] + 2];
}

/**
 * Меняет отображение всех дат в одном месяце.
 * @example
 * draw_new_days();
 */
var draw_new_days = function() {
  var text_days = "",
      month = New_Calender.years[New_Calender.current_date[0]].months[New_Calender.current_date[1]];

  for (i = 0; i < month.first_day(); i++) {
      text_days += "<li class='empty'>&nbsp;</li>";
  }

  for (i = 0; i < month.days_count(); i++) {
    if (month.days[i].output) {
      text_days += "<li class='calendar-day weekend";
    } else {
        text_days += "<li class='calendar-day";
      }
      if (i === (New_Calender.selected_date[2] - 1) && New_Calender.current_date[1] === New_Calender.selected_date[1] && New_Calender.current_date[0] === New_Calender.selected_date[0]) {
      text_days += " selected";
    }
    text_days += "' role='day'>" + (i + 1) + "</li>";
  }
  document.getElementById('days').innerHTML = text_days;
}
