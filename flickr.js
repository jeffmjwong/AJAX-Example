$(function() {

 $('.heading').on('submit', 'form', function(evt) {
    evt.preventDefault();
    // the AJAX part
    const flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    const $searchField = $('#search');
    const $submitButton = $('#submit');

    $searchField.prop('disabled', true);
    $submitButton.attr('disabled', true).val("searching...");
    let searchTerm = $searchField.val();
    let flickrOptions = {
      tags: searchTerm,
      format: "json"
    };
    function displayPhotos(data) {
      let photoHTML = '<ul>';
      $.each(data.items, function(i, photo) {
        photoHTML += '<li class="grid-25 tablet-grid-50">';
        photoHTML += '<a href="' + photo.link + '" class="image">';
        photoHTML += '<img src="' + photo.media.m + '"></a></li>';
      }); // end each
      photoHTML += '</ul>';
      $('#photos').html(photoHTML);
      $searchField.prop('disabled', false);
      $submitButton.attr('disabled', false).val("Search");
    }
    $.getJSON(flickerAPI, flickrOptions, displayPhotos);

  }); // end submit

}); // end ready
