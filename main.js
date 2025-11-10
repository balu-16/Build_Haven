document.addEventListener('DOMContentLoaded', function() {

  AOS.init({
    duration: 1000,
    once: true,
    offset: 100
  });

  const navbar = document.getElementById('mainNav');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
      backToTopBtn.classList.add('show');
    } else {
      navbar.classList.remove('scrolled');
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Sidebar functionality
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebarClose = document.getElementById('sidebarClose');
  const sidebarCloseFooter = document.getElementById('sidebarCloseFooter');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  function openSidebar() {
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', openSidebar);
  }

  if (sidebarClose) {
    sidebarClose.addEventListener('click', closeSidebar);
  }

  if (sidebarCloseFooter) {
    sidebarCloseFooter.addEventListener('click', closeSidebar);
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
  }

  // Close sidebar when clicking on any sidebar link
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', function() {
      closeSidebar();
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  const galleryModal = document.getElementById('galleryModal');
  if (galleryModal) {
    galleryModal.addEventListener('show.bs.modal', function (event) {
      const button = event.relatedTarget;
      const imageUrl = button.getAttribute('data-image');
      const caption = button.getAttribute('data-caption');

      const modalImage = document.getElementById('galleryModalImage');
      const modalLabel = document.getElementById('galleryModalLabel');

      modalImage.src = imageUrl;
      modalLabel.textContent = caption;
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    });
  }

  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your quote request! Our team will contact you shortly.');
      quoteForm.reset();

      const modal = bootstrap.Modal.getInstance(document.getElementById('quoteModal'));
      if (modal) {
        modal.hide();
      }
    });
  }

  const progressBars = document.querySelectorAll('.progress-bar');
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const progressObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const width = progressBar.style.width;
        progressBar.style.width = '0%';
        setTimeout(() => {
          progressBar.style.width = width;
        }, 100);
      }
    });
  }, observerOptions);

  progressBars.forEach(bar => {
    progressObserver.observe(bar);
  });

});
