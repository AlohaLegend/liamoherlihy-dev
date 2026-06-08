const header = document.querySelector("[data-header]");
const year = document.querySelector("[data-year]");
const contactForm = document.querySelector("[data-contact-form]");
const formNote = document.querySelector("[data-form-note]");
const clock = document.querySelector("[data-lab-clock]");
const modeButtons = Array.from(document.querySelectorAll("[data-mode]"));
const modeTitle = document.querySelector("[data-mode-title]");
const modeKicker = document.querySelector("[data-mode-kicker]");
const modeSummary = document.querySelector("[data-mode-summary]");
const modePoints = document.querySelector("[data-mode-points]");
const artifacts = Array.from(document.querySelectorAll("[data-artifact]"));

const modes = {
  site: {
    kicker: "Website build",
    title: "Make the first click make sense.",
    summary:
      "A custom site shaped around one job: explain the offer, prove trust, capture demand, and make follow-up easier.",
    points: [
      "Page architecture, copy, visual system, and responsive build",
      "SEO, analytics, deployment, and lead-routing handoff"
    ]
  },
  workflow: {
    kicker: "AI workflow",
    title: "Put the repetitive work on rails.",
    summary:
      "Lead intake, summaries, support drafts, reports, and content ops become one reviewed workflow instead of scattered manual labor.",
    points: [
      "Workflow audit across the tools you already use",
      "AI/API automation with checkpoints, logging, and docs"
    ]
  },
  system: {
    kicker: "Business operating system",
    title: "Connect the site to the machine behind it.",
    summary:
      "Frontend, lead capture, assistant logic, admin views, analytics, and iteration become one practical system.",
    points: [
      "Website plus CRM or database-backed workflows",
      "Assistant, dashboard, launch QA, and improvement loop"
    ]
  }
};

if (year) {
  year.textContent = new Date().getFullYear();
}

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 16);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const updateClock = () => {
  if (!clock) return;
  const now = new Date();
  clock.textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
};

updateClock();
window.setInterval(updateClock, 1000);

const setMode = (modeName) => {
  const mode = modes[modeName];
  if (!mode) return;

  modeButtons.forEach((button) => {
    const active = button.dataset.mode === modeName;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", active ? "true" : "false");
  });

  if (modeKicker) modeKicker.textContent = mode.kicker;
  if (modeTitle) modeTitle.textContent = mode.title;
  if (modeSummary) modeSummary.textContent = mode.summary;
  if (modePoints) {
    modePoints.innerHTML = mode.points.map((point) => `<li>${point}</li>`).join("");
  }

  artifacts.forEach((artifact) => {
    artifact.classList.toggle("is-active", artifact.dataset.artifact === modeName);
  });
};

modeButtons.forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.mode));
});

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const name = data.get("name")?.toString().trim() || "";
    const email = data.get("email")?.toString().trim() || "";
    const project = data.get("project")?.toString().trim() || "";
    const message = data.get("message")?.toString().trim() || "";

    const subject = encodeURIComponent(`New build inquiry from ${name || "website visitor"}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Project type: ${project}`,
        "",
        "Context:",
        message
      ].join("\n")
    );

    window.location.href = `mailto:hello@liamoherlihy.dev?subject=${subject}&body=${body}`;

    if (formNote) {
      formNote.textContent = "Email draft opened. If nothing happened, email hello@liamoherlihy.dev directly.";
    }
  });
}

const canvas = document.querySelector("[data-system-canvas]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canvas) {
  const ctx = canvas.getContext("2d");
  const points = [
    { x: 0.12, y: 0.28, vx: 0.12, vy: 0.06, color: "#b9ff4b" },
    { x: 0.28, y: 0.72, vx: -0.08, vy: 0.1, color: "#4ee6d6" },
    { x: 0.46, y: 0.38, vx: 0.1, vy: -0.08, color: "#ff715b" },
    { x: 0.66, y: 0.68, vx: -0.1, vy: 0.06, color: "#a88dff" },
    { x: 0.82, y: 0.26, vx: 0.06, vy: -0.09, color: "#ffd166" },
    { x: 0.9, y: 0.82, vx: -0.07, vy: 0.08, color: "#b9ff4b" }
  ];

  const resizeCanvas = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const draw = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    ctx.clearRect(0, 0, width, height);

    points.forEach((point) => {
      if (!reduceMotion) {
        point.x += point.vx * 0.0009;
        point.y += point.vy * 0.0009;
        if (point.x < 0.08 || point.x > 0.94) point.vx *= -1;
        if (point.y < 0.12 || point.y > 0.88) point.vy *= -1;
      }
    });

    for (let i = 0; i < points.length; i += 1) {
      for (let j = i + 1; j < points.length; j += 1) {
        const a = points[i];
        const b = points[j];
        const ax = a.x * width;
        const ay = a.y * height;
        const bx = b.x * width;
        const by = b.y * height;
        const dist = Math.hypot(ax - bx, ay - by);

        if (dist < 520) {
          ctx.globalAlpha = Math.max(0.05, 0.18 - dist / 3600);
          ctx.strokeStyle = "#f2eee4";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.stroke();
        }
      }
    }

    points.forEach((point) => {
      const x = point.x * width;
      const y = point.y * height;
      ctx.globalAlpha = 0.95;
      ctx.fillStyle = point.color;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 0.14;
      ctx.strokeStyle = point.color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.stroke();
    });

    ctx.globalAlpha = 1;

    if (!reduceMotion) {
      window.requestAnimationFrame(draw);
    }
  };

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  draw();
}
