$(document).ready(function() {
    $('.nav__collapse-btn').click(function() {
        $(this).siblings('ul').fadeToggle();        
    })

    // Home Page
    if ($('body').prop('id') === 'home-page') {
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
    }
})
