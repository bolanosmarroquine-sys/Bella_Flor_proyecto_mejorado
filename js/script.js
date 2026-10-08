// Bella Flor - interacciones del sitio
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-enter');
  requestAnimationFrame(() => document.body.classList.add('page-ready'));

  // Modo claro / oscuro con memoria del usuario
  const themeButton = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('bellaFlorTheme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  function updateThemeButton() {
    if (!themeButton) return;
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    themeButton.textContent = dark ? '☀️' : '🌙';
    themeButton.title = dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
    themeButton.setAttribute('aria-label', themeButton.title);
  }
  updateThemeButton();

  themeButton?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('bellaFlorTheme', next);
    updateThemeButton();
  });

  // Animación al aparecer
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, {threshold: .12});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Navegación interna suave
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // Productos
  document.querySelectorAll('.product .btn').forEach(button => {
    button.addEventListener('click', () => {
      const name = button.closest('.product')?.querySelector('h3')?.textContent || 'producto';
      alert('💗 Bella Flor: seleccionaste ' + name);
    });
  });

  const toggleInfo = document.getElementById('toggleInfo');
  const extraInfo = document.getElementById('extraInfo');
  toggleInfo?.addEventListener('click', () => {
    if (extraInfo) {
      extraInfo.style.display = extraInfo.style.display === 'none' ? 'block' : 'none';
    }
  });

  // Buscador de herramientas
  const search = document.getElementById('toolSearch');
  search?.addEventListener('input', () => {
    const value = search.value.toLowerCase().trim();
    document.querySelectorAll('.tool-item').forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(value) ? '' : 'block';
    });
  });
});

function mostrarMensaje(){
  const mensaje = document.getElementById('mensaje');
  if (mensaje) mensaje.textContent = 'JavaScript permite responder a acciones del usuario, como este clic. ✨';
}

const datosBellaFlor = [
  {nombre:"Ramo Rosado", tipo:"Ramo", precio:18.00},
  {nombre:"Osito de Amor", tipo:"Peluches", precio:22.00},
  {nombre:"Ramo + Peluche", tipo:"Combo", precio:30.00}
];

function calificar(){
  let score = 0;
  for(let i=1;i<=10;i++){
    const selected=document.querySelector('input[name="q'+i+'"]:checked');
    const answer=document.getElementById('a'+i);
    if(selected && answer && Number(selected.value)===Number(answer.value)) score++;
  }
  const r=document.getElementById('resultado');
  if(r){
    r.style.display='block';
    r.textContent='Obtuviste '+score+' de 10 respuestas correctas. '+
      (score>=8?'¡Excelente trabajo! 🌷':score>=5?'¡Vas muy bien! Repasa las páginas para reforzar.':'Te recomendamos volver a leer las páginas informativas y volver a intentarlo.');
    r.scrollIntoView({behavior:'smooth',block:'center'});
  }
}
