// --- Live Counter Logic ---
const startDate = new Date('2022-02-08T00:00:00').getTime();

// --- Music Popup Logic ---
const musicOverlay = document.getElementById('musicOverlay');
const playMusicBtn = document.getElementById('playMusicBtn');
const skipMusicBtn = document.getElementById('skipMusicBtn');
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let isMusicPlaying = false;

function closeModal() {
    musicOverlay.classList.add('hidden-modal');
    musicToggle.classList.add('visible');
}

playMusicBtn.addEventListener('click', () => {
    bgMusic.currentTime = 6;
    bgMusic.volume = 0.5;
    bgMusic.play();
    isMusicPlaying = true;
    musicToggle.textContent = '🔊';
    closeModal();
});

skipMusicBtn.addEventListener('click', () => {
    closeModal();
});

musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        isMusicPlaying = false;
        musicToggle.textContent = '🔇';
    } else {
        if (bgMusic.currentTime === 0) bgMusic.currentTime = 6; // Start from 6 seconds if not played before
        bgMusic.volume = 0.5;
        bgMusic.play();
        isMusicPlaying = true;
        musicToggle.textContent = '🔊';
    }
});

function updateCounter() {
    const now = new Date().getTime();
    const difference = now - startDate;

    // Time calculations
    const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
    const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Update the DOM
    document.getElementById('years').innerText = years.toString().padStart(2, '0');
    document.getElementById('days').innerText = days.toString().padStart(2, '0');
    document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
}

// Run the counter every second
setInterval(updateCounter, 1000);
updateCounter(); // Initial call to avoid 1-second delay


// --- Scroll Reveal Animations ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));


// --- Interactive Reveal Button ---
const revealBtn = document.getElementById('revealBtn');
const hiddenMessage = document.getElementById('hiddenMessage');
const heartBurst = document.getElementById('heartBurst');
const typewriterText = document.getElementById('typewriterText');
const loveMessage = 'If I could hold time in my hands, I would freeze every moment I have ever spent with you. You are not just the love of my life — you are my safest place, my deepest comfort, and the only person who makes my heart feel truly at home. I love you more than words could ever say, more than the stars could ever count, and more than forever could ever hold. Thank you for choosing me, for loving me, and for being the most beautiful chapter of my life. 💕';
let isRevealed = false;
let typewriterInterval = null;

function createHeartBurst() {
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '♥', '✨', '🩷'];
    for (let i = 0; i < 16; i++) {
        const heart = document.createElement('span');
        heart.classList.add('burst-heart');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        const angle = (i / 16) * 360;
        const distance = 80 + Math.random() * 80;
        const tx = Math.cos(angle * Math.PI / 180) * distance;
        const ty = Math.sin(angle * Math.PI / 180) * distance;
        const rot = (Math.random() - 0.5) * 360;
        heart.style.setProperty('--tx', tx + 'px');
        heart.style.setProperty('--ty', ty + 'px');
        heart.style.setProperty('--rot', rot + 'deg');
        heart.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
        heartBurst.appendChild(heart);
        setTimeout(() => heart.remove(), 1300);
    }
}

function typeWriter(text, element, speed) {
    let i = 0;
    element.textContent = '';
    const cursor = document.createElement('span');
    cursor.classList.add('typewriter-cursor');
    element.appendChild(cursor);

    typewriterInterval = setInterval(() => {
        if (i < text.length) {
            element.textContent = text.substring(0, i + 1);
            element.appendChild(cursor);
            i++;
        } else {
            clearInterval(typewriterInterval);
            typewriterInterval = null;
            setTimeout(() => cursor.remove(), 2000);
        }
    }, speed);
}

if (revealBtn && hiddenMessage) {
    revealBtn.addEventListener('click', () => {
        if (!isRevealed) {
            // Reveal
            revealBtn.classList.add('clicked');
            createHeartBurst();
            setTimeout(() => revealBtn.classList.remove('clicked'), 600);

            hiddenMessage.classList.remove('hiding');
            hiddenMessage.classList.add('revealed');
            revealBtn.textContent = '❤️ Thank You ❤️';
            revealBtn.style.background = 'linear-gradient(135deg, #ff1f5a 0%, #ff6987 100%)';

            if (typewriterInterval) clearInterval(typewriterInterval);
            setTimeout(() => typeWriter(loveMessage, typewriterText, 30), 500);
            isRevealed = true;
        } else {
            // Hide
            if (typewriterInterval) { clearInterval(typewriterInterval); typewriterInterval = null; }
            hiddenMessage.classList.remove('revealed');
            hiddenMessage.classList.add('hiding');
            revealBtn.textContent = '❤️ Click Me ❤️';
            revealBtn.style.background = 'linear-gradient(135deg, #ff6987 0%, #ff1f5a 100%)';
            setTimeout(() => {
                hiddenMessage.classList.remove('hiding');
                typewriterText.textContent = '';
            }, 500);
            isRevealed = false;
        }
    });
}


// --- Floating Particles Effect ---
function createParticle() {
    const particles = document.getElementById('particles');
    if (!particles) return;
    
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random starting position along the bottom
    const startX = Math.random() * window.innerWidth;
    particle.style.left = startX + 'px';
    
    // Random size
    const size = Math.random() * 8 + 4;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random animation duration
    const duration = Math.random() * 10 + 10;
    particle.style.animationDuration = duration + 's';
    
    // Random horizontal movement
    const moveX = (Math.random() - 0.5) * 200;
    particle.style.setProperty('--moveX', moveX + 'px');
    
    particles.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, duration * 1000);
}

// Create particles periodically
setInterval(createParticle, 800);

// Create initial particles
for (let i = 0; i < 10; i++) {
    setTimeout(createParticle, i * 300);
}


// --- Enhanced Flip Card Hover Effects ---
const flipCards = document.querySelectorAll('.flip-card');
flipCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        flipCards.forEach(c => {
            if (c !== card) c.style.opacity = '0.5';
        });
    });
    card.addEventListener('mouseleave', () => {
        flipCards.forEach(c => c.style.opacity = '1');
    });
});