$(function() {
    // Filter projects shown based on skill selected
    $('#skills-filter li').click(function() {
        $(this).toggleClass('active');
        // If no skill has been selected, show all projects
        if ($('#skills-filter li.active').length === 0) {
            $('.portfolio-box-container').fadeIn();
            return;
        }
        // Get all filters that have been selected
        const filters = $('#skills-filter li.active')
            .toArray().map(function(elem) {
                return elem.getAttribute('data-filter'); 
            });

        // Reset visible projects
        $('.portfolio-box-container').removeClass('matched'); 

        $('.portfolio-box-container').each(function() {
            const skills = $(this).find(
                '.projects__skills i').toArray();
                console.log(skills)
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
        $('.portfolio-box-container:not(.matched)').fadeOut();
    });

    // Add project's content to modal
    $('#project-modal').on('show.bs.modal', function (event) {
        const relatedTarget = $(event.relatedTarget),
            codeLink = relatedTarget.parents('.portfolio-box').find('.code-link').attr('href'),
            projectLink = relatedTarget.parents('.portfolio-box').find('.project-link').attr('href'),
            carouselItems = relatedTarget.parents('.portfolio-box').find('.carousel-items');
        $(this).find('.modal-title').html(relatedTarget.text());
        
        // Reset modal before adding new content 
        $(this).find('.modal-body .content').html('');
        $('.modal-body .carousel-inner').html('');
        // Add content and carousel items (if there are any)
        $(this).find('.modal-body .content').html(relatedTarget.parents('.portfolio-box').find('.portfolio-modal-content').html());
        if (carouselItems.length > 0) {
            $('.modal-body .carousel-inner').html(carouselItems.html());
        }
        // If there is no code link, hide the code link button
        codeLink 
            ? $(this).find('.modal-footer .code-link').attr('href', codeLink).show()
            : $(this).find('.modal-footer .code-link').hide();
        // If there is no project link, hide project link button
        projectLink 
            ? $(this).find('.modal-footer .project-link').attr('href', projectLink).show()
            : $(this).find('.modal-footer .project-link').hide();
    });

    // Animate on Scroll
    AOS.init({
        duration: 1000,
        disable: 'mobile'
    });
});
