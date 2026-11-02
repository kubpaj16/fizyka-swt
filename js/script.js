// ============================================================
// Szczególna teoria względności – skrypty strony
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ===== 1. MENU HAMBURGER =====
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');

  if (menuToggle && mainNav) {
    const closeMenu = () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Otwórz menu nawigacyjne');
      mainNav.classList.remove('is-open');
    };
    const openMenu = () => {
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.setAttribute('aria-label', 'Zamknij menu nawigacyjne');
      mainNav.classList.add('is-open');
    };
    menuToggle.addEventListener('click', () => {
      menuToggle.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
    });
    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('is-open')) closeMenu();
      });
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && mainNav.classList.contains('is-open')) closeMenu();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
        closeMenu();
        menuToggle.focus();
      }
    });
  }

  // ===== 2. PRZEŁĄCZNIK MOTYWU =====
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const STORAGE_KEY = 'stw-theme';

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      if (themeToggle) {
        themeToggle.textContent = '☀️';
        themeToggle.setAttribute('aria-label', 'Włącz jasny motyw');
      }
    } else {
      root.removeAttribute('data-theme');
      if (themeToggle) {
        themeToggle.textContent = '🌙';
        themeToggle.setAttribute('aria-label', 'Włącz ciemny motyw');
      }
    }
  };

  const savedTheme = localStorage.getItem(STORAGE_KEY);
  if (savedTheme) applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem(STORAGE_KEY, newTheme);
    });
  }

  // ===== 3. KALKULATOR DYLATACJI CZASU =====
  const calcInput = document.getElementById('calc-velocity');
  const calcOutput = document.getElementById('calc-result');
  const calcValueLabel = document.getElementById('calc-velocity-value');
  const c = 299792458;

  const updateCalculator = () => {
    if (!calcInput || !calcOutput) return;
    let p = parseFloat(calcInput.value);
    if (isNaN(p) || p < 0) p = 0;
    if (p > 99.99) p = 99.99;
    const v = (p / 100) * c;
    const gamma = 1 / Math.sqrt(1 - (v * v) / (c * c));
    calcOutput.textContent = gamma.toFixed(4);
    if (calcValueLabel) calcValueLabel.textContent = p;
  };

  if (calcInput) {
    calcInput.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  // ===== 4. QUIZ =====
  const quizContainer = document.getElementById('quiz-container');
  const quizData = [
    { q: 'Kto sformułował szczególną teorię względności?',
      a: ['Isaac Newton', 'Albert Einstein', 'Niels Bohr'], correct: 1 },
    { q: 'Jaka jest prędkość światła w próżni (w przybliżeniu)?',
      a: ['3 000 km/s', '300 000 km/s', '30 000 km/s'], correct: 1 },
    { q: 'Co mówi drugi postulat STW?',
      a: ['Prędkość światła zależy od obserwatora',
          'Prędkość światła jest taka sama dla wszystkich obserwatorów inercjalnych',
          'Światło rozchodzi się w eterze'], correct: 1 },
    { q: 'Jak nazywa się efekt skrócenia długości w kierunku ruchu?',
      a: ['Dylatacja czasu', 'Kontrakcja Lorentza', 'Efekt Dopplera'], correct: 1 },
    { q: 'Który wzór wiąże masę i energię?',
      a: ['F = ma', 'E = mc²', 'p = mv'], correct: 1 }
  ];

  const renderQuiz = () => {
    if (!quizContainer) return;
    let html = '<form id="quiz-form" novalidate>';
    quizData.forEach((item, i) => {
      html += `<fieldset class="quiz-question"><legend>${i + 1}. ${item.q}</legend>`;
      item.a.forEach((ans, j) => {
        html += `<label><input type="radio" name="q${i}" value="${j}"> ${ans}</label>`;
      });
      html += '</fieldset>';
    });
    html += '<button type="submit" class="btn">Sprawdź wynik</button>';
    html += '</form>';
    html += '<p id="quiz-result" class="quiz-result" role="status" aria-live="polite"></p>';
    quizContainer.innerHTML = html;

    document.getElementById('quiz-form').addEventListener('submit', (e) => {
      e.preventDefault();
      let score = 0;
      quizData.forEach((item, i) => {
        const chosen = document.querySelector(`input[name="q${i}"]:checked`);
        if (chosen && parseInt(chosen.value, 10) === item.correct) score++;
      });
      const resultEl = document.getElementById('quiz-result');
      resultEl.textContent = `Twój wynik: ${score} / ${quizData.length}`;
      resultEl.classList.toggle('quiz-success', score === quizData.length);
    });
  };
  renderQuiz();

  // ===== 5. POWRÓT NA GÓRĘ =====
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    const toggleVisibility = () => {
      backToTop.hidden = window.scrollY < 400;
    };
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
