$(document).ready(function() {
    function toggleMenu(navbarList) {
        const opacity = navbarList.css('opacity');  
        const display = navbarList.css('display');      
        if (display !== 'flex') {
            navbarList.addClass('open').removeClass('collapsed');
        } else {
            navbarList.addClass('collapsed').removeClass('open');
        }  
        // console.log(opacity == 1 ? 0 : 1)
        navbarList.fadeToggle('fast').css('display', 'flex');/*.toggleClass('absolute-position'); */     
    }
    
        
    function toggleMenuResponsive(navbarList) {
        let windowWidth = $(window).width();

        if (windowWidth > 600) {            
            navbarList.css('display','flex');
            navbarList.removeClass('open collapsed');
        } else {                            
            if (navbarList.hasClass('collapsed') || !navbarList.hasClass('open')) {
                navbarList.css('display','none');
            } else if (navbarList.hasClass('open')) {
                navbarList.css('display','flex');
            }            
        }   
    }
    $('.nav__collapse-btn').click(() => toggleMenu($('.main-navigation ul')));
    $('.toggle-btn').click(() => {
        // alert('working')
        const caret = $(this).find('i');
        console.log(caret);
        caret.hasClass('fa-chevron-down') 
            ? caret.removeClass('fa-chevron-down').addClass('fa-chevron-up')
            : caret.removeClass('fa-chevron-up').addClass('fa-chevron-down')
        toggleMenu($('.secondary-menu ul'));
    });
    $(window).resize(() => {
        toggleMenuResponsive($('.nav__collapse-btn').siblings('ul'));
        toggleMenuResponsive($('.toggle-btn').siblings('ul'));
    });
    let page = $('body').prop('id');
    switch(page) {
        case 'home-page':
            // Show section related to menu item clicked on
            $('#about-nav li').click(function() {
                const section = $(this).data('target');
                let displayStyle;
                if ($(this).data('display-style') === 'flex-row') displayStyle = {display: 'flex'};
                if ($(this).data('display-style') === 'flex-column') displayStyle = {display: 'flex', flexDirection: 'column'};
                $('#about-nav li').removeClass('active');
                $(this).addClass('active');
                $('#home-page section').fadeOut('ease');
                $(section).fadeIn('ease').css(displayStyle);
            });

            // Show content related to timeline point when timeline header is clicked on
            $('.timeline__content__section .subheader').click(function() {
                $(this).parent().find('ul').fadeToggle();
            });

            function showLetter(letter,index) {
                let numLetters = $('#profile__intro span').length;
                if (index < numLetters) {
                    setTimeout(function() {
                        letter.css('visibility','visible');
                        index++;
                        showLetter($('#profile__intro span').eq(index),index)
                    },100);                    
                } else { // end of animation, show code link
                    setTimeout(function() {
                        // $('#profile__intro div p:first-child').fadeTo(1000, 1, function() {
                            delayFade( $('#profile__intro div .link'), 'block', 0);
                        // });
                        
                        $('.speech-bubble').removeClass('animate');
                    },1000)                    
                }                
            }

            function delayFade(elements, displayStyle, i) {
                setTimeout(function() {
                    elements.eq(i).fadeTo(1000, 1);
                    if (i < elements.length) {
                        delayFade(elements, displayStyle, i+1);
                    }
                }, i+1000);
                
            }
            showLetter($('#profile__intro span').eq(0),0);
            $('.speech-bubble').addClass('animate');
        break;
        case 'about-page':
            $('#skills__form').submit(function(e) {
                e.preventDefault();            
                let filtersArr = [];
                let skillsTypeArr = [];
                let develomentTypeArr = [];
                $(this).find('[type="checkbox"]:checked').each(function() {
                    let val = $(this).val();
                    filtersArr.push(val);
                    if (val === 'frontend' || val === 'backend' || val === 'fullstack') {
                        develomentTypeArr.push(val);
                    } else {
                        skillsTypeArr.push(val);
                    }
                });
                $('#skills__table tbody tr').removeClass('filtered');
                filtersArr.map((filter) => {
                    if (skillsTypeArr.length === 0) {
                        if (develomentTypeArr.includes('frontend')) {
                            $('[data-development-type="frontend"],[data-development-type="frontend"]').addClass('filtered');
                        }
                        if (develomentTypeArr.includes('backend')) {
                            $('[data-development-type="backend"],[data-development-type="backend"]').addClass('filtered');
                        }  
                        if (develomentTypeArr.includes('fullstack')) {
                            $('[data-development-type="fullstack"],[data-development-type="fullstack"]').addClass('filtered');
                        } 
                    } else if (develomentTypeArr.includes('frontend') || develomentTypeArr.includes('backend') || develomentTypeArr.includes('fullstack')) {
                        if (develomentTypeArr.includes('frontend')) {
                            $('[data-skill-type="'+filter+'"][data-development-type="frontend"],[data-skill-type="'+filter+'"][data-development-type="frontend"]').addClass('filtered');
                        }
                        if (develomentTypeArr.includes('backend')) {
                            $('[data-skill-type="'+filter+'"][data-development-type="backend"],[data-skill-type="'+filter+'"][data-development-type="backend"]').addClass('filtered');
                        }  
                        if (develomentTypeArr.includes('fullstack')) {
                            $('[data-skill-type="'+filter+'"][data-development-type="fullstack"],[data-skill-type="'+filter+'"][data-development-type="fullstack"]').addClass('filtered');
                        }                  
                    } 
                    else {
                        $('[data-skill-type="'+filter+'"]').addClass('filtered');
                    }
                })
            });
            $('#clear-filters').click(() => {
                $('#skills__form [type="checkbox"]').prop('checked',false);
                $('#skills__table tbody tr').removeClass('filtered');
            });
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
                const filters = $('#skills-nav li.active').toArray().map(function(elem) {
                    return elem.getAttribute('data-filter'); 
                });

                $('.grid__item').removeClass('matched'); // reset visible projects
                $('.grid__item').each(function() {
                    const skills = $(this).find('.projects__skills i').toArray();
                    // Check if project has any of the skills selected
                    const isMatch = skills.find((elem) => {
                        return filters.find((filter) => elem.classList[1].match(filter));
                    });
                    // If the project does have a matching skill, show it
                    if (isMatch) {
                        $(this).fadeIn().addClass('matched');
                    }
                });
                // Hide the projects that don't match any of the selected skills
                $('.grid__item').not('.matched').fadeOut();
            })
        break;
        case 'contact-page':
            $('#contact__form').submit((e) => {
                e.preventDefault();
                alert('Thank you for contacting me!');
            })
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
                   $(this).css('cursor', 'zoom-in')
               }
           }); 
        break;
    }
})
