// Hash-based router for GitHub Pages.
const routes = {
  home: renderHome,
  notes: renderNotes,
  research: renderResearch,
  cv: renderCV,
};

const routeMeta = {
  home: {
    title: "Shaotian Sun",
    eyebrow: "Honors Mathematics + Electrical & Computer Engineering",
    iconClass: "fa-solid fa-user-graduate",
  },
  notes: {
    title: "Mathematical Notes",
    eyebrow: "Course notes, reading notes, and working references",
    iconClass: "fa-solid fa-book-open",
  },
  research: {
    title: "Research & Reading",
    eyebrow: "Algebra, representation theory, number theory, and combinatorics",
    iconClass: "fa-solid fa-layer-group",
  },
  cv: {
    title: "Curriculum Vitae",
    eyebrow: "Academic background and selected work",
    iconClass: "fa-solid fa-file-lines",
  },
};

const noteTerms = [
  {
    term: "Fall 2024",
    items: [
      {
        href: "https://github.com/Shaotian-Sun/math-notes/tree/main/math451",
        text: "Analysis of a Single Variable",
        course: "MATH451, Advanced Calculus I",
        tags: ["analysis"],
      },
      {
        href: "https://github.com/Shaotian-Sun/math-notes/tree/main/math493",
        text:
          "Group Theory, Representation Theory of Crystallographic Group, " +
          "and Representation Theory of Finite Group",
        course: "MATH493, Honors Algebra I",
        tags: ["algebra", "representation"],
      },
      {
        href: "https://ghseeli.github.io/teaching/2024/08/27/math-565.html",
        text: "Graph Theory, and Combinatorial Geometry",
        course: "MATH565, Combinatorics and Graph Theory",
        tags: ["combinatorics"],
      },
    ],
  },
  {
    term: "Winter 2025",
    items: [
      {
        href: "https://github.com/Shaotian-Sun/math-notes/tree/main/math494",
        text: "Ring, Module, Field, and Galois Theory",
        course: "MATH494, Honors Algebra II",
        tags: ["algebra"],
      },
      {
        href: "https://github.com/Shaotian-Sun/math-notes/tree/main/math525",
        text: "Graduate Probability Theory",
        course: "MATH525, Probability Theory",
        tags: ["probability"],
      },
    ],
  },
  {
    term: "Fall 2025",
    items: [
      {
        href: "https://github.com/Shaotian-Sun/math-notes/tree/main/math395",
        text: "Multivariable Analysis and Manifold",
        course: "MATH395, Honors Analysis I",
        tags: ["analysis", "geometry"],
      },
      {
        href: "https://github.com/Shaotian-Sun/math-notes/tree/main/math596",
        text: "Graduate Complex Analysis",
        course: "MATH596, Analysis I, Ph.D. alpha course",
        tags: ["analysis"],
      },
      {
        href: "https://github.com/Shaotian-Sun/math-notes/tree/main/math614",
        text: "Commutative Algebra",
        course: "MATH614, Ph.D. beta course",
        tags: ["algebra", "geometry"],
      },
    ],
  },
];

const researchPosts = [
  {
    img: "image/Rep Thy.png",
    alt: "Representation theory preview",
    title: "Representation Theory Reading",
    desc: "Reading Representation Theory: A First Course, currently around Chapter 11.",
    metaLeft: "Fall 2025 - Winter 2026",
    metaRight: "Reading",
    category: "representation",
    body: `
      <p>
        The current reading note can be accessed
        <a href="files/Independent_Reading__Representation_Theory_Notes.pdf">here</a>.
      </p>
      <div class="tags">
        <span>Representation Theory</span><span>Lie Group</span><span>Lie Algebra</span>
      </div>
    `,
  },
  {
    img: "image/hasse_diagram.png",
    alt: "TITO preview",
    title: "TITOgraphy: When Order Takes Shape",
    desc: "An algorithmic project comparing translational-invariant total orders.",
    metaLeft: "Fall 2025",
    metaRight: "Research",
    category: "combinatorics",
    body: `
      <p>
        Final report can be downloaded
        <a href="files/LOG_(M_)_Final_Report-TITO_When_Order_Takes_Shape.pdf">here</a>.
      </p>
      <div class="tags"><span>Combinatorics</span><span>Algorithms</span></div>
    `,
  },
  {
    img: "image/number-theory.png",
    alt: "Number theory preview",
    title: "Algebraic Number Theory Reading",
    desc: "A reading project on Chapters 1-4 of Number Fields.",
    metaLeft: "Summer 2025",
    metaRight: "Reading",
    category: "number",
    body: `
      <p>Final presentation can be accessed through <a href="#/cv">CV</a>.</p>
      <div class="tags"><span>Number Theory</span><span>Algebra</span></div>
    `,
  },
];

