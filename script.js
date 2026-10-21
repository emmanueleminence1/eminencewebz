const body = document.body;
const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
const scrollTopBtn = document.querySelector('.scroll-top');

const setActiveLink = (path) => {
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    const isActive = href === path || (path === '/' && href === './index.html');
    link.classList.toggle('active', isActive);
  });
};

const updateHeader = () => {
  if (!header) return;
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};

const toggleMobileMenu = () => {
  if (!mobileMenu) return;
  const isOpen = mobileMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
};

window.addEventListener('scroll', () => {
  updateHeader();

  if (scrollTopBtn) {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }
});

if (menuToggle) {
  menuToggle.addEventListener('click', toggleMobileMenu);
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const currentPath = window.location.pathname.split('/').pop() || 'index.html';
setActiveLink(currentPath);
updateHeader();

const testimonials = [
  {
    name: 'Amara Osei',
    company: 'Osei Consulting Group',
    review:
      'EminenceWebz delivered a stunning website that immediately elevated our brand. Clients regularly compliment how professional and polished it looks. Absolutely worth every penny.',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&auto=format',
  },
  {
    name: 'Priya Nair',
    company: 'NovaTech Solutions',
    review:
      'From our first call to launch day, the process was smooth and professional. The site is fast, beautiful, and our conversion rate went up 34% in the first month.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format',
  },
  {
    name: 'James Harrington',
    company: 'Harrington & Co.',
    review:
      'I needed a portfolio site that reflected the quality of my work. EminenceWebz nailed it. Clean, fast, and exactly the professional image I was going for.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format',
  },
  {
    name: 'Sofia Martínez',
    company: 'Bloom Botanicals',
    review:
      'Our e-commerce store was transformed completely. The new site is intuitive, mobile-friendly, and our online sales doubled within two months of launch.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format',
  },
];

const reviewCard = document.querySelector('.review-card');
const reviewName = document.querySelector('[data-review-name]');
const reviewCompany = document.querySelector('[data-review-company]');
const reviewText = document.querySelector('[data-review-text]');
const reviewAvatar = document.querySelector('[data-review-avatar]');
const dots = document.querySelectorAll('.carousel-dots button');
const prevBtn = document.querySelector('[data-prev-review]');
const nextBtn = document.querySelector('[data-next-review]');
let reviewIndex = 0;
let reviewTimer;

function renderReview(index) {
  const review = testimonials[index];
  if (!review) return;

  reviewName.textContent = review.name;
  reviewCompany.textContent = review.company;
  reviewText.textContent = `"${review.review}"`;
  reviewAvatar.src = review.avatar;
  reviewAvatar.alt = review.name;

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === index);
  });
}

function nextReview() {
  reviewIndex = (reviewIndex + 1) % testimonials.length;
  renderReview(reviewIndex);
}

function prevReview() {
  reviewIndex = (reviewIndex - 1 + testimonials.length) % testimonials.length;
  renderReview(reviewIndex);
}

if (reviewCard) {
  renderReview(reviewIndex);
  reviewTimer = setInterval(nextReview, 5000);

  nextBtn.addEventListener('click', () => {
    nextReview();
    clearInterval(reviewTimer);
    reviewTimer = setInterval(nextReview, 5000);
  });

  prevBtn.addEventListener('click', () => {
    prevReview();
    clearInterval(reviewTimer);
    reviewTimer = setInterval(nextReview, 5000);
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      reviewIndex = index;
      renderReview(reviewIndex);
      clearInterval(reviewTimer);
      reviewTimer = setInterval(nextReview, 5000);
    });
  });
}

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length) {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;
      filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));

      projectCards.forEach((card) => {
        const matches = category === 'all' || card.dataset.category === category;
        card.style.display = matches ? '' : 'none';
      });
    });
  });
}

