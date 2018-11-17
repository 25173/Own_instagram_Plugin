let userid = '8605744481';
let accessToken = '8605744481.1677ed0.08432c4faa91471f847147714739d838';

$(document).ready(function() {

    let btnInstafeedLoad = document.getElementById("btn-instafeed-load");
    let timothyf10 = new Instafeed({
        /*
        get - Customize what Instafeed fetches. Available options are:
            popular (default) - Images from the popular page.
            tagged - Images with a specific tag. Use tagName to specify the tag.
            location - Images from a location. Use locationId to specify the location.
            user - Images with a user. Use userId to specify the user. More info here.
            */
        get: 'user',
        userId: userid, // de userid of the account
        target: "instafeed", // where the data will be sent
        limit: 1,  // the number of pictures that we get
        resolution: 'low_resolution',   // the size of the picture
        accessToken: accessToken, // the code that you need to get access of your account
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
        sortBy: 'most-liked',

     // for displaying the full username
        filter: function(image) {
            if (image.user && image.user.full_name && image.user.full_name.length > 0) {
                image.full_name_with_fallback = image.user.full_name;
            } else {
                image.full_name_with_fallback = image.user.username;
            }
            return true;
        },

        template:'<div class="insta__view">' +
                    '<h2><img class="profile picture" src="{{model.user.profile_picture}}" alt="{{caption}}"> {{model.user.username}} </h2>'+
                    '<a href="{{link}}" title="{{caption}}" target="_blank">' +
                        '<img src="{{image}}" alt="{{caption}}" class="img-fluid"/>' +
                    '</a> <br> <strong><span class="likes"><i class="icon ion-md-heart"></i> {{likes}}</span> <span class="comments"><ion-icon name="chatbubbles"></ion-icon> {{comments}}</span></strong>' +
                    '<p>{{caption}}</p> <a href="http://instagram.com/{{model.user.username}}">{{model.full_name_with_fallback}}</a>' +

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

    // bind the load more button
    btnInstafeedLoad.addEventListener("click", function() {
        timothyf10.next()
    });
    timothyf10.run();

});