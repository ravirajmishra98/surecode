// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Back to top button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(section => {
    observer.observe(section);
});

// Dynamic number counter animation
function animateCounter(element) {
    const target = parseInt(element.textContent);
    let current = 0;
    const increment = target / 60;
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
window.addEventListener('load', () => {
    const statNumbers = document.querySelectorAll('.stat-item h3');
    let countersStarted = false;
    
    window.addEventListener('scroll', () => {
        const statsSection = document.getElementById('stats');
        if (statsSection && !countersStarted) {
            const sectionPosition = statsSection.getBoundingClientRect().top;
            if (sectionPosition < window.innerHeight) {
                statNumbers.forEach(stat => animateCounter(stat));
                countersStarted = true;
            }
        }
    });
});