const teachingTimeline = [
  {
    term: "Fall 2023",
    role: "Teaching Assistant",
    place: "ENGL1000J",
    icon: "fa-solid fa-chalkboard-user",
  },
  {
    term: "Spring 2024",
    role: "Teaching Assistant",
    place: "TC3000J",
    icon: "fa-solid fa-chalkboard-user",
  },
  {
    term: "Summer 2024",
    role: "Teaching Assistant",
    place: "TC3000J",
    icon: "fa-solid fa-chalkboard-user",
  },
  {
    term: "Winter 2025",
    role: "Grader",
    place: "MATH217",
    icon: "fa-solid fa-square-root-variable",
  },
  {
    term: "Summer 2025",
    role: "Community Assistant",
    place: "Math Corps",
    icon: "fa-solid fa-people-group",
  },
  {
    term: "Fall 2025",
    role: "Grader",
    place: "MATH525",
    icon: "fa-solid fa-chart-line",
  },
  {
    term: "Winter 2026",
    role: "Course Assistant",
    place: "MATH201",
    icon: "fa-solid fa-person-chalkboard",
  },
  {
    term: "Winter 2026",
    role: "Kiluk Tutor",
    place: "MATH217",
    icon: "fa-solid fa-user-group",
  },
];

const researchTimeline = [
  {
    term: "Summer 2025",
    role: "Directed Reading Program",
    place: "Algebraic Number Theory",
    icon: "fa-solid fa-book-open-reader",
  },
  {
    term: "Fall 2025 - Winter 2026",
    role: "Directed Reading",
    place: "Representation Theory, advised by Prof. Griffin Wang",
    icon: "fa-solid fa-cubes",
  },
  {
    term: "Fall 2025 - Winter 2026",
    role: "Lab of Geometry",
    place: "Python package for translational-invariant total order operations",
    icon: "fa-brands fa-python",
  },
  {
    term: "In progress",
    role: "REU",
    place: "Research project in progress",
    icon: "fa-solid fa-flask",
  },
  {
    term: "In progress",
    role: "Statistics Research",
    place: "Research project in progress",
    icon: "fa-solid fa-chart-simple",
  },
];

const programmingProjects = [
  {
    title: "TITOgraphy",
    type: "Research software",
    icon: "fa-solid fa-diagram-project",
    desc:
      "A Python project for experimenting with translational-invariant total " +
      "orders and visualizing how ordered structures behave under operations.",
    tags: ["Python", "Algorithms", "Visualization"],
    href: "#/research",
    cta: "Read project report",
  },
  {
    title: "Personal Academic Website",
    type: "Web development",
    icon: "fa-solid fa-window-restore",
    desc:
      "A responsive single-page portfolio for notes, research, teaching work, " +
      "and CV materials, built for GitHub Pages with vanilla JavaScript.",
    tags: ["JavaScript", "CSS", "GitHub Pages"],
    href: "https://github.com/Shaotian-Sun/shaotian-sun.github.io",
    cta: "View source",
  },
  {
    title: "Mathematical Notes Archive",
    type: "Technical writing system",
    icon: "fa-solid fa-book-open-reader",
    desc:
      "A public archive that organizes course notes and reading materials by " +
      "term, topic, and source for long-term mathematical reference.",
    tags: ["LaTeX", "Documentation", "Organization"],
    href: "https://github.com/Shaotian-Sun/math-notes",
    cta: "Open archive",
  },
];

