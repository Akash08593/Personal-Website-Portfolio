/**
 * AKASH S - PORTFOLIO INTERACTIVITY & RECRUITER EXPERIENCE
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation & Mobile Drawer
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const backToTopBtn = document.getElementById('back-to-top');

    // Toggle Mobile Navigation
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isActive);
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // Scroll Handlers (Sticky Navbar + Scrollspy + Back to Top)
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        // Sticky Navbar
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to Top Button
        if (backToTopBtn) {
            if (scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        // Active Section Scrollspy
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // Reveal on scroll using IntersectionObserver
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.glass-card, .highlight-item, .feature-item-pill, .flow-step').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        revealObserver.observe(el);
    });

    // Keyboard ESC to close any open modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
            closeResumeModal();
        }
    });
});

// Scroll to Top Helper
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Copy to Clipboard Utility
function copyToClipboard(text, buttonElement) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showCopyFeedback(buttonElement);
        }).catch(() => {
            fallbackCopy(text, buttonElement);
        });
    } else {
        fallbackCopy(text, buttonElement);
    }
}

function fallbackCopy(text, buttonElement) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        showCopyFeedback(buttonElement);
    } catch (err) {
        console.error('Failed to copy text', err);
    }
    document.body.removeChild(textArea);
}

function showCopyFeedback(buttonElement) {
    const originalHTML = buttonElement.innerHTML;
    buttonElement.innerHTML = "<i class='bx bx-check' style='color:#10b981;'></i>";
    buttonElement.style.borderColor = '#10b981';
    
    setTimeout(() => {
        buttonElement.innerHTML = originalHTML;
        buttonElement.style.borderColor = '';
    }, 2000);
}

// Contact Form Handler (Direct mailto generation)
function handleContactSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('form-name').value.trim();
    const subject = document.getElementById('form-subject').value.trim();
    const message = document.getElementById('form-message').value.trim();
    const feedback = document.getElementById('form-feedback');

    if (!name || !subject || !message) {
        if (feedback) feedback.textContent = 'Please fill out all fields.';
        return;
    }

    const emailTo = 'Akash2810005@gmail.com';
    const emailSubject = encodeURIComponent(`[Portfolio Contact] ${subject} - from ${name}`);
    const emailBody = encodeURIComponent(`Hi Akash,\n\nName: ${name}\n\nMessage:\n${message}\n\nBest regards,\n${name}`);

    feedback.textContent = 'Opening your email client...';
    
    setTimeout(() => {
        window.location.href = `mailto:${emailTo}?subject=${emailSubject}&body=${emailBody}`;
        feedback.textContent = 'Email client triggered successfully.';
    }, 400);
}

// ==========================================================================
// MODAL LOGIC (Project Deep Dive & Resume Viewer)
// ==========================================================================

const projectDetails = {
    cloud: {
        title: "High Traffic Cloud Optimization using LSTM and PSO",
        category: "AI-Driven Cloud Optimization &bull; 06/2026 - 09/2026",
        description: "Developed an AI-driven cloud optimization system for monitoring and managing high-volume application traffic in real time. Implemented LSTM-based traffic prediction to forecast workloads and identify potential traffic spikes, along with a PSO-based resource optimization approach for efficient allocation across multiple cloud environments. Integrated traffic monitoring, workload prediction, and resource optimization to improve cloud performance and resource utilization.",
        sections: [
            {
                heading: "Problem Formulation",
                content: "Modern distributed applications experience fluctuating traffic patterns. Static over-provisioning incurs severe cloud cost overheads, while delayed auto-scaling causes latency degradation. The challenge is anticipating demand before traffic peaks and mathematically allocating workloads across multiple cloud providers."
            },
            {
                heading: "Predictive Modeling (LSTM)",
                content: "Employs a Long Short-Term Memory (LSTM) recurrent neural network trained on multi-scenario historical request sequences. The network analyzes sliding time-series windows (request counts, RPS growth rates, latency trends) to forecast forthcoming workload demand with zero look-ahead bias."
            },
            {
                heading: "Optimization Algorithm (Particle Swarm Optimization - PSO)",
                content: "Workload distribution is treated as a continuous multi-objective optimization problem. Candidate particles explore the continuous allocation space representing AWS, Azure, and GCP shares. The objective fitness function penalizes both estimated latency violations and operational cost, rapidly converging to an optimal Pareto distribution."
            },
            {
                heading: "Real-Time Monitoring Dashboard",
                content: "Developed a modern React + Vite dashboard interface providing synchronized real-time visibility into incoming workloads, predicted demand curves, swarm iteration convergence, and live allocation percentages across AWS, Azure, and GCP."
            }
        ],
        techStack: ["Python", "LSTM / Deep Learning", "Particle Swarm Optimization", "AWS", "Microsoft Azure", "Google Cloud (GCP)", "React + Vite", "FastAPI", "Docker"],
        githubUrl: "https://github.com/Akash08593"
    }
};

function openProjectModal(projectId) {
    const data = projectDetails[projectId];
    if (!data) return;

    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');

    let sectionsHTML = data.sections.map(sec => `
        <div style="margin-bottom: 1.5rem;">
            <h4 style="color: #38bdf8; font-size: 1.05rem; margin-bottom: 0.4rem;">${sec.heading}</h4>
            <p style="color: #cbd5e1; font-size: 0.93rem; line-height: 1.7;">${sec.content}</p>
        </div>
    `).join('');

    let techTagsHTML = data.techStack.map(tag => `
        <span style="font-family: var(--font-mono); font-size: 0.78rem; background: rgba(255,255,255,0.06); color: #22d3ee; padding: 0.3rem 0.65rem; border-radius: 0.4rem; border: 1px solid rgba(255,255,255,0.08);">${tag}</span>
    `).join('');

    modalContent.innerHTML = `
        <div style="margin-bottom: 1.75rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1);">
            <span style="font-family: var(--font-mono); font-size: 0.78rem; color: #06b6d4; text-transform: uppercase; letter-spacing: 1px;">${data.category}</span>
            <h2 id="modal-title" style="font-size: 1.65rem; font-weight: 800; margin: 0.35rem 0 0.75rem; color: #f8fafc;">${data.title}</h2>
            <p style="color: #94a3b8; font-size: 1rem; line-height: 1.6;">${data.description}</p>
        </div>

        <div style="margin-bottom: 1.75rem;">
            ${sectionsHTML}
        </div>

        <div style="margin-bottom: 1.75rem;">
            <h4 style="color: #f8fafc; font-size: 0.95rem; margin-bottom: 0.75rem;">Technology Stack:</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                ${techTagsHTML}
            </div>
        </div>

        <div style="display: flex; gap: 1rem; padding-top: 1.25rem; border-top: 1px solid rgba(255,255,255,0.1);">
            <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                <i class='bx bxl-github'></i> View Repository on GitHub
            </a>
            <button class="btn btn-outline btn-sm" onclick="closeProjectModal()">
                Close
            </button>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Resume Modal Open/Close
function openResumeModal() {
    const resumeModal = document.getElementById('resume-modal');
    if (resumeModal) {
        resumeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeResumeModal() {
    const resumeModal = document.getElementById('resume-modal');
    if (resumeModal) {
        resumeModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}
