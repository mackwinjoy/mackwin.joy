// Initialize AOS
AOS.init({
  duration: 800,
  once: true,
  offset: 50,
  easing: 'ease-in-out'
});

// Toggle hamburger menu
function toggleMenu() {
  const menu = document.getElementById('nav-menu');
  const hamburger = document.querySelector('.hamburger');
  menu.classList.toggle('hidden');
  hamburger.classList.toggle('active');
}

// Smooth scroll for navbar links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
    const menu = document.getElementById('nav-menu');
    const hamburger = document.querySelector('.hamburger');
    if (!menu.classList.contains('hidden') && window.innerWidth < 768) {
      menu.classList.add('hidden');
      hamburger.classList.remove('active');
    }
  });
});

// Typed.js for Hero Section
const typed = new Typed('#typed-text', {
  strings: [
    'Business Development Executive',
    'Lead Generation Expert',
    'Strategic Partnership Builder',
    'ERP Solutions Specialist'
  ],
  typeSpeed: 50,
  backSpeed: 30,
  backDelay: 1000,
  loop: true
});

// Lottie Animations
lottie.loadAnimation({
  container: document.getElementById('hero-lottie'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'https://assets.lottiefiles.com/packages/lf20_jcikwtgl.json' // Business growth animation
});

lottie.loadAnimation({
  container: document.getElementById('contact-lottie'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'https://assets.lottiefiles.com/packages/lf20_8wnpcegr.json' // Contact/mail animation
});

// Animated Counters
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
  const updateCounter = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / 200;
    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCounter, 20);
    } else {
      counter.innerText = target;
    }
  };
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      updateCounter();
      observer.disconnect();
    }
  }, { threshold: 0.5 });
  observer.observe(counter);
});

// Progress Bar Animation
const progressBars = document.querySelectorAll('.progress-fill');
progressBars.forEach(bar => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      const width = bar.getAttribute('data-width');
      bar.style.width = `${width}%`;
      observer.disconnect();
    }
  }, { threshold: 0.5 });
  observer.observe(bar);
});

// Skills Pie Chart
const skillsPieChart = new Chart(document.getElementById('skillsPieChart'), {
  type: 'pie',
  data: {
    labels: ['Lead Generation', 'Sales Negotiation', 'CRM Tools', 'Market Research'],
    datasets: [{
      data: [85, 80, 90, 75],
      backgroundColor: ['#4b5bd4', '#6a1b9a', '#f59e0b', '#ef4444'],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#1f2937',
          font: {
            size: window.innerWidth < 480 ? 8 : window.innerWidth < 768 ? 10 : 12
          },
          padding: window.innerWidth < 480 ? 8 : window.innerWidth < 768 ? 12 : 20
        }
      }
    },
    animation: {
      animateScale: true,
      animateRotate: true
    },
    layout: {
      padding: {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
      }
    }
  }
});

// Experience Bar Chart
const experienceBarChart = new Chart(document.getElementById('experienceBarChart'), {
  type: 'bar',
  data: {
    labels: ['Leads Increase', 'Engagement Increase'],
    datasets: [{
      label: 'Achievements (%)',
      data: [30, 40],
      backgroundColor: ['#4b5bd4', '#f59e0b'],
      borderColor: ['#4b5bd4', '#f59e0b'],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 50,
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#1f2937',
          font: {
            size: window.innerWidth < 480 ? 8 : window.innerWidth < 768 ? 10 : 12
          }
        }
      },
      x: {
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#1f2937',
          font: {
            size: window.innerWidth < 480 ? 8 : window.innerWidth < 768 ? 10 : 12
          }
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#1f2937',
          font: {
            size: window.innerWidth < 480 ? 8 : window.innerWidth < 768 ? 10 : 12
          }
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutBounce'
    },
    layout: {
      padding: {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
      }
    }
  }
});

// Handle window resize for charts
window.addEventListener('resize', function() {
  experienceBarChart.resize();
});

// Scroll-based active nav highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('#nav-menu a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('text-yellow-300');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('text-yellow-300');
    }
  });
});

// Auto dark mode based on system time
const hour = new Date().getHours();
if (hour >= 18 || hour < 6) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

// Basic 3D Cube using Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 600, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, 300);
document.getElementById('three-container').appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x6a1b9a });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(5, 5, 5);
scene.add(light);

camera.position.z = 5;

function animate3D() {
  requestAnimationFrame(animate3D);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate3D();
