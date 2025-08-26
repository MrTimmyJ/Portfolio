// Main JavaScript File
document.addEventListener('DOMContentLoaded', function () {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Initialize skills grid
    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) {
        const skills = [
            { name: 'Frontend', icon: 'fas fa-code', description: 'HTML, CSS, JavaScript, React, Bootstrap' },
            { name: 'Backend', icon: 'fas fa-server', description: 'Node.js, Python, Java, C, C#' },
            { name: 'Databases', icon: 'fas fa-database', description: 'SQL, SQlite, MongoDB, PostgreSQL' },
            { name: 'Mobile', icon: 'fas fa-mobile-alt', description: 'Android, React Native' },
            { name: 'UI/UX', icon: 'fas fa-paint-brush', description: 'Figma, Adobe XD, User Research' },
            // { name: 'Games', icon: 'fas fa-cloud', description: 'Docker, AWS, CI/CD' }
            { name: 'Games', icon: 'fas fa-cog', description: 'Unity, Godot, MonoGame, Pygame' }
        ];

        skills.forEach(skill => {
            const skillCard = document.createElement('div');
            skillCard.className = 'skill-card fade-in';
            skillCard.innerHTML = `
                <div class="skill-icon"><i class="${skill.icon}"></i></div>
                <h3 class="skill-name">${skill.name}</h3>
                <p class="skill-description">${skill.description}</p>
            `;
            skillsGrid.appendChild(skillCard);
        });
    }

    // Initialize Text Based RPG skills grid
    // const tbrpgSkillsGrid = document.querySelector('.tbrpg-skills-grid');
    // if (tbrpgSkillsGrid) {
    //     const skills = [
    //         { name: 'Frontend', icon: 'fas fa-code', description: 'HTML, CSS, JavaScript, React, Bootstrap' },
    //         { name: 'Backend', icon: 'fas fa-server', description: 'Java 15' },
    //         { name: 'UI/UX', icon: 'fas fa-paint-brush', description: 'Command Line Interface, User Research' },
    //         // { name: 'Games', icon: 'fas fa-cloud', description: 'Docker, AWS, CI/CD' }
    //     ];

    //     skills.forEach(skill => {
    //         const skillCard = document.createElement('div');
    //         skillCard.className = 'skill-card fade-in';
    //         skillCard.innerHTML = `
    //                 <div class="skill-icon"><i class="${skill.icon}"></i></div>
    //                 <h3 class="skill-name">${skill.name}</h3>
    //                 <p class="skill-description">${skill.description}</p>
    //             `;
    //             tbrpgSkillsGrid.appendChild(skillCard);
    //     });
    // }

    // Initialize projects carousel
    const projectsCarousel = document.querySelector(".projects-carousel");
    if (projectsCarousel) {
        const projects = [
            {
                title: "Rust City Builder",
                image: "media/citybuilderbanner.png",
                category: "Project",
                description: "A city-building game built with Rust and WebAssembly",
                link: "projects/rust_city_builder_project.html"
            },
            {
                title: "WASM Game of Life",
                image: "media/gameoflifebanner.png",
                category: "Web Development",
                description: "Conway's Game of Life implemented with WebAssembly",
                link: "projects/wasm_gameoflife_project.html"
            },
            {
                title: "Dracula AI Model",
                image: "media/draculabanner.png",
                category: "Machine Learning",
                description: "AI model trained to generate text in the style of Dracula",
                link: "projects/ai_dracula_project.html"
            },
            {
                title: "Pet Salon Appointment Scheduler App",
                image: "media/SAbanner.png",
                category: "Desktop Application",
                description: "JavaFX application for pet salon management",
                link: "projects/petsalon_database_app.html"
            }
        ];

        projects.forEach(project => {
            const projectCard = document.createElement("div");
            projectCard.className = "project-card fade-in";
            projectCard.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-info">
                    <span class="project-category">${project.category}</span>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-links">
                        <a href="${project.link}" class="btn btn-outline">View Project</a>
                    </div>
                </div>
            `;
            projectsCarousel.appendChild(projectCard);
        });
    }

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // Intersection Observer for animations
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
        observer.observe(element);
    });
});

// Carousel functionality
function initCarousel(carouselContainer) {
    const carousel = carouselContainer;
    const cards = carousel.querySelectorAll('.project-card');
    const cardWidth = cards[0].offsetWidth + 20; // Including margin

    let currentIndex = 0;
    const totalCards = cards.length;

    function updateCarousel() {
        const offset = -currentIndex * cardWidth;
        carousel.style.transform = `translateX(${offset}px)`;
    }

    // Auto-advance carousel
    let interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    }, 5000);

    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });

    carousel.addEventListener('mouseleave', () => {
        interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalCards;
            updateCarousel();
        }, 5000);
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        if (touchEndX < touchStartX) {
            // Swipe left - next
            currentIndex = (currentIndex + 1) % totalCards;
        } else if (touchEndX > touchStartX) {
            // Swipe right - previous
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        }
        updateCarousel();
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Home Page Carousel Function
function createHomePageCarousel(containerSelector, items, cardTemplate, autoScrollInterval = 2000) {
    const carouselContainer = document.querySelector(`${containerSelector} .carousel`);
    const carouselTrack = document.querySelector(`${containerSelector} .carousel-track`);
    const leftArrow = document.querySelector(`${containerSelector} .left-arrow`);
    const rightArrow = document.querySelector(`${containerSelector} .right-arrow`);

    const transitionDuration = 2000; // in ms
    const transitionStyle = `transform ${transitionDuration / 1000}s ease`;

    // Check if Carousel Elements Exist
    if (!carouselContainer || !carouselTrack) return;

    // Populate Carousel with Cards
    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "carousel-card";
        card.innerHTML = cardTemplate(item);
        carouselTrack.appendChild(card);
    });

    let cards = document.querySelectorAll(`${containerSelector} .carousel-card`);
    let cardWidth = cards[0].offsetWidth + parseFloat(getComputedStyle(carouselTrack).gap);

    let isTransitioning = false;

    // Recalculate card width on window resize
    window.addEventListener("resize", () => {
        cards = document.querySelectorAll(`${containerSelector} .carousel-card`);
        const gap = parseFloat(getComputedStyle(carouselTrack).gap);
        cardWidth = cards[0].offsetWidth + gap;
    });

    // Move Carousel Left (Infinite Loop Effect)
    function moveLeft() {
        if (isTransitioning) return;
        isTransitioning = true;

        carouselTrack.style.transition = transitionStyle;
        carouselTrack.style.transform = `translateX(${cardWidth}px)`;

        setTimeout(() => {
            carouselTrack.style.transition = "none";
            const lastCard = carouselTrack.lastElementChild;
            carouselTrack.prepend(lastCard);
            carouselTrack.style.transform = "translateX(0)";

            // Force reflow to reset transform before reapplying transition
            void carouselTrack.offsetWidth;

            carouselTrack.style.transition = transitionStyle;

            isTransitioning = false;
        }, transitionDuration); // Match transition duration
    }

    // Move Carousel Right (Infinite Loop Effect)
    function moveRight() {
        if (isTransitioning) return;
        isTransitioning = true;

        carouselTrack.style.transition = transitionStyle;
        carouselTrack.style.transform = `translateX(-${cardWidth}px)`;

        setTimeout(() => {
            carouselTrack.style.transition = "none";
            const firstCard = carouselTrack.firstElementChild;
            carouselTrack.appendChild(firstCard);
            carouselTrack.style.transform = "translateX(0)";

            // Force reflow before applying the transition back
            void carouselTrack.offsetWidth;

            carouselTrack.style.transition = transitionStyle;
            isTransitioning = false;
        }, transitionDuration); // Match transition duration
    }

    // Button Event Listeners for Arrows
    if (leftArrow && rightArrow) {
        leftArrow.addEventListener("click", moveLeft);
        rightArrow.addEventListener("click", moveRight);
    }

    // Auto-Scroll Every X Seconds
    let autoScroll = setInterval(moveRight, autoScrollInterval);

    // Pause Auto-Scroll on Hover
    carouselTrack.addEventListener("mouseenter", () => clearInterval(autoScroll));
    carouselTrack.addEventListener("mouseleave", () => {
        autoScroll = setInterval(moveRight, autoScrollInterval);
    });
}

// Languages Carousel Function
function createLanguagesCarousel(containerSelector, items, cardTemplate, autoScrollInterval = 2000) {
    const carouselContainer = document.querySelector(`${containerSelector} .carousel`);
    const carouselTrack = document.querySelector(`${containerSelector} .carousel-track`);

    // Check if Carousel Elements Exist
    if (!carouselContainer || !carouselTrack) return;

    // Populate Carousel with Cards
    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "language-card";
        card.innerHTML = cardTemplate(item);
        carouselTrack.appendChild(card);
    });

    let cards = document.querySelectorAll(`${containerSelector} .language-card`);
    let cardWidth = cards[0].offsetWidth + 20; // Account for gaps

    let isTransitioning = false;

    // Recalculate card width on window resize
    window.addEventListener("resize", () => {
        cards = document.querySelectorAll(`${containerSelector} .language-card`);
        cardWidth = cards[0].offsetWidth + 20;
    });

    // Move Carousel Right (Infinite Loop Effect)
    function moveRight() {
        if (isTransitioning) return;
        isTransitioning = true;

        carouselTrack.style.transition = "transform 0.5s ease";
        carouselTrack.style.transform = `translateX(-${cardWidth}px)`;

        setTimeout(() => {
            carouselTrack.style.transition = "none";
            const firstCard = carouselTrack.firstElementChild;
            carouselTrack.appendChild(firstCard);
            carouselTrack.style.transform = "translateX(0)";
            isTransitioning = false;
        }, 500); // Match transition duration
    }

    // Auto-Scroll Every X Seconds
    let autoScroll = setInterval(moveRight, autoScrollInterval);

    // Pause Auto-Scroll on Hover
    carouselTrack.addEventListener("mouseenter", () => clearInterval(autoScroll));
    carouselTrack.addEventListener("mouseleave", () => {
        autoScroll = setInterval(moveRight, autoScrollInterval);
    });
}

// Home Page Carousel Initialization
document.addEventListener("DOMContentLoaded", function () {
    const projects = [
        { title: "Cubicka", image: "media/cubbanner.png", link: "projects/cubicka_game.html" },
        { title: "Blue Torch Games Website", image: "media/btgbanner.png", link: "projects/bluetorchgames_website.html" },
        { title: "JavaFX Pet Salon App", image: "media/sabanner.png", link: "projects/petsalon_database_app.html" },
        { title: "That One Dungeon", image: "media/todbanner.png", link: "projects/that_one_dungeon_game.html" },
        { title: "MNIST Handwritten Digit Classifier", image: "media/mnist.png", link: "projects/mnist.html" },
        // { title: "Rust City Builder", image: "media/citybuilderbanner.png", link: "projects/rust_city_builder_project.html" },
        { title: "WASM Conways Game of Life", image: "media/gameoflifebanner.png", link: "projects/wasm_gameoflife_project.html" },
        // { title: "Dracula AI Model", image: "media/draculabanner.png", link: "projects/ai_dracula_project.html" },
        { title: "School Term Scheduling App", image: "media/schooltermbanner.png", link: "projects/schoolterm_database_app.html" },
        { title: "TESC Farm E-Commerce ", image: "media/tescfbanner.png", link: "projects/tesc_farm_website.html" },
        { title: "Genuary Art Gallery", image: "media/genuarybanner.png", link: "projects/genuary_website.html" }
    ];

    createHomePageCarousel(".home-carousel", projects, project =>
        `<a href="${project.link}" class="carousel-card">
            <img src="${project.image}" alt="${project.title}">
            <div class="card-content">
                <h3>${project.title}</h3>
            </div>
        </a>`
    );
});

// Languages Carousel Initialization
document.addEventListener("DOMContentLoaded", function () {
    const languages = [
        { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },
        { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg" },
        { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
        { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
        { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
        { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
        { name: "VisualBasic", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/visualbasic/visualbasic-original.svg" },
        { name: "Rust", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg" },
        { name: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg" },
        { name: "GDScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/godot/godot-original.svg" }
    ];

    createLanguagesCarousel(".languages-carousel", languages, language =>
        `<div class="language-card">
            <img src="${language.icon}" alt="${language.name}">
            <p>${language.name}</p>
        </div>`
    );
});

// Projects Page Filtering
document.addEventListener("DOMContentLoaded", function () {
    const projectGrid = document.querySelector(".project-grid");

    // Check if Project Grid Exists
    if (!projectGrid) return;

    const filters = document.querySelectorAll(".filters button");
    const projects = [
        // { category: "Website", title: "Bob's Burgers Website", image: "media/bobsburgersbanner.png", link: "projects/bobs_burgers_website.html" },
        // { category: "Website", title: "GrayShadoz Website", image: "media/grayshadozbanner.png", link: "projects/grayshadoz_website.html" },
        { category: "Game", title: "Text-Based RPG", image: "media/tbrpgbanner.png", link: "projects/text_based_rpg_game.html" },
        { category: "Website", title: "Blue Torch Games Website", image: "media/btgbanner.png", link: "projects/bluetorchgames_website.html" },
        { category: "Game", title: "Cubicka", image: "media/cubbanner.png", link: "projects/cubicka_game.html" },
        { category: "Game", title: "Top Down Racing", image: "media/tdrbanner.png", link: "projects/top_down_racing_game.html" },
        { category: "Game", title: "Hooked! AutoFisher", image: "media/hookbanner.png", link: "projects/hooked_game.html" },
        { category: "Website", title: "Photography Website", image: "media/photobanner.png", link: "projects/photo_website.html" },
        // { category: "Game", title: "Barnyard Smash Tutorial", image: "media/tutbanner.png", link: "projects/barnyard_smash_gametutorial.html" },
        { category: "Game", title: "Ludum Dare 50 Game Jam: Rocket Launch Sequence", image: "media/ldbanner.png", link: "projects/rocket_launch_sequence.html" },
        { category: "Application", title: "Pet Salon Appointment Scheduler", image: "media/sabanner.png", link: "projects/petsalon_database_app.html" },
        { category: "Game", title: "That One Dungeon", image: "media/todbanner.png", link: "projects/that_one_dungeon_game.html" },
        { category: "Application", title: "Mobile School Scheduling App", image: "media/schooltermbanner.png", link: "projects/schoolterm_database_app.html" },
        { category: "Application", title: "DND Digital Character Sheet App", image: "media/dndmtgbanner.png", link: "projects/dndstats_app.html" },
        { category: "Website", title: "User Experience Website", image: "media/userexpbanner.png", link: "projects/ux_website.html" },
        { category: "Project", title: "MNIST Handwritten Digit Classifier", image: "media/mnist.png", link: "projects/mnist.html" },
        { category: "Project", title: "Rust City Builder", image: "media/citybuilderbanner.png", link: "projects/rust_city_builder_project.html" },
        { category: "Project", title: "WASM Conways Game of Life", image: "media/gameoflifebanner.png", link: "projects/wasm_gameoflife_project.html" },
        { category: "Project", title: "Dracula AI Model", image: "media/transformer_trainer_banner.png", link: "projects/transformer_trainer_project.html" },
        { category: "Game", title: "Mini Game Jam: Oil Knight", image: "media/oilknightbanner.png", link: "projects/oil_knight_game.html" },
        { category: "Game", title: "GameDev.tv Game Jam: Stronghold", image: "media/strongholdbanner.png", link: "projects/stronghold_game.html" },
        // { category: "Project", title: "MIDI Plugin", image: "media/midipluginbanner.png", link: "projects/midi_plugin_project.html" },
        { category: "Project", title: "Python Task Manager", image: "media/pythontaskbanner.png", link: "projects/python_taskmanager_project.html" },
        { category: "Website", title: "Glassomorphic E-Commerce Website", image: "media/glassbanner.png", link: "projects/glassomorphic_website.html" },
        { category: "Website", title: "The Evergreen State College Farm E-Commerce Website", image: "media/tescfbanner.png", link: "projects/tesc_farm_website.html" },
        { category: "Website", title: "Genuary Art Gallery", image: "media/genuarybanner.png", link: "projects/genuary_website.html" },
        { category: "Game", title: "Brackeys Game Jam: Tiled Dungeon", image: "media/tileddungeon_banner.png", link: "projects/tileddungeon_game.html" },
        { category: "Website", title: "Portfolio Project", image: "media/portfolio_banner.png", link: "projects/portfolio.html" },
        { category: "Application", title: "Pixel Vector Studio", image: "media/pixelvectorstudio.png", link: "projects/pixelvectorstudio.html" },
        { category: "Game", title: "Gamedev.js Jam: Fractal Flight", image: "media/fractal_flight_banner.png", link: "projects/fractal_flight_game.html" },
        { category: "Website", title: "Dev Tools Suite", image: "media/devtools_suite_banner.png", link: "projects/dev_tools_suite.html" },
        { category: "Project", title: "Personal Deployment Server", image: "media/personal_deployment_server_banner.png", link: "projects/personal_deployment_server.html" },
        { category: "Project", title: "Splunk Deployment & Monitoring Platform", image: "media/splunk_banner.png", link: "projects/splunk_enterprise.html" },
        { category: "Project", title: "Dracula AI Agent", image: "media/vampchat_banner.png", link: "projects/dracula_agent_project.html" }
    ];

    // Render Projects
    function renderProjects(filter = "all") {
        projectGrid.innerHTML = "";
        projects.forEach(project => {
            if (filter === "all" || project.category === filter) {
                const card = document.createElement("a");
                card.className = "project-card";
                card.href = project.link;
                card.innerHTML = `
                    <img src="${project.image}" alt="${project.title}">
                    <div class="card-content">
                        <h3>${project.title}</h3>
                        <p>${project.category}</p>
                    </div>
                `;
                projectGrid.appendChild(card);
            }
        });
    }

    // Add Event Listeners to Filters
    filters.forEach(button => {
        button.addEventListener("click", () => {
            filters.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            renderProjects(button.dataset.filter);
        });
    });

    // Initial Render
    renderProjects();
});
