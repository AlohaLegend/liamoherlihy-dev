const year = document.querySelector("[data-year]");
const typeLine = document.querySelector("[data-type-text]");
const bootScreen = document.querySelector("[data-boot-screen]");
const bootLog = document.querySelector("[data-boot-log]");
const upgradeOverlay = document.querySelector("[data-upgrade-overlay]");
const upgradeName = document.querySelector("[data-upgrade-name]");
const upgradeLine = document.querySelector("[data-upgrade-line]");
const upgradeMeter = document.querySelector("[data-upgrade-meter]");
const menuClock = document.querySelector("[data-menu-clock]");
const eraLabel = document.querySelector("[data-era-label]");
const eraStage = document.querySelector("[data-era-stage]");
const eraCopy = document.querySelector("[data-era-copy]");
const eraPersonality = document.querySelector("[data-era-personality]");
const rangeKicker = document.querySelector("[data-range-kicker]");
const rangeTitle = document.querySelector("[data-range-title]");
const rangeCopy = document.querySelector("[data-range-copy]");
const rangeCards = Array.from(document.querySelectorAll("[data-range-card]"));
const eraButtons = Array.from(document.querySelectorAll("[data-era-button]"));
const windows = Array.from(document.querySelectorAll("[data-window]"));
const translationButtons = Array.from(document.querySelectorAll("[data-translation]"));
const translationKicker = document.querySelector("[data-translation-kicker]");
const translationTitle = document.querySelector("[data-translation-title]");
const translationCopy = document.querySelector("[data-translation-copy]");
const translationPoints = document.querySelector("[data-translation-points]");
const contactForm = document.querySelector("[data-contact-form]");
const formNote = document.querySelector("[data-form-note]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const bootLines = [
  "checking the old site folder...",
  "loading project notes...",
  "finding the important photos...",
  "clearing out the extra words...",
  "setting the first page...",
  "ready."
];

const eras = {
  classic: {
    label: "Basic Site",
    stage: "Plain website",
    copy: "Plain pages, real examples, and an obvious next step.",
    personality:
      "A clean starting point for a business that needs to look current, explain what it does, and stop making people guess.",
    upgradeName: "Basic site",
    upgradeLine: "Opening the simple site.",
    range: {
      kicker: "Basic site",
      title: "Make the business easy to understand.",
      copy:
        "Good for an owner whose site needs to feel current, explain the work, and make action easy.",
      cards: [
        {
          number: "01",
          title: "What you do",
          copy: "A clean explanation of the service, the area, and the kind of customer it is for."
        },
        {
          number: "02",
          title: "Why people trust it",
          copy: "Reviews, photos, past work, FAQs, and small details placed where they matter."
        },
        {
          number: "03",
          title: "How to start",
          copy: "Call, quote, book, directions, or message placed where a customer expects it."
        }
      ]
    }
  },
  studio: {
    label: "Creative Site",
    stage: "Visual website",
    copy: "More feeling, stronger images, and a point of view.",
    personality:
      "A more visual site for restaurants, artists, brands, and anyone whose taste is part of the work.",
    upgradeName: "Creative site",
    upgradeLine: "Opening a more visual site.",
    range: {
      kicker: "Creative site",
      title: "Let the work set the mood first.",
      copy:
        "Good for work where photos, pacing, and taste carry a real part of the decision.",
      cards: [
        {
          number: "A",
          title: "First look",
          copy: "A strong opening image, a little restraint, and a page that feels like the work."
        },
        {
          number: "B",
          title: "Project rhythm",
          copy: "Sections paced like a small edit instead of a pile of generic homepage blocks."
        },
        {
          number: "C",
          title: "The good stuff",
          copy: "Projects, credits, menus, products, or images arranged so the work sells itself."
        }
      ]
    }
  },
  live: {
    label: "Business Site",
    stage: "Practical website",
    copy: "Clear choices, better questions, and less back-and-forth.",
    personality:
      "A practical site for owners who want better questions coming in and an easier next conversation.",
    upgradeName: "Business site",
    upgradeLine: "Opening the practical site.",
    range: {
      kicker: "Business site",
      title: "Make it easier to answer people.",
      copy:
        "Good for a company that needs clearer choices, better questions, and fewer loose ends after someone reaches out.",
      cards: [
        {
          number: "01",
          title: "What you sell",
          copy: "Service pages, packages, or quote paths that help people choose the right next step."
        },
        {
          number: "02",
          title: "What to ask",
          copy: "Questions that collect the details you actually need before the first conversation."
        },
        {
          number: "03",
          title: "How to reply",
          copy: "A launch setup that makes replies, updates, and next steps easier to keep track of."
        }
      ]
    }
  }
};

