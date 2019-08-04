(function() {
  //todo hide with css to start - so it doesnt flash on pagelaod
  $('#error-messsage').hide();
  $('form').on('submit', function (event) {
    event.preventDefault();

    const formID = $(this).attr('id');
    let data;
    
    if (formID !== 'invite') {
      data = $(this).serializeArray();
    } else {
      data = $(this)[0][0].value.split(',');
      data.forEach(function (item, index) {
        data[index] = item.trim();
      });
      data = {data};
    }
    

    let queryURL;
    
    switch (formID) {
      case 'registration-form':
        queryURL = '/api/register';
        break;
      case 'add-event':
        queryURL = '/api/addEvent';
        break;
      case 'invite':
        const eventID = window.location.pathname.split('/')[3];
        queryURL = `/api/addInvite/${eventID}`;
        break;
      case 'login-form':
        queryURL = '/api/login/'
        break;
    }
    
    $.post(queryURL, data,
      function (res) {
      console.log('res ', res);

      if (res.loggedin) {
        //todo use momentjs to get current date time and add one week
        let id = res.data.id;
        document.cookie = `userID=${id}; expires: Saturday, August 10, 2019 UTC; path=/`;
        
        window.location = `/user/${id}/`;
        
        
      } else if (res.redirect) {
        window.location = res.redirect;
      }
    }).fail(function(error) {
      console.log('FAILURE: ',
      error.status,
      ' ',
      error.statusText);
      const errorText = 'Username and/or password not found. You may have forgotten your password or you might need to create an account';
      alertUserOfFailure(errorText);
    })
  });

  function alertUserOfFailure(error) {
    let p = $('#error-messsage p');
    p.text(error);
    $('#error-messsage').fadeIn('slow');
  }
})();