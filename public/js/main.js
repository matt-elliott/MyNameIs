(function() {
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
    
    $.post(queryURL, data, function (res) {
      console.log('posted : ', res);
      if(res.redirect) {
        window.location = res.redirect;
      }
    },);
  });
})();