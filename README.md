#CoderClicker

By [Edward Jiang](http://twitter.com/EdwardStarcraft)

CoderClicker is a game inspired by Cookie Clicker. It's a multiplayer clicking game built with Meteor.js to use as a workshop for [CodeDay](http://codeday.org/)!

Here's a [tutorial on how to build this](http://blog.studentrnd.org/post/66270708458/tutorial-creating-coder-clicker-a-cookie-clicker). 

#Trying out CoderClicker

##Install Meteor

Install Meteor using the [Meteor Docs](http://docs.meteor.com/#quickstart), if you haven't already. 

##Deploy Locally

    git clone https://github.com/edjiang/CoderClicker.git
    cd CoderClicker
    meteor
    
Visit http://localhost:3000/ to play!

##Deploy Online

    meteor deploy [YOURPROJECTNAME].meteor.com
    
Replace [YOURPROJECTNAME] with something suitable. 
    
Visit http://[YOURPROJECTNAME].meteor.com/ to play, and share with all of your friends!

#Adding Items

Open up CoderClicker.js: 

After `{name: "Monkey", cost: 500}`, add: `, {name: "[ITEMNAME]", cost: [COST]}`. There is no current way to change the DPS of an item. If you want, you should figure out how to do it! =]
