$(document).ready(function() {
    $('.nav__collapse-btn').click(function() {
        $(this).siblings('ul').fadeToggle();        
    })
    $(window).resize(function() {
        let windowWidth = $(window).width();
        if (windowWidth > 600) {
            $('.nav__collapse-btn').siblings('ul').css('display','flex');
        } else {
            $('.nav__collapse-btn').siblings('ul').css('display','block');
        }
    });
    let page = $('body').prop('id');
    switch(page) {
        case 'home-page':
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
                        $('#profile__intro a').slideDown();
                        $('.speech-bubble').removeClass('animate');
                    },1000)                    
                }                
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
            $('.grid__item').hover(function() {
                $(this).find('.projects__links, .projects__img').fadeIn(300);
            }, function() {
                $(this).find('.projects__links, .projects__img').fadeOut(300);
            })
        break;
        case 'contact-page':
            $('#contact__form').submit((e) => {
                e.preventDefault();
                alert('Thank you for contacting me!');
            })
        break;
    }
})