const modal = document.querySelector('.modal-backdrop');
const modalTitle = document.querySelector('[data-modal-title]');
const modalCategory = document.querySelector('[data-modal-category]');
const modalDesc = document.querySelector('[data-modal-desc]');
const modalRole = document.querySelector('[data-modal-role]');
const modalChallenge = document.querySelector('[data-modal-challenge]');
const modalSolution = document.querySelector('[data-modal-solution]');
const modalImage = document.querySelector('[data-modal-image]');
const modalFeatures = document.querySelector('[data-modal-features]');
const modalTags = document.querySelector('[data-modal-tags]');
const closeModalBtn = document.querySelector('.close-modal');
const modalLiveLink = document.querySelector('.modal-actions .button-primary');
const modalSourceLink = document.querySelector('.modal-actions .button-secondary');

const projectData = [
  {
    title: "Dunni's Kitchen",
    category: 'Business',
    desc: "A responsive website for a Portuguese seafood restaurant in Lisbon, with a menu organised by food section and one-tap WhatsApp ordering. Its clean, appetising layout puts the restaurant's dishes front and centre.",
    role: 'Restaurant website · Concept/demo build · Design and development',
    challenge: 'The restaurant needed a clear, appetising online presence that makes its menu easy to browse and ordering simple on mobile.',
    solution: 'I designed and developed a responsive restaurant website with food-section menu navigation and one-tap WhatsApp ordering links.',
    image: 'assets/img/dunnis-kitchen.png',
    imageAlt: "Homepage of Dunni's Kitchen, a Portuguese seafood restaurant website in Lisbon",
    liveUrl: 'https://dunnis-kitchen.nichesite.org/',
    hideSource: true,
    features: [
      'Menu organised by food section',
      'One-tap WhatsApp ordering links',
      'Responsive layout',
    ],
    tags: ['WordPress', 'Elementor', 'Astra (Starter Sites)', 'WhatsApp ordering links'],
  },
  {
    title: 'Kings Palace Estate',
    category: 'Real Estate',
    desc: 'A responsive real estate website for KINGS PALACE Estate, showcasing affordable apartments with detailed listings, estate information, and an easy inquiry flow for prospective tenants and buyers.',
    role: 'Real estate / apartment listings website · Design and development',
    challenge: 'Prospective tenants and buyers needed an easy way to explore affordable apartments and learn about the estate.',
    solution: 'I designed and developed a responsive real estate website with detailed apartment listings, estate information, and a straightforward inquiry flow.',
    image: 'assets/img/kings%20palace%20estate.png',
    imageAlt: 'Homepage of Kings Palace Estate, a real estate listings website',
    liveUrl: 'https://kingspalaceestate.netlify.app/',
    hideSource: true,
    features: [
      'Affordable apartment listings',
      'Estate information',
      'Inquiry flow for tenants and buyers',
      'Responsive layout',
    ],
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Node.js', 'Git'],
  },
  {
    title: 'JUMSA',
    category: 'Organisation',
    desc: "Official website for the Jos University Medical Students' Association (JUMSA). A responsive multi-page site presenting the association's mission, executive team, activities, and news & events, with a contact page for students who want to get involved.",
    role: 'Organisation website (student association) · Design and development',
    challenge: 'Students needed a central place to learn about the association, its leadership, activities, and how to participate.',
    solution: 'I designed and developed a responsive multi-page association website covering its mission, executive team, activities, news, events, and contact information.',
    image: 'assets/img/JUMSA.png',
    imageAlt: "Homepage of the JUMSA website, Jos University Medical Students' Association",
    liveUrl: 'https://jumsa.netlify.app/',
    hideSource: true,
    features: [
      'Association mission and executive team',
      'Activities, news, and events',
      'Contact page for students',
      'Responsive multi-page layout',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Git'],
  },
  {
    title: 'Marcus Webb Portfolio',
    category: 'Portfolio',
    desc: 'A creative portfolio for a motion graphics designer showcasing work through immersive scroll storytelling.',
    challenge: 'A motion designer wanted a portfolio as expressive as his work — not a standard grid.',
    solution: 'I built an immersive scroll-driven experience with parallax video backgrounds and 3D transitions between projects.',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=700&h=420&fit=crop&auto=format',
    features: [
      'Scroll-triggered animations',
      'Video backgrounds',
      '3D project reveals',
      'Custom cursor',
    ],
    tags: ['React', 'GSAP', 'Three.js'],
  },
  {
    title: 'Horizon Real Estate',
    category: 'Business',
    desc: 'Lead-generation website for a regional real estate agency with property search and agent profiles.',
    challenge: 'The agency had an outdated website that generated very few qualified leads from their target demographics.',
    solution: 'I redesigned around lead generation — featured listings hero, interactive map search, and a smart contact routing form.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700&h=420&fit=crop&auto=format',
    features: [
      'Interactive property map',
      'Agent profile pages',
      'Lead routing form',
      'Property search filters',
    ],
    tags: ['React', 'Supabase', 'Mapbox'],
  },
  {
    title: 'Summit Fitness Studio',
    category: 'Business',
    desc: 'Gym website with class scheduling, membership plans, and trainer profiles.',
    challenge: 'A gym wanted to convert foot traffic into website visits and online memberships.',
    solution: 'I created a high-energy design with a clear class schedule, membership CTA hierarchy, and integrated contact flow.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&h=420&fit=crop&auto=format',
    features: [
      'Class schedule grid',
      'Membership plan cards',
      'Trainer profiles',
      'Contact & trial form',
    ],
    tags: ['React', 'Tailwind CSS', 'EmailJS'],
  },
];

function openModal(projectName) {
  const project = projectData.find((item) => item.title === projectName);
  if (!project || !modal) return;

  modalTitle.textContent = project.title;
  modalCategory.textContent = project.category;
  modalDesc.textContent = project.desc;
  modalRole.textContent = project.role || '';
  modalRole.hidden = !project.role;
  modalChallenge.textContent = project.challenge;
  modalSolution.textContent = project.solution;
  modalImage.src = project.image;
  modalImage.alt = project.imageAlt || project.title;
  modalLiveLink.href = project.liveUrl || '#';
  modalLiveLink.textContent = project.liveUrl ? 'Live Site' : 'Live Preview';
  modalSourceLink.hidden = Boolean(project.hideSource);
  modalSourceLink.style.display = project.hideSource ? 'none' : '';

  if (project.liveUrl) {
    modalLiveLink.target = '_blank';
    modalLiveLink.rel = 'noopener noreferrer';
  } else {
    modalLiveLink.removeAttribute('target');
    modalLiveLink.removeAttribute('rel');
  }

  modalFeatures.innerHTML = project.features
    .map((item) => `<li><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 2"/></svg>${item}</li>`)
    .join('');

  modalTags.innerHTML = project.tags
    .map((tag) => `<span>${tag}</span>`)
    .join('');

  modal.classList.add('show');
}

const modalTriggers = document.querySelectorAll('[data-project-trigger]');
modalTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => openModal(trigger.dataset.projectTrigger));
});

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', () => modal.classList.remove('show'));
}

if (modal) {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.remove('show');
    }
  });
}

const form = document.querySelector('#contact-form');
const successBox = document.querySelector('.success-box');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const fields = {
      name: form.querySelector('[name="name"]'),
      email: form.querySelector('[name="email"]'),
      projectType: form.querySelector('[name="projectType"]'),
      message: form.querySelector('[name="message"]'),
    };

    let valid = true;

    Object.entries(fields).forEach(([key, field]) => {
      const errorEl = form.querySelector(`[data-error="${key}"]`);
      const value = field.value.trim();
      let message = '';

      if (key === 'name' && !value) {
        message = 'Name is required.';
        valid = false;
      }

      if (key === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          message = 'Email is required.';
          valid = false;
        } else if (!emailRegex.test(value)) {
          message = 'Please enter a valid email address.';
          valid = false;
        }
      }

      if (key === 'projectType' && !value) {
        message = 'Please select a project type.';
        valid = false;
      }

      if (key === 'message' && !value) {
        message = 'Message is required.';
        valid = false;
      }

      field.classList.toggle('error', !!message);
      if (errorEl) {
        errorEl.textContent = message;
      }
    });

    if (!valid) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    setTimeout(() => {
      form.reset();
      successBox.classList.add('show');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }, 1200);
  });
}
