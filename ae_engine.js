jQuery(document).ready(function($){
    $.ajax({
        type: 'GET',
        url: '/aedrupal/get_dashboard',
        complete: function(result) { 
            console.log(result);

            if (result.status != 404) {
                var data = JSON.parse(result.response);
                $('#ae-title').html(data.points + ' Bonus Points');
                $('#ae-content').html(data.dashboard);
                $('#message-api-content').html(data.message);
                var message = data.message;
                
                if(message != false) {
                    Modalbox.show(message, {title:'New Message'});
                }
            }
        }
    });

    $.ajax({
        type: 'POST',
        url: '/aedrupal/register_url',
        data: {
            current_page: window.location.href
        }
    });

    var ddOpenTimeout;
    var dMenuPosTimeout;


    $(".dropdown").hover(function() {
        var DELAY = 300;
        var ddToggle = $(this).children('.dropdown-toggle');
        var ddMenu = $(this).children('.dropdown-menu');
        var ddWrapper = ddMenu.parent();            
        
        ddMenu.css("left", "");
        ddMenu.css("right", "");

        if ($(this).hasClass('clickable-dropdown'))
        {
            if ($(this).hasClass('open'))
            {
                $(this).children('.dropdown-menu').stop(true, true).delay(DELAY).fadeIn(300);
            }
        }
        else
        {
            clearTimeout(ddOpenTimeout);
            ddOpenTimeout = setTimeout(function() {        
                ddWrapper.addClass('open');
            }, DELAY);
            
            $(this).children('.dropdown-menu').stop(true, true).delay(DELAY).fadeIn(300);
        }

        clearTimeout(dMenuPosTimeout);

        dMenuPosTimeout = setTimeout(function() {

            if (ddMenu.offset().left < 0)
            {
                var space = ddWrapper.offset().left;                    
                ddMenu.css("left", (-1)*space);
                ddMenu.css("right", "auto");
            }

        }, DELAY);

    }, function() {
            var ddMenu = $(this).children('.dropdown-menu');
            clearTimeout(ddOpenTimeout);            ddMenu.stop(true, true).delay(150).fadeOut(300);
            if (ddMenu.is(":hidden"))
            {
                ddMenu.hide();
            }
            $(this).removeClass('open');
    });
});

