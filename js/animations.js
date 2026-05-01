//  TYPEWRITER  //

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
        if (charIdx === 0) apagando = false;
    }

    setTimeout(digitar, apagando ? 50 : 100);
}

if (elTypewriter) digitar();

//  HACKER TEXT (sobre)  //

const HACKER_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';
const hackerEl = document.querySelector('.hacker-text');

function hackerLoop(el) {
    setInterval(() => {
        const tamanho = Math.floor(el.offsetWidth / 10);
        el.textContent = Array.from({ length: tamanho }, () =>
            HACKER_CHARS[Math.floor(Math.random() * HACKER_CHARS.length)]
        ).join('');
    }, 80);
}

if (hackerEl) hackerLoop(hackerEl);

//  GLITCH — SKILL CARDS  //

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#@$%&ABCDEFabcdef0123456789';

function randomChar() {
    return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
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

//  GLITCH — PROJECT CARDS  //

document.querySelectorAll('.project-card').forEach(card => {
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


//  NAVBAR — MOBILE MENU  //

const btnMenu = document.getElementById('btnMenu');
const mobileMenu = document.getElementById('mobileMenu');

btnMenu.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    btnMenu.classList.toggle('open', isOpen);
    btnMenu.setAttribute('aria-expanded', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);
});

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        btnMenu.classList.remove('open');
        btnMenu.setAttribute('aria-expanded', false);
        mobileMenu.setAttribute('aria-hidden', true);
    });
});

//  CONTACT TERMINAL  //

(function () {
    const terminal    = document.getElementById('contactTerminal');
    const linesEl     = document.getElementById('terminalLines');
    const content     = document.getElementById('contactContent');
    const section     = document.getElementById('contato');

    if (!terminal || !content || !section) return;

    const LINES = [
        { text: '> iniciando conexão segura...', cls: '' },
        { text: '> criptografando canal...',     cls: 'is-dim' },
        { text: '> protocolo: TLS 1.3 ✓',        cls: 'is-dim' },
        { text: '> localizando destino: ana@dev', cls: '' },
        { text: '> verificando disponibilidade...', cls: '' },
        { text: '> status: ONLINE',              cls: 'is-success' },
        { text: '> portas abertas: email / linkedin / github', cls: 'is-dim' },
        { text: '> conexão estabelecida ✓',      cls: 'is-success' },
    ];

    const LINE_DELAY    = 180;
    const HOLD_AFTER    = 400;
    const FADE_DURATION = 300;

    let hasRun = false;

    function typeLine(line, index) {
        return new Promise(resolve => {
            setTimeout(() => {
                const el = document.createElement('div');
                el.className = `terminal-line ${line.cls}`;
                el.innerHTML = line.text;
                linesEl.appendChild(el);
                resolve();
            }, index * LINE_DELAY);
        });
    }

    async function runTerminal() {
        if (hasRun) return;
        hasRun = true;

        terminal.classList.add('is-visible');

        for (let i = 0; i < LINES.length; i++) {
            await typeLine(LINES[i], i);
        }

        await new Promise(r => setTimeout(r, HOLD_AFTER + LINES.length * LINE_DELAY));

        terminal.classList.add('is-hiding');
        setTimeout(() => {
            terminal.style.display = 'none';
            content.classList.add('is-visible');
        }, FADE_DURATION);
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runTerminal();
                observer.disconnect();
            }
        });
    }, { threshold: 0.25 });

    observer.observe(section);
})();

//  CONTACT — COPIAR EMAIL  //

function copyEmail(event, el) {
    event.preventDefault();
    navigator.clipboard.writeText('anaflaviananias3@gmail.com').then(() => {
        const sub = el.querySelector('.contact-card-sub');
        const original = sub.textContent;
        sub.textContent = 'copiado! ✓';
        sub.style.color = 'var(--clr-neon)';
        setTimeout(() => {
            sub.textContent = original;
            sub.style.color = '';
        }, 2000);
    });
}