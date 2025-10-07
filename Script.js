document.addEventListener("DOMContentLoaded", function () {

    // 1. Scroll suave para links del menú
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Activar link del menú según sección visible
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // 3. Carruseles múltiples
    const multiCarousels = document.querySelectorAll('.carousel-multi');

    multiCarousels.forEach(carousel => {
        const items = carousel.querySelectorAll('.carousel-item');
        let currentIndex = 0;
        const totalItems = items.length;

        function updateCarousel(index) {
            items.forEach((item, i) => {
                item.classList.remove('active', 'next', 'prev');
                item.style.display = 'none'; // ocultar todos inicialmente

                if (i === index) item.classList.add('active');
 
                if (item.classList.contains('active') || item.classList.contains('next') || item.classList.contains('prev')) {
                    item.style.display = 'block';
                }
            });
        }

        updateCarousel(currentIndex);

        // Botones prev/next
        const prevBtn = carousel.querySelector('.carousel-control-prev');
        const nextBtn = carousel.querySelector('.carousel-control-next');

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateCarousel(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel(currentIndex);
        });
    });

});
