// --- Tiny client-side router (hash-based, GitHub Pages friendly) ---
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
    <div class="ambient" aria-hidden="true">
      <span></span><span></span><span></span>
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
        <div class="hero-orbit" aria-hidden="true">
          <span>Alg</span><span>Rep</span><span>NT</span>
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
  const toggle = document.querySelector("[data-theme-toggle]");
  if (toggle) {
    updateThemeIcon(toggle);

    toggle.addEventListener("click", () => {
      const nextTheme =
        document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = nextTheme;
      localStorage.setItem("theme", nextTheme);
      updateThemeIcon(toggle);
    });
  }

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
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
      card.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateY(-3px)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });

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

function updateThemeIcon(toggle) {
  const currentTheme = document.documentElement.dataset.theme || "light";
  toggle.innerHTML =
    currentTheme === "dark"
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
}

// --- Pages ---
function renderHome() {
  const updated = formatLastModified();
  return layout({
    contentHtml: `
      <section class="home-grid">
        <article class="intro-panel reveal">
          <p class="lede">
            I am double majoring in <strong>Honors Mathematics</strong> at the
            University of Michigan, Ann Arbor and in
            <strong>Electrical &amp; Computer Engineering</strong> at Shanghai Jiao
            Tong University.
          </p>
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
          </div>
        </article>

        <aside class="contact-panel reveal" data-tilt>
          <div class="matrix-card" aria-hidden="true">
            <span>x^2 + y^2</span>
            <span>Gal(L/K)</span>
            <span>Spec R</span>
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

      <section class="quick-stats reveal" aria-label="Website highlights">
        ${statCard("3", "Active reading/research threads", "fa-solid fa-diagram-project")}
        ${statCard("8", "Course note collections", "fa-solid fa-layer-group")}
        ${statCard("2027", "Planned Ph.D. application cycle", "fa-solid fa-graduation-cap")}
      </section>

      <p class="updated reveal">Last updated: ${updated}</p>
    `,
  });
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

function renderNotes() {
  return layout({
    contentHtml: `
      <section class="note-timeline reveal">
        ${notesSection("Fall 2024", [
          {
            href: "https://github.com/Shaotian-Sun/math-notes/tree/main/math451",
            text: "Analysis of a Single Variable",
            course: "MATH451, Advanced Calculus I",
          },
          {
            href: "https://github.com/Shaotian-Sun/math-notes/tree/main/math493",
            text:
              "Group Theory, Representation Theory of Crystallographic Group, " +
              "and Representation Theory of Finite Group",
            course: "MATH493, Honors Algebra I",
          },
          {
            href: "https://ghseeli.github.io/teaching/2024/08/27/math-565.html",
            text: "Graph Theory, and Combinatorial Geometry",
            course: "MATH565, Combinatorics and Graph Theory",
          },
        ])}

        ${notesSection("Winter 2025", [
          {
            href: "https://github.com/Shaotian-Sun/math-notes/tree/main/math494",
            text: "Ring, Module, Field, and Galois Theory",
            course: "MATH494, Honors Algebra II",
          },
          {
            href: "https://github.com/Shaotian-Sun/math-notes/tree/main/math525",
            text: "Graduate Probability Theory",
            course: "MATH525, Probability Theory",
          },
        ])}

        ${notesSection("Fall 2025", [
          {
            href: "https://github.com/Shaotian-Sun/math-notes/tree/main/math395",
            text: "Multivariable Analysis and Manifold",
            course: "MATH395, Honors Analysis I",
          },
          {
            href: "https://github.com/Shaotian-Sun/math-notes/tree/main/math596",
            text: "Graduate Complex Analysis",
            course: "MATH596, Analysis I, Ph.D. alpha course",
          },
          {
            href: "https://github.com/Shaotian-Sun/math-notes/tree/main/math614",
            text: "Commutative Algebra",
            course: "MATH614, Ph.D. beta course",
          },
        ])}
      </section>
    `,
  });
}

function notesSection(title, items) {
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
    <article class="note-card" data-tilt>
      <h2>${title}</h2>
      <ul>${li}</ul>
    </article>
  `;
}

function renderResearch() {
  return layout({
    contentHtml: `
      <section class="interest-strip reveal">
        <span>Algebra</span>
        <span>Number Theory</span>
        <span>Representation Theory</span>
        <span>Algebraic Geometry</span>
        <span>Combinatorics</span>
        <span>Theoretical CS</span>
      </section>

      <section class="research-list">
        ${postCard({
          img: "image/Rep Thy.png",
          alt: "Representation theory preview",
          title: "Representation Theory Reading",
          desc: "Reading Representation Theory: A First Course, currently around Chapter 11.",
          metaLeft: "Fall 2025 - Winter 2026",
          metaRight: "Reading",
          body: `
            <p>
              The current reading note can be accessed
              <a href="files/Independent_Reading__Representation_Theory_Notes.pdf">here</a>.
            </p>
            <div class="tags">
              <span>Representation Theory</span><span>Lie Group</span><span>Lie Algebra</span>
            </div>
          `,
        })}

        ${postCard({
          img: "image/hasse_diagram.png",
          alt: "TITO preview",
          title: "TITOgraphy: When Order Takes Shape",
          desc: "An algorithmic project comparing translational-invariant total orders.",
          metaLeft: "Fall 2025",
          metaRight: "Research",
          body: `
            <p>
              Final report can be downloaded
              <a href="files/LOG_(M_)_Final_Report-TITO_When_Order_Takes_Shape.pdf">here</a>.
            </p>
            <div class="tags"><span>Combinatorics</span></div>
          `,
        })}

        ${postCard({
          img: "image/number-theory.png",
          alt: "Number theory preview",
          title: "Algebraic Number Theory Reading",
          desc: "A reading project on Chapters 1-4 of Number Fields.",
          metaLeft: "Summer 2025",
          metaRight: "Reading",
          body: `
            <p>Final presentation can be accessed through <a href="#/cv">CV</a>.</p>
            <div class="tags"><span>Number Theory</span><span>Algebra</span></div>
          `,
        })}
      </section>
    `,
  });
}

function postCard({ img, alt, title, desc, metaLeft, metaRight, body }) {
  return `
    <details class="post-card reveal">
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
