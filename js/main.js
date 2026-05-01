const projectsData = [
    {
        num: '01',
        name: 'Pokédex UI',
        image: '../assets/img/projects/pokedex-image-modal.png',
        descShort: 'Aplicação que consome a PokeAPI com busca em tempo real, dark mode e carregamento progressivo.',
        descLong: 'Aplicação que consome a PokeAPI utilizando fetch e async/await, com busca em tempo real por nome ou número, dark mode, carregamento progressivo com paginação e renderização dinâmica de dados no DOM.',
        tags: ['HTML', 'Tailwind CSS', 'JavaScript', 'API', 'fetch/async-await'],
        highlights: [
            'Consumo de API REST com fetch e async/await',
            'Busca em tempo real com lista completa de 1000+ pokémons',
            'Dark mode com Tailwind e toggle de classe',
            'Modal dinâmico com dados detalhados via múltiplos endpoints da API',
        ],
        live: 'https://seu-deploy.com',
        code: 'https://github.com/seu-usuario/pokedex',
    },

    {
        num: '02',
        name: 'Banco de Talentos Nexus',
        image: '../assets/img/projects/talent-pool-nexus-print-desktop.png',
        descShort: 'CLanding page de banco de talentos com formulário validado no front e back-end, armazenamento em JSON e suporte a envio de currículo.',
        descLong: 'Landing page de banco de talentos para desenvolvedores, com formulário de candidatura completo. O formulário valida os dados no front e no back, salva candidatos em JSON e armazena o currículo enviado.',
        tags: ['HTML', 'Tailwind', 'CSS', 'JavaScript', 'PHP', 'JSON'],
        highlights: [
            'Validação completa de formulário no front-end e no back-end',
            'Envio de dados e arquivos com fetch e FormData',
            'Upload de currículo com controle de tipo e tamanho de arquivo',
            'Persistência de dados em JSON e armazenamento de arquivos no servidor',
        ],
        live: 'https://seu-deploy.com',
        code: 'https://github.com/seu-usuario/calculadora-imc',
    },

    {
        num: '03',
        name: 'Pomodoro Focus Spell',
        image: '../assets/img/projects/pomodoro-print-desktop.png',
        descShort: 'Pomodoro temático com modos de sessão, animações visuais e salvamento automático do progresso via localStorage.',
        descLong: 'Pomodoro temático com modos de foco personalizados, controle de sessões em tempo real e salvamento automático no navegador. Possui interface dinâmica com animações e layout responsivo.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        highlights: [
            'Controle de timer com setInterval e gerenciamento de estado',
            'Persistência de sessões utilizando localStorage',
            'Interface dinâmica com renderização e manipulação do DOM',
            'Animações visuais com CSS e feedback interativo ao usuário',
        ],
        live: 'https://seu-deploy.com',
        code: 'https://github.com/seu-usuario/calculadora-imc',
    },

    {
        num: '04',
        name: 'História dos Meus Gatinhos',
        image: '../assets/img/projects/irmaos-gatinhos.desktop.png',
        descShort: 'SPA responsiva com animações ao scroll, cards interativos e modais, construída com Bootstrap 5.',
        descLong: 'Página interativa desenvolvida para apresentar histórias e características de forma visual e dinâmica. Possui efeitos de animação ao rolar a página, cards interativos com efeito flip, galerias de imagens em modal e layout totalmente responsivo.',
        tags: ['HTML', 'CSS', 'Bootstrap', 'AOS'],
        highlights: [
            'Animações ao scroll utilizando AOS (Animate On Scroll)',
            'Cards interativos com efeito flip usando CSS e JavaScript',
            'Galeria de imagens em carrossel dentro de modais',
            'Layout responsivo com Bootstrap 5',
        ],
        live: 'https://seu-deploy.com',
        code: 'https://github.com/seu-usuario/gatinhos',
    },

    {
        num: '05',
        name: 'Calculadora de IMC',
        image: '../assets/img/projects/calculadora-img-modal.png',
        descShort: 'Calculadora de IMC com validação de inputs e modal dinâmico que varia conforme o resultado.',
        descLong: 'Calculadora de IMC desenvolvida com JavaScript puro que recebe peso e altura, realiza o cálculo e exibe o resultado em um modal interativo. O sistema aplica mudanças visuais dinâmicas conforme a categoria do IMC, além de incluir validação de dados e manipulação do DOM para controle de interface.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        highlights: [
            'Cálculo de IMC com validação de entradas em JavaScript',
            'Manipulação do DOM para exibição dinâmica de resultados',
            'Modal interativo com overlay e efeito de blur',
            'Alteração de estilos com base na categoria do resultado',
        ],
        live: 'https://seu-deploy.com',
        code: 'https://github.com/seu-usuario/calculadora-imc',
    },
   
];

const backdrop   = document.getElementById('projModalBackdrop');
const closeBtn   = document.getElementById('projModalClose');
const modalNum   = document.getElementById('modalNum');
const modalTitle = document.getElementById('modalTitle');
const modalDesc  = document.getElementById('modalDesc');
const modalTags  = document.getElementById('modalTags');
const modalHL    = document.getElementById('modalHighlights');
const modalHLSec = document.getElementById('modalHighlightsSection');
const modalEmoji = document.getElementById('modalEmoji');
const modalThumb = document.getElementById('modalThumb');
const modalLive  = document.getElementById('modalLive');
const modalCode  = document.getElementById('modalCode');

function openModal(index) {
    const p = projectsData[index];
    if (!p) return;

    modalNum.textContent   = p.num;
    modalTitle.textContent = p.name;
    modalDesc.textContent  = p.descLong || p.descShort;
    modalLive.href         = p.live || '#';
    modalCode.href         = p.code || '#';

    if (p.image) {
        modalThumb.innerHTML = `<img src="${p.image}" alt="${p.name}">`;
    } else {
        modalThumb.innerHTML = `<span id="modalEmoji">${p.emoji}</span>`;
    }

    modalTags.innerHTML = p.tags
        .map(t => `<span class="project-tag">${t}</span>`)
        .join('');

    if (p.highlights && p.highlights.length) {
        modalHLSec.hidden = false;
        modalHL.innerHTML = p.highlights
            .map(h => `<li>${h}</li>`)
            .join('');
    } else {
        modalHLSec.hidden = true;
    }

    backdrop.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
}

function closeModal() {
    backdrop.hidden = true;
    document.body.style.overflow = '';
}

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.project, 10);
        openModal(idx);
    });

    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const idx = parseInt(card.dataset.project, 10);
            openModal(idx);
        }
    });
});

closeBtn.addEventListener('click', closeModal);

backdrop.addEventListener('click', e => {
    if (e.target === backdrop) closeModal();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !backdrop.hidden) closeModal();
});

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