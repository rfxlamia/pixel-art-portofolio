// Case Studies - 8-Bit Mario Bros Portfolio JavaScript
// Gaming Navigation, Bilingual Support, and Interactive Elements

class CaseStudyPortfolio {
    constructor() {
        this.currentSection = 'overview';
        this.currentLanguage = 'id'; // default Indonesian
        this.soundEnabled = true;
        this.motionPreference = 'full'; // full, reduced, minimal
        this.content = {};
        this.gameStarted = false;
        
        this.init();
    }

    init() {
        this.setupLanguageSelection();
        this.detectMotionPreference();
        this.setupEventListeners();
        this.setupMotionControls();
        this.preloadImages();
        this.setupSoundSystem();
    }

    // Language Selection and Content Loading System
    setupLanguageSelection() {
        const languageScreen = document.getElementById('language-screen');
        const languageButtons = document.querySelectorAll('.language-btn');
        
        // Check for saved language preference
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage) {
            this.currentLanguage = savedLanguage;
            // Hide language screen immediately
            languageScreen.classList.add('hidden');
            document.getElementById('loading-screen').style.display = 'flex';
            this.loadContent(savedLanguage);
            return;
        }
        
        // Setup language selection event listeners
        languageButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const selectedLang = btn.dataset.lang;
                this.selectLanguage(selectedLang);
                this.playSound('menuClick');
            });
        });
    }
    
    selectLanguage(language) {
        this.currentLanguage = language;
        localStorage.setItem('selectedLanguage', language);
        
        // Hide language screen, show loading screen
        const languageScreen = document.getElementById('language-screen');
        const loadingScreen = document.getElementById('loading-screen');
        
        languageScreen.classList.add('hidden');
        loadingScreen.style.display = 'flex';
        
        // Load content and start sequence
        this.loadContent(language);
    }
    
    async loadContent(language) {
        try {
            // Load content based on language
            this.content = this.getEmbeddedContent(language);
            
            // Apply content to page
            this.applyContent();
            
            // Start loading sequence
            this.startLoadingSequence();
            
        } catch (error) {
            console.error('Failed to load content:', error);
            // Fallback to embedded content  
            this.content = this.getEmbeddedContent(language);
            this.applyContent();
            this.startLoadingSequence();
        }
    }
    
    getEmbeddedContent(language) {
        if (language === 'id') {
            return {
                loading_text: "MEMUAT STUDI KASUS...",
                score_label: "STUDI KASUS",
                world_label: "PROYEK",
                back_btn: "← KEMBALI KE UTAMA",
                motion_header: "PENGATURAN PERMAINAN",
                motion_full: "GERAK PENUH",
                motion_reduced: "MODE HALUS", 
                motion_minimal: "MODE FOKUS",
                
                // Overview Section
                overview_title: "PORTOFOLIO PROYEK",
                hero_title: "STUDI KASUS PROYEK KOMPREHENSIF",
                hero_description: "Jelajahi dokumentasi teknis detail, analisis dampak bisnis, dan wawasan implementasi dari 6 proyek pengembangan AI besar yang mencakup Legal Tech, Kesehatan Mental, Otomasi Bisnis, dan Etika AI.",
                stat_projects: "PROYEK UTAMA",
                stat_clients: "KLIEN AKTIF",
                stat_users: "PENGGUNA POTENSIAL",
                explore_btn: "JELAJAHI PROYEK",
                tech_title: "TEKNOLOGI INTI",
                
                // Projects Section
                projects_title: "STUDI KASUS PROYEK",
                view_case: "LIHAT STUDI KASUS",
                
                // About Section
                about_title: "TENTANG STUDI KASUS",
                research_title: "RISET & PENEMUAN",
                research_desc: "Setiap studi kasus dimulai dengan analisis pasar komprehensif, riset pengguna, dan penilaian kelayakan teknis untuk mengidentifikasi masalah dunia nyata yang memerlukan solusi AI.",
                architecture_title: "ARSITEKTUR TEKNIS",
                architecture_desc: "Desain sistem detail dengan arsitektur skalabel, integrasi API, dan pemilihan model AI berdasarkan kebutuhan use case spesifik dan metrik kinerja.",
                implementation_title: "IMPLEMENTASI & PENGUJIAN",
                implementation_desc: "Pengembangan iteratif dengan pengujian berkelanjutan, integrasi umpan balik pengguna, dan optimasi kinerja untuk memastikan solusi siap produksi.",
                impact_title: "DAMPAK BISNIS",
                impact_desc: "Analisis komprehensif hasil proyek, metrik adopsi pengguna, generasi nilai bisnis, dan pelajaran yang dipetik untuk pengembangan masa depan.",
                contact_title: "TERTARIK DENGAN KOLABORASI?",
                contact_desc: "Jelajahi studi kasus detail ini untuk memahami pendekatan kami dalam pengembangan AI dan lihat bagaimana kami dapat membantu menyelesaikan tantangan bisnis spesifik Anda.",
                contact_btn: "HUBUNGI KAMI",
                
                // Footer
                copyright: "© 2025 RAFI \"V\" | RFXLAMIA - STUDI KASUS",
                back_main: "← KEMBALI KE PORTOFOLIO UTAMA"
            };
        } else {
            return {
                loading_text: "LOADING CASE STUDIES...",
                score_label: "CASE STUDIES",
                world_label: "PROJECTS",
                back_btn: "← BACK TO MAIN",
                motion_header: "GAME SETTINGS",
                motion_full: "FULL MOTION",
                motion_reduced: "GENTLE MODE",
                motion_minimal: "FOCUS MODE",
                
                // Overview Section
                overview_title: "PROJECT PORTFOLIO",
                hero_title: "COMPREHENSIVE PROJECT CASE STUDIES",
                hero_description: "Explore detailed technical documentation, business impact analysis, and implementation insights from 6 major AI development projects spanning Legal Tech, Mental Health, Business Automation, and AI Ethics.",
                stat_projects: "MAJOR PROJECTS",
                stat_clients: "ACTIVE CLIENTS",
                stat_users: "POTENTIAL USERS",
                explore_btn: "EXPLORE PROJECTS",
                tech_title: "CORE TECHNOLOGIES",
                
                // Projects Section
                projects_title: "PROJECT CASE STUDIES",
                view_case: "VIEW CASE STUDY",
                
                // About Section
                about_title: "ABOUT CASE STUDIES",
                research_title: "RESEARCH & DISCOVERY",
                research_desc: "Each case study begins with comprehensive market analysis, user research, and technical feasibility assessment to identify real-world problems requiring AI solutions.",
                architecture_title: "TECHNICAL ARCHITECTURE",
                architecture_desc: "Detailed system design with scalable architecture, API integrations, and AI model selection based on specific use case requirements and performance metrics.",
                implementation_title: "IMPLEMENTATION & TESTING",
                implementation_desc: "Iterative development with continuous testing, user feedback integration, and performance optimization to ensure production-ready solutions.",
                impact_title: "BUSINESS IMPACT",
                impact_desc: "Comprehensive analysis of project outcomes, user adoption metrics, business value generation, and lessons learned for future development.",
                contact_title: "INTERESTED IN COLLABORATION?",
                contact_desc: "Explore these detailed case studies to understand our approach to AI development and see how we can help solve your specific business challenges.",
                contact_btn: "GET IN TOUCH",
                
                // Footer
                copyright: "© 2025 RAFI \"V\" | RFXLAMIA - CASE STUDIES",
                back_main: "← BACK TO MAIN PORTFOLIO"
            };
        }
    }
    
    applyContent() {
        // Apply content to elements with data-text attributes
        document.querySelectorAll('[data-text]').forEach(element => {
            const key = element.getAttribute('data-text');
            if (this.content[key]) {
                element.textContent = this.content[key];
            }
        });
    }

    // Loading Sequence
    startLoadingSequence() {
        const loadingScreen = document.getElementById('loading-screen');
        const progressBar = document.querySelector('.loading-progress');
        
        // Simulate loading progress
        let progress = 0;
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(loadingInterval);
                
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    
                    // Show main case studies content
                    document.querySelector('.game-header').style.display = 'block';
                    document.querySelector('.case-studies-world').style.display = 'block';
                    
                    this.gameStarted = true;
                    this.playSound('gameStart');
                    this.animateProjectCards();
                }, 500);
            }
            progressBar.style.width = `${progress}%`;
        }, 200);
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Navigation buttons
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.getAttribute('data-section');
                this.navigateToSection(section);
            });
        });

        // Sound toggle
        const soundToggle = document.getElementById('soundToggle');
        if (soundToggle) {
            soundToggle.addEventListener('click', () => {
                this.toggleSound();
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });

        // Project card interactions
        this.setupProjectCardEvents();

        // Resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    setupProjectCardEvents() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (this.soundEnabled) {
                    this.playSound('hover');
                }
            });

            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('view-case-btn')) {
                    const projectId = card.getAttribute('data-project');
                    this.highlightProject(card);
                }
            });
        });
    }

    // Section Navigation
    navigateToSection(sectionName) {
        if (sectionName === this.currentSection) return;

        this.playSound('worldTransition');
        
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Hide current section
        const currentSection = document.getElementById(this.currentSection);
        if (currentSection) {
            currentSection.classList.remove('active');
        }

        // Show new section
        setTimeout(() => {
            const newSection = document.getElementById(sectionName);
            if (newSection) {
                newSection.classList.add('active');
                
                // Trigger section-specific animations
                this.triggerSectionAnimations(sectionName);
            }
            this.currentSection = sectionName;
        }, 300);
    }

    // Section-specific animations
    triggerSectionAnimations(sectionName) {
        switch(sectionName) {
            case 'overview':
                setTimeout(() => this.animateHeroSection(), 300);
                break;
            case 'projects':
                setTimeout(() => this.animateProjectCards(), 300);
                break;
            case 'about':
                setTimeout(() => this.animateMethodologyCards(), 300);
                break;
        }
    }

    animateHeroSection() {
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease-out';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0px)';
            }, index * 150);
        });

        // Tech grid animation
        const techItems = document.querySelectorAll('.tech-item');
        techItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.4s ease-out';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0px)';
                this.playSound('skillUp');
            }, (index * 100) + 800);
        });
    }

    animateProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) scale(0.9)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0px) scale(1)';
                this.playSound('levelAppear');
                
                // Remove inline styles after animation
                setTimeout(() => {
                    card.style.removeProperty('transform');
                    card.style.removeProperty('transition');
                    card.style.removeProperty('opacity');
                }, 600);
            }, index * 200);
        });
    }

    animateMethodologyCards() {
        const methodCards = document.querySelectorAll('.method-card');
        methodCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateX(-30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateX(0px)';
                this.playSound('achievement');
            }, index * 150);
        });
    }

    highlightProject(projectCard) {
        // Remove highlight from all cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.classList.remove('highlighted');
        });
        
        // Add highlight to selected card
        projectCard.classList.add('highlighted');
        this.playSound('menuSelect');
        
        // Remove highlight after 2 seconds
        setTimeout(() => {
            projectCard.classList.remove('highlighted');
        }, 2000);
    }

    // Motion Preference Detection and Control
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
    
    setupMotionControls() {
        const motionBtn = document.getElementById('motionBtn');
        const motionPanel = document.getElementById('motionPanel');
        const motionOptions = document.querySelectorAll('.motion-option');
        
        // Toggle motion panel
        motionBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            motionPanel.classList.toggle('show');
            this.playSound('menuClick');
        });
        
        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            if (!motionPanel.contains(e.target) && !motionBtn.contains(e.target)) {
                motionPanel.classList.remove('show');
            }
        });
        
        // Motion option selection
        motionOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const preference = option.dataset.motion;
                this.setMotionPreference(preference);
                
                // Update active state
                motionOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                
                motionPanel.classList.remove('show');
                this.playSound('powerUp');
            });
        });
        
        // Set initial active state
        const activeOption = document.querySelector(`[data-motion="${this.motionPreference}"]`);
        if (activeOption) {
            document.querySelectorAll('.motion-option').forEach(opt => opt.classList.remove('active'));
            activeOption.classList.add('active');
        }
    }
    
    setMotionPreference(preference) {
        this.motionPreference = preference;
        localStorage.setItem('motionPreference', preference);
        this.applyMotionPreference();
        
        // Show feedback
        this.showMotionFeedback(preference);
    }
    
    applyMotionPreference() {
        const body = document.body;
        
        // Remove existing motion classes
        body.classList.remove('motion-full', 'motion-reduced', 'motion-minimal');
        
        // Apply motion class
        body.classList.add(`motion-${this.motionPreference}`);
        
        // Apply CSS custom property for JS-controlled animations
        body.style.setProperty('--motion-preference', this.motionPreference);
    }
    
    showMotionFeedback(preference) {
        const feedbackTexts = {
            'full': '⚡ FULL MOTION ACTIVATED!',
            'reduced': '🌊 GENTLE MODE ACTIVATED!',
            'minimal': '🔇 FOCUS MODE ACTIVATED!'
        };
        
        // Create feedback element
        const feedback = document.createElement('div');
        feedback.className = 'motion-feedback';
        feedback.textContent = feedbackTexts[preference];
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--mario-black);
            border: 3px solid var(--mario-yellow);
            padding: 20px;
            color: var(--mario-yellow);
            font-family: var(--pixel-font);
            font-size: 12px;
            z-index: 9999;
            text-align: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(feedback);
        
        // Animate in
        setTimeout(() => feedback.style.opacity = '1', 100);
        
        // Remove after delay
        setTimeout(() => {
            feedback.style.opacity = '0';
            setTimeout(() => feedback.remove(), 300);
        }, 2000);
    }

    // Keyboard Navigation
    handleKeyboardNavigation(e) {
        const sectionKeys = {
            '1': 'overview',
            '2': 'projects',
            '3': 'about'
        };

        if (sectionKeys[e.key]) {
            this.navigateToSection(sectionKeys[e.key]);
        }

        // Arrow key navigation
        if (e.key === 'ArrowRight') {
            this.navigateNext();
        } else if (e.key === 'ArrowLeft') {
            this.navigatePrevious();
        }

        // Sound toggle with 'M' key
        if (e.key.toLowerCase() === 'm') {
            this.toggleSound();
        }

        // Escape key to close panels
        if (e.key === 'Escape') {
            document.getElementById('motionPanel').classList.remove('show');
        }
    }

    navigateNext() {
        const sections = ['overview', 'projects', 'about'];
        const currentIndex = sections.indexOf(this.currentSection);
        const nextIndex = (currentIndex + 1) % sections.length;
        this.navigateToSection(sections[nextIndex]);
    }

    navigatePrevious() {
        const sections = ['overview', 'projects', 'about'];
        const currentIndex = sections.indexOf(this.currentSection);
        const prevIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
        this.navigateToSection(sections[prevIndex]);
    }

    // Sound System
    setupSoundSystem() {
        // Initialize Web Audio Context
        this.audioContext = null;
        
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

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        const soundBtn = document.getElementById('soundToggle');
        const soundIcon = soundBtn.querySelector('.sound-icon');
        
        if (this.soundEnabled) {
            soundIcon.textContent = '🔊';
            soundBtn.classList.remove('muted');
            this.playSound('soundOn');
        } else {
            soundIcon.textContent = '🔇';
            soundBtn.classList.add('muted');
        }
        
        localStorage.setItem('soundEnabled', this.soundEnabled);
    }

    playSound(soundType) {
        if (!this.soundEnabled || !this.audioContext) return;
        
        const soundMap = {
            gameStart: { frequency: 523.25, duration: 0.5, type: 'square' },
            worldTransition: { frequency: 659.25, duration: 0.3, type: 'sawtooth' },
            skillUp: { frequency: 783.99, duration: 0.2, type: 'square' },
            levelAppear: { frequency: 440, duration: 0.3, type: 'triangle' },
            achievement: { frequency: 880, duration: 0.4, type: 'square' },
            menuSelect: { frequency: 587.33, duration: 0.2, type: 'square' },
            menuClick: { frequency: 392.00, duration: 0.15, type: 'triangle' },
            hover: { frequency: 220, duration: 0.1, type: 'sine' },
            soundOn: { frequency: 880, duration: 0.2, type: 'square' },
            powerUp: { frequency: 1046.50, duration: 0.4, type: 'square' },
            error: { frequency: 146.83, duration: 0.5, type: 'sawtooth' },
            success: { frequency: 698.46, duration: 0.3, type: 'sine' }
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
            
            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + sound.duration);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + sound.duration);
        } catch (error) {
            console.log('Audio not supported or error:', error);
        }
    }

    // Case Study Functions
    openCaseStudy(projectId) {
        const projectUrls = {
            'buddy': 'projects/buddy-platform.html',
            'automation': 'projects/business-automation-suite.html',
            'vocana': 'projects/agent-vocana.html',
            'custos': 'projects/agent-custos.html',
            'msstrom': 'projects/ms-strom.html',
            'content': 'projects/content-toolkit.html'
        };
        
        const projectUrl = projectUrls[projectId];
        
        if (projectUrl && projectId === 'buddy') {
            // Navigate to detailed case study
            window.location.href = projectUrl;
            this.playSound('menuSelect');
        } else {
            // For other projects, show coming soon modal
            const projectNames = {
                'automation': 'Business Automation Suite',
                'vocana': 'Agent Vocana - Constitutional AI',
                'custos': 'Agent Custos - Constitutional Guardian',
                'msstrom': 'Ms.Strom - Anti-Toxic Positivity AI',
                'content': 'Content Toolkit - Creator Pipeline'
            };
            
            const projectName = projectNames[projectId] || 'Project';
            this.showCaseStudyModal(projectId, projectName);
            this.playSound('menuSelect');
        }
    }

    showCaseStudyModal(projectId, projectName) {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'case-study-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">${projectName}</h3>
                    <button class="modal-close" onclick="this.closest('.case-study-modal').remove()">×</button>
                </div>
                <div class="modal-body">
                    <div class="coming-soon-content">
                        <div class="construction-icon">🚧</div>
                        <h4>Detailed Case Study Coming Soon!</h4>
                        <p>We're currently developing comprehensive case study pages with:</p>
                        <ul>
                            <li>📊 Business Impact Analysis</li>
                            <li>🔧 Technical Architecture Deep-dive</li>
                            <li>📈 Performance Metrics & Results</li>
                            <li>🎯 Implementation Challenges & Solutions</li>
                            <li>📱 Interactive Demos & Screenshots</li>
                            <li>💡 Key Insights & Lessons Learned</li>
                        </ul>
                        <p class="eta-text">Expected Launch: <strong>Coming Soon</strong></p>
                        <div class="modal-actions">
                            <button class="notify-btn" onclick="caseStudyPortfolio.showNotifyForm('${projectId}')">
                                📧 Notify Me When Ready
                            </button>
                            <a href="../index.html#contact" class="contact-btn">
                                💬 Discuss Project Details
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: modalFadeIn 0.3s ease-out;
        `;
        
        // Add modal CSS if not already present
        if (!document.querySelector('#modal-styles')) {
            const modalStyles = document.createElement('style');
            modalStyles.id = 'modal-styles';
            modalStyles.textContent = `
                @keyframes modalFadeIn {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
                
                .modal-content {
                    background: var(--mario-black);
                    border: 4px solid var(--mario-white);
                    max-width: 500px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                    font-family: var(--pixel-font);
                    color: var(--mario-white);
                }
                
                .modal-header {
                    background: var(--mario-red);
                    padding: 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 2px solid var(--mario-white);
                }
                
                .modal-title {
                    font-size: 10px;
                    color: var(--mario-white);
                    margin: 0;
                }
                
                .modal-close {
                    background: transparent;
                    border: 2px solid var(--mario-white);
                    color: var(--mario-white);
                    font-size: 16px;
                    width: 30px;
                    height: 30px;
                    cursor: pointer;
                    font-family: var(--pixel-font);
                }
                
                .modal-close:hover {
                    background: var(--mario-white);
                    color: var(--mario-black);
                }
                
                .modal-body {
                    padding: 25px;
                }
                
                .coming-soon-content {
                    text-align: center;
                }
                
                .construction-icon {
                    font-size: 48px;
                    margin-bottom: 15px;
                }
                
                .coming-soon-content h4 {
                    font-size: 12px;
                    color: var(--mario-yellow);
                    margin-bottom: 15px;
                }
                
                .coming-soon-content p {
                    font-size: 8px;
                    line-height: 1.5;
                    margin-bottom: 15px;
                }
                
                .coming-soon-content ul {
                    text-align: left;
                    font-size: 8px;
                    line-height: 1.6;
                    margin: 15px 0;
                    padding-left: 20px;
                }
                
                .coming-soon-content li {
                    margin-bottom: 5px;
                }
                
                .eta-text {
                    font-size: 9px;
                    color: var(--mario-green);
                    margin: 20px 0;
                }
                
                .modal-actions {
                    display: flex;
                    gap: 15px;
                    justify-content: center;
                    margin-top: 20px;
                    flex-wrap: wrap;
                }
                
                .notify-btn, .contact-btn {
                    background: var(--mario-blue);
                    border: 2px solid var(--mario-white);
                    color: var(--mario-white);
                    font-family: var(--pixel-font);
                    font-size: 7px;
                    padding: 8px 12px;
                    cursor: pointer;
                    text-decoration: none;
                    transition: all 0.2s ease;
                    display: inline-block;
                }
                
                .notify-btn:hover, .contact-btn:hover {
                    background: var(--mario-yellow);
                    color: var(--mario-black);
                    transform: translateY(-1px);
                }
                
                .contact-btn {
                    background: var(--mario-green);
                }
                
                @media (max-width: 480px) {
                    .modal-content {
                        width: 95%;
                        margin: 10px;
                    }
                    
                    .modal-actions {
                        flex-direction: column;
                        align-items: center;
                    }
                    
                    .notify-btn, .contact-btn {
                        width: 100%;
                        max-width: 200px;
                    }
                }
            `;
            document.head.appendChild(modalStyles);
        }
        
        document.body.appendChild(modal);
        
        // Close modal on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                this.playSound('menuClick');
            }
        });
        
        // Close modal on escape key
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', escapeHandler);
                this.playSound('menuClick');
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }

    showNotifyForm(projectId) {
        this.showMessage('Notification feature will be available soon! For now, please check back regularly for updates.', 'info');
        this.playSound('success');
    }

    // Utility Functions
    showMessage(text, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `case-message ${type}`;
        messageDiv.textContent = text;
        messageDiv.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'error' ? 'var(--mario-red)' : type === 'success' ? 'var(--mario-green)' : 'var(--mario-blue)'};
            color: var(--mario-white);
            padding: 15px 20px;
            border: 3px solid var(--mario-white);
            font-family: var(--pixel-font);
            font-size: 8px;
            z-index: 10001;
            max-width: 90%;
            text-align: center;
            animation: messageSlideIn 0.3s ease-out;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        `;
        
        // Add message animation styles if not already present
        if (!document.querySelector('#message-styles')) {
            const messageStyles = document.createElement('style');
            messageStyles.id = 'message-styles';
            messageStyles.textContent = `
                @keyframes messageSlideIn {
                    0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                    100% { opacity: 1; transform: translateX(-50%) translateY(0px); }
                }
            `;
            document.head.appendChild(messageStyles);
        }
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateX(-50%) translateY(-20px)';
            setTimeout(() => messageDiv.remove(), 300);
        }, 4000);
    }

    preloadImages() {
        const images = [
            'https://i.imgur.com/BQg1BIZ.png', // Mario sprite
            'https://i.imgur.com/H6so7ce.png', // Character sprite
            'https://files.catbox.moe/v44o0r.webp', // Overview background
            'https://files.catbox.moe/bxaw1s.webp', // Projects background
            'https://files.catbox.moe/i9yllq.webp'   // About background
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    handleResize() {
        // Handle responsive adjustments
        const isMobile = window.innerWidth <= 768;
        const projectsGrid = document.querySelector('.projects-grid');
        
        if (projectsGrid && isMobile) {
            // Adjust grid for mobile
            projectsGrid.style.gridTemplateColumns = '1fr';
        }
    }
}

// Global Functions
function navigateToSection(sectionName) {
    if (window.caseStudyPortfolio) {
        window.caseStudyPortfolio.navigateToSection(sectionName);
    }
}

function openCaseStudy(projectId) {
    if (window.caseStudyPortfolio) {
        window.caseStudyPortfolio.openCaseStudy(projectId);
    }
}

// Initialize the case study portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.caseStudyPortfolio = new CaseStudyPortfolio();
});

// Performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
        if (entry.entryType === 'navigation') {
            console.log('Case study page load time:', entry.loadEventEnd - entry.loadEventStart, 'ms');
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
    // Skip to main content with Alt+S
    if (e.altKey && e.key.toLowerCase() === 's') {
        const mainContent = document.querySelector('.case-studies-world');
        if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView();
        }
    }
});

// Add focus indicators for keyboard navigation
document.addEventListener('focus', (e) => {
    if (e.target.matches('.nav-btn, .explore-btn, .contact-btn, .view-case-btn')) {
        e.target.style.outline = '3px solid var(--mario-yellow)';
        e.target.style.outlineOffset = '2px';
    }
}, true);

document.addEventListener('blur', (e) => {
    if (e.target.matches('.nav-btn, .explore-btn, .contact-btn, .view-case-btn')) {
        e.target.style.outline = 'none';
    }
}, true);

// Service Worker Registration (for offline functionality)
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('../sw.js')
            .then(registration => {
                console.log('Case Study SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('Case Study SW registration failed: ', registrationError);
            });
    });
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CaseStudyPortfolio;
}