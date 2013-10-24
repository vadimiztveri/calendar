document.getElementById('result').onclick = function(){
   document.getElementById('calendar').style.display = "block";
};

var click_handlers = {
  "year-minus": function(event) {
    calendar.select_previous_year();
  },
  "year-plus": function(event) {
    calendar.select_next_year();
  },
  "month-minus": function(event) {
    calendar.select_previous_month();
  },
  "month-plus": function(event) {
    calendar.select_next_month();
  },
  "day": function(event) {
    calendar.select_day(event.srcElement.innerHTML);
  },
  "close": function(event) {
    document.getElementById('calendar').style.display = "none";
  }
};

/**
 * По клику в календарь меняет дату
 */
document.getElementById('calendar').onclick = function(event) {
  var clicking_element = event.target || event.srcElement,
      method_name = clicking_element.getAttribute('role'),
      handler = click_handlers[method_name];
  
  if (typeof(handler) !== 'undefined') {
    handler(event);
    calendar.redraw();
  }
};