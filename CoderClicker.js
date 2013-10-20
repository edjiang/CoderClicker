/*coderClicker.js
By: Edward Jiang
A clone of Cookie Clicker that's multiplayer for a CodeDay Workshop */

//Define items. 
Items = [{name: "Monkey", cost: 500}];

if (Meteor.isClient) {
  //Switch logins to username
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });
  //Subscribe to Meteor.users
  Meteor.subscribe('userData');

  //Export a list of all players (sorted by money), all things you can buy, and the current user to the template system
  Template.leaderboard.players = function () {
    return Meteor.users.find({}, {sort: {'money': -1}});
  };
  Template.leaderboard.items = function () {
    return Items;
  }
  Template.leaderboard.user = function () {
    return Meteor.user();
  }

  //Call click / buy functions on server when you click on the buttons
  Template.leaderboard.events({
    'click input.code': function () {
      Meteor.call('click');
    }
  });

  Template.leaderboard.events({
    'click input.buy': function (event) {
      Meteor.call('buy', event.target.id); //the 'id' of the button is the cost. So there aren't really items, per se
    }
  });

  //Registering a helper function to Handlebars so we can format currency correctly. 
  Handlebars.registerHelper('formatCurrency', function(number) {
    return number.toLocaleString();
  });
}


if (Meteor.isServer) {
  //Construct user with no money & DPS
  Accounts.onCreateUser(function(options, user) {
    user.money = 0;
    user.rate = 0;
    return user;
  })

  //Publish user data to the clients
  Meteor.publish("userData", function () {
    return Meteor.users.find({}, {sort: {'money': -1}});
  });

  //Update people's money every second. 
  Meteor.startup(function () {
    Meteor.setInterval(function() {
      Meteor.users.find({}).map(function(user) {
        Meteor.users.update({_id: user._id}, {$inc: {'money': user.rate}})
      });
    }, 1000)
  });
}

Meteor.methods({
  buy: function(amount) {
    if(Meteor.user().money >= amount && amount > 0) //check that people have enough money, and it's positive
      //Give people DPS at 1/500 DPS per $, rounded down. Subtract money
      Meteor.users.update({_id: this.userId}, {$inc: {'rate': (Math.floor(amount/500)), 'money': (0-amount)}}); 
  },
  click: function () {
    //Give people $25 per click
    Meteor.users.update({_id: this.userId}, {$inc: {'money': 25}});
  },
})