let canvasCleanup = null;

function currentRoute() {
  const hash = (location.hash || "#/home").replace(/^#\/?/, "");
  return routes[hash] ? hash : "home";
}

function formatLastModified() {
  const d = new Date(document.lastModified);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function layout({ contentHtml }) {
  const route = currentRoute();
  const meta = routeMeta[route];
  document.title = `${meta.title} | Shaotian Sun`;

  return `
    <div class="site-backdrop" aria-hidden="true">
      <canvas data-field-canvas></canvas>
    </div>

    <header class="site-header">
      <a class="brand" href="#/home" aria-label="Shaotian Sun home">
        <span class="brand-mark">S</span>
        <span>
          <strong>Shaotian Sun</strong>
          <small>Mathematics at Michigan</small>
        </span>
      </a>

      <nav class="nav" aria-label="Primary navigation">
        ${navLink("home", "fa-solid fa-house", "Home", route)}
        ${navLink("notes", "fa-solid fa-book", "Notes", route)}
        ${navLink("research", "fa-solid fa-flask", "Research", route)}
        ${navLink("cv", "fa-solid fa-file-lines", "CV", route)}
      </nav>

      <button class="icon-button" type="button" data-theme-toggle aria-label="Toggle color theme">
        <i class="fa-solid fa-moon"></i>
      </button>
    </header>

    <main class="page-shell" data-page="${route}">
      <section class="page-hero reveal">
        <div>
          <p class="eyebrow"><i class="${meta.iconClass}"></i> ${meta.eyebrow}</p>
          <h1>${meta.title}</h1>
        </div>
        <div class="hero-panel" data-spotlight>
          <span class="formula">Probability</span>
          <span class="formula">Statistics</span>
          <span class="formula">Machine Learning</span>
          <span class="formula">Algorithms</span>
        </div>
      </section>

      ${contentHtml}
    </main>
  `;
}

function navLink(route, icon, label, activeRoute) {
  return `
    <a href="#/${route}" class="${activeRoute === route ? "active" : ""}">
      <i class="${icon}"></i><span>${label}</span>
    </a>
  `;
}

function render() {
  if (canvasCleanup) {
    canvasCleanup();
    canvasCleanup = null;
  }

  const route = currentRoute();
  const app = document.getElementById("app");
  app.innerHTML = routes[route]();
  initializeInteractions();
}

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", () => {
  const preferredTheme = localStorage.getItem("theme");
  if (preferredTheme) document.documentElement.dataset.theme = preferredTheme;
  if (!location.hash) location.hash = "#/home";
  render();
});

function initializeInteractions() {
  initializeThemeToggle();
  initializeLocalScroll();
  initializeReveal();
  initializeTilt();
  initializeSpotlight();
  initializeEmailCopy();
  initializeCanvas();
  initializeFilters();
}

function initializeThemeToggle() {
  const toggle = document.querySelector("[data-theme-toggle]");
  if (!toggle) return;

  updateThemeIcon(toggle);
  toggle.addEventListener("click", () => {
    const nextTheme =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
    updateThemeIcon(toggle);
  });
}

function initializeReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  targets.forEach((el) => observer.observe(el));
}

function initializeTilt() {
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 7;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * -7;
      card.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateY(-2px)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}

function initializeSpotlight() {
  document.querySelectorAll("[data-spotlight]").forEach((el) => {
    el.addEventListener("pointermove", (event) => {
      const rect = el.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--spotlight-x", `${x}%`);
      el.style.setProperty("--spotlight-y", `${y}%`);
    });
  });
}

function initializeEmailCopy() {
  document.querySelectorAll("[data-copy-email]").forEach((button) => {
    button.addEventListener("click", async () => {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText("shaotian@umich.edu");
      }
      button.classList.add("copied");
      button.querySelector("span").textContent = "Copied";
      window.setTimeout(() => {
        button.classList.remove("copied");
        button.querySelector("span").textContent = "Copy email";
      }, 1300);
    });
  });
}

