(function() {
  $('form').on('submit', function (event) {
    event.preventDefault();
    const formID = $(this).attr('id');
    let data;
    
    if (formID !== 'invite') {
      data = $(this).serializeArray();
      console.log(data);  
    } else {
      data = $(this)[0][0].value.split(',');
      data.forEach(function (index, item) {
        data[index] = item.trim();
      });
      data = {data};
      console.log(data);
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
        console.log(eventID);
        queryURL = `/api/addInvite/${eventID}`;
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