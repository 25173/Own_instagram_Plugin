
$(document).ready(function() {

    let btnInstafeedLoad = document.getElementById("btn-instafeed-load");

    let instafeed = new Instafeed({
        /*
        get - Customize what Instafeed fetches. Available options are:
            popular (default) - Images from the popular page.
            tagged - Images with a specific tag. Use tagName to specify the tag.
            location - Images from a location. Use locationId to specify the location.
            user - Images with a user. Use userId to specify the user. More info here.
            */
        get: 'user',
        userId: useridhaarpiraat, // de userid of the account
        target: "instafeed", // where the data will be sent
        limit: 6,  // the number of pictures that we get
        /*
        the size of the picture
         thumbnail (default) - 150x150
         low_resolution - 306x306
         standard_resolution - 612x612
        */
        resolution: 'thumbnail',
        width: '50%' ,
        accessToken: accesstokenHaarpiraat, // the code that you need to get access of your account
        /*
        sorting the post
        none (default) - As they come from Instagram.
        most-recent - Newest to oldest.
        least-recent - Oldest to newest.
        most-liked - Highest # of likes to lowest.
        least-liked - Lowest # likes to highest.
        most-commented - Highest # of comments to lowest.
        least-commented - Lowest # of comments to highest.
        random - Random order.
        */
        sortBy: 'most-recent',

        // for displaying the full username
        filter: function(image) {
            if (image.user && image.user.full_name && image.user.full_name.length > 0) {
                image.full_name_with_fallback = image.user.full_name;
            } else {
                image.full_name_with_fallback = image.user.username;
            }
            return true;
        },

        /*
        * {{location}} for displaying locations
        * {{model.full_name_with_fallback}}  displaying your full name of your account
        * {{caption}} give you the texts of the picture
        * {{image}} give you the url of the picture
        * {{link}} give you the url that  direct to your Instagtam account
        * {{likes}} give the numbers of likes
        * {{comments}} give the number of comments
        * {{model.tags}} give that tags that you added
        * */
    template:'<div class="insta__view">' +
    '<div class="insta__view--image">' +
    '<a href="{{link}}" title="{{caption}}" target="_blank">' +
    '<img src="{{image}}" width="60%" alt="{{caption}}" class="img-fluid"/>' +
    '</a> ' +
    '</div>' +
    '<div class="insta__caption">' +
    '<br> <strong><span class="likes"><i class="icon ion-md-heart"></i> {{likes}}</span> <span class="comments"><ion-icon name="chatbubbles"></ion-icon> {{comments}}</span></strong>' +
    '<p class="insta__caption--text">{{caption}} </p>' +
    ' </div>' +
    '</div>' +
    '</div>',
        // every time we load more, run this function
        after: function() {
        // disable button if no more results to load
        if (!this.hasNext()) {
            btnInstafeedLoad.setAttribute('disabled', 'disabled');
            btnInstafeedLoad.style.display = "none";
        }
    },
});



    // de load more button die meer foto's laten zien
    btnInstafeedLoad.addEventListener("click", function() {
        instafeed.next()
    });

    //laat de gebruiksnaam zien.
    let instafeedProfile = new Instafeed({

        get: 'user',
        userId: useridhaarpiraat, // de userid of the account
        target: "instaProfile", // where the data will be sent
        resolution: 'low_resolution',   // the size of the picture
        accessToken: accesstokenHaarpiraat, // the code that you need to get access of your account
        limit:1,
        template:'<div class="insta_profile">' +
        '<h2>' +
        '<a href="http://instagram.com/{{model.user.username}}" target="_blank">' +
        '<img class="profile_picture" src="{{model.user.profile_picture}}" alt="{{caption}}"> {{model.user.username}} ' +
        '</a>' +
        '</h2>'+
        '</div>',
    });



    instafeedProfile.run();
    instafeed.run();

});

