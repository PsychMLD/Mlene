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
    "tell me about yourself": "I'm a recent psychology graduate with a strong interest in [mention areas of interest, e.g., clinical psychology, organizational psychology, research]. I have experience in [mention internships, projects, or relevant coursework], and I'm eager to apply my knowledge in a professional setting.",
    "why did you choose psychology": "I've always been fascinated by human behavior and mental processes. I chose psychology because I wanted to understand how people think, feel, and behave, and to contribute to improving mental well-being and workplace dynamics.",
    "what are your strengths": "I have strong analytical and problem-solving skills, excellent communication abilities, and a deep understanding of psychological principles. I'm also empathetic and skilled at building rapport with others, which is valuable in psychology-related roles.",
    "what are your weaknesses": "One area I’ve been working on is [mention a real but improvable weakness, e.g., public speaking or handling large datasets]. However, I actively seek opportunities to improve through [mention strategies like practice, coursework, or mentorship].",
    "how do you handle stress": "I use a combination of time management, mindfulness, and self-care techniques to manage stress effectively. Understanding psychological coping mechanisms also helps me stay resilient under pressure.",
    "what experience do you have in psychology": "During my studies, I gained experience through [internships, research projects, volunteer work, etc.]. I worked on [mention a specific project or experience] that enhanced my skills in [assessment, counseling, data analysis, etc.].",
    "why should we hire you": "I bring a strong foundation in psychology, a passion for applying psychological principles in real-world settings, and the ability to adapt and learn quickly. I’m eager to contribute my skills in [mention relevant job role or industry].",
    "where do you see yourself in five years": "I see myself growing professionally in a role that allows me to apply psychology to help individuals or organizations. I hope to gain expertise in [specific field, e.g., HR, mental health counseling, research] and contribute meaningfully to the field.",
    "how do you handle conflict": "I approach conflict with active listening and problem-solving. I try to understand all perspectives and work toward a solution that benefits everyone involved. My psychology background helps me navigate interpersonal challenges effectively.",
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

  // Progress bar
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('progress-bar').style.width = scrolled + '%';
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

  // Modal handling
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  const statItems = document.querySelectorAll('.stat-item');
  const modalCloseButtons = document.querySelectorAll('.modal-close');

  // Open modal
  statItems.forEach(item => {
    item.addEventListener('click', () => {
      const modalType = item.getAttribute('data-modal');
      const modal = document.getElementById(`${modalType}-modal`);
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });
  });

  // Close modal functions
  function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }

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
});