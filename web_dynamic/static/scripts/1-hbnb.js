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
});
