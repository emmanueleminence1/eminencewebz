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
const modalChallenge = document.querySelector('[data-modal-challenge]');
const modalSolution = document.querySelector('[data-modal-solution]');
const modalImage = document.querySelector('[data-modal-image]');
const modalFeatures = document.querySelector('[data-modal-features]');
const modalTags = document.querySelector('[data-modal-tags]');
const closeModalBtn = document.querySelector('.close-modal');

const projectData = [
  {
    title: 'Luxe Interior Studio',
    category: 'Business',
    desc: 'A premium interior design agency site with immersive project galleries and inquiry flow.',
    challenge: 'The client needed a digital presence that matched their premium positioning without overwhelming visitors.',
    solution: 'I designed an experience-first layout with full-bleed imagery, subtle scroll animations, and a streamlined inquiry modal.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=700&h=420&fit=crop&auto=format',
    features: [
      'Full-screen hero gallery',
      'Animated project carousel',
      'Project inquiry form',
      'Mobile-first responsive layout',
    ],
    tags: ['React', 'Framer Motion', 'Tailwind CSS'],
  },
  {
    title: 'NovaTech SaaS Landing',
    category: 'Landing Pages',
    desc: 'High-converting product landing page for a B2B SaaS platform with animated feature sections.',
    challenge: 'The startup needed a landing page that clearly communicated a complex product value prop to non-technical buyers.',
    solution: 'I simplified the narrative into three benefit pillars, added animated demos, and built a pricing section that reduced hesitation.',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=700&h=420&fit=crop&auto=format',
    features: [
      'Animated feature demos',
      'Interactive pricing table',
      'Testimonials section',
      'Lead capture form',
    ],
    tags: ['React', 'TypeScript', 'CSS Modules'],
  },
  {
    title: 'Bloom Botanicals Shop',
    category: 'E-commerce',
    desc: 'A fully responsive e-commerce storefront for a boutique plant shop with cart and checkout.',
    challenge: 'A local plant shop needed to expand online but had no existing digital infrastructure.',
    solution: 'I built a complete e-commerce solution from scratch — product catalog, cart management, Stripe checkout, and order confirmation.',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=700&h=420&fit=crop&auto=format',
    features: [
      'Product catalog with filters',
      'Cart & wishlist',
      'Stripe checkout',
      'Order confirmation emails',
    ],
    tags: ['React', 'Stripe', 'Node.js'],
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
  modalChallenge.textContent = project.challenge;
  modalSolution.textContent = project.solution;
  modalImage.src = project.image;
  modalImage.alt = project.title;

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
