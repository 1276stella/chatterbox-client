// YOUR CODE HERE:
var app = {};

app.init = function() {};

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
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    //url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    contentType: 'application/json',
  });
};

app.clearMessages = function() {
  $('#chats').html('');
};

app.addMessage = function(message) {
  $('#chats').html('<div class = username>' + message.username + ':' + message.text + '</div>');  
};

app.addRoom = function(roomname) {
  $('#roomSelect').html('<option value = ' + roomname + '</option>');
};

app.addFriend = function() {};

$(document).ready(function() {
  $('#main').find('.username').click( function (){
    app.addFriend();
  });
});

