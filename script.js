document.addEventListener('DOMContentLoaded', function () {
    const eyeContainer = document.querySelector('.eye-container');
    const pupil = document.querySelector('.pupil');
    const secretLink = document.querySelector('.secret-link');
    const defaultPupilImage = 'website_assets/sphere.jpg'; // Path to the default pupil image
    const hoverPupilImage = 'website_assets/cross-mark_274c.png'; // Path to the hover pupil image

    // Retrieve the saved position from localStorage
    const savedPosition = localStorage.getItem('pupilPosition');
    if (savedPosition) {
        const position = JSON.parse(savedPosition);
        pupil.style.transform = `translate(${position.x}px, ${position.y}px)`;
    }

    document.addEventListener('mousemove', function (e) {
        const eyeRect = eyeContainer.getBoundingClientRect();
        const centerX = eyeRect.left + eyeRect.width / 2;
        const centerY = eyeRect.top + eyeRect.height / 2;
        const radius = eyeRect.width / 2;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const angle = Math.atan2(dy, dx);

        const pupilX = centerX + radius * Math.cos(angle) - eyeRect.left - pupil.offsetWidth / 2;
        const pupilY = centerY + radius * Math.sin(angle) - eyeRect.top - pupil.offsetHeight / 2;

        pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;

        // Save the current position to localStorage
        localStorage.setItem('pupilPosition', JSON.stringify({ x: pupilX, y: pupilY }));
    });

    // Change pupil image on hover
    secretLink.addEventListener('mouseover', function () {
        pupil.style.backgroundImage = `url(${hoverPupilImage})`;
    });

    secretLink.addEventListener('mouseout', function () {
        pupil.style.backgroundImage = `url(${defaultPupilImage})`;
    });
});
