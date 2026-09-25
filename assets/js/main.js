document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile dropdown when a navigation link is clicked
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Sticky Navbar with Scroll State (Background Primary & Pure White Text)
  const mainNavbar = document.getElementById('main-navbar');
  const navbarContainer = document.getElementById('navbar-container');

  function handleNavbarScroll() {
    if (!mainNavbar) return;
    if (window.scrollY > 30) {
      mainNavbar.classList.add('bg-[#07141a]/95', 'backdrop-blur-md', 'shadow-lg', 'border-white/10');
      mainNavbar.classList.remove('border-transparent');
      if (navbarContainer) {
        navbarContainer.classList.remove('py-5', 'md:py-6');
        navbarContainer.classList.add('py-3.5', 'md:py-4');
      }
    } else {
      mainNavbar.classList.remove('bg-[#07141a]/95', 'backdrop-blur-md', 'shadow-lg', 'border-white/10');
      mainNavbar.classList.add('border-transparent');
      if (navbarContainer) {
        navbarContainer.classList.remove('py-3.5', 'md:py-4');
        navbarContainer.classList.add('py-5', 'md:py-6');
      }
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // FAQ Accordion Interactivity
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-header');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    if (btn && content && icon) {
      btn.addEventListener('click', () => {
        const isOpen = !content.classList.contains('hidden');
        
        // Close all items
        faqItems.forEach(otherItem => {
          const otherBtn = otherItem.querySelector('.faq-header');
          const otherContent = otherItem.querySelector('.faq-content');
          const otherIcon = otherItem.querySelector('.faq-icon');
          if (otherContent && otherIcon) {
            otherContent.classList.add('hidden');
            otherIcon.innerHTML = '<i class="fa-solid fa-plus text-xs"></i>';
          }
          if (otherBtn) {
            otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current item
        if (!isOpen) {
          content.classList.remove('hidden');
          icon.innerHTML = '<i class="fa-solid fa-xmark text-xs"></i>';
          btn.setAttribute('aria-expanded', 'true');
        } else {
          btn.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });

  // Testimonials Slider
  const testimonials = [
    {
      text: "When our in-house team faced bottlenecks in international dispatch, The Transport took over our freight routes. Every shipment arrived on schedule with complete customs compliance.",
      author: "Albert Flores",
      role: "Managing Director, PT Nusantara Ekspor"
    },
    {
      text: "Speed Supply provided outstanding air and road freight coordination for our European and Asian distribution lines. Our supply chain latency dropped by 35% within the first two quarters.",
      author: "Eleanor Pena",
      role: "VP of Supply Chain"
    },
    {
      text: "Their centralized documentation and real-time container tracking made international customs clearance seamless and worry-free. Highly recommended for scalable logistics.",
      author: "Darrell Steward",
      role: "Operations Director"
    }
  ];

  let currentTestimonial = 0;
  const testiText = document.getElementById('testi-text');
  const testiAuthor = document.getElementById('testi-author');
  const testiRole = document.getElementById('testi-role');
  const prevBtn = document.getElementById('prev-testi');
  const nextBtn = document.getElementById('next-testi');

  function updateTestimonial(index) {
    if (!testiText) return;
    testiText.classList.add('opacity-0');
    setTimeout(() => {
      const data = testimonials[index];
      testiText.textContent = data.text;
      if (testiAuthor) testiAuthor.textContent = data.author;
      if (testiRole) testiRole.textContent = data.role;
      testiText.classList.remove('opacity-0');
    }, 200);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      updateTestimonial(currentTestimonial);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      updateTestimonial(currentTestimonial);
    });
  }

  // Hero Background & Pagination Switcher
  const heroHeader = document.getElementById('hero-header');
  const heroImages = {
    1: 'assets/images/ChatGPT Image Sep 24, 2026, 11_30_26 AM.png',
    2: 'assets/images/ChatGPT Image Sep 24, 2026, 11_18_16 AM.png',
    3: 'assets/images/ChatGPT Image Sep 24, 2026, 11_30_29 AM.png'
  };

  // Preload images agar perpindahan instan dan mulus
  Object.values(heroImages).forEach(src => {
    const img = new Image();
    img.src = src;
  });

  const heroPaginationBtns = document.querySelectorAll('.hero-page-btn');
  heroPaginationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetIdx = btn.dataset.heroIndex || '2';

      // Update button styling state
      heroPaginationBtns.forEach(b => {
        b.classList.remove('text-white', 'font-bold');
        b.classList.add('text-gray-400');
        const line = b.querySelector('.hero-line');
        if (line) line.classList.add('hidden');
      });

      btn.classList.add('text-white', 'font-bold');
      btn.classList.remove('text-gray-400');
      const line = btn.querySelector('.hero-line');
      if (line) line.classList.remove('hidden');

      // Ubah background hero sesuai nomor gambar
      if (heroHeader && heroImages[targetIdx]) {
        heroHeader.style.backgroundImage = `url("${encodeURI(heroImages[targetIdx])}")`;
      }
    });
  });

  // Newsletter Form Feedback Handler
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterEmail = document.getElementById('newsletter-email');
  const newsletterMsg = document.getElementById('newsletter-msg');

  if (newsletterForm && newsletterEmail && newsletterMsg) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (newsletterEmail.value.trim()) {
        newsletterMsg.classList.remove('hidden');
        newsletterEmail.value = '';
        setTimeout(() => {
          newsletterMsg.classList.add('hidden');
        }, 5000);
      }
    });
  }
});
