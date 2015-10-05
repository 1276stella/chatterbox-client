// YOUR CODE HERE:
var app = {};
$(document).ready(function() {
  app = {
    server: 'https://api.parse.com/1/classes/chatterbox',
    roomname: 'lobby',
    friends: {},

    init: function() {
      app.username = window.location.search.slice(10);
      app.$main = $('#main');
      app.$message = $('#message');
      app.$chats = $('#chats');
      app.$roomSelect = $('#roomSelect');
      app.$send = $('#send');

      app.$main.on('click', '.username', app.addFriend);
      app.$send.on('submit', app.handleSubmit);
      app.$roomSelect.on('change', app.saveRoom);

      app.fetch();
      // setInterval(app.fetch, 3000);
    },
    send: function(message, cb) {
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
    },

    fetch: function() {
      $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: 'https://api.parse.com/1/classes/chatterbox',
        type: 'GET',
        contentType: 'application/json',
        success: function (data) {
          console.log('data:', data);
          app.populateRooms(data.results);
          app.populateMessages(data.results);
          console.log('chatterbox: Message received');
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to receive message');     
        }    
      });
    },

    addFriend: function(event) {
      var username = $(this).attr('data-username'); // 'this' is event.currentTarget
      app.friends[username] = true;
      //$(this).addClass('friend'); ("[data-slide='" + current + "']")
      app.$chats.find("[data-username = '" + username + "']").addClass('friend');    
    },    

    // iterate fetched results and display all messages in the selected room
    populateMessages: function(results) {
      app.clearMessages();

      for(var i = 0; i < results.length; i++) { 
        if(!results[i].roomname) {
          results[i].roomname = 'lobby';
        }        
        if(results[i].roomname === app.roomname) {
          app.addMessage(results[i]);
        }
      }      
    },
    // iterate fetched results and display all rooms in the select menu
    populateRooms: function(results) {
      app.$roomSelect.html('<option value="newRoom">New Room</option><option value="" selected>Lobby</option>')
      var rooms = {};
      for(var i = 0; i < results.length; i++) {
        var room = results[i].roomname;
        if(room && rooms[room] !== true) {
          app.addRoom(room);
          rooms[room] = true;
        }
      }

      app.$roomSelect.val(app.roomname);
    },
    clearMessages: function() {
      $('#chats').html('');
    },

    addMessage: function(message) {

      // Use the browser's built-in functionality to quickly and safely escape the
      // string
      function escapeHtml(str) {
          var div = document.createElement('div');
          div.appendChild(document.createTextNode(str));
          return div.innerHTML;
      };

      var safeUser = escapeHtml(message.username);
      var safeText = escapeHtml(message.text);

      var $chat = $('<div class = "chat">');
      var $username = $('<div class = "username">').text(safeUser + ':').attr('data-username',safeUser);
      var $message = $('<br><span>').text(safeText);
      $chat.append($username);      
      $username.append($message);
      app.$chats.append($chat);  
    },

    saveRoom: function() {
  // debugger;
      var selectIndex = app.$roomSelect.prop('selectedIndex');
      if(selectIndex === 0) {
        var roomname = prompt('New Room Name');
        if(roomname !== null) {
          app.roomname = roomname;
          app.addRoom(roomname);
          app.$roomSelect.val(roomname); // change the select option to 'roomname'
          app.fetch();
        }
      } else {
        app.roomname = app.$roomSelect.val();
        app.fetch();
      }

    },

    addRoom: function(roomname) {
      var $option = $('<option>').val(roomname).text(roomname);
      app.$roomSelect.append($option);
    },

    handleSubmit: function(event) {
      event.preventDefault();
      var messageObj = {
          username: app.username,
          text: app.$message.val(),
          roomname: app.roomname
      };

      app.send(messageObj, app.fetch);     
      app.clearMessages();  
    }  
  };
  app.init();
});

  