let currentEra = "";
let userPickedEra = false;
const upgradeTimers = [];

const translations = {
  old: {
    kicker: "What that usually means",
    title: "The site stopped matching the business.",
    copy:
      "The business grew. The website stayed frozen. I would rebuild the first impression, update the words and visuals, and make the next step obvious.",
    points: [
      "Current photos, clearer sections, better mobile layout",
      "Calls, forms, booking, or directions placed where people need them"
    ]
  },
  click: {
    kicker: "What that usually means",
    title: "The page is making visitors guess.",
    copy:
      "A customer should not have to hunt for the next move. I would simplify the page around the action you actually want.",
    points: [
      "Clear buttons for call, book, order, quote, message, or visit",
      "A simpler homepage path with fewer dead ends"
    ]
  },
  proof: {
    kicker: "What that usually means",
    title: "The trust is real, but it is not working hard enough.",
    copy:
      "Reviews, photos, services, press, and past work should be close to the decision. I would turn scattered good material into a clear reason to trust you.",
    points: [
      "Project rows, review placement, FAQs, and stronger service pages",
      "A work or trust section that normal people can scan quickly"
    ]
  },
  blank: {
    kicker: "What that usually means",
    title: "You need someone to shape the starting point.",
    copy:
      "You do not need a perfect brief. I can help turn the rough idea into a simple website plan, then build the useful starting point.",
    points: [
      "Simple questions before design starts",
      "A small site that explains what you do and gives people a way to act"
    ]
  }
};

if (year) {
  year.textContent = new Date().getFullYear();
}

const updateClock = () => {
  if (!menuClock) return;
  const now = new Date();
  menuClock.textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
};

updateClock();
window.setInterval(updateClock, 1000);

const openDesktop = () => {
  document.body.classList.add("is-booted");
  if (bootScreen) bootScreen.setAttribute("aria-hidden", "true");
  setEra("classic", { animate: false });

  windows.forEach((item, index) => {
    const delay = reduceMotion ? 0 : 120 + index * 120;
    window.setTimeout(() => item.classList.add("is-open"), delay);
  });

  window.setTimeout(typeIntro, reduceMotion ? 0 : 240);
  scheduleAutoUpgrades();
};

const appendBootLine = (text, onComplete) => {
  if (!bootLog) {
    onComplete();
    return;
  }

  const line = document.createElement("p");
  line.className = "boot-line is-active";
  bootLog.append(line);

  if (reduceMotion) {
    line.textContent = text;
    line.classList.remove("is-active");
    onComplete();
    return;
  }

  let index = 0;
  const tick = () => {
    line.textContent = text.slice(0, index);
    index += 1;

    if (index <= text.length) {
      window.setTimeout(tick, 18);
      return;
    }

    line.classList.remove("is-active");
    window.setTimeout(onComplete, 120);
  };

  tick();
};

const startBoot = () => {
  if (!bootLog) {
    openDesktop();
    return;
  }

  let index = 0;
  const next = () => {
    if (index >= bootLines.length) {
      window.setTimeout(openDesktop, reduceMotion ? 0 : 280);
      return;
    }

    appendBootLine(bootLines[index], () => {
      index += 1;
      next();
    });
  };

  next();
};

const typeIntro = () => {
  if (!typeLine) return;
  const text = typeLine.dataset.typeText || typeLine.textContent || "";

  if (reduceMotion) {
    typeLine.textContent = text;
    typeLine.classList.add("is-done");
    return;
  }

  typeLine.textContent = "";
  typeLine.classList.remove("is-done");
  let index = 0;

  const tick = () => {
    typeLine.textContent = text.slice(0, index);
    index += 1;

    if (index <= text.length) {
      window.setTimeout(tick, 54);
      return;
    }

    typeLine.classList.add("is-done");
  };

  tick();
};