function initializeCanvas() {
  const canvas = document.querySelector("[data-field-canvas]");
  if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const context = canvas.getContext("2d");
  if (!context) return;
  const pointer = { x: 0, y: 0, active: false };
  const symbols = ["sum", "pi", "lambda", "phi", "R", "Z", "G", "V"];
  let particles = [];
  let width = 0;
  let height = 0;
  let animationFrame = 0;

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    particles = Array.from({ length: Math.min(54, Math.floor(width / 20)) }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.24,
      vy: (Math.random() - 0.5) * 0.24,
      symbol: symbols[i % symbols.length],
      size: 12 + Math.random() * 10,
    }));
  }

  function draw() {
    const accent = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();
    const muted = getComputedStyle(document.documentElement)
      .getPropertyValue("--muted")
      .trim();

    context.clearRect(0, 0, width, height);
    context.globalAlpha = 0.22;
    context.strokeStyle = accent;
    context.lineWidth = 1;

    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < -20) particle.x = width + 20;
      if (particle.x > width + 20) particle.x = -20;
      if (particle.y < -20) particle.y = height + 20;
      if (particle.y > height + 20) particle.y = -20;

      if (pointer.active) {
        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 150 && distance > 0) {
          particle.x += (dx / distance) * 0.55;
          particle.y += (dy / distance) * 0.55;
        }
      }

      for (let j = index + 1; j < particles.length; j += 1) {
        const other = particles[j];
        const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
        if (distance < 130) {
          context.globalAlpha = (1 - distance / 130) * 0.16;
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        }
      }

      context.globalAlpha = 0.24;
      context.fillStyle = muted;
      context.font = `${particle.size}px Georgia, serif`;
      context.fillText(particle.symbol, particle.x, particle.y);
    });

    animationFrame = requestAnimationFrame(draw);
  }

  function handlePointerMove(event) {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.active = true;
  }

  function handlePointerLeave() {
    pointer.active = false;
  }

  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", handlePointerMove);
  window.addEventListener("pointerleave", handlePointerLeave);

  resize();
  draw();

  canvasCleanup = () => {
    cancelAnimationFrame(animationFrame);
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerleave", handlePointerLeave);
  };
}

function initializeFilters() {
  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    const controls = group.querySelectorAll("[data-filter]");
    const targets = document.querySelectorAll(group.dataset.filterGroup);

    controls.forEach((control) => {
      control.addEventListener("click", () => {
        const filter = control.dataset.filter;
        controls.forEach((button) => button.classList.toggle("active", button === control));
        targets.forEach((target) => {
          const values = (target.dataset.filterValue || "").split(" ");
          const show = filter === "all" || values.includes(filter);
          target.hidden = !show;
        });
      });
    });
  });
}

