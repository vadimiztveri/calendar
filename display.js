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
      New_Calender.draw_full_date_in_area()
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

