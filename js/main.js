$(document).ready(function() {
    // Animate intro text
    function animateText(letter,index) {
        const numLetters = $('#profile__intro span').length;
        if (index < numLetters) {
            setTimeout(function() {
                letter.css('visibility','visible');
                index++;
                animateText($('#profile__intro span').eq(index),index);
            },100);                    
        } else { // end of animation, show links
            delayFade($('#profile__intro div .link'), 
                'block', 0, 1000);                 
        }                
    }

    // Fade in elements, delaying each subsequent element by timeout
    function delayFade(elements, displayStyle, i, timeout) {
        setTimeout(function() {
            elements.eq(i).fadeTo(1000, 1);
            if (i < elements.length) {
                delayFade(elements, displayStyle, i+1, i + 2000);
            }
        }, timeout);
                
    }

    function toggleMenu(navbarList) { 
        const display = navbarList.css('display');      
        if (display !== 'flex') {
            navbarList.addClass('open').removeClass('collapsed');
        } else {
            navbarList.addClass('collapsed').removeClass('open');
        }  
        navbarList.fadeToggle('fast').css('display', 'flex');
    }
 
    function toggleMenuResponsive(navbarList) {
        const windowWidth = $(window).width();

        if (windowWidth > 600) {            
            navbarList.css('display','flex');
            navbarList.removeClass('open collapsed');
        } else {                            
            if (navbarList.hasClass('collapsed') 
                || !navbarList.hasClass('open')) {
                navbarList.css('display','none');
            } else if (navbarList.hasClass('open')) {
                navbarList.css('display','flex');
            }            
        }   
    }
    $('.nav__collapse-btn').click(() => toggleMenu($('.main-navigation ul')));
    $('.toggle-btn').click(() => {
        const caret = $(this).find('i');
        /* Toggle caret when .secondary-menu is toggled 
            (show down caret when menu is collapsed)
            (show up caret when menu is open)
        */
        caret.hasClass('fa-chevron-down') 
            ? caret.removeClass('fa-chevron-down').addClass('fa-chevron-up')
            : caret.removeClass('fa-chevron-up').addClass('fa-chevron-down');
        toggleMenu($('.secondary-menu ul'));
    });

    $(window).resize(() => {
        toggleMenuResponsive($('.nav__collapse-btn').siblings('ul'));
        toggleMenuResponsive($('.toggle-btn').siblings('ul'));
    });
    
    const page = $('body').prop('id');
    // Add functionality to appropriate page
    switch(page) {
        case 'home-page':
            /* Show section related to menu item clicked on
                Make clicked section list item active
            */
            $('#about-nav li').click(function() {
                const section = $(this).data('target');
                let displayStyle;
                if ($(this).data('display-style') === 'flex-row') 
                    displayStyle = {display: 'flex'};
                if ($(this).data('display-style') === 'flex-column') 
                    displayStyle = {display: 'flex', flexDirection: 'column'};
                $('#about-nav li').removeClass('active');
                $(this).addClass('active');
                $('#home-page section').fadeOut('ease');
                $(section).fadeIn('ease').css(displayStyle);
            });

            /* Show content related to timeline point 
                when timeline header is clicked on
            */
            $('.timeline__content__section .subheader').click(function() {
                $(this).parent().find('ul').fadeToggle();
            });

            animateText($('#profile__intro span').eq(0),0);
            break;
        case 'about-page':
            break;
        case 'work-page':
            // Filter projects shown based on skill selected
            $('#skills-nav li').click(function() {
                $(this).toggleClass('active');
                // If no skill has been selected, show all projects
                if ($('#skills-nav li.active').length === 0) {
                    $('.grid__item').fadeIn();
                    return;
                }
                // Get all filters that have been selected
                const filters = $('#skills-nav li.active')
                    .toArray().map(function(elem) {
                        return elem.getAttribute('data-filter'); 
                    });

                // Reset visible projects
                $('.grid__item').removeClass('matched'); 

                $('.grid__item').each(function() {
                    const skills = $(this).find(
                        '.projects__skills i').toArray();
                    // Check if project has any of the skills selected
                    const isMatch = skills.find((elem) => {
                        return filters.find(
                            (filter) => elem.classList[1].match(filter));
                    });
                    // If the project does have a matching skill, show it
                    if (isMatch) {
                        $(this).fadeIn().addClass('matched');
                    }
                });
                // Hide the projects that don't match any of the selected skills
                $('.grid__item').not('.matched').fadeOut();
            });
            break;
        case 'contact-page':
            $('#contact__form').submit((e) => {
                e.preventDefault();
                alert('Thank you for contacting me!');
            });
            break;
        case 'tv-show-explorer-case-study-page': 
            // Add zoom capability to images related to project 
            $('.case-study-img')
                .wrap('<span style="display: inline-block;"></span>')
                .css('display', 'block')
                .parent()
                .zoom({
                    url: $(this).attr('src'),
                    callback: function() {
                        $(this).css('cursor', 'zoom-in');
                    }
                }); 
            break;
    }
});
