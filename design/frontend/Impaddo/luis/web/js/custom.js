require([
        "jquery"
    ],
    function($) {
        "use strict";

        /*
         * Move breadcrumbs on CMS pages
        */
        if (($('body').hasClass('cms-page-view')) && ($(".homepage-large-image.full-width").length)) {
            $(".breadcrumbs").insertAfter($(".homepage-large-image.full-width"));
        }

        /*
         * CMS Branches page - add active class to branches widget links // move breadcrumbs
        */
        if ($('body').hasClass('cms-branches')) {
            $('.branche-single').removeClass('active');
            var current = location.pathname;
            $('.branche-single').each(function () {
                var $this = $(this);

                if($this.attr('href').indexOf(current) !== -1){
                    $this.addClass('active');
                }
            });

            if ($(".branch-image.full-width").length) {
                $(".breadcrumbs").insertAfter($(".branch-image.full-width"));
            }
        }

        /*
         * Replace SVG images with inline SVG
         */
        $('img.svg').each(function(){
            var $img = $(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            $.get(imgURL, function(data) {
                // Get the SVG tag, ignore the rest
                var $svg = $(data).find('svg');

                // Add replaced image's ID to the new SVG
                if(typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if(typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass+' replaced-svg');
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
                if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                    $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
                }

                // Replace image with new SVG
                $img.replaceWith($svg);

            }, 'xml');

        });

        // About us map markers

        if ($('body').hasClass('cms-uber-luis')) {
            // display first map info/
            $('.map-info').first().css('display', 'block');
            // change map info on click/mouseover
            $('.marker').on('mouseover', function () {
                $('.map-info').hide();
                $('.marker-info-'+$(this).attr('alt')).fadeIn(500).show();
            });
        }

        // Filter options
        $(document).on('click', '.filter-options-title', function(){
            $(this).next(".filter-options-content").toggle(500);
            $(this).toggleClass('active-filter');
        });
    });

