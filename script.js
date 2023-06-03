$(function () {
  // Function to display the current date at the top of the calendar
  function displayCurrentDate() {
    // get the current date using the dayjs api
    var currentDate = dayjs().format('dddd, MMMM D, YYYY');
    // set the text for the currentDay id
    $('#currentDay').text(currentDate);
  }

  // Function to generate the time blocks for standard business hours
  function generateTimeBlocks() {
    var container = $('.container-lg');
    var currentTime = dayjs().hour(9).minute(0).second(0); // Start with 9AM

    // Loop through each hour from 9AM to 5PM (17) to generate time blocks
    for (var i = 9; i <= 17; i++) {
      var timeBlockId = 'hour-' + i; // this is our id
      var timeBlockRow = $('<div>').attr('id', timeBlockId).addClass('row time-block');
      var hourColumn = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(currentTime.format('hA'));
      var descriptionColumn = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', '3');
      var saveButton = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save').html('<i class="fas fa-save" aria-hidden="true"></i>');

      timeBlockRow.append(hourColumn, descriptionColumn, saveButton);
      container.append(timeBlockRow);

      // Increment the current time to the next hour
      currentTime = currentTime.add(1, 'hour');
    }
  }

  // Function to apply the appropriate class to each time block based on the current hour
  function applyTimeBlockClasses() {
    var currentHour = dayjs().hour();

    $('.time-block').each(function () {
      var timeBlockHour = parseInt($(this).attr('id').split('-')[1]);

      if (timeBlockHour < currentHour) {
        $(this).removeClass('present future').addClass('past');
      } else if (timeBlockHour === currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }

  // Function to load saved events from local storage
  function loadSavedEvents() {
    $('.time-block').each(function () {
      var timeBlockId = $(this).attr('id');
      var description = localStorage.getItem(timeBlockId);
      $(this).find('.description').val(description);
    });
  }

  // Function to save an event when the save button is clicked
  function saveEvent() {
    var description = $(this).siblings('.description').val();
    var timeBlockId = $(this).parent().attr('id');

    localStorage.setItem(timeBlockId, description);
  }

  // Display the current date
  displayCurrentDate();

  // Generate the time blocks
  generateTimeBlocks();

  // Apply time block classes
  applyTimeBlockClasses();

  // Load saved events
  loadSavedEvents();

  // Add a listener for click events on the save button
  $('.saveBtn').on('click', saveEvent);
});
