// --- Tiny client-side router (hash-based, GitHub Pages friendly) ---
const routes = {
  home: renderHome,
  notes: renderNotes,
  research: renderResearch,
  cv: renderCV,
};

function currentRoute() {
  const hash = (location.hash || "#/home").replace(/^#\/?/, "");
  return routes[hash] ? hash : "home";
}

function navigate(route) {
  location.hash = `#/${route}`;
}

function formatLastModified() {
  const d = new Date(document.lastModified);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function layout({ title, iconClass, contentHtml }) {
  document.title = title;

  const route = currentRoute();

  return `
    <div class="header">
      <h1><i class="${iconClass}"></i> ${title}</h1>
      <a href="#/home" class="back">← Home</a>
    </div>

    <div class="nav">
      <a href="#/notes" class="${route === "notes" ? "active" : ""}">
        <i class="fa-solid fa-book"></i> Notes
      </a>
      <a href="#/research" class="${route === "research" ? "active" : ""}">
        <i class="fa-solid fa-flask"></i> Research
      </a>
      <a href="#/cv" class="${route === "cv" ? "active" : ""}">
        <i class="fa-solid fa-file-lines"></i> CV
      </a>
    </div>

    ${contentHtml}
  `;
}

function render() {
  const route = currentRoute();
  const app = document.getElementById("app");
  app.innerHTML = routes[route]();
}

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", () => {
  if (!location.hash) location.hash = "#/home";
  render();
});

// --- Pages ---
function renderHome() {
  const updated = formatLastModified();
  return `
    ${layout({
      title: "Shaotian Sun",
      iconClass: "fa-solid fa-user",
      contentHtml: `
        <div class="updated">Last updated: ${updated}</div>

        <p>
          I'm double majoring in <strong>Honors Mathematics</strong> at the
          University of Michigan, Ann Arbor and in
          <strong>Electrical &amp; Computer Engineering</strong> at Shanghai Jiao
          Tong University. This website collects my UMich math notes,
          research/reading materials, and curriculum vitae.
        </p>

        <div class="card card-pad" style="max-width: 520px;">
          <div style="display:flex; flex-direction:column; gap:0.35rem;">
            <a href="https://github.com/Shaotian-Sun" target="_blank" rel="noreferrer">
              <i class="fab fa-github"></i> github.com/Shaotian-Sun
            </a>
            <a href="mailto:shaotian@umich.edu">
              <i class="fas fa-envelope"></i> shaotian@umich.edu
            </a>
          </div>
        </div>

        <p style="margin-top:1.6rem; font-style:italic;">
          I'm applying to Ph.D. programs in Mathematics in Fall 2026.
        </p>
      `,
    })}
  `;
}

function renderNotes() {
  return layout({
    title: "Umich Mathematical Notes",
    iconClass: "fa-solid fa-book",
    contentHtml: `
      ${notesSection("Fall 2024", [
        {
          href: "https://github.com/Shaotian-Sun/math-notes/tree/main/math451",
          text: "Analysis of a Single Variable",
          course: "(MATH451, Advanced Calculus I)",
        },
        {
          href: "https://github.com/Shaotian-Sun/math-notes/tree/main/math493",
          text:
            "Group Theory, Representation Theory of Crystallographic Group, " +
            "and Representation Theory of Finite Group",
          course: "(MATH493, Honors Algebra I)",
        },
        {
          href: "https://ghseeli.github.io/teaching/2024/08/27/math-565.html",
          text: "Graph Theory, and Combinatorial Geometry",
          course: "(MATH565, Combinatorics and Graph Theory)",
        },
      ])}

      ${notesSection("Winter 2025", [
        {
          href: "https://github.com/Shaotian-Sun/math-notes/tree/main/math494",
          text: "Ring, Module, Field, and Galois Theory",
          course: "(MATH494, Honors Algebra II)",
        },
        {
          href: "https://github.com/Shaotian-Sun/math-notes/tree/main/math525",
          text: "Graduate Probability Theory",
          course: "(MATH525, Probability Theory)",
        },
      ])}

      ${notesSection("Fall 2025", [
        {
          href: "https://github.com/Shaotian-Sun/math-notes/tree/main/math395",
          text: "Multivariable Analysis and Manifold",
          course: "(MATH395, Honors Analysis I)",
        },
        {
          href: "https://github.com/Shaotian-Sun/math-notes/tree/main/math596",
          text: "Graduate Complex Analysis (Ph.D. alpha course)",
          course: "(MATH596, Analysis I)",
        },
        {
          href: "https://github.com/Shaotian-Sun/math-notes/tree/main/math614",
          text: "Commutative Algebra (Ph.D. beta course)",
          course: "(MATH614, Commutative Algebra)",
        },
      ])}
    `,
  });
}

