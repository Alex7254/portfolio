const getPreferredTheme = () => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    return storedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const applyTheme = () => {
  setTheme(getPreferredTheme());
}

const setTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  const icons = document.querySelectorAll('.theme-icon');

  // Loop through the icons and toggle the "display-none" class
  icons.forEach(icon => {
    icon.classList.toggle('display-none');
  });
  setTheme(newTheme);
}

// Apply theme on page load
applyTheme();

document.addEventListener('DOMContentLoaded', function () {
  const themeToggleButton = document.getElementById('themeToggle');

  themeToggleButton.addEventListener('click', toggleTheme);

  // Accordion
  let acc = document.getElementsByClassName("accordion");
  let i;

  for (i = 0; i < acc.length; i++) {

    acc[i].addEventListener("click", function () {
      let panel = this.nextElementSibling;
      this.classList.toggle("active");
      panel.classList.toggle("active");
    });
  }

  window.addEventListener('load', function (event) {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      // Page was refreshed
      console.log("Page was refreshed");
      // toggleTheme();
    }
  });
});

/**
 * Watches for elements with class starting with "anim-"
 * Adds "anim-triggered" when they enter viewport
 */
document.addEventListener('DOMContentLoaded', () => {
  const animElements = document.querySelectorAll('[class*="anim-"]:not(.anim-triggered)');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Only trigger when >50% of element is visible
      if (entry.intersectionRatio > 0.5) {
        entry.target.classList.add('anim-triggered');

        // Stagger children
        const children = entry.target.querySelectorAll('.anim-child');
        children.forEach((child, i) => {
          child.style.transitionDelay = `${i * 0.15}s`;
        });

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: [0, 0.1, 0.5, 1] // Multiple visibility checkpoints
  });

  animElements.forEach(el => observer.observe(el));
});