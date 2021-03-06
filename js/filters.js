'use strict';

(function () {
  var formFilters = document.querySelector('.tokyo__filters');
  var housingType = formFilters.querySelector('#housing_type');
  var housingPrice = formFilters.querySelector('#housing_price');
  var housingRooms = formFilters.querySelector('#housing_room-number');
  var housingGuests = formFilters.querySelector('#housing_guests-number');
  var housingFeatures = formFilters.querySelector('#housing_features');

  var dialog = window.dialog;

  formFilters.addEventListener('change', function () {
    window.filterElements('.pin');
  });

  function getFilters() {
    var filters = {};
    var features = housingFeatures.querySelectorAll('input');
    filters.housingFeatures = [];

    for (var i = 0; i < features.length; i++) {

      if (features[i].checked) {
        filters.housingFeatures.push(features[i].value);
      }
    }

    filters.housingType = housingType.value;
    filters.housingGuests = housingGuests.value;
    filters.housingPrice = housingPrice.value;
    filters.housingRooms = housingRooms.value;

    return filters;
  }

  function filterItem(item, filters) {
    if (typeof item.dataset.housingType !== 'undefined') {
      if ((item.dataset.housingType !== filters.housingType) && (filters.housingType !== 'any')) {
        return false;
      }
      if ((item.dataset.housingPrice !== filters.housingPrice) && (filters.housingPrice !== 'any')) {
        return false;
      }
      if ((item.dataset.housingGuests !== filters.housingGuests) && (filters.housingGuests !== 'any')) {
        return false;
      }
      if ((item.dataset.housingRooms !== filters.housingRooms) && (filters.housingRooms !== 'any')) {
        return false;
      }
      return filters.housingFeatures.every(function (feature) {
        return item.dataset.housingFeatures.indexOf(feature) !== -1;
      });
    }
    return true;
  }

  window.filterElements = function (elemClass) {
    var filterElems = document.querySelectorAll(elemClass);
    var filters = getFilters();

    window.debounce(function () {
      for (var i = 0; i < filterElems.length; i++) {
        if (filterItem(filterElems[i], filters)) {
          filterElems[i].classList.remove('hidden');
        } else {
          filterElems[i].classList.add('hidden');
          if (filterElems[i].classList.contains('pin--active')) {
            filterElems[i].classList.remove('pin--active');
            dialog.closeDialog();
          }
        }
      }
    });
  };
})();
