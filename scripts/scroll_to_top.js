// Main JavaScript File
document.addEventListener('DOMContentLoaded', function () {

    // Create scroll-to-top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.id = 'scrollToTopBtn';
    scrollToTopBtn.title = 'Scroll to top';
    scrollToTopBtn.ariaLabel = 'Scroll to top';

    // Style the button
    scrollToTopBtn.style.position = 'fixed';
    scrollToTopBtn.style.bottom = '20px';
    scrollToTopBtn.style.right = '20px';
    scrollToTopBtn.style.width = '50px';
    scrollToTopBtn.style.height = '50px';
    scrollToTopBtn.style.borderRadius = '50%';
    scrollToTopBtn.style.backgroundColor = '#333';
    scrollToTopBtn.style.color = 'white';
    scrollToTopBtn.style.border = 'none';
    scrollToTopBtn.style.cursor = 'pointer';
    scrollToTopBtn.style.display = 'none';
    scrollToTopBtn.style.zIndex = '99';
    scrollToTopBtn.style.fontSize = '20px';
    scrollToTopBtn.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    scrollToTopBtn.style.transition = 'opacity 0.3s, visibility 0.3s';
    scrollToTopBtn.style.opacity = '0';
    scrollToTopBtn.style.visibility = 'hidden';

    // Add button to the page
    document.body.appendChild(scrollToTopBtn);

    // Track scroll position with requestAnimationFrame for better performance
    let isScrolling;
    window.addEventListener('scroll', function () {
        // Clear any pending timeout to prevent multiple executions
        window.clearTimeout(isScrolling);

        // Set a timeout to run after scrolling stops
        isScrolling = setTimeout(function () {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.style.display = 'block';
                scrollToTopBtn.style.visibility = 'visible';
                scrollToTopBtn.style.opacity = '1';
            } else {
                scrollToTopBtn.style.opacity = '0';
                // Wait for the opacity transition to complete before hiding
                setTimeout(() => {
                    scrollToTopBtn.style.visibility = 'hidden';
                    scrollToTopBtn.style.display = 'none';
                }, 300);
            }
        }, 100); // Adjust this value (in ms) to control the delay after scrolling stops
    });

    // Smooth scroll to top when clicked
    scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Make button slightly larger on mobile for better touch targets
    if ('ontouchstart' in window) {
        scrollToTopBtn.style.width = '60px';
        scrollToTopBtn.style.height = '60px';
        scrollToTopBtn.style.bottom = '25px';
        scrollToTopBtn.style.right = '25px';
    }
});