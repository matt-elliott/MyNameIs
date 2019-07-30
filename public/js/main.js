(function() {
  $('form').on('submit', function (event) {
    event.preventDefault();

    const data = $(this).serializeArray();
    console.log(data);

    let queryURL;

    switch ($(this).attr('id')) {
      case 'registration-form':
          queryURL = '/api/register';
        break;
      case 'add-event':
          queryURL = '/api/addEvent';
        break;
    }
    
    $.post(queryURL, data, function(res) {
      console.log('posted ? ', res);
    });
  })
})();