// Mobile menu
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));

  // Subject data
  const subjects = [
    {icon:"∑", title:"Matematika", desc:"Aljabar, geometri, statistika dari dasar sampai siap UTBK.", meta:"86 video · 420 soal"},
    {icon:"⚛", title:"Fisika", desc:"Konsep mekanika dan listrik dijelaskan lewat simulasi visual.", meta:"54 video · 310 soal"},
    {icon:"🧬", title:"Biologi", desc:"Dari sel sampai ekosistem, dengan diagram interaktif.", meta:"61 video · 280 soal"},
    {icon:"✎", title:"Bahasa Indonesia", desc:"Teks, tata bahasa, dan latihan menulis dengan koreksi otomatis.", meta:"47 video · 190 soal"},
    {icon:"🌍", title:"Geografi & Sejarah", desc:"Peta interaktif dan linimasa peristiwa penting Indonesia.", meta:"39 video · 150 soal"},
    {icon:"A", title:"Bahasa Inggris", desc:"Grammar, listening, dan speaking practice dengan AI feedback.", meta:"58 video · 240 soal"},
  ];

  const grid = document.getElementById('subjectGrid');
  subjects.forEach(s => {
    const card = document.createElement('div');
    card.className = 'subject-card reveal';
    card.innerHTML = `
      <div class="icon">${s.icon}</div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
      <div class="meta">${s.meta}</div>
    `;
    grid.appendChild(card);
  });

  // Reveal on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('show');
        observer.unobserve(e.target);
      }
    });
  }, {threshold:0.15});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Animated stat counters
  function animateCount(el, target, suffix=""){
    let count = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const tick = () => {
      count += step;
      if(count >= target){ el.textContent = target.toLocaleString('id-ID') + suffix; return; }
      el.textContent = count.toLocaleString('id-ID') + suffix;
      requestAnimationFrame(tick);
    };
    tick();
  }
  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){
        animateCount(document.getElementById('statSiswa'), 48500, "+");
        animateCount(document.getElementById('statVideo'), 1200, "+");
        animateCount(document.getElementById('statSoal'), 9600, "+");
        animateCount(document.getElementById('statGuru'), 180, "+");
        statsObserver.disconnect();
      }
    });
  }, {threshold:0.4});
  statsObserver.observe(document.querySelector('.stats'));

  // Testimonial rotator
  const testimonials = [
    {quote:"\"Dulu nilai Matematika saya selalu di bawah rata-rata. Setelah tiga bulan pakai Cerlang, saya akhirnya paham logika di balik rumus, bukan cuma hafal.\"", who:"— RAFI A., KELAS 9, JAKARTA"},
    {quote:"\"Rangkuman otomatisnya sangat membantu pas mau ujian. Saya nggak perlu nulis ulang catatan dari video.\"", who:"— DINA P., KELAS 11, SURABAYA"},
    {quote:"\"Forum tanya jawabnya cepat dibalas pengajar asli, bukan cuma jawaban template.\"", who:"— BIMA S., KELAS 10, MEDAN"},
  ];
  const quoteText = document.getElementById('quoteText');
  const quoteWho = document.getElementById('quoteWho');
  const dotsWrap = document.getElementById('testiDots');
  let activeIdx = 0;

  testimonials.forEach((t, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => setTestimonial(i));
    dotsWrap.appendChild(dot);
  });

  function setTestimonial(i){
    activeIdx = i;
    quoteText.style.opacity = 0;
    setTimeout(() => {
      quoteText.textContent = testimonials[i].quote;
      quoteWho.textContent = testimonials[i].who;
      quoteText.style.opacity = 1;
    }, 200);
    document.querySelectorAll('.testi-dots .dot').forEach((d, idx) => {
      d.classList.toggle('active', idx === i);
    });
  }
  quoteText.style.transition = 'opacity 0.2s ease';
  setInterval(() => setTestimonial((activeIdx + 1) % testimonials.length), 6000);

  // CTA buttons
  document.getElementById('ctaCoba').addEventListener('click', () => alert('Pendaftaran gratis 7 hari akan segera dibuka. Terima kasih sudah tertarik dengan Cerlang!'));
  document.getElementById('ctaBawah').addEventListener('click', () => alert('Pendaftaran gratis 7 hari akan segera dibuka. Terima kasih sudah tertarik dengan Cerlang!'));