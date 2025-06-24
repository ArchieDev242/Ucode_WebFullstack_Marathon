document.addEventListener('DOMContentLoaded', function() 
{
    const slides = document.querySelectorAll('.slide');
    const arrow_left = document.querySelector('.arrow_left');
    const arrow_right = document.querySelector('.arrow_right');
    const container = document.querySelector('.container');

    let idx = 0;
    let slides_interval;

    function updateArrowsPosition() 
    {
        const is_slide_active = document.querySelector('.slide.active');

        if(!is_slide_active) return;

        const slide_rect = is_slide_active.getBoundingClientRect();
        const container_rect = container.getBoundingClientRect();
        
        arrow_left.style.left = `${slide_rect.left - container_rect.left}px`;
        arrow_right.style.right = `${container_rect.right - slide_rect.right}px`;
    }

    function show_slide(index) 
    {
        idx = (index + slides.length) % slides.length;
        slides.forEach(slide => slide.classList.remove('active'));
        slides[idx].classList.add('active');
        
        requestAnimationFrame(updateArrowsPosition);
    }

    function next_slide() 
    {
        show_slide(idx + 1);
    }

    function prev_slide() 
    {
        show_slide(idx - 1);
    }

    function auto_slide() 
    {
        slides_interval = setInterval(next_slide, 3000);
    }

    function reset_auto_slide() 
    {
        clearInterval(slides_interval);
        auto_slide();
    }

    arrow_left.addEventListener('click', () => {
        prev_slide();
        reset_auto_slide();
    });

    arrow_right.addEventListener('click', () => {
        next_slide();
        reset_auto_slide();
    });

    window.addEventListener('resize', updateArrowsPosition);

    auto_slide();
    show_slide(0);
});