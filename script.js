// Global project metadata
const projectsData = {
  urlshortener: {
    title: "URL_Shortner",
    status: "Live",
    statusClass: "badge-live",
    desc: "A high-concurrency URL shortener API handling instant redirections, alias mappings, and request telemetry.",
    features: [
      "Base62 encoding algorithms converting auto-incremented database IDs into lightweight short tokens.",
      "High-speed redirection middleware routing users to target links with minimal HTTP latency.",
      "Caching layer powered by Redis/Spring Cache storing active URL pairs to bypass relational lookups.",
      "Basic request click analytics recording user-agents, IP addresses, referrers, and visit timestamps.",
      "Relational table layout in MySQL with transactional isolations preventing hash collisions."
    ],
    tags: ["Java", "Spring Boot", "MySQL", "Redis", "REST API", "Spring MVC"],
    codeLink: "https://github.com/Mritunjay28/URL_Shortner",
    liveLink: "https://mrti.netlify.app/"
  },
  aicontent: {
    title: "AI_Content_Repurposer",
    status: "Live",
    statusClass: "badge-live",
    desc: "An intelligent content transformation platform that repurposes lengthy textual files, online articles, or media transcripts into customized marketing newsletters and social summaries.",
    features: [
      "Generative AI model integrations with OpenAI GPT and Google Gemini API for semantic content analysis.",
      "Customizable transformation parameters allowing users to define tone, length, platform limits, and layouts.",
      "Automated extraction pipelines generating clean markdown documents, newsletter emails, and bullet summaries.",
      "Thymeleaf UI bindings coupled with Spring Boot REST controllers for a responsive developer interface.",
      "Asynchronous task executor threads processing multiple heavy AI requests without blocking main threads."
    ],
    tags: ["Java", "Spring Boot", "OpenAI API", "Gemini API", "REST API", "Thymeleaf"],
    codeLink: "https://github.com/Mritunjay28/AI_Content_Repurposer",
    liveLink: "https://mrituai.netlify.app/"
  },
  riskengine: {
    title: "Financial Risk Engine",
    status: "GitHub",
    statusClass: "badge-not-deployed",
    desc: "An event-driven pipeline that ingests financial news and social media text, scores it with FinBERT NLP, and automatically stress-tests a synthetic $585M multi-asset portfolio when a high-impact risk signal is detected. Built for the S&P Global & CRISIL Code to Connect hackathon.",
    features: [
      "FinBERT NLP service on FastAPI scoring sentiment from -1 to +1 and classifying text into 7 financial event types with an explainable 1-10 impact score.",
      "Rule A1 auto-trigger that runs a portfolio stress test whenever a signal reaches an impact score of 7 or higher.",
      "Deterministic stress testing on a synthetic $585M, 15-holding portfolio with per-asset P&L, sector attribution, and VaR 95/99.",
      "Spring Boot orchestrator persisting every signal and stress-test result to PostgreSQL as a complete audit trail.",
      "React dashboard visualizing risk signals, portfolio impact charts, and stress test history, with all four services wired via Docker Compose."
    ],
    tags: ["Java", "Spring Boot", "FastAPI", "FinBERT", "PostgreSQL", "React", "Docker"],
    codeLink: "https://github.com/Mritunjay28/iiit-bhubaneswar-mritunjay-senapati-hackathon",
    liveLink: "#"
  },
};

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSpotlight();
  initScrambler();
  initMobileMenu();
  initHeaderScroll();
  initScrollReveal();
});

// --- Theme Management ---
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const sunIcon = themeToggle.querySelector('.sun-icon');
  const moonIcon = themeToggle.querySelector('.moon-icon');

  function updateIcons(isDark) {
    if (isDark) {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    } else {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    }
  }

  // Initial Sync
  const isDark = document.documentElement.classList.contains('dark');
  updateIcons(isDark);

  themeToggle.addEventListener('click', () => {
    const willBeDark = !document.documentElement.classList.contains('dark');
    if (willBeDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    updateIcons(willBeDark);
  });
}

// --- Spotlight Glow Card Effect ---
function initSpotlight() {
  const cards = document.querySelectorAll('.bento-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  });
}

// --- Text Scrambler (Glitch Name Effect) ---
function initScrambler() {
  const nameEl = document.getElementById('heroName');
  if (!nameEl) return;

  const originalText = nameEl.innerText;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}|:<>?-=[]\\;',./";
  let interval = null;

  nameEl.addEventListener('mouseover', () => {
    let iteration = 0;
    clearInterval(interval);

    interval = setInterval(() => {
      nameEl.innerText = originalText
        .split("")
        .map((char, index) => {
          if (index < iteration) {
            return originalText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      if (iteration >= originalText.length) {
        clearInterval(interval);
        nameEl.innerText = originalText;
      }

      iteration += 1 / 3;
    }, 30);
  });
}



// --- Project Details Modal Actions ---
window.openProjectModal = function (projectId) {
  const data = projectsData[projectId];
  if (!data) return;

  const modal = document.getElementById('projectModal');
  const title = document.getElementById('modalTitle');
  const status = document.getElementById('modalStatus');
  const desc = document.getElementById('modalDesc');
  const features = document.getElementById('modalFeatures');
  const tags = document.getElementById('modalTags');
  const codeLink = document.getElementById('modalCodeLink');
  const liveLink = document.getElementById('modalLiveLink');

  // Fill in content
  title.innerText = data.title;

  // Status Badge
  status.className = `badge ${data.statusClass}`;
  status.innerHTML = `<span class="badge-dot"></span>${data.status}`;

  desc.innerText = data.desc;

  // Features List
  features.innerHTML = '';
  data.features.forEach(f => {
    const li = document.createElement('li');
    li.innerText = f;
    features.appendChild(li);
  });

  // Tech tags
  tags.innerHTML = '';
  data.tags.forEach(t => {
    const span = document.createElement('span');
    span.className = 'badge badge-secondary';
    span.innerText = t;
    tags.appendChild(span);
  });

  // Footer Links
  codeLink.href = data.codeLink;
  if (data.liveLink === '#') {
    liveLink.style.display = 'none';
  } else {
    liveLink.style.display = 'inline-flex';
    liveLink.href = data.liveLink;
  }

  // Open modal
  modal.classList.add('open');
  document.body.style.overflow = 'hidden'; // Stop page scrolling
};

window.closeProjectModal = function (event) {
  const modal = document.getElementById('projectModal');

  // Close only if click is overlay background or explicitly triggered
  if (event === null || event.target === modal) {
    modal.classList.remove('open');
    document.body.style.overflow = ''; // Resume scrolling
  }
};

// Listen for Escape key to close modal
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal(null);
  }
});

// --- Mobile Navigation Menu ---
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
  });

  // Close mobile nav when link is clicked
  const links = menu.querySelectorAll('.nav-link');
  links.forEach(l => {
    l.addEventListener('click', () => {
      menu.classList.remove('open');
    });
  });
}

// --- Header Scroll Effect ---
function initHeaderScroll() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

// --- Scroll Reveal ---
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const targets = document.querySelectorAll('.project-item, .experience-item, .tech-groups > div');
  targets.forEach(t => t.classList.add('reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  targets.forEach(t => io.observe(t));
}
