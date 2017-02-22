
    // Curtain for home page

    function runCurtain() { 

        ! function() {

            if (window.innerWidth >= 767) {  

                function t(t) {
                    var a = this,
                        e = t,
                        n = $("body"),
                        o = $(".curtain-wrapper");
                    a.height = 0, a.buffer = 150, a.init = function() {
                        window.scrollTo(0, 1), a.setup(), $(".curtain-arrow").on("click", a.unfurl)
                    }, a.setup = function() {
                        a.updateHeight(), n.css({
                            "min-height": 2 * a.height + buffer
                        }), e.addClass("on"), a.setCurtainFocus(!0), a.bind()
                    }, a.reset = function() {
                        n.removeAttr("style"), o.removeClass("on").removeAttr("style"), a.unbind()
                    }, a.bind = function() {
                        $(window).on("scroll", a.handleScroll)
                    }, a.unbind = function() {
                        $(window).off("scroll")
                    }, a.handleScroll = function(t) {
                        var e = document.documentElement.scrollTop || $(document).scrollTop();
                        e >= a.getTotalHeight() ? (a.setCurtainFocus(!0), n.css({
                            "min-height": o.height() + "px"
                        })) : a.setCurtainFocus(!1)
                    }, a.setCurtainFocus = function(t) {
                        a.updateHeight(), t ? (o.attr("style", "margin-top: " + a.getTotalHeight() + "px"), o.removeClass("on")) : (o.attr("style", "margin-bottom: " + a.getTotalHeight() + "px"), o.addClass("on"))
                    }, a.updateHeight = function() {
                        return a.height = t.height(), a.height
                    }, a.getTotalHeight = function() {
                        return a.height + a.buffer
                    }, a.unfurl = function() {
                        // var t = a.height + a.buffer;
                        var t = $('.curtain').height() + a.buffer;
                        a.unbind(), $("html, body").animate({
                            scrollTop: t
                        }, {
                            duration: 400,
                            complete: function() {
                                a.bind()
                            }
                        })
                    }, a.init()

                    // If home page is visited once, on next session visit to home, start with curtain up
                    
                    var counter = sessionStorage.getItem('on_load_counter'); 
                    if (counter === null) {
                        counter = 0;
                    }
                    counter++;
                    sessionStorage.setItem("on_load_counter", counter);
                     
                    if (counter > 1) {
                        //sessionStorage.clear();
                        a.unfurl = function() {
                            // var t = a.height + a.buffer;
                            var t = $('.curtain').height() + a.buffer;
                            a.unbind(), $("html, body").animate({
                                scrollTop: t
                            }, {
                                duration: 0,
                                complete: function() {
                                    a.bind()
                                }
                            })
                        }
                        a.unfurl();
                    } // end if 

                }
                $(function() {
                    var a = $(".curtain");
                    a.length && t(a)
                });

            } else {
                $('.curtain').css('display', 'none');
            }

        }();


        // If window is less than 767px, inject the curtain HTML into an empty div just above the video bg div.

        ! function() {
 
            if (window.innerWidth < 767) {  
               
                var curtainStatic = '<a href="#home-page-top" class="curtain-arrow"><img class="curtain-down-arrow" src="img/arrow-down-dark.svg" alt="down arrow"></a>';

                var curtainStaticContainer = document.getElementById('curtain-static-container');

                $('#curtain-static-container').html(curtainStatic);

                if(window.innerWidth >= 321) {
                    $('#curtain-static-container').css({
                        'background-image':"url('img/factsbook.jpg')",
                        'background-position': 'center center',
                        'background-size': 'cover',
                        'color': '#fff',
                        'font-size': '50px',
                        'font-family': '"montserratbold","sans-serif"',
                        'padding': '50px 0',
                        'height': '100%',
                        'min-height': '100%',
                        'height': '100vh',    
                        'position': 'relative',
                        'width': '100%',
                        'display': 'table',
                        'vertical-align': 'middle'
                    });
                }

                if(window.innerWidth <= 320) {
                    $('#curtain-static-container').css({
                        "background-image":"url('img/factsbook.jpg')",
                        'background-position': 'center center',  
                        'background-size': 'cover',                                              
                        'color': '#fff',
                        'font-size': '40px',
                        'font-family': '"montserratbold","sans-serif"',
                        'padding': '20px 0',
                        'min-height': '100%',
                        'height': '500px',    
                        'position': 'relative',
                        'width': '100%',
                        'display': 'table',
                        'vertical-align': 'middle'
                    });                    
                }

                // If home page is visited once, on next session visit to home, start with curtain up

                var counterMobile = sessionStorage.getItem('on_load_counter'); 
                if (counterMobile === null) {
                    counterMobile = 0;
                }
                counterMobile++;
                sessionStorage.setItem("on_load_counter", counterMobile);
                if (counterMobile > 1) {
                    //sessionStorage.clear();
                    window.onload= location.href="#home-page-top";
                } // end if

            } //End 767 if statement

        }(this, jQuery);

    } //end runCurtain

    runCurtain();


   //If window is resized, add enough min-height for curtain to open and allow the rest of the home page

    if (window.innerWidth >= 767) { 
        $(window).one('resize', function(){
            
            //Add conditional to only run this on home page.

            var minHeight = parseInt($('body').css('min-height'));
            var newHeight = minHeight + 1000;
            var newMinHeight = "min-height:" + newHeight + "px";
            $('body').attr("style", newMinHeight);

        });

    }
