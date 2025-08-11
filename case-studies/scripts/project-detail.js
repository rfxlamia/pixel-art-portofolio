// Project Detail Page JavaScript
// Handles detailed navigation, animations, and interactions

class ProjectDetail {
    constructor(projectId) {
        this.projectId = projectId;
        this.currentSection = 'overview';
        this.soundEnabled = true;
        this.motionPreference = 'full';
        this.audioContext = null;
        
        this.init();
    }

    init() {
        this.detectMotionPreference();
        this.setupEventListeners();
        this.setupSoundSystem();
        this.initializeAnimations();
        this.setupScrollSpy();
        this.preloadImages();
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Detail navigation buttons
        const detailNavButtons = document.querySelectorAll('.detail-nav-btn');
        detailNavButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.getAttribute('data-section');
                this.navigateToSection(section);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });

        // Intersection Observer for scroll animations
        this.setupIntersectionObserver();

        // Smooth scrolling for anchor links
        this.setupSmoothScrolling();

        // Card hover effects
        this.setupCardInteractions();
    }

    // Section Navigation
    navigateToSection(sectionName) {
        if (sectionName === this.currentSection) return;

        this.playSound('sectionTransition');
        
        // Update navigation
        document.querySelectorAll('.detail-nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Hide current section
        const currentSection = document.getElementById(this.currentSection);
        if (currentSection) {
            currentSection.classList.remove('active');
        }

        // Show new section with animation
        setTimeout(() => {
            const newSection = document.getElementById(sectionName);
            if (newSection) {
                newSection.classList.add('active');
                
                // Scroll to section
                newSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Trigger section-specific animations
                this.triggerSectionAnimations(sectionName);
            }
            this.currentSection = sectionName;
        }, 150);
    }

    // Section-specific animations
    triggerSectionAnimations(sectionName) {
        setTimeout(() => {
            switch(sectionName) {
                case 'overview':
                    this.animateOverviewCards();
                    break;
                case 'problem':
                    this.animateProblemStats();
                    break;
                case 'solution':
                    this.animateSolutionComponents();
                    break;
                case 'technical':
                    this.animateTechnicalFeatures();
                    break;
                case 'impact':
                    this.animateImpactMetrics();
                    break;
                case 'insights':
                    this.animateInsightCards();
                    break;
            }
        }, 300);
    }

    animateOverviewCards() {
        const cards = document.querySelectorAll('#overview .overview-card');
        this.animateCardsSequentially(cards, 'slideInLeft');
    }

    animateProblemStats() {
        const statBoxes = document.querySelectorAll('.stat-box');
        statBoxes.forEach((box, index) => {
            box.style.opacity = '0';
            box.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                box.style.transition = 'all 0.6s ease-out';
                box.style.opacity = '1';
                box.style.transform = 'translateY(0px)';
                this.playSound('statReveal');
            }, index * 150);
        });

        const contextCards = document.querySelectorAll('.context-card');
        this.animateCardsSequentially(contextCards, 'slideInRight', 800);
    }

    animateSolutionComponents() {
        const components = document.querySelectorAll('.component-card');
        components.forEach((component, index) => {
            component.style.opacity = '0';
            component.style.transform = 'translateX(-50px)';
            
            setTimeout(() => {
                component.style.transition = 'all 0.8s ease-out';
                component.style.opacity = '1';
                component.style.transform = 'translateX(0px)';
                this.playSound('componentReveal');
                
                // Animate feature items within component
                const features = component.querySelectorAll('.feature-item, .ai-feature');
                features.forEach((feature, featureIndex) => {
                    feature.style.opacity = '0';
                    feature.style.transform = 'translateX(20px)';
                    
                    setTimeout(() => {
                        feature.style.transition = 'all 0.4s ease-out';
                        feature.style.opacity = '1';
                        feature.style.transform = 'translateX(0px)';
                    }, featureIndex * 100 + 300);
                });
            }, index * 400);
        });
    }

    animateTechnicalFeatures() {
        // Animate architecture layers
        const archLayers = document.querySelectorAll('.arch-layer');
        archLayers.forEach((layer, index) => {
            layer.style.opacity = '0';
            layer.style.transform = 'translateX(-30px)';
            
            setTimeout(() => {
                layer.style.transition = 'all 0.5s ease-out';
                layer.style.opacity = '1';
                layer.style.transform = 'translateX(0px)';
                this.playSound('layerReveal');
                
                // Animate tech badges within layer
                const badges = layer.querySelectorAll('.tech-badge');
                badges.forEach((badge, badgeIndex) => {
                    badge.style.opacity = '0';
                    badge.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        badge.style.transition = 'all 0.3s ease-out';
                        badge.style.opacity = '1';
                        badge.style.transform = 'scale(1)';
                    }, badgeIndex * 50 + 200);
                });
            }, index * 200);
        });

        // Animate feature cards
        const featureCards = document.querySelectorAll('.tech-feature-card');
        this.animateCardsSequentially(featureCards, 'fadeInUp', 1000);

        // Animate scale metrics
        const scaleMetrics = document.querySelectorAll('.scale-metric');
        scaleMetrics.forEach((metric, index) => {
            metric.style.opacity = '0';
            metric.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                metric.style.transition = 'all 0.5s ease-out';
                metric.style.opacity = '1';
                metric.style.transform = 'scale(1)';
                this.playSound('metricReveal');
            }, index * 150 + 1500);
        });
    }

    animateImpactMetrics() {
        const impactCards = document.querySelectorAll('.impact-card');
        impactCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0px)';
                this.playSound('impactReveal');
                
                // Animate impact stat
                const stat = card.querySelector('.impact-stat');
                if (stat) {
                    stat.style.opacity = '0';
                    stat.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        stat.style.transition = 'all 0.4s ease-out';
                        stat.style.opacity = '1';
                        stat.style.transform = 'scale(1)';
                        this.playSound('statPop');
                    }, 300);
                }
            }, index * 200);
        });

        // Animate market segments
        const marketSegments = document.querySelectorAll('.market-segment');
        this.animateCardsSequentially(marketSegments, 'slideInUp', 800);
    }

    animateInsightCards() {
        const challengeCards = document.querySelectorAll('.challenge-card');
        challengeCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'rotateY(-15deg) translateX(-20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.7s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'rotateY(0deg) translateX(0px)';
                this.playSound('challengeReveal');
            }, index * 250);
        });

        // Animate learning categories
        const learningCategories = document.querySelectorAll('.learning-category');
        this.animateCardsSequentially(learningCategories, 'slideInUp', 1000);

        // Animate roadmap items
        const roadmapItems = document.querySelectorAll('.roadmap-item');
        roadmapItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-50px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease-out';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0px)';
                this.playSound('roadmapReveal');
            }, index * 300 + 1500);
        });
    }

    // Utility function for sequential card animations
    animateCardsSequentially(cards, animationType, delay = 0) {
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            
            switch(animationType) {
                case 'slideInLeft':
                    card.style.transform = 'translateX(-30px)';
                    break;
                case 'slideInRight':
                    card.style.transform = 'translateX(30px)';
                    break;
                case 'slideInUp':
                    card.style.transform = 'translateY(30px)';
                    break;
                case 'fadeInUp':
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    break;
                default:
                    card.style.transform = 'translateY(20px)';
            }
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateX(0px) translateY(0px) scale(1)';
                this.playSound('cardReveal');
            }, index * 150 + delay);
        });
    }

    // Setup card interaction effects
    setupCardInteractions() {
        const interactiveCards = document.querySelectorAll(
            '.overview-card, .context-card, .component-card, .tech-feature-card, ' +
            '.impact-card, .challenge-card, .learning-category, .market-segment'
        );

        interactiveCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (this.soundEnabled && this.motionPreference === 'full') {
                    this.playSound('cardHover');
                }
            });

            card.addEventListener('click', (e) => {
                // Add click ripple effect
                this.createRippleEffect(e, card);
            });
        });
    }

    createRippleEffect(event, element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = 100;
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 215, 0, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
            z-index: 1000;
        `;

        // Add ripple animation keyframes if not exists
        if (!document.querySelector('#ripple-styles')) {
            const rippleStyles = document.createElement('style');
            rippleStyles.id = 'ripple-styles';
            rippleStyles.textContent = `
                @keyframes rippleEffect {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(rippleStyles);
        }

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);

        this.playSound('ripple');
    }

    // Intersection Observer for scroll-triggered animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.classList.add('animate-in');
                    
                    // Trigger specific animations based on element type
                    if (element.classList.contains('metric-item')) {
                        this.animateCountUp(element.querySelector('.metric-number'));
                    }
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        const animatableElements = document.querySelectorAll(
            '.metric-item, .stat-box, .scale-metric'
        );

        animatableElements.forEach(element => {
            this.intersectionObserver.observe(element);
        });
    }

    // Count-up animation for numbers
    animateCountUp(element) {
        if (!element || element.dataset.animated) return;

        const text = element.textContent;
        const hasNumber = /\d/.test(text);
        
        if (!hasNumber) return;

        element.dataset.animated = 'true';
        const number = parseInt(text.replace(/\D/g, ''));
        const suffix = text.replace(/[\d,]/g, '');
        
        if (isNaN(number)) return;

        let current = 0;
        const increment = number / 30; // Animation duration ~1 second
        const duration = 1000;
        const startTime = Date.now();

        const updateNumber = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            current = Math.floor(number * progress);
            element.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = text; // Restore original text
            }
        };

        updateNumber();
    }

    // Scroll spy for navigation
    setupScrollSpy() {
        const sections = document.querySelectorAll('.detail-section');
        const navButtons = document.querySelectorAll('.detail-nav-btn');

        const scrollSpyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    
                    // Update active navigation
                    navButtons.forEach(btn => btn.classList.remove('active'));
                    const activeBtn = document.querySelector(`[data-section="${sectionId}"]`);
                    if (activeBtn) {
                        activeBtn.classList.add('active');
                        this.currentSection = sectionId;
                    }
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-100px 0px -50% 0px'
        });

        sections.forEach(section => {
            scrollSpyObserver.observe(section);
        });
    }

    // Smooth scrolling setup
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Initialize hero animations
    initializeAnimations() {
        // Animate hero elements on load
        setTimeout(() => {
            const heroElements = document.querySelectorAll(
                '.project-badge, .project-main-title, .project-tagline, .project-summary, .key-metrics'
            );

            heroElements.forEach((element, index) => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    element.style.transition = 'all 0.8s ease-out';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0px)';
                }, index * 200 + 500);
            });

            // Animate metric items individually
            const metricItems = document.querySelectorAll('.metric-item');
            metricItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px) scale(0.9)';
                
                setTimeout(() => {
                    item.style.transition = 'all 0.6s ease-out';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0px) scale(1)';
                    this.playSound('metricPop');
                }, index * 150 + 1000);
            });
        }, 200);
    }

    // Keyboard Navigation
    handleKeyboardNavigation(e) {
        const sectionKeys = {
            '1': 'overview',
            '2': 'problem',
            '3': 'solution',
            '4': 'technical',
            '5': 'impact',
            '6': 'insights'
        };

        if (sectionKeys[e.key]) {
            this.navigateToSection(sectionKeys[e.key]);
        }

        // Arrow key navigation
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            this.navigateNext();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            this.navigatePrevious();
        }

        // Home/End navigation
        if (e.key === 'Home') {
            this.navigateToSection('overview');
        } else if (e.key === 'End') {
            this.navigateToSection('insights');
        }
    }

    navigateNext() {
        const sections = ['overview', 'problem', 'solution', 'technical', 'impact', 'insights'];
        const currentIndex = sections.indexOf(this.currentSection);
        const nextIndex = Math.min(currentIndex + 1, sections.length - 1);
        this.navigateToSection(sections[nextIndex]);
    }

    navigatePrevious() {
        const sections = ['overview', 'problem', 'solution', 'technical', 'impact', 'insights'];
        const currentIndex = sections.indexOf(this.currentSection);
        const prevIndex = Math.max(currentIndex - 1, 0);
        this.navigateToSection(sections[prevIndex]);
    }

    // Motion Preference Detection
    detectMotionPreference() {
        // Check system preference first
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.motionPreference = 'reduced';
        }
        
        // Check localStorage for user override
        const savedPreference = localStorage.getItem('motionPreference');
        if (savedPreference && ['full', 'reduced', 'minimal'].includes(savedPreference)) {
            this.motionPreference = savedPreference;
        }
        
        this.applyMotionPreference();
    }
    
    applyMotionPreference() {
        const body = document.body;
        
        // Remove existing motion classes
        body.classList.remove('motion-full', 'motion-reduced', 'motion-minimal');
        
        // Apply motion class
        body.classList.add(`motion-${this.motionPreference}`);
    }

    // Sound System
    setupSoundSystem() {
        // Initialize Web Audio Context
        this.audioContext = null;
        
        // Check saved sound preference
        const savedSoundEnabled = localStorage.getItem('soundEnabled');
        if (savedSoundEnabled !== null) {
            this.soundEnabled = savedSoundEnabled === 'true';
        }
        
        // Initialize on first user interaction
        const initAudio = () => {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            document.removeEventListener('click', initAudio);
            document.removeEventListener('keydown', initAudio);
        };
        
        document.addEventListener('click', initAudio);
        document.addEventListener('keydown', initAudio);
    }

    playSound(soundType) {
        if (!this.soundEnabled || !this.audioContext) return;
        
        const soundMap = {
            sectionTransition: { frequency: 659.25, duration: 0.3, type: 'sawtooth' },
            cardReveal: { frequency: 440, duration: 0.2, type: 'triangle' },
            cardHover: { frequency: 220, duration: 0.1, type: 'sine' },
            statReveal: { frequency: 783.99, duration: 0.3, type: 'square' },
            componentReveal: { frequency: 523.25, duration: 0.4, type: 'square' },
            layerReveal: { frequency: 392, duration: 0.2, type: 'triangle' },
            metricReveal: { frequency: 587.33, duration: 0.25, type: 'square' },
            metricPop: { frequency: 880, duration: 0.15, type: 'square' },
            impactReveal: { frequency: 698.46, duration: 0.3, type: 'sine' },
            statPop: { frequency: 1046.50, duration: 0.2, type: 'square' },
            challengeReveal: { frequency: 349.23, duration: 0.35, type: 'sawtooth' },
            roadmapReveal: { frequency: 466.16, duration: 0.25, type: 'triangle' },
            ripple: { frequency: 1318.51, duration: 0.1, type: 'sine' }
        };
        
        const sound = soundMap[soundType];
        if (!sound) return;
        
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(sound.frequency, this.audioContext.currentTime);
            oscillator.type = sound.type;
            
            gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime); // Lower volume for subtle effects
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + sound.duration);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + sound.duration);
        } catch (error) {
            console.log('Audio not supported or error:', error);
        }
    }

    // Preload images for smooth experience
    preloadImages() {
        const images = [
            'https://files.catbox.moe/v44o0r.webp',
            'https://i.imgur.com/H6so7ce.png'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    // Cleanup method
    destroy() {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
        
        if (this.audioContext && this.audioContext.state !== 'closed') {
            this.audioContext.close();
        }
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProjectDetail;
}

// Performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
        if (entry.entryType === 'navigation') {
            console.log('Project detail page load time:', entry.loadEventEnd - entry.loadEventStart, 'ms');
        }
    });
});

try {
    performanceObserver.observe({ entryTypes: ['navigation'] });
} catch (e) {
    console.log('Performance Observer not supported');
}

// Accessibility enhancements
document.addEventListener('keydown', (e) => {
    // Skip to main content with Alt+M
    if (e.altKey && e.key.toLowerCase() === 'm') {
        const mainContent = document.querySelector('.detail-sections');
        if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView();
        }
    }
    
    // Focus navigation with Alt+N
    if (e.altKey && e.key.toLowerCase() === 'n') {
        const navButtons = document.querySelector('.detail-nav');
        if (navButtons) {
            const firstBtn = navButtons.querySelector('.detail-nav-btn');
            if (firstBtn) {
                firstBtn.focus();
            }
        }
    }
});

// Add focus indicators for keyboard navigation
document.addEventListener('focus', (e) => {
    if (e.target.matches('.detail-nav-btn, .footer-link, .contact-link')) {
        e.target.style.outline = '3px solid var(--mario-yellow)';
        e.target.style.outlineOffset = '2px';
    }
}, true);

document.addEventListener('blur', (e) => {
    if (e.target.matches('.detail-nav-btn, .footer-link, .contact-link')) {
        e.target.style.outline = 'none';
    }
}, true);