function initializeLocalScroll() {
  document.querySelectorAll("[data-scroll-target]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.getElementById(link.dataset.scrollTarget);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function updateThemeIcon(toggle) {
  const currentTheme = document.documentElement.dataset.theme || "light";
  toggle.innerHTML =
    currentTheme === "dark"
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
}

function renderHome() {
  const updated = formatLastModified();
  return layout({
    contentHtml: `
      <section class="home-grid">
        <article class="intro-panel reveal">
          <p class="lede">
            I study <strong>probability</strong>, <strong>machine learning</strong>,
            and mathematics across UMich and SJTU.
          </p>
          <div class="education-list" aria-label="Education">
            <div>
              <i class="fa-solid fa-square-root-variable"></i>
              <span>
                <strong>B.S. in Mathematics</strong>
                <small>In progress &middot; Probability &amp; Machine Learning &middot; University of Michigan</small>
              </span>
            </div>
            <div>
              <i class="fa-solid fa-microchip"></i>
              <span>
                <strong>B.Eng. in Electrical &amp; Computer Engineering</strong>
                <small>Shanghai Jiao Tong University</small>
              </span>
            </div>
          </div>
          <p>
            This website collects my UMich math notes, research and reading
            materials, and curriculum vitae. I plan to apply for Ph.D. programs
            for Fall 2027 intake.
          </p>
          <div class="cta-row">
            <a class="button primary" href="#/research">
              <i class="fa-solid fa-arrow-right"></i><span>View research</span>
            </a>
            <a class="button" href="#/notes">
              <i class="fa-solid fa-book"></i><span>Browse notes</span>
            </a>
            <a class="button" href="#/home" data-scroll-target="programming-projects">
              <i class="fa-solid fa-code"></i><span>Projects</span>
            </a>
          </div>
        </article>

        <aside class="contact-panel reveal" data-tilt>
          <div class="focus-board" data-spotlight>
            <span>Algebra</span>
            <span>Representation</span>
            <span>Number Theory</span>
            <span>Combinatorics</span>
          </div>
          <div class="contact-list">
            <a href="https://github.com/Shaotian-Sun" target="_blank" rel="noreferrer">
              <i class="fab fa-github"></i><span>github.com/Shaotian-Sun</span>
            </a>
            <a href="mailto:shaotian@umich.edu">
              <i class="fas fa-envelope"></i><span>shaotian@umich.edu</span>
            </a>
            <button type="button" data-copy-email>
              <i class="fa-regular fa-copy"></i><span>Copy email</span>
            </button>
          </div>
        </aside>
      </section>

      <section class="projects-section reveal" id="programming-projects" aria-labelledby="programming-projects-title">
        <div class="section-heading compact">
          <div>
            <p class="eyebrow"><i class="fa-solid fa-code"></i> Programming</p>
            <h2 id="programming-projects-title">Programming projects</h2>
          </div>
          <a class="button" href="https://github.com/Shaotian-Sun" target="_blank" rel="noreferrer">
            <i class="fab fa-github"></i><span>GitHub</span>
          </a>
        </div>

        <div class="project-grid">
          ${programmingProjects.map(projectCard).join("")}
        </div>
      </section>

      <section class="timeline-section reveal" aria-labelledby="experience-timeline-title">
        <div class="section-heading">
          <p class="eyebrow"><i class="fa-solid fa-timeline"></i> Timeline</p>
          <h2 id="experience-timeline-title">Teaching and research experience</h2>
        </div>

        <div class="timeline-grid">
          ${timelineColumn("Teaching Experience", "fa-solid fa-person-chalkboard", teachingTimeline)}
          ${timelineColumn("Research Line", "fa-solid fa-flask", researchTimeline)}
        </div>
      </section>

      <section class="quick-stats reveal" aria-label="Website highlights">
        ${statCard("5", "Research and reading threads", "fa-solid fa-diagram-project")}
        ${statCard("8", "Course note collections", "fa-solid fa-layer-group")}
        ${statCard("8", "Teaching and support roles", "fa-solid fa-graduation-cap")}
      </section>

      <section class="feature-strip reveal">
        <a href="#/research">
          <i class="fa-solid fa-cube"></i>
          <span>
            <strong>Current focus</strong>
            <small>Representation theory, algebraic number theory, and ordered structures</small>
          </span>
        </a>
        <a href="#/notes">
          <i class="fa-solid fa-pen-nib"></i>
          <span>
            <strong>Working archive</strong>
            <small>Course notes organized by term and subject</small>
          </span>
        </a>
      </section>

      <p class="updated reveal">Last updated: ${updated}</p>
    `,
  });
}

function projectCard({ title, type, icon, desc, tags, href, cta }) {
  const external = href.startsWith("http");
  return `
    <article class="project-card" data-tilt>
      <div class="project-icon"><i class="${icon}"></i></div>
      <p>${type}</p>
      <h3>${title}</h3>
      <span>${desc}</span>
      <div class="project-tags">
        ${tags.map((tag) => `<small>${tag}</small>`).join("")}
      </div>
      <a href="${href}" ${external ? 'target="_blank" rel="noreferrer"' : ""}>
        <span>${cta}</span><i class="fa-solid fa-arrow-up-right-from-square"></i>
      </a>
    </article>
  `;
}

function statCard(number, label, icon) {
  return `
    <article class="stat-card" data-tilt>
      <i class="${icon}"></i>
      <strong>${number}</strong>
      <span>${label}</span>
    </article>
  `;
}

function timelineColumn(title, icon, items) {
  return `
    <article class="timeline-column">
      <h3><i class="${icon}"></i>${title}</h3>
      <ol class="experience-timeline">
        ${items.map(timelineItem).join("")}
      </ol>
    </article>
  `;
}

function timelineItem({ term, role, place, icon }) {
  return `
    <li>
      <span class="timeline-node"><i class="${icon}"></i></span>
      <div class="timeline-copy">
        <time>${term}</time>
        <strong>${role}</strong>
        <span>${place}</span>
      </div>
    </li>
  `;
}

function renderNotes() {
  return layout({
    contentHtml: `
      <div class="filter-bar reveal" data-filter-group=".note-card">
        ${filterButton("all", "All", true)}
        ${filterButton("algebra", "Algebra")}
        ${filterButton("analysis", "Analysis")}
        ${filterButton("geometry", "Geometry")}
        ${filterButton("combinatorics", "Combinatorics")}
      </div>
      <section class="note-timeline reveal">
        ${noteTerms.map((term) => notesSection(term.term, term.items)).join("")}
      </section>
    `,
  });
}

function notesSection(title, items) {
  const values = new Set(items.flatMap((item) => item.tags));
  const li = items
    .map(
      (x) => `
        <li>
          <a href="${x.href}" target="_blank" rel="noreferrer">
            <span>${x.text}</span><i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
          <small>${x.course}</small>
        </li>
      `,
    )
    .join("");

  return `
    <article class="note-card" data-tilt data-filter-value="${Array.from(values).join(" ")}">
      <h2>${title}</h2>
      <ul>${li}</ul>
    </article>
  `;
}

function renderResearch() {
  return layout({
    contentHtml: `
      <div class="filter-bar reveal" data-filter-group=".post-card">
        ${filterButton("all", "All", true)}
        ${filterButton("representation", "Representation")}
        ${filterButton("combinatorics", "Combinatorics")}
        ${filterButton("number", "Number Theory")}
      </div>

      <section class="interest-strip reveal">
        <span>Algebra</span>
        <span>Number Theory</span>
        <span>Representation Theory</span>
        <span>Algebraic Geometry</span>
        <span>Combinatorics</span>
        <span>Theoretical CS</span>
      </section>

      <section class="research-list">
        ${researchPosts.map(postCard).join("")}
      </section>
    `,
  });
}

function filterButton(value, label, active = false) {
  return `
    <button class="${active ? "active" : ""}" type="button" data-filter="${value}">
      ${label}
    </button>
  `;
}

function postCard({ img, alt, title, desc, metaLeft, metaRight, category, body }) {
  return `
    <details class="post-card reveal" data-filter-value="${category}">
      <summary>
        <img src="${img}" alt="${alt}" />
        <span class="post-copy">
          <span class="post-meta">
            <span><i class="fa-regular fa-calendar"></i>${metaLeft}</span>
            <span><i class="fa-regular fa-bookmark"></i>${metaRight}</span>
          </span>
          <strong>${title}</strong>
          <span>${desc}</span>
        </span>
        <i class="fa-solid fa-chevron-down post-chevron"></i>
      </summary>
      <div class="post-body">
        ${body}
      </div>
    </details>
  `;
}

function renderCV() {
  return layout({
    contentHtml: `
      <section class="cv-panel reveal">
        <div>
          <p class="eyebrow"><i class="fa-solid fa-file-pdf"></i> PDF Curriculum Vitae</p>
          <h2>Full academic CV</h2>
          <p>
            A complete academic curriculum vitae including education, coursework,
            research, and teaching experience.
          </p>
        </div>

        <a
          class="button primary"
          href="https://drive.google.com/file/d/1GnwUtBoVj7udbP6qmh2AXJ-d2jXAnGT_/view?usp=sharing"
          target="_blank"
          rel="noreferrer"
        >
          <i class="fa-solid fa-file-pdf"></i><span>View / Download</span>
        </a>
      </section>
    `,
  });
}
