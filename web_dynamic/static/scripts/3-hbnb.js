$(document).ready(function () {
  const amenitiesSelected = {};

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).prop('checked')) {
      amenitiesSelected[amenityId] = amenityName;
    } else {
      delete amenitiesSelected[amenityId];
    }

    const selectedAmenities = Object.values(amenitiesSelected).join(', ');
    $('.amenities h4').text('Selected Amenities: ' + selectedAmenities);
  });
  
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').text('API Status: Online').addClass('available');
    } else {
      $('#api_status').text('API Status: Offline').removeClass('available');
    }
    });
  setInterval(updateApiStatus, 5000); // Update API status every 5 seconds
  updateApiStatus(); // Call the function immediately when the page loads

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    Content-Type: 'application/json',
    data: '{}',
    dataType: 'json',
    success: function (data) {
      for (const place of data) {
        let article = `<article>
	  <div class="title_box">
	    <h2>${ place.name }</h2>
	    <div class="price_by_night">${ place.price_by_night }</div>
	  </div>
	  <div class="information">
	    <div class="max_guest">${ place.max_guest } Guest{% if place.max_guest != 1 %}s{% endif %}</div>
            <div class="number_rooms">${ place.number_rooms } Bedroom{% if place.number_rooms != 1 %}s{% endif %}</div>
            <div class="number_bathrooms">${ place.number_bathrooms } Bathroom{% if place.number_bathrooms != 1 %}s{% endif %}</div>
	  </div>
	  <div class="user">
            <b>Owner:</b> ${ place.user.first_name } ${ place.user.last_name }
          </div>
          <div class="description">
	    ${ place.description | safe }
          </div>
	</article>`;
      $('section.places').append(article) 
      }
    }
  )};
});
