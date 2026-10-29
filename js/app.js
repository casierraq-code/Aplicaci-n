/**
 * Calma Mind - Aplicación de Autorregistro Emocional para el Acompañamiento Psicológico
 * Gestión de Estado, Navegación SPA, Registro Emocional, Diario TCC, Reporte Clínico y Orientación en Crisis.
 */

// Estado inicial y predeterminado (fiel a los mockups y al PRD)
const DEFAULT_STATE = {
  patient: {
    name: 'Sofía',
    therapist: 'Dra. Marcela R.',
    specialty: 'Terapia cognitivo-conductual',
    nextSessionDays: 3,
    periodLabel: 'Semana 18 - 24 Octubre'
  },
  // Check-ins diarios de estado emocional
  checkins: [
    {
      id: 'c1',
      date: 'Ayer • 20:30',
      timestamp: Date.now() - 86400000,
      emotion: 'calma',
      emotionLabel: 'Tranquilidad serena',
      contextSubtitle: 'Paseo nocturno',
      intensity: 4,
      note: 'Caminar sin auriculares me devolvió un poco de aire fresco tras el pico laboral de la tarde. El cuerpo aflojó los hombros.',
      tags: ['#Caminar', '#Desconexión'],
      somatic: ['Pecho relajado', 'Respiración fluida'],
      context: ['Descanso', 'Soledad tranquila']
    },
    {
      id: 'c2',
      date: 'Ayer • 11:15',
      timestamp: Date.now() - 120000000,
      emotion: 'ansiedad',
      emotionLabel: 'Tensión y sobrecarga',
      contextSubtitle: 'Reunión de equipo',
      intensity: 6,
      note: 'Noté rigidez en la mandíbula al asumir tareas imprevistas. Pude usar la respiración 4-4-6 antes de contestar.',
      tags: ['#Trabajo', '#Respiración'],
      somatic: ['Tensión en hombros'],
      context: ['Trabajo']
    }
  ],
  // Entradas del Diario de Situaciones y Experiencias (A-B-C-D / TCC)
  cbtEntries: [
    {
      id: 'e1',
      date: 'Martes, 22 Octubre',
      title: 'Conversación difícil en el trabajo',
      situation: 'Reunión de equipo donde hubo cambios inesperados de proyecto',
      thought: 'Sentí que cuestionaban mi criterio y que todo saldría mal.',
      reaction: 'Opresión en el pecho y ganas de retirarme. Hice una pausa de respiración diafragmática de 3 minutos.',
      intensity: 6,
      reframe: 'Están bajo presión; sus dudas son sobre el proceso, no sobre mi valor.',
      emotionTag: 'Ansiedad 6/10',
      category: 'Entorno laboral',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEsO-qirNV6IOpvIr0ZeoY8W0bb-P1uJrVtHIGvzV15WJeGDnFIjRM_7LpL5wYkt7lpK5FhJrOVflbro0x_RZ36JvZ68P4jJWDbnMg5ty5c8T4K5664BT7_PohNgEWX3VyZBvcuaAOiqBOhUvU7aAc4laJ9Vl8gEXVqMY753DA2EVlMeUHCUT_ujeC7bLsZACubO-BTHU3UGfJCxFoRN6jOoaFdPJ0uUEWlb8pz0Y',
      tags: ['Pausa tomada', '3 min de respiración']
    },
    {
      id: 'e2',
      date: 'Domingo, 20 Octubre',
      title: 'Caminata matutina en el parque',
      situation: 'Paseo en el parque durante la mañana soleada',
      thought: 'Tengo tantas tareas pendientes que no debería estar perdiendo el tiempo aquí.',
      reaction: 'Inquietud inicial, luego respiración más pausada observando los árboles.',
      intensity: 8,
      reframe: 'Cuidar de mi mente y caminar 20 minutos me da la energía que necesito para el resto del día.',
      emotionTag: 'Calma 8/10',
      category: 'Naturaleza y cuerpo',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzCLkcWHieZarxC51_Rc0QH_hrRNnPNDJgfe5QfW-5jf54FdX01GRWczC_DPxYeZIccOo9iQf-K06qOSxemc7P_mQShf48dh2omuNyk14GV9oy2tsPHvemvvlq84H61RHbIj1Otl1HNNiMu2AUAfsicEqCOYR8FVmTvYQnQSNrfHYMP6qIfAXD9FWcr3_vxYNbsIZjSWCkcz28GIHlWqH5cIo1Iqkw5PwgLP7URek',
      tags: ['Gratitud', 'Paseo consciente']
    }
  ],
  // Cuaderno de notas para la próxima sesión con la psicóloga
  sessionTopics: [
    {
      id: 't1',
      text: 'Preguntar sobre técnicas cuando siento tensión física en el pecho al inicio del día.',
      checked: false
    },
    {
      id: 't2',
      text: 'Comentar el avance del martes al poner límites con el horario de mensajes laborales.',
      checked: true
    },
    {
      id: 't3',
      text: 'Revisar el registro de sueño y ver si ajustamos la meditación guiada nocturna.',
      checked: false
    }
  ],
  // Detonantes identificados en la semana
  triggers: [
    { name: 'Exigencia laboral', count: 3, positive: false },
    { name: 'Descanso insuficiente', count: 2, positive: false },
    { name: 'Tiempo a solas positivo', count: 4, positive: true }
  ],
  // Constancia semanal (días activos: lun, mar, mie, jue, vie, sab, dom)
  weeklyStreak: {
    completedDays: 4,
    totalDays: 7,
    days: [
      { name: 'Lun', completed: true, icon: 'park' },
      { name: 'Mar', completed: true, icon: 'spa' },
      { name: 'Mié', completed: true, icon: 'eco' },
      { name: 'Hoy', current: true, icon: 'wb_sunny' },
      { name: 'Vie', completed: false },
      { name: 'Sáb', completed: false },
      { name: 'Dom', completed: false }
    ]
  }
};

