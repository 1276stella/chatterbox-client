// YOUR CODE HERE:
var app = {
 server: "https://api.parse.com/1/classes/chatterbox"
};

app.init = function() {

  $(document).ready(function() {

    $('#main').find('.username').click( function(){
      app.addFriend();
    });

    $('#send').unbind('submit').submit( function() {
      alert(message.in);

      app.handleSubmit();    
    });  

  });

  // setInterval(function(){
  //   app.fetch();
  // }, 3000);

};

app.send = function(message) {

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });

};

app.fetch = function() {

  // var that = this;
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('data:', data);
      for(var i = 0; i < data.results.length; i++) {
        app.addMessage(data.results[i]);
        console.log(data.results[i]);
      }
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error("data", data);
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
app.handleSubmit = function() {
};

app.init();

  

