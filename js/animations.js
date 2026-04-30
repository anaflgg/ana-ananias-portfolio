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
    const tamanho = 50; 

    setInterval(() => {
        el.textContent = Array.from({ length: tamanho }, () =>
            chars[Math.floor(Math.random() * chars.length)]
        ).join('');
    }, 80);
}

if (hackerEl) hackerLoop(hackerEl);