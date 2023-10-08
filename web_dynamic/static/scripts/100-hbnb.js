$(document).ready(function () {
  const amenitiesSelected = {};
  let checkedStates = {};
  let checkedCities = {};
  let checkedLocations = {};

  
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
  
  $(document).on('change', ".locations > .popover > li > input[type='checkbox']", function () {
    if (this.checked) {
      checkedStates[$(this).data('id')] = $(this).data('name');
      checkedLocations[$(this).data('id')] = $(this).data('name');
    } else {
      delete checkedStates[$(this).data('id')];
      delete checkedLocations[$(this).data('id')];
    }
    let checked = Object.values(checkedLocations);
    $('div.locations > h4').text(checked.join(', '));
   
  });
  $(document).on('change', ".locations > .popover > li > ul > li > input[type='checkbox']", function () {
    if (this.checked) {
      checkedCities[$(this).data('id')] = $(this).data('name');
      checkedLocations[$(this).data('id')] = $(this).data('name');
    } else {
      delete checkedCities[$(this).data('id')];
      delete checkedLocations[$(this).data('id')];
    }
    let checked = Object.values(checkedLocations);
    $('div.locations > h4').text(checked.join(', '));
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

  $('button').click(function () {
    let amenityList = [];
    for (let i in amenitiesSelected) {
      amenityList.push(i);
    }
    let postDict = {};
    postDict['amenities'] = amenityList;
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
