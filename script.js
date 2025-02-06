// Disable scrolling during the intro animation
document.body.style.overflow = 'hidden';

// Assuming your animation takes 3 seconds, set a timeout to re-enable scrolling after that
setTimeout(() => {
  document.body.style.overflow = ''; // Restore scrolling after intro animation
}, 4500); // Adjust time according to the length of your animation

document.addEventListener('DOMContentLoaded', () => {
  const intro = document.querySelector('.intro');
  const introText = document.querySelectorAll('.intro-text h1');
  const slider = document.querySelector('.slider');
  const content = document.querySelector('.content');

  const tl = gsap.timeline();

  tl.fromTo(intro, { opacity: 1 }, { opacity: 1, duration: 1 })
    .fromTo(introText[0].querySelector('span'), { y: '100%' }, { y: '0%', ease: "power2.inOut", duration: 0.7 }, '-=1')
    .fromTo(introText[1].querySelector('span'), { y: '100%' }, { y: '0%', ease: "power2.inOut", duration: 0.7 }, '-=0.6')
    .fromTo(introText[2].querySelector('span'), { y: '100%' }, { y: '0%', ease: "power2.inOut", duration: 0.7 }, '-=0.2')
    .to(introText[0].querySelector('span'), { y: '-100%', ease: "power2.inOut", duration: 0.7 }, '+=1')
    .to(introText[1].querySelector('span'), { y: '-100%', ease: "power2.inOut", duration: 0.7 }, '-=0.6')
    .to(introText[2].querySelector('span'), { y: '-100%', ease: "power2.inOut", duration: 0.7 }, '-=0.6')
    .to(slider, { y: '-100%', ease: "power2.inOut", duration: 1.5 })
    .to(intro, { y: '-100%', ease: "power2.inOut", duration: 1 }, '-=1.5')
    .fromTo(content, { opacity: 0, y: '30px' }, { opacity: 1, y: '0px', ease: "power2.inOut", duration: 0.5 }, '-=1');
});

document.addEventListener('DOMContentLoaded', function() {
  const chatInput = document.getElementById('chat-input');
  const sendButton = document.getElementById('send-button');
  const chatMessages = document.getElementById('chat-messages');

  const responses = {
    "hello": "Hi! How can I assist you today?",
    "how are you": "I'm doing great, thank you! Excited for this conversation.",
    "bye": "Goodbye! Thank you for your time. I hope to stay in touch!",
    "thank you": "You're welcome! I appreciate the opportunity to speak with you.",
    "default": "I'm not sure I understand. Could you please rephrase?"
  };

  function appendMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', sender);
    messageElement.textContent = message;
    if (sender === 'bot') {
      messageElement.style.color = 'rgb(213,192,155)';
    }
    if (sender === 'user') {
      messageElement.style.textAlign = 'right';
    }
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function getResponse(message) {
    const lowerCaseMessage = message.toLowerCase();
    return responses[lowerCaseMessage] || responses["default"];
  }

  sendButton.addEventListener('click', function() {
    const message = chatInput.value.trim();
    if (message) {
      appendMessage(message, 'user');
      chatInput.value = '';
      // Get response from the bot
      setTimeout(() => {
        const response = getResponse(message);
        appendMessage(response, 'bot');
      }, 1000);
    }
  });

  chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendButton.click();
    }
  });

  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: true
  });

  // Initialize Swiper
  new Swiper('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    autoplay: {
      delay: 3000,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  let lastScrollTop = 0;

  // Function to update the progress bar
  function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Calculate the scroll percentage
    const scrollPercentage = (scrollTop / documentHeight) * 100;

    // Update the progress bar height based on scroll percentage
    progressBar.style.height = `${Math.min(scrollPercentage, 100)}%`;
    
    // Store the scroll position to preserve state when modal opens
    lastScrollTop = scrollTop;
  }

  // Update progress bar on scroll
  window.addEventListener('scroll', updateProgressBar);

  // Function to open the modal and maintain scroll position
  function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling while modal is open
    modal.style.top = `${window.scrollY + window.innerHeight / 2 - modal.offsetHeight / 2}px`; // Center the modal vertically in the viewport
  }

  // Function to close the modal
  function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }

  // Example to handle modal open/close
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  const modalCloseButtons = document.querySelectorAll('.modal-close');

  // Open with some trigger
  document.querySelectorAll('.stat-item').forEach(item => {
    item.addEventListener('click', () => {
      const modalType = item.getAttribute('data-modal');
      const modal = document.getElementById(`${modalType}-modal`);

      // Check if modal is not already active (if so, do nothing)
      if (!modal.classList.contains('active')) {
        openModal(modal);
      }
    });
  });

  // Close with close button
  modalCloseButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal-overlay');
      closeModal(modal);
    });
  });

  // Close with overlay click
  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modalOverlays.forEach(modal => {
        if (modal.classList.contains('active')) {
          closeModal(modal);
        }
      });
    }
  });

  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Active nav link
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href').slice(1) === current) {
        item.classList.add('active');
      }
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  // Form animation
  const formGroups = document.querySelectorAll('.form-group');
  formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    const label = group.querySelector('label');

    input.addEventListener('focus', () => {
      label.classList.add('active');
    });

    input.addEventListener('blur', () => {
      if (input.value === '') {
        label.classList.remove('active');
      }
    });
  });

  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Message sent successfully!');
    contactForm.reset();
  });

  // Download CV button 
  document.getElementById('download-cv').addEventListener('click', (e) => {
    e.preventDefault();
    // Add your CV download logic here
    alert('CV download started!');
  });

  // Reveal animations on scroll
  const reveal = () => {
    const reveals = document.querySelectorAll('.project-card, .stat-item');
    reveals.forEach(element => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', reveal);
});