function notesSection(title, items) {
  const li = items
    .map(
      (x) => `
        <li style="margin:0.65rem 0;">
          <a href="${x.href}" target="_blank" rel="noreferrer">${x.text}</a>
          <div style="color:var(--muted); font-style:italic; margin-top:0.15rem;">
            ${x.course}
          </div>
        </li>
      `,
    )
    .join("");

  return `
    <section class="card card-pad" style="margin:1.2rem 0;">
      <h2 style="margin:0 0 0.85rem; font-size:1.25rem;">
        <span style="
          display:inline-block; width:10px; height:10px; border-radius:999px;
          background:var(--accent); opacity:0.85; margin-right:0.55rem;
        "></span>${title}
      </h2>
      <ul style="margin:0; padding-left:1.1rem;">${li}</ul>
    </section>
  `;
}

function renderResearch() {
  return layout({
    title: "Research/Reading Blog",
    iconClass: "fa-solid fa-layer-group",
    contentHtml: `
      <div style="color:var(--muted); margin:0 0 1.6rem;">
        <p style="margin:0.35rem 0;">
          Primary interests: Algebra, Number Theory, Representation Theory, and Algebraic Geometry.
        </p>
        <p style="margin:0.35rem 0;">Other interests: Combinatorics, and Theoretical Computer Science.</p>
      </div>

      ${postCard({
        img: "image/Rep Thy.png",
        alt: "Representation theory preview",
        title: "Representation Theory Reading",
        desc: "Read <i>Representation Theory: A First Course</i>.",
        metaLeft: "Fall 2025 – Winter 2026",
        metaRight: "Reading",
        body: `
          <p>I'm currently reading Chapter 11.</p>
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
        desc: "Design and implement an algorithm to compare translational-invariant total order (TITO).",
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
        desc: "Read Chapter 1–4 of <i>Number Fields</i>.",
        metaLeft: "Summer 2025",
        metaRight: "Reading",
        body: `
          <p>Final presentation can be accessed through <a href="#/cv">CV</a>.</p>
          <div class="tags"><span>Number Theory</span><span>Algebra</span></div>
        `,
      })}
    `,
  });
}

function postCard({ img, alt, title, desc, metaLeft, metaRight, body }) {
  // Uses <details> for expand/collapse, styled via inline + shared variables
  return `
    <details class="card" style="margin:1.2rem 0; overflow:hidden;">
      <summary style="
        list-style:none; cursor:pointer; user-select:none;
        padding:1.15rem 1.15rem; position:relative; padding-right:3rem;
      ">
        <div style="
          display:grid; grid-template-columns:170px 1fr; gap:1.25rem; align-items:center;
        " class="preview-grid">
          <img src="${img}" alt="${alt}" style="
            width:100%; height:110px; border-radius:12px; border:1px solid var(--line);
            object-fit:cover; background:#fff;
          "/>
          <div>
            <h2 style="margin:0; font-size:1.25rem; color:var(--accent);">${title}</h2>
            <p style="margin:0.4rem 0 0.1rem; color:var(--muted); font-size:0.98rem;">${desc}</p>
            <div style="margin-top:0.45rem; display:flex; gap:0.5rem; flex-wrap:wrap;">
              <span class="pill"><i class="fa-regular fa-calendar"></i> ${metaLeft}</span>
              <span class="pill"><i class="fa-regular fa-bookmark"></i> ${metaRight}</span>
            </div>
          </div>
        </div>
      </summary>

      <div style="padding:0 1.25rem 1.25rem; border-top:1px solid rgba(205,222,212,0.85);">
        ${body}
      </div>
    </details>
  `;
}

function renderCV() {
  return layout({
    title: "Curriculum Vitae",
    iconClass: "fa-solid fa-file-lines",
    contentHtml: `
      <div class="card card-pad" style="
        display:flex; align-items:center; justify-content:space-between;
        gap:1rem; flex-wrap:wrap;
      ">
        <div style="max-width:560px;">
          <strong>Full CV (PDF)</strong>
          <p style="margin:0.35rem 0 0; color:var(--muted);">
            A complete academic curriculum vitae including education, coursework,
            research, and teaching experience.
          </p>
        </div>

        <a
          href="https://drive.google.com/file/d/1GnwUtBoVj7udbP6qmh2AXJ-d2jXAnGT_/view?usp=sharing"
          target="_blank"
          rel="noreferrer"
          style="
            display:inline-flex; align-items:center; gap:0.55rem;
            padding:0.55rem 0.95rem; border-radius:10px;
            border:1px solid var(--line); background:#ffffffc9;
            color:var(--accent); text-decoration:none; font-weight:600;
          "
          onmouseenter="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 10px rgba(0,0,0,0.08)';"
          onmouseleave="this.style.transform='none'; this.style.boxShadow='none';"
        >
          <i class="fa-solid fa-file-pdf"></i> View / Download
        </a>
      </div>
    `,
  });
}