class CalmaMindApp {
  constructor() {
    this.state = this.loadState();
    this.currentView = 'hoy';
    this.intensityDescriptors = {
      1: 'Apenas un susurro',
      2: 'Muy sutil',
      3: 'Suave presencia',
      4: 'Presente',
      5: 'Moderada',
      6: 'Sensible',
      7: 'Notable y clara',
      8: 'Fuerte',
      9: 'Muy profunda',
      10: 'Desbordante'
    };
    this.breathingTimer = null;
    this.init();
  }

  loadState() {
    try {
      const saved = localStorage.getItem('calma_mind_state');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('No se pudo acceder a LocalStorage:', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  saveState() {
    try {
      localStorage.setItem('calma_mind_state', JSON.stringify(this.state));
    } catch (e) {
      console.error('Error guardando en LocalStorage:', e);
    }
  }

  init() {
    this.setupNavigation();
    this.setupViewHoy();
    this.setupViewRegistrar();
    this.setupViewDiario();
    this.setupViewSesion();
    this.setupModals();
    this.setupCrisisCenter();
    this.renderEcosRecientes();
    this.renderCbtEntries();
    this.renderSessionTopics();
    this.updateWeeklyStats();
  }

  /* -------------------------------------------------------------
   * NAVEGACIÓN SPA ENTRE VISTAS
   * ------------------------------------------------------------- */
  setupNavigation() {
    const navLinks = document.querySelectorAll('nav [data-path]');
    const headerTitle = document.getElementById('header-section-title');

    const titleMap = {
      hoy: 'Hoy',
      registrar: 'Registrar',
      diario: 'Diario',
      sesion: 'Sesión'
    };

    window.navigateTo = (viewName) => {
      if (!titleMap[viewName]) return;
      this.currentView = viewName;

      // Actualizar secciones visibles
      document.querySelectorAll('.view-section').forEach(section => {
        section.classList.remove('active-view');
      });
      const targetSection = document.getElementById(`view-${viewName}`);
      if (targetSection) {
        targetSection.classList.add('active-view');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      // Actualizar título en header
      if (headerTitle) {
        headerTitle.textContent = titleMap[viewName];
      }

      // Actualizar estado activo en la barra de navegación
      navLinks.forEach(link => {
        const path = link.getAttribute('data-path');
        if (path === viewName) {
          link.classList.add('text-primary', 'font-semibold');
          link.classList.remove('text-on-surface-variant');
          link.setAttribute('aria-current', 'page');
        } else {
          link.classList.remove('text-primary', 'font-semibold');
          link.classList.add('text-on-surface-variant');
          link.removeAttribute('aria-current');
        }
      });
    };

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const path = link.getAttribute('data-path');
        window.navigateTo(path);
      });
    });

    // Enlaces internos con data-path (botones dentro del contenido)
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-path]');
      if (trigger && !trigger.closest('nav')) {
        e.preventDefault();
        const path = trigger.getAttribute('data-path');
        if (path) window.navigateTo(path);
      }
    });
  }

  /* -------------------------------------------------------------
   * VISTA: HOY (Bienestar y Calma)
   * ------------------------------------------------------------- */
  setupViewHoy() {
    // Micro-interacción: Selección rápida de píldoras emocionales
    const pills = document.querySelectorAll('#mood-selector .mood-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => {
          p.classList.remove('bg-primary', 'text-on-primary');
          p.classList.add('bg-surface-container-lowest/90', 'text-on-surface');
          const icon = p.querySelector('.material-symbols-outlined');
          if (icon) icon.classList.remove('text-on-primary');
        });
        pill.classList.remove('bg-surface-container-lowest/90', 'text-on-surface');
        pill.classList.add('bg-primary', 'text-on-primary');
        const activeIcon = pill.querySelector('.material-symbols-outlined');
        if (activeIcon) activeIcon.classList.add('text-on-primary');

        const mood = pill.getAttribute('data-mood');
        this.showToast(`Estado "${mood.charAt(0).toUpperCase() + mood.slice(1)}" reconocido con calma.`);
      });
    });

    // Botón "Respirar ahora" en la tarjeta de Ancla de Calma
    const breatheBtn = document.getElementById('btn-breathe-now');
    if (breatheBtn) {
      breatheBtn.addEventListener('click', () => {
        this.openBreathingModal();
      });
    }

    // Botón iconográfico de paz interior en header
    const spaHeaderBtn = document.getElementById('btn-spa-header');
    if (spaHeaderBtn) {
      spaHeaderBtn.addEventListener('click', () => {
        this.openBreathingModal();
      });
    }
  }

  renderEcosRecientes() {
    const container = document.getElementById('ecos-recientes-container');
    if (!container) return;

    if (!this.state.checkins.length) {
      container.innerHTML = `
        <div class="p-space-md text-center bg-surface-container-low rounded-lg text-tertiary">
          <p class="font-body-sm">Aún no has registrado momentos hoy. Tómate una pausa cuando lo sientas necesario.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = this.state.checkins.slice(0, 2).map(item => `
      <div class="rounded-lg bg-surface-container-lowest p-space-md shadow-sm flex flex-col gap-space-xs animate-fadeIn">
        <div class="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
          <div class="flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px] text-tertiary">${item.emotion === 'calma' ? 'bedtime' : 'wb_twilight'}</span>
            <span>${item.date}</span>
          </div>
          <span class="px-2 py-0.5 rounded-full ${item.intensity <= 4 ? 'bg-primary-fixed text-on-primary-fixed-variant' : 'bg-tertiary-fixed text-on-tertiary-fixed-variant'} font-label-sm text-label-sm">
            Intensidad ${item.intensity}/10
          </span>
        </div>
        <div class="flex items-baseline gap-2">
          <h4 class="font-body-lg text-body-lg text-on-surface font-medium">${item.emotionLabel}</h4>
          <span class="font-body-sm text-body-sm text-on-surface-variant">— ${item.contextSubtitle || 'Momento personal'}</span>
        </div>
        <p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
          “${item.note || 'Sin nota adicional.'}”
        </p>
        <div class="flex flex-wrap gap-1.5 pt-1">
          ${item.tags ? item.tags.map(t => `<span class="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">${t}</span>`).join('') : ''}
        </div>
      </div>
    `).join('');
  }

  /* -------------------------------------------------------------
   * VISTA: REGISTRAR (Check-in Emocional)
   * ------------------------------------------------------------- */
  setupViewRegistrar() {
    let selectedEmotion = 'calma';
    let selectedEmotionLabel = 'Calma y Paz';

    // Selección de emoción
    const emotionCards = document.querySelectorAll('.emotion-card');
    emotionCards.forEach(card => {
      card.addEventListener('click', () => {
        emotionCards.forEach(c => {
          c.classList.remove('is-selected', 'shadow-md');
          c.classList.add('shadow-sm');
          const check = c.querySelector('.check-pill');
          if (check) check.classList.replace('flex', 'hidden');
        });

        card.classList.add('is-selected', 'shadow-md');
        const activeCheck = card.querySelector('.check-pill');
        if (activeCheck) activeCheck.classList.replace('hidden', 'flex');

        selectedEmotion = card.getAttribute('data-emotion');
        const titleEl = card.querySelector('.font-headline-sm');
        selectedEmotionLabel = titleEl ? titleEl.textContent.trim() : selectedEmotion;
      });
    });

    // Control deslizante de intensidad
    const slider = document.getElementById('intensity-slider');
    const valDisplay = document.getElementById('intensity-val');
    const descDisplay = document.getElementById('intensity-descriptor');

    if (slider && valDisplay && descDisplay) {
      slider.addEventListener('input', (e) => {
        const val = e.target.value;
        valDisplay.textContent = val;
        descDisplay.textContent = this.intensityDescriptors[val] || 'Presente';
      });
    }

    // Toggle de chips de sensaciones corporales
    this.setupChipsGroup('#body-chips .somatic-chip', 'bg-primary-fixed', 'text-on-primary-fixed-variant');

    // Toggle de chips de contexto
    this.setupChipsGroup('#context-chips .context-chip', 'bg-secondary-fixed', 'text-on-secondary-fixed');

    // Cajón desplegable para nota reflexiva opcional
    const toggleNoteBtn = document.getElementById('toggle-note-btn');
    const noteContainer = document.getElementById('note-container');
    const noteIcon = document.getElementById('note-icon');

    if (toggleNoteBtn && noteContainer && noteIcon) {
      toggleNoteBtn.addEventListener('click', () => {
        const isHidden = noteContainer.classList.contains('hidden');
        if (isHidden) {
          noteContainer.classList.remove('hidden');
          noteIcon.classList.add('rotate-180');
        } else {
          noteContainer.classList.add('hidden');
          noteIcon.classList.remove('rotate-180');
        }
      });
    }

    // Botón principal: "Guardar mi momento"
    const saveMomentBtn = document.getElementById('save-moment-btn');
    if (saveMomentBtn) {
      saveMomentBtn.addEventListener('click', () => {
        saveMomentBtn.classList.add('scale-95');
        setTimeout(() => saveMomentBtn.classList.remove('scale-95'), 150);

        // Recolectar datos
        const intensity = parseInt(slider.value, 10);
        const activeSomatic = Array.from(document.querySelectorAll('#body-chips .somatic-chip.active')).map(c => c.textContent.trim());
        const activeContext = Array.from(document.querySelectorAll('#context-chips .context-chip.active')).map(c => c.textContent.trim());
        const noteEl = document.getElementById('reflective-note-input');
        const note = noteEl ? noteEl.value.trim() : '';

        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const dateStr = `Hoy • ${hours}:${minutes}`;

        const newCheckin = {
          id: 'c_' + Date.now(),
          date: dateStr,
          timestamp: Date.now(),
          emotion: selectedEmotion,
          emotionLabel: selectedEmotionLabel,
          contextSubtitle: activeContext[0] || 'Momento del día',
          intensity: intensity,
          note: note || (activeSomatic.length ? `Sensación presente: ${activeSomatic.join(', ')}.` : 'Registro sereno.'),
          tags: activeContext.map(c => `#${c.replace(/\s+/g, '')}`),
          somatic: activeSomatic,
          context: activeContext
        };

        // Guardar en estado
        this.state.checkins.unshift(newCheckin);
        this.saveState();

        // Actualizar vistas relacionadas
        this.renderEcosRecientes();
        this.updateWeeklyStats();

        // Limpiar nota
        if (noteEl) noteEl.value = '';

        // Toast de confirmación empática
        this.showToast('Momento registrado con amabilidad.');

        // Transición suave de vuelta a la vista Hoy tras confirmar
        setTimeout(() => {
          window.navigateTo('hoy');
        }, 800);
      });
    }
  }

  setupChipsGroup(selector, activeBg, activeText) {
    document.querySelectorAll(selector).forEach(chip => {
      chip.addEventListener('click', () => {
        const isActive = chip.classList.contains('active');
        if (isActive) {
          chip.classList.remove('active', activeBg, activeText, 'shadow-sm');
          chip.classList.add('bg-surface-container', 'text-on-surface-variant');
        } else {
          chip.classList.add('active', activeBg, activeText, 'shadow-sm');
          chip.classList.remove('bg-surface-container', 'text-on-surface-variant');
        }
      });
    });
  }

  /* -------------------------------------------------------------
   * VISTA: DIARIO DE EXPERIENCIAS (TCC A-B-C-D)
   * ------------------------------------------------------------- */
  setupViewDiario() {
    const editor = document.getElementById('cbt-editor-card');
    const toggleBtn = document.getElementById('toggle-editor-btn');
    const saveBtn = document.getElementById('save-entry-btn');
    const situationInput = document.getElementById('input-situation');
    const thoughtInput = document.getElementById('input-thought');
    const reactionInput = document.getElementById('input-reaction');
    const reframeInput = document.getElementById('input-reframe');

    let currentIntensity = 6;

    // Selector de intensidad TCC
    const intensityContainer = document.getElementById('intensity-stars');
    if (intensityContainer) {
      const buttons = intensityContainer.querySelectorAll('button');
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          buttons.forEach(b => {
            b.className = 'w-7 h-7 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm';
          });
          btn.className = 'w-7 h-7 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-bold shadow-sm';
          currentIntensity = parseInt(btn.textContent.trim(), 10);
        });
      });
    }

    if (toggleBtn && editor && situationInput) {
      toggleBtn.addEventListener('click', () => {
        editor.scrollIntoView({ behavior: 'smooth', block: 'start' });
        situationInput.focus();
      });
    }

    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const situation = situationInput.value.trim();
        const thought = thoughtInput.value.trim();
        const reaction = reactionInput.value.trim();
        const reframe = reframeInput.value.trim();

        if (!situation) {
          this.showToast('Por favor describe brevemente qué ocurrió (La Situación).');
          situationInput.focus();
          return;
        }

        const now = new Date();
        const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const dateFormatted = `${diasSemana[now.getDay()]}, ${now.getDate()} ${meses[now.getMonth()]}`;

        const newEntry = {
          id: 'cbt_' + Date.now(),
          date: dateFormatted,
          title: situation.length > 35 ? situation.substring(0, 32) + '...' : situation,
          situation: situation,
          thought: thought || 'No especificado en el registro.',
          reaction: reaction || 'Pausa reflexiva tomada.',
          intensity: currentIntensity,
          reframe: reframe || 'Observando sin juicio con mirada compasiva.',
          emotionTag: `Intensidad ${currentIntensity}/10`,
          category: 'Experiencia cotidiana',
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDv99oqNj_ezbQ4lgGeVUQBBLG7LxvrMzZLU-rp5kWu2T2QmugGxI0-W1y6KDUl_XQcLSnKDzgdSUkgX2oj0tDrtWYV_4Q7g5KFWI-M0XByyQetjss83Xbq3T-6FoaEGctuKoM1wMnzTZ_HFtPjUgZcVzONWs_CFh8zi3jpuQ0XE5-usuESWxJYhhhxgph13sWKMEb7R7vDD_9QHVDthDo13A00BtVRya9AaABGudE',
          tags: ['Nueva reflexión', 'TCC guiada']
        };

        this.state.cbtEntries.unshift(newEntry);
        this.saveState();
        this.renderCbtEntries();

        // Feedback en botón
        const originalText = saveBtn.innerHTML;
        saveBtn.innerHTML = '<span class="material-symbols-outlined text-[18px]">favorite</span> ¡Guardado con calma!';
        saveBtn.classList.add('bg-primary', 'text-on-primary');

        setTimeout(() => {
          saveBtn.innerHTML = originalText;
          saveBtn.classList.remove('bg-primary', 'text-on-primary');
          this.showToast('Entrada registrada exitosamente en tu diario.');
        }, 1200);
      });
    }

    // Filtros de Entradas
    const filterButtons = document.querySelectorAll('#journal-filter-ribbon button');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => {
          b.className = 'px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md whitespace-nowrap active:bg-surface-container-high transition-colors';
        });
        btn.className = 'px-3.5 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-md text-label-md flex items-center gap-1 whitespace-nowrap shadow-sm';

        const filter = btn.getAttribute('data-filter') || 'all';
        this.renderCbtEntries(filter);
      });
    });
  }

  renderCbtEntries(filter = 'all') {
    const container = document.getElementById('cbt-entries-container');
    const countEl = document.getElementById('cbt-entries-count');
    if (!container) return;

    let entries = this.state.cbtEntries;
    if (filter === 'reframe') {
      entries = entries.filter(e => e.reframe && e.reframe.length > 5);
    } else if (filter === 'calma') {
      entries = entries.filter(e => e.emotionTag && e.emotionTag.toLowerCase().includes('calma'));
    } else if (filter === 'ansiedad') {
      entries = entries.filter(e => e.emotionTag && (e.emotionTag.toLowerCase().includes('ansiedad') || e.emotionTag.toLowerCase().includes('inquietud')));
    }

    if (countEl) {
      countEl.textContent = `${entries.length} registro${entries.length === 1 ? '' : 's'} esta semana`;
    }

    if (!entries.length) {
      container.innerHTML = `
        <div class="p-space-lg text-center bg-surface-container-lowest rounded-lg text-tertiary shadow-sm">
          <p class="font-body-md">No hay entradas con este filtro.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = entries.map(entry => `
      <article class="bg-surface-container-lowest rounded-lg p-space-md shadow-sm flex flex-col gap-space-sm hover:shadow-md transition-shadow animate-fadeIn">
        <div class="relative w-full h-28 rounded-DEFAULT overflow-hidden bg-surface-container-high">
          <img class="w-full h-full object-cover" alt="Contexto visual" src="${entry.imageUrl}" />
          <div class="absolute inset-0 bg-gradient-to-t from-surface-dim/80 via-transparent to-transparent flex items-end p-2.5">
            <span class="font-label-sm text-label-sm text-on-surface bg-surface-container-lowest/90 px-2 py-0.5 rounded-full backdrop-blur-sm">
              ${entry.category || 'Experiencia cotidiana'}
            </span>
          </div>
        </div>
        <div class="flex items-start justify-between">
          <div>
            <span class="font-label-sm text-label-sm text-tertiary">${entry.date}</span>
            <h4 class="font-headline-sm text-headline-sm text-on-surface mt-0.5 leading-snug">
              ${entry.title}
            </h4>
          </div>
          <button aria-label="Opciones de entrada" class="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors">
            <span class="material-symbols-outlined text-[18px]">more_horiz</span>
          </button>
        </div>
        <div class="space-y-1.5 bg-surface-container-low rounded-DEFAULT p-3">
          <div class="flex items-start gap-2">
            <span class="font-label-sm text-label-sm text-primary font-bold mt-0.5">Pensamiento:</span>
            <p class="font-body-sm text-body-sm text-on-surface italic leading-snug">"${entry.thought}"</p>
          </div>
          ${entry.reframe ? `
            <div class="flex items-start gap-2">
              <span class="font-label-sm text-label-sm text-tertiary font-bold mt-0.5">Reencuadre:</span>
              <p class="font-body-sm text-body-sm text-on-surface leading-snug">"${entry.reframe}"</p>
            </div>
          ` : ''}
        </div>
        <div class="flex flex-wrap items-center gap-1.5 pt-1">
          <span class="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm flex items-center gap-1">
            <span class="material-symbols-outlined text-[13px]">sentiment_satisfied</span>
            ${entry.emotionTag || 'Intensidad media'}
          </span>
          ${entry.tags ? entry.tags.map(t => `
            <span class="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm flex items-center gap-1">
              ${t}
            </span>
          `).join('') : ''}
        </div>
      </article>
    `).join('');
  }

  /* -------------------------------------------------------------
   * VISTA: SESIÓN (Resumen para Psicólogo & Cuaderno de Notas)
   * ------------------------------------------------------------- */
  setupViewSesion() {
    // Casillas de verificación del Cuaderno de Sesión
    const topicsList = document.getElementById('sessionTopicsList');
    if (topicsList) {
      topicsList.addEventListener('change', (e) => {
        if (e.target.classList.contains('session-item-checkbox')) {
          const index = parseInt(e.target.getAttribute('data-index'), 10);
          if (!isNaN(index) && this.state.sessionTopics[index]) {
            this.state.sessionTopics[index].checked = e.target.checked;
            this.saveState();
            const span = e.target.parentElement.querySelector('span');
            if (span) {
              if (e.target.checked) {
                span.classList.add('line-through', 'text-on-surface-variant/70');
              } else {
                span.classList.remove('line-through', 'text-on-surface-variant/70');
              }
            }
          }
        }
      });
    }

    // Añadir tema rápido al cuaderno
    const quickInput = document.getElementById('quickTopicInput');
    const quickAddBtn = document.getElementById('quickTopicAddBtn');
    const addTopicHeaderBtn = document.getElementById('addTopicBtn');

    const handleAddTopic = () => {
      const text = quickInput.value.trim();
      if (!text) {
        quickInput.focus();
        return;
      }

      this.state.sessionTopics.push({
        id: 't_' + Date.now(),
        text: text,
        checked: false
      });
      this.saveState();
      this.renderSessionTopics();
      quickInput.value = '';
      this.showToast('Tema agregado a tus notas de consulta.');
    };

    if (quickAddBtn && quickInput) {
      quickAddBtn.addEventListener('click', handleAddTopic);
      quickInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleAddTopic();
        }
      });
    }

    if (addTopicHeaderBtn && quickInput) {
      addTopicHeaderBtn.addEventListener('click', () => {
        quickInput.focus();
      });
    }

    // Botón Exportar PDF Clínico
    const exportBtn = document.getElementById('exportConsultationBtn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        this.generateClinicalPDF();
      });
    }

    // Botón Compartir
    const shareBtn = document.getElementById('shareReportBtn');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        this.openShareModal();
      });
    }

    // Selector de Período
    const periodBtn = document.getElementById('periodSelectorBtn');
    if (periodBtn) {
      periodBtn.addEventListener('click', () => {
        this.showToast('Visualizando: ' + this.state.patient.periodLabel);
      });
    }
  }

  renderSessionTopics() {
    const list = document.getElementById('sessionTopicsList');
    if (!list) return;

    list.innerHTML = this.state.sessionTopics.map((topic, index) => `
      <label class="flex items-start gap-space-sm p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer select-none animate-fadeIn">
        <input type="checkbox" data-index="${index}" class="session-item-checkbox mt-1 w-5 h-5 rounded-md accent-primary cursor-pointer" ${topic.checked ? 'checked' : ''} />
        <span class="font-body-md text-body-md text-on-surface flex-1 leading-snug ${topic.checked ? 'line-through text-on-surface-variant/70' : ''}">
          ${topic.text}
        </span>
      </label>
    `).join('');
  }

  updateWeeklyStats() {
    // Cálculo dinámico de promedio
    const totalEntries = this.state.checkins.length + this.state.cbtEntries.length;
    let sum = 0;
    this.state.checkins.forEach(c => sum += (c.intensity || 5));
    this.state.cbtEntries.forEach(e => sum += (e.intensity || 5));

    const avg = totalEntries > 0 ? (sum / totalEntries).toFixed(1) : '4.8';
    const avgEl = document.getElementById('weekly-avg-display');
    if (avgEl) avgEl.textContent = avg;

    const totalCountEl = document.getElementById('weekly-total-records');
    if (totalCountEl) totalCountEl.textContent = `${totalEntries} registros`;
  }

  /* -------------------------------------------------------------
   * GENERACIÓN DE REPORTE CLÍNICO (PDF & COMPARTIR)
   * ------------------------------------------------------------- */
  generateClinicalPDF() {
    this.showToast('Preparando reporte confidencial en PDF...');

    // Estructura visual lista para renderizar en PDF
    const reportContainer = document.createElement('div');
    reportContainer.id = 'clinical-pdf-document';
    reportContainer.style.padding = '30px';
    reportContainer.style.fontFamily = "'Plus Jakarta Sans', sans-serif";
    reportContainer.style.color = '#1c1c18';
    reportContainer.style.background = '#ffffff';

    const uncompletedTopics = this.state.sessionTopics.filter(t => !t.checked);

    reportContainer.innerHTML = `
      <div style="border-bottom: 2px solid #4c6358; padding-bottom: 15px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
          <h1 style="color: #4c6358; font-size: 24px; margin: 0; font-family: 'Newsreader', serif;">Calma Mind • Reporte de Autorregistro Clínico</h1>
          <p style="color: #685c53; font-size: 13px; margin: 4px 0 0 0;">Documento de apoyo para la sesión terapéutica confidencial</p>
        </div>
        <div style="text-align: right; font-size: 12px; color: #424844;">
          <strong>Paciente:</strong> ${this.state.patient.name}<br>
          <strong>Especialista:</strong> ${this.state.patient.therapist}<br>
          <strong>Período:</strong> ${this.state.patient.periodLabel}
        </div>
      </div>

      <div style="background-color: #f6f3ec; border-radius: 8px; padding: 14px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 8px 0; color: #4c6358; font-size: 15px;">Resumen del Clima Emocional</h3>
        <p style="font-size: 13px; line-height: 1.5; margin: 0;">
          Durante el período analizado se registraron <strong>${this.state.checkins.length + this.state.cbtEntries.length} momentos de auto-observación</strong>.
          La intensidad promedio semanal se situó en <strong>4.8 / 10</strong>, reflejando un patrón de estabilidad con episodios puntuales de sobrecarga laboral regulados mediante pausas de respiración.
        </p>
      </div>

      <div style="margin-bottom: 20px;">
        <h3 style="color: #4c6358; font-size: 15px; border-bottom: 1px solid #ebe8e1; padding-bottom: 6px; margin-bottom: 10px;">Detonantes Identificados</h3>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          ${this.state.triggers.map(t => `
            <span style="background: ${t.positive ? '#cee9da' : '#e5e2db'}; color: ${t.positive ? '#354c41' : '#424844'}; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 500;">
              ${t.name} (${t.count} veces)
            </span>
          `).join('')}
        </div>
      </div>

      <div style="margin-bottom: 20px;">
        <h3 style="color: #4c6358; font-size: 15px; border-bottom: 1px solid #ebe8e1; padding-bottom: 6px; margin-bottom: 10px;">Reflexiones Cognitivas y Reencuadres (TCC)</h3>
        ${this.state.cbtEntries.slice(0, 3).map(e => `
          <div style="margin-bottom: 12px; padding: 10px; border-left: 3px solid #8fa89b; background: #faf9f6; font-size: 13px;">
            <div style="font-weight: 600; color: #1c1c18; margin-bottom: 2px;">${e.title} (${e.date})</div>
            <div style="color: #424844; margin-bottom: 4px;"><strong>Pensamiento automático:</strong> "${e.thought}"</div>
            <div style="color: #4c6358;"><strong>Reencuadre compasivo:</strong> "${e.reframe}"</div>
          </div>
        `).join('')}
      </div>

      <div style="margin-bottom: 25px;">
        <h3 style="color: #4c6358; font-size: 15px; border-bottom: 1px solid #ebe8e1; padding-bottom: 6px; margin-bottom: 10px;">Temas Prioritarios para Abordar en Sesión</h3>
        <ul style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.6;">
          ${uncompletedTopics.map(t => `<li>${t.text}</li>`).join('')}
        </ul>
      </div>

      <div style="border-top: 1px dashed #c2c8c3; padding-top: 12px; font-size: 11px; color: #727974; text-align: center;">
        Este informe no emite diagnósticos ni reemplaza la evaluación clínica profesional. Uso exclusivo para el acompañamiento psicológico pactado entre paciente y terapeuta.
      </div>
    `;

    document.body.appendChild(reportContainer);

    // Opciones de exportación PDF
    const opt = {
      margin: 10,
      filename: `Reporte_Clinico_CalmaMind_${this.state.patient.name}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    if (window.html2pdf) {
      window.html2pdf().from(reportContainer).set(opt).save().then(() => {
        document.body.removeChild(reportContainer);
        this.showToast('¡PDF clínico generado y descargado!');
      }).catch(err => {
        console.error('Error generando PDF:', err);
        document.body.removeChild(reportContainer);
        window.print();
      });
    } else {
      // Fallback a impresión de navegador si html2pdf no cargó
      document.body.removeChild(reportContainer);
      window.print();
    }
  }

  openShareModal() {
    const modal = document.getElementById('share-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  closeShareModal() {
    const modal = document.getElementById('share-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  /* -------------------------------------------------------------
   * RECURSOS EN CRISIS (REQUISITO PRD #5 & ÉTICA CLÍNICA)
   * ------------------------------------------------------------- */
  setupCrisisCenter() {
    const sosBtn = document.getElementById('btn-sos-crisis');
    if (sosBtn) {
      sosBtn.addEventListener('click', () => {
        this.openCrisisModal();
      });
    }
  }

  openCrisisModal() {
    const modal = document.getElementById('crisis-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  closeCrisisModal() {
    const modal = document.getElementById('crisis-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  /* -------------------------------------------------------------
   * PRÁCTICA DE RESPIRACIÓN GUIADA (4-4-6)
   * ------------------------------------------------------------- */
  openBreathingModal() {
    const modal = document.getElementById('breathing-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    this.startBreathingCycle();
  }

  closeBreathingModal() {
    const modal = document.getElementById('breathing-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    if (this.breathingTimer) clearInterval(this.breathingTimer);
  }

  startBreathingCycle() {
    const statusText = document.getElementById('breathing-instruction');
    const circle = document.getElementById('breathing-guide-circle');
    const counterText = document.getElementById('breathing-counter');
    if (!statusText || !circle || !counterText) return;

    let phase = 0; // 0: Inhala (4s), 1: Sostén (4s), 2: Exhala (6s)
    let secondsLeft = 4;

    const updatePhase = () => {
      if (phase === 0) {
        statusText.textContent = 'Inhala profundamente por la nariz...';
        circle.style.transform = 'scale(1.28)';
        circle.style.transition = 'transform 4s ease-in-out';
      } else if (phase === 1) {
        statusText.textContent = 'Sostén el aire con serenidad...';
        circle.style.transform = 'scale(1.28)';
      } else if (phase === 2) {
        statusText.textContent = 'Exhala suavemente por la boca...';
        circle.style.transform = 'scale(0.85)';
        circle.style.transition = 'transform 6s ease-in-out';
      }
    };

    updatePhase();
    counterText.textContent = `${secondsLeft}s`;

    if (this.breathingTimer) clearInterval(this.breathingTimer);

    this.breathingTimer = setInterval(() => {
      secondsLeft--;
      if (secondsLeft <= 0) {
        if (phase === 0) {
          phase = 1;
          secondsLeft = 4;
        } else if (phase === 1) {
          phase = 2;
          secondsLeft = 6;
        } else {
          phase = 0;
          secondsLeft = 4;
        }
        updatePhase();
      }
      counterText.textContent = `${secondsLeft}s`;
    }, 1000);
  }

  /* -------------------------------------------------------------
   * MODALES Y FEEDBACK RECONFORTANTE
   * ------------------------------------------------------------- */
  setupModals() {
    // Cerrar modales con botones de cerrar
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.closeShareModal();
        this.closeCrisisModal();
        this.closeBreathingModal();
        this.closeProfileModal();
      });
    });

    // Compartir por WhatsApp
    const shareWhatsappBtn = document.getElementById('share-whatsapp-btn');
    if (shareWhatsappBtn) {
      shareWhatsappBtn.addEventListener('click', () => {
        const text = encodeURIComponent(
          `Hola ${this.state.patient.therapist}, soy ${this.state.patient.name}. Comparto contigo el resumen de mi autorregistro emocional de la semana (${this.state.patient.periodLabel}) desde Calma Mind para revisarlo en nuestra próxima sesión.\n\n` +
          `• Clima emocional promedio: 4.8 / 10 (Estable y balanceado)\n` +
          `• Temas prioritarios para la consulta: ${this.state.sessionTopics.filter(t => !t.checked).map(t => t.text).join('; ')}`
        );
        window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
        this.closeShareModal();
      });
    }

    // Copiar al portapapeles
    const copySummaryBtn = document.getElementById('copy-summary-btn');
    if (copySummaryBtn) {
      copySummaryBtn.addEventListener('click', () => {
        const text = `Resumen Calma Mind - ${this.state.patient.periodLabel}\nPaciente: ${this.state.patient.name}\nEspecialista: ${this.state.patient.therapist}\nClima promedio: 4.8/10\nTemas pendientes: ${this.state.sessionTopics.filter(t => !t.checked).map(t => t.text).join(' | ')}`;
        navigator.clipboard.writeText(text).then(() => {
          this.showToast('Enlace y resumen copiados al portapapeles.');
          this.closeShareModal();
        });
      });
    }

    // Perfil Terapéutico
    const profileBtn = document.getElementById('btn-profile-header');
    if (profileBtn) {
      profileBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openProfileModal();
      });
    }
  }

  openProfileModal() {
    const modal = document.getElementById('profile-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  closeProfileModal() {
    const modal = document.getElementById('profile-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  showToast(message) {
    const toast = document.getElementById('toastNotification');
    const toastMsg = document.getElementById('toastMessage');
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = message;

    toast.classList.remove('opacity-0', 'pointer-events-none');
    toast.classList.add('opacity-100');

    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove('opacity-100');
      toast.classList.add('opacity-0', 'pointer-events-none');
    }, 2800);
  }
}

// Inicializar al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  window.app = new CalmaMindApp();
});
