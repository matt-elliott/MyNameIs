(function() {
  $('form').on('submit', function(event) {
    event.preventDefault();

    const data = $(this).serializeArray();
    console.log(data);

    $.post('/api/register', data, function(res) {
      console.log('posted ? ', res);
    });
  })
})();