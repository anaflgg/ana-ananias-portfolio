const TEXTOS = ['Desenvolvedora Web'];
let charIdx = 0;
let apagando = false;
const elTypewriter = document.getElementById('typewriter');

function digitar() {
    const texto = TEXTOS[0];

    if (!apagando) {
        elTypewriter.textContent = texto.slice(0, ++charIdx);
        if (charIdx === texto.length) {
            apagando = true;
            setTimeout(digitar, 2000);
            return;
        }
    } else {
        elTypewriter.textContent = texto.slice(0, --charIdx);
        if (charIdx === 0) {
            apagando = false;
        }
    }

    setTimeout(digitar, apagando ? 50 : 100);
}

if (elTypewriter) digitar();

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';
const hackerEl = document.querySelector('.hacker-text');

function hackerLoop(el) {
    setInterval(() => {
        const tamanho = Math.floor(el.offsetWidth / 10);
        el.textContent = Array.from({ length: tamanho }, () =>
            chars[Math.floor(Math.random() * chars.length)]
        ).join('');
    }, 80);
}

if (hackerEl) hackerLoop(hackerEl);

const CHARS = '!<>-_\\/[]{}—=+*^?#@$%&ABCDEFabcdef0123456789';

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

function generateGlitchText(length = 12) {
  return Array.from({ length }, () => randomChar()).join('');
}

document.querySelectorAll('.skill-card').forEach(card => {
  const charsEl = card.querySelector('.glitch-chars');
  let interval = null;

  card.addEventListener('mouseenter', () => {
    card.classList.add('is-glitching');
    interval = setInterval(() => {
      const lines = Array.from({ length: 3 }, () => generateGlitchText(12));
      charsEl.textContent = lines.join('\n');
    }, 60);
  });

  card.addEventListener('mouseleave', () => {
    card.classList.remove('is-glitching');
    clearInterval(interval);
    interval = null;
  });
});

const cards = document.querySelectorAll('.project-card');

cards.forEach(card => {
  let isGlitching = false;

  card.addEventListener('mouseenter', () => {
    if (isGlitching) return;

    isGlitching = true;

    setTimeout(() => {
      card.classList.add('glitch-active');

      setTimeout(() => {
        card.classList.remove('glitch-active');
        isGlitching = false;
      }, 300);

    }, 80);
  });
});