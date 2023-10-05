$(document).ready(function () {
  function updateApiStatus () {
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
      if (data.status === 'OK') {
        $('#api_status').text('API Status: Online').addClass('available');
      } else {
        $('#api_status').text('API Status: Offline').removeClass('available');
      }
    });
  }

  setInterval(updateApiStatus, 5000); // Update API status every 5 seconds
  updateApiStatus(); // Call the function immediately when the page loads
});