const updateEraText = (key) => {
  const era = eras[key];
  if (!era) return;

  if (eraLabel) eraLabel.textContent = era.label;
  if (eraStage) eraStage.textContent = era.stage;
  if (eraCopy) eraCopy.textContent = era.copy;
  if (eraPersonality) eraPersonality.textContent = era.personality;
  if (rangeKicker) rangeKicker.textContent = era.range.kicker;
  if (rangeTitle) rangeTitle.textContent = era.range.title;
  if (rangeCopy) rangeCopy.textContent = era.range.copy;

  rangeCards.forEach((card, index) => {
    const data = era.range.cards[index];
    if (!data) return;

    const number = card.querySelector("[data-card-number]");
    const title = card.querySelector("[data-card-title]");
    const copy = card.querySelector("[data-card-copy]");
    if (number) number.textContent = data.number;
    if (title) title.textContent = data.title;
    if (copy) copy.textContent = data.copy;
  });

  eraButtons.forEach((button) => {
    const active = button.dataset.eraButton === key;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
};

const applyEraClass = (key) => {
  document.body.classList.remove("era-classic", "era-studio", "era-live");
  document.body.classList.add(`era-${key}`);
  document.body.dataset.era = key;
  currentEra = key;
  updateEraText(key);
};

const showUpgradeOverlay = (key) => {
  const era = eras[key];
  if (!upgradeOverlay || !era) return;

  if (upgradeName) upgradeName.textContent = era.upgradeName;
  if (upgradeLine) upgradeLine.textContent = era.upgradeLine;
  if (upgradeMeter) {
    upgradeMeter.style.animation = "none";
    upgradeMeter.offsetHeight;
    upgradeMeter.style.animation = "";
  }

  upgradeOverlay.setAttribute("aria-hidden", "false");
  upgradeOverlay.classList.add("is-visible", "is-running");
  document.body.classList.add("is-upgrading");
};

const hideUpgradeOverlay = () => {
  if (upgradeOverlay) {
    upgradeOverlay.classList.remove("is-visible", "is-running");
    upgradeOverlay.setAttribute("aria-hidden", "true");
  }
  document.body.classList.remove("is-upgrading");
};

const setEra = (key, options = {}) => {
  if (!eras[key] || key === currentEra) {
    updateEraText(currentEra);
    return;
  }

  const shouldAnimate = options.animate !== false && !reduceMotion;

  if (!shouldAnimate) {
    applyEraClass(key);
    hideUpgradeOverlay();
    return;
  }

  showUpgradeOverlay(key);
  window.setTimeout(() => applyEraClass(key), 360);
  window.setTimeout(hideUpgradeOverlay, 1180);
};

const scheduleAutoUpgrades = () => {
  upgradeTimers.push(
    window.setTimeout(() => {
      if (!userPickedEra) setEra("studio", { animate: true });
    }, 3600)
  );

  upgradeTimers.push(
    window.setTimeout(() => {
      if (!userPickedEra) setEra("live", { animate: true });
    }, 8300)
  );
};

eraButtons.forEach((button) => {
  button.addEventListener("click", () => {
    userPickedEra = true;
    upgradeTimers.forEach((timer) => window.clearTimeout(timer));
    setEra(button.dataset.eraButton, { animate: true });
  });
});

const renderTranslation = (key) => {
  const translation = translations[key];
  if (!translation) return;

  translationButtons.forEach((button) => {
    const active = button.dataset.translation === key;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });

  if (translationKicker) translationKicker.textContent = translation.kicker;
  if (translationTitle) translationTitle.textContent = translation.title;
  if (translationCopy) translationCopy.textContent = translation.copy;
  if (translationPoints) {
    translationPoints.innerHTML = translation.points.map((point) => `<li>${point}</li>`).join("");
  }
};

translationButtons.forEach((button) => {
  button.addEventListener("click", () => renderTranslation(button.dataset.translation));
});

startBoot();

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const name = data.get("name")?.toString().trim() || "";
    const email = data.get("email")?.toString().trim() || "";
    const website = data.get("website")?.toString().trim() || "";
    const need = data.get("need")?.toString().trim() || "";
    const message = data.get("message")?.toString().trim() || "";

    const subject = encodeURIComponent(`Website help from ${name || "website visitor"}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Current website: ${website}`,
        `What sounds closest: ${need}`,
        "",
        "Notes:",
        message
      ].join("\n")
    );

    window.location.href = `mailto:hello@liamoherlihy.dev?subject=${subject}&body=${body}`;

    if (formNote) {
      formNote.textContent = "Email draft opened. If nothing happened, email hello@liamoherlihy.dev directly.";
    }
  });
}
