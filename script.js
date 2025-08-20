document.addEventListener('DOMContentLoaded', function() {
    
    // Countdown Timer
    function updateCountdown() {
        // Set target time (next Sunday at 10:00 AM)
        const now = new Date();
        const target = new Date();
        
        // Find next Sunday
        const daysUntilSunday = (7 - now.getDay()) % 7;
        if (daysUntilSunday === 0 && now.getHours() >= 10) {
            // If it's Sunday and past 10 AM, target next Sunday
            target.setDate(now.getDate() + 7);
        } else {
            target.setDate(now.getDate() + daysUntilSunday);
        }
        
        target.setHours(10, 0, 0, 0);
        
        const timeDifference = target - now;
        
        if (timeDifference > 0) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
            
            // Format the countdown
            const countdownText = `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            document.getElementById('countdown').textContent = countdownText;
        } else {
            document.getElementById('countdown').textContent = "00:00:00";
        }
    }
    
    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Smooth scrolling for on-page links
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
    
    // Sticky action bar: compress top offset with scroll
    const stickyBar = document.querySelector('.sticky-action-bar');
    function updateStickyOffset() {
        if (!stickyBar) return;
        const pagePadding = 52;
        const smallPx = 16;
        const largePx = 16 + pagePadding;
        const y = window.scrollY;
        const topPx = Math.max(smallPx, largePx - y);
        stickyBar.style.top = topPx + 'px';
    }
    updateStickyOffset();
    window.addEventListener('scroll', updateStickyOffset, { passive: true });
    
    // Add loading animation to hero content
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    const countdownSectionInline = document.querySelector('.countdown-section-inline');
    const socialIconsInline = document.querySelector('.social-icons-section-inline');
    
    if (heroTitle && heroSubtitle && heroButtons) {
        // Add initial opacity 0
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(30px)';
        heroButtons.style.opacity = '0';
        heroButtons.style.transform = 'translateY(30px)';
        
        // Countdown and social icons load immediately without animation
        if (countdownSectionInline) {
            countdownSectionInline.style.opacity = '1';
            countdownSectionInline.style.transform = 'translateY(0)';
        }
        
        if (socialIconsInline) {
            socialIconsInline.style.opacity = '1';
            socialIconsInline.style.transform = 'translateY(0)';
        }
        
        // Animate in sequence
        setTimeout(() => {
            heroTitle.style.transition = 'all 0.8s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
        
        setTimeout(() => {
            heroSubtitle.style.transition = 'all 0.8s ease';
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 600);
        
        setTimeout(() => {
            heroButtons.style.transition = 'all 0.8s ease';
            heroButtons.style.opacity = '1';
            heroButtons.style.transform = 'translateY(0)';
        }, 900);
        
    }
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileDropdown = document.getElementById('mobileDropdown');
    
    if (mobileMenuToggle && mobileDropdown) {
        mobileMenuToggle.addEventListener('click', function(e) {
            // Only function if screen width is under 1600px
            if (window.innerWidth >= 1600) {
                return;
            }
            
            e.stopPropagation();
            mobileDropdown.classList.toggle('show');
            
            // Rotate hamburger icon
            const icon = this.querySelector('.hamburger-icon');
            if (mobileDropdown.classList.contains('show')) {
                icon.style.transform = 'rotate(90deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (window.innerWidth >= 1600) return;
            
            if (!mobileDropdown.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileDropdown.classList.remove('show');
                const icon = mobileMenuToggle.querySelector('.hamburger-icon');
                icon.style.transform = 'rotate(0deg)';
            }
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth >= 1600) return;
                
                mobileDropdown.classList.remove('show');
                const icon = mobileMenuToggle.querySelector('.hamburger-icon');
                icon.style.transform = 'rotate(0deg)';
            });
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', function(e) {
            if (window.innerWidth >= 1600) return;
            
            if (e.key === 'Escape' && mobileDropdown.classList.contains('show')) {
                mobileDropdown.classList.remove('show');
                const icon = mobileMenuToggle.querySelector('.hamburger-icon');
                icon.style.transform = 'rotate(0deg)';
            }
        });
    }
    
    
    // Add click effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Keep hero background steady (remove parallax)
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = 'none';
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons, .welcome-title, .mission-title, .gospel-statement, .love-hope-title, .volunteer-title, .saved-lives-title').forEach(el => {
        observer.observe(el);
    });
    
    // Set initial state for scroll-triggered animations
    const animatedElements = document.querySelectorAll('.welcome-title, .mission-title, .gospel-statement, .love-hope-title, .volunteer-title, .saved-lives-title');
    animatedElements.forEach(el => {
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
        }
    });
    
    // Add CSS class for animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.8s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Preload hero image for better performance
    const heroImage = new Image();
    heroImage.src = 'assets/hero.jpg';
    
    // Add loading state
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Error handling for countdown
    const countdownElement = document.getElementById('countdown');
    if (countdownElement && countdownElement.textContent === 'NaN:NaN:NaN:NaN') {
        countdownElement.textContent = 'Coming Soon';
    }
    
    // Truly Infinite Volunteer Carousel
    const carousel = document.getElementById('volunteerCarousel');
    const carouselContainer = document.querySelector('.volunteer-carousel-container');
    let isManualMode = false;
    let pauseTimeout;
    let hoverTimeout;
    let animationId;
    let currentPosition = 0;
    
    if (carousel && carouselContainer) {
        // Clone cards for infinite effect
        const originalCards = Array.from(carousel.children);
        
        // Responsive card width calculation
        function getCardWidth() {
            if (window.innerWidth <= 575) {
                return 180 + 16; // smaller cards + gap on very small screens
            } else if (window.innerWidth <= 767) {
                return 200 + 16; // medium cards + gap on mobile
            } else {
                return 240 + 32; // full size cards + gap on desktop
            }
        }
        
        let cardWidth = getCardWidth();
        let totalWidth = originalCards.length * cardWidth;
        
        // Update dimensions on resize
        function handleResize() {
            cardWidth = getCardWidth();
            totalWidth = originalCards.length * cardWidth;
            
            // Reset position to prevent issues
            currentPosition = 0;
            carousel.style.transform = `translateX(${currentPosition}px)`;
        }
        
        window.addEventListener('resize', handleResize);
        
        // Create multiple copies for seamless infinite scroll
        for (let i = 0; i < 3; i++) {
            originalCards.forEach(card => {
                const clone = card.cloneNode(true);
                carousel.appendChild(clone);
            });
        }
        
        // Infinite scroll animation
        function animateCarousel() {
            if (!isManualMode) {
                currentPosition -= 0.5; // Scroll speed
                
                // Reset position when we've scrolled one full set
                if (Math.abs(currentPosition) >= totalWidth) {
                    currentPosition = 0;
                }
                
                carousel.style.transform = `translateX(${currentPosition}px)`;
            }
            animationId = requestAnimationFrame(animateCarousel);
        }
        
        // Start animation
        animateCarousel();
        
        // Pause on hover
        carouselContainer.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout);
            isManualMode = true;
        });
        
        // Resume on mouse leave with 1 second delay
        carouselContainer.addEventListener('mouseleave', () => {
            hoverTimeout = setTimeout(() => {
                isManualMode = false;
            }, 1000);
        });
        
        // Handle horizontal mousepad scrolling (shift + wheel)
        carouselContainer.addEventListener('wheel', (e) => {
            // Only respond to horizontal scroll (shift + wheel) or trackpad horizontal gestures
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
                e.preventDefault();
                isManualMode = true;
                
                // Use deltaX for horizontal scroll, or deltaY when shift is held
                const delta = e.shiftKey ? e.deltaY : e.deltaX;
                currentPosition -= delta * 0.5;
                
                // Handle wraparound
                if (currentPosition > 0) {
                    currentPosition = -totalWidth + (currentPosition % totalWidth);
                } else if (Math.abs(currentPosition) >= totalWidth * 2) {
                    currentPosition = currentPosition % totalWidth;
                }
                
                carousel.style.transform = `translateX(${currentPosition}px)`;
                
                // Clear existing timeout
                clearTimeout(pauseTimeout);
                
                // Resume auto-scroll after 3 seconds of no interaction
                pauseTimeout = setTimeout(() => {
                    isManualMode = false;
                }, 3000);
            }
        });
        
        // Handle touch/drag
        let isDown = false;
        let startX;
        let startPosition;
        
        carouselContainer.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isDown = true;
            isManualMode = true;
            startX = e.pageX;
            startPosition = currentPosition;
            carouselContainer.style.cursor = 'grabbing';
            
            // Temporarily disable text selection during drag
            document.body.style.userSelect = 'none';
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            isDown = false;
            carouselContainer.style.cursor = 'grab';
            
            // Re-enable text selection if drag was in progress
            document.body.style.userSelect = '';
        });
        
        document.addEventListener('mouseup', () => {
            if (isDown) {
                isDown = false;
                carouselContainer.style.cursor = 'grab';
                
                // Re-enable text selection
                document.body.style.userSelect = '';
                
                // Resume auto-scroll after 3 seconds
                clearTimeout(pauseTimeout);
                pauseTimeout = setTimeout(() => {
                    isManualMode = false;
                }, 3000);
            }
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX;
            const walk = (x - startX); // 1:1 ratio instead of *2
            currentPosition = startPosition + walk;
            
            // Handle wraparound
            if (currentPosition > 0) {
                currentPosition = -totalWidth + (currentPosition % totalWidth);
            } else if (Math.abs(currentPosition) >= totalWidth * 2) {
                currentPosition = currentPosition % totalWidth;
            }
            
            carousel.style.transform = `translateX(${currentPosition}px)`;
        });
        
        // Touch events for mobile - improved
        let touchStartTime;
        let isTouchScrolling = false;
        
        carouselContainer.addEventListener('touchstart', (e) => {
            touchStartTime = Date.now();
            isManualMode = true;
            isTouchScrolling = false;
            startX = e.touches[0].pageX;
            startPosition = currentPosition;
            
            // Prevent default to avoid conflicts with page scrolling
            if (e.touches.length === 1) {
                e.preventDefault();
            }
        }, { passive: false });
        
        carouselContainer.addEventListener('touchmove', (e) => {
            if (!isManualMode || e.touches.length > 1) return;
            
            const x = e.touches[0].pageX;
            const deltaX = x - startX;
            
            // Only prevent default if we're actually scrolling horizontally
            if (Math.abs(deltaX) > 10) {
                e.preventDefault();
                isTouchScrolling = true;
                
                const walk = deltaX * 1.2; // Slightly more responsive on mobile
                currentPosition = startPosition + walk;
                
                // Handle wraparound
                if (currentPosition > 0) {
                    currentPosition = -totalWidth + (currentPosition % totalWidth);
                } else if (Math.abs(currentPosition) >= totalWidth * 2) {
                    currentPosition = currentPosition % totalWidth;
                }
                
                carousel.style.transform = `translateX(${currentPosition}px)`;
            }
        }, { passive: false });
        
        carouselContainer.addEventListener('touchend', (e) => {
            const touchEndTime = Date.now();
            const touchDuration = touchEndTime - touchStartTime;
            
            // If it was a quick tap (not a scroll), don't prevent click events
            if (touchDuration < 200 && !isTouchScrolling) {
                // Allow click events to fire normally
                return;
            }
            
            // Resume auto-scroll after 3 seconds
            clearTimeout(pauseTimeout);
            pauseTimeout = setTimeout(() => {
                isManualMode = false;
            }, 3000);
        });
        
            // Set initial cursor
        carouselContainer.style.cursor = 'grab';
        
        // Set up staggered animation for carousel cards
        const allCards = carousel.querySelectorAll('.volunteer-card');
        allCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
        });
        
        // Observer for carousel animation
        const carouselObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cards = carousel.querySelectorAll('.volunteer-card');
                    
                    // Animate cards with stagger
                    cards.forEach((card, index) => {
                        // Only animate the original cards (first 7), not the clones
                        if (index < 7) {
                            setTimeout(() => {
                                card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, index * 100); // 100ms stagger between each card
                        } else {
                            // For cloned cards, set them visible immediately (no animation)
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }
                    });
                    
                    // Stop observing after animation
                    carouselObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });
        
        // Start observing the carousel
        carouselObserver.observe(carouselContainer);
    }
    
    // Dynamic contrast adjustment for sticky action bar
    function adjustStickyBarContrast() {
        const stickyBar = document.querySelector('.sticky-action-bar');
        const heroSection = document.querySelector('.hero-section');
        if (!stickyBar || !heroSection) return;
        
        // Get sticky bar position
        const stickyRect = stickyBar.getBoundingClientRect();
        const heroRect = heroSection.getBoundingClientRect();
        
        // Check if sticky bar is over hero section
        const isOverHero = stickyRect.top < heroRect.bottom && stickyRect.bottom > heroRect.top;
        
        if (isOverHero) {
            // Calculate position within hero as percentage
            const heroProgress = Math.max(0, Math.min(1, 
                (heroRect.bottom - stickyRect.top) / heroRect.height
            ));
            
            // Sample multiple points across the hero image to estimate brightness
            // Hero images typically have varying brightness - this creates a more realistic model
            let estimatedBrightness;
            
            if (heroProgress < 0.2) {
                // Top of hero - usually darker (stage/crowd area)
                estimatedBrightness = 0.25;
            } else if (heroProgress < 0.4) {
                // Upper middle - transitioning to lighter
                estimatedBrightness = 0.35;
            } else if (heroProgress < 0.7) {
                // Middle - often lighter (stage lights, crowd)
                estimatedBrightness = 0.55;
            } else {
                // Bottom - varies, but often darker
                estimatedBrightness = 0.4;
            }
            
            // Add some randomness based on horizontal position to simulate image variation
            const horizontalVariation = Math.sin(stickyRect.left * 0.01) * 0.1;
            estimatedBrightness += horizontalVariation;
            
            // Clamp between 0.2 and 0.8
            estimatedBrightness = Math.max(0.2, Math.min(0.8, estimatedBrightness));
            
            // Apply color changes with smooth transitions
            const navLinks = stickyBar.querySelectorAll('.nav-link');
            const buttons = stickyBar.querySelectorAll('.btn');
            
            // Add transition for smooth color changes
            navLinks.forEach(link => {
                link.style.transition = 'color 0.3s ease';
            });
            buttons.forEach(btn => {
                btn.style.transition = 'color 0.3s ease, background 0.3s ease';
            });
            
            if (estimatedBrightness > 0.45) {
                // Light background - use dark text
                navLinks.forEach(link => {
                    link.style.setProperty('color', '#2E2320', 'important');
                });
                buttons.forEach(btn => {
                    btn.style.color = '#2E2320';
                    btn.style.background = 'rgba(46, 35, 32, 0.15)';
                });
                stickyBar.style.background = 'rgba(255, 255, 255, 0.25)';
            } else {
                // Dark background - use light text
                navLinks.forEach(link => {
                    link.style.setProperty('color', 'white', 'important');
                });
                buttons.forEach(btn => {
                    btn.style.color = 'white';
                    btn.style.background = 'rgba(255, 255, 255, 0.1)';
                });
                stickyBar.style.background = 'rgba(255, 255, 255, 0.2)';
            }
        } else {
            // Not over hero - use default light theme
            const navLinks = stickyBar.querySelectorAll('.nav-link');
            const buttons = stickyBar.querySelectorAll('.btn');
            
            navLinks.forEach(link => {
                link.style.setProperty('color', '#2E2320', 'important');
            });
            buttons.forEach(btn => {
                btn.style.color = '#2E2320';
                btn.style.background = 'rgba(46, 35, 32, 0.1)';
            });
            stickyBar.style.background = 'rgba(255, 255, 255, 0.8)';
        }
    }
    
    // Navigation hover bubble effect
    function initNavHoverBubble() {
        const bubble = document.querySelector('.nav-hover-bubble');
        const navLinks = document.querySelectorAll('.sticky-action-bar .nav-link');
        const container = document.querySelector('.sticky-action-bar .container');
        const actionsGroup = document.querySelector('.actions-group');
        
        if (!bubble || !navLinks.length || !container) return;
        
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const linkRect = link.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                
                // Calculate position relative to container
                const left = linkRect.left - containerRect.left;
                const width = linkRect.width;
                const height = linkRect.height;
                const top = linkRect.top - containerRect.top;
                
                // Position and show bubble
                bubble.style.left = left + 'px';
                bubble.style.top = top + 'px';
                bubble.style.width = width + 'px';
                bubble.style.height = height + 'px';
                bubble.style.opacity = '1';
            });
            
            link.addEventListener('mouseleave', () => {
                // Small delay to prevent flicker when moving between adjacent links
                setTimeout(() => {
                    if (!container.querySelector('.nav-link:hover')) {
                        bubble.style.opacity = '0';
                    }
                }, 50);
            });
        });
        
        // Hide bubble when hovering over actions group (Give Online button, hamburger)
        if (actionsGroup) {
            actionsGroup.addEventListener('mouseenter', () => {
                bubble.style.opacity = '0';
            });
        }
        
        // Hide bubble when leaving entire nav area
        container.addEventListener('mouseleave', () => {
            bubble.style.opacity = '0';
        });
    }
    
    // Update contrast on scroll and load
    adjustStickyBarContrast();
    initNavHoverBubble();
    window.addEventListener('scroll', adjustStickyBarContrast, { passive: true });
    window.addEventListener('resize', adjustStickyBarContrast, { passive: true });
});
