// YOUR CODE HERE:
var app = {
 server: "https://api.parse.com/1/classes/chatterbox"
};

app.init = function() {

  $(document).ready(function() {
    $('#main').find('.username').click( function(){
      app.addFriend();
    });

    // $('#send').unbind('submit').submit( function() {
    $('#send .submit').click( function(event) {      
      // app.handleSubmit();
      console.log('event',event);
      event.preventDefault();

      var messageObj = {
          username: 'Jia&Faisal',
          text: $('#message').val()
          // text: "Pure text"
      };
      // alert(messageObj.text);  
      app.send(messageObj, app.fetch);
      app.clearMessages();
      // alert('after');         
    }); 
    app.fetch();          
    // $('#send .submit').click(app.send);


  });

  // setInterval(function(){
  //   app.fetch();
  // }, 3000);

};

app.send = function(message, cb) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
      cb();
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function() {

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('data:', data);
      for(var i = 0; i < data.results.length; i++) {
        app.addMessage(data.results[i]);
        // console.log(data.results[i]);
      }
      console.log('chatterbox: Message received');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive message');     
    }    
  });
};

app.clearMessages = function() {
  $('#chats').html('');
};

app.addMessage = function(message) {

  // Use the browser's built-in functionality to quickly and safely escape the
  // string
  function escapeHtml(str) {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
  };

  var safeUser = escapeHtml(message.username);
  var safeText = escapeHtml(message.text);

  $('#chats').append('<div class = username>' + safeUser + ': ' + safeText + '</div>');  
};

app.addRoom = function(roomname) {
  $('#roomSelect').append('<option value = ' + roomname + '</option>');
};



app.addFriend = function() {};
// app.handleSubmit = function() {
//   var messageObj = {
//     username: 'Jia&Faisal <3',
//     text: $('#message').val()
//   };
//   alert(messageObj.text);  
//   app.send(messageObj);
//   alert('after');
//   app.fetch();
// };




// $(document).ready(function() {
  app.init();
// });
  

