function clearImageHolder() {
  $imageHolder = $('#image_holder');
  $imageHolder.html('');
}

$(document).ready(function() {
  // Set DOM object vars for cleanliness
  $searchForm = $('#main-search-form');
  $imageHolder = $('#image_holder');

  $searchForm.on('submit', function(e) {
    var search_query = $('#query_text').val();
    var font_choice = $( "#font_selector" ).val();
    var rainbow_option = $("#inlineRainbowOption:checked").val() !== undefined ? true : false;
    var crazy_option = $("#inlineCrazyOption:checked").val() !== undefined ? true : false;
    var no_need_option = $("#inlineNoNeedOption:checked").val() !== undefined ? true : false;

    // Set the loading image
    clearImageHolder();
    $imageHolder.append('<div class="loadingSpinner"></div>');

    var generateRequest = $.get( "./generate.php", {
      query: search_query,
      font: font_choice,
      rainbow: rainbow_option,
      crazy: crazy_option,
      no_need: no_need_option
    }, function(data) {
      // SUCCESS
      // console.log(data);
      clearImageHolder();
      $imageHolder.append('<img class="img-fluid" src="https://worldisending.com/labs/gifs/out.gif?stamp='+Date.now()+'" />');
    })
    .done(function() {
      // DONE
    })
    .fail(function() {
      // FAIL
      console.log( "There was an error..." );
      clearImageHolder();
      $imageHolder.append('<div class="alert alert-danger" role="alert">🤔 Something weird happened, try again!</div>');
    })
    .always(function() {
      // ALWAYS
    });

    return false;
  });
});
