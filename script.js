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
  "checking keyboard...",
  "loading plain-English translator...",
  "mounting portfolio disk...",
  "preparing interface upgrades...",
  "turning jargon off...",
  "ready."
];

const eras = {
  classic: {
    label: "Basic Site",
    stage: "Version 1: basic website",
    copy: "Clear services, clear trust, clear next step.",
    personality:
      "A clean starting point for businesses that need to look current, explain the offer, and make the next step obvious.",
    upgradeName: "Basic version",
    upgradeLine: "Loading the simple service-site version.",
    range: {
      kicker: "Basic direction",
      title: "Make the business easy to understand in one visit.",
      copy:
        "This version is for the owner whose website needs to stop confusing people and start answering the first questions.",
      cards: [
        {
          number: "01",
          title: "Service snapshot",
          copy: "What you do, where you do it, who it is for, and what it costs when that is useful."
        },
        {
          number: "02",
          title: "Trust in plain sight",
          copy: "Reviews, photos, proof, FAQs, and small details placed before someone hesitates."
        },
        {
          number: "03",
          title: "Fast contact path",
          copy: "Call, quote, book, directions, or message placed where a normal customer expects it."
        }
      ]
    }
  },
  studio: {
    label: "Creative Site",
    stage: "Version 2: creative website",
    copy: "Same structure, stronger taste, more visual proof.",
    personality:
      "A more expressive version for restaurants, creatives, brands, and anyone whose taste is part of the sale.",
    upgradeName: "Creative version",
    upgradeLine: "Switching to the more visual brand version.",
    range: {
      kicker: "Creative direction",
      title: "Make the business feel specific before anyone reads a paragraph.",
      copy:
        "This version is for restaurants, artists, founders, and brands where taste, imagery, and pacing help sell the offer.",
      cards: [
        {
          number: "A",
          title: "Visual first impression",
          copy: "Photography, motion feel, and layout rhythm that create a point of view immediately."
        },
        {
          number: "B",
          title: "Story-led browsing",
          copy: "Sections that feel paced, curated, and memorable instead of stacked like a generic homepage."
        },
        {
          number: "C",
          title: "Proof with taste",
          copy: "Projects, credits, products, menus, and visuals arranged so the work sells itself."
        }
      ]
    }
  },
  live: {
    label: "Business Site",
    stage: "Version 3: business website",
    copy: "Same structure, sharper lead flow, more useful business logic.",
    personality:
      "A conversion-focused version for owners who want the site to guide customers, collect better requests, and support operations.",
    upgradeName: "Business version",
    upgradeLine: "Switching to the business-focused version.",
    range: {
      kicker: "Business direction",
      title: "Make the website behave like a better front desk.",
      copy:
        "This version is for a company that needs better leads, clearer offers, smarter intake, and fewer loose ends.",
      cards: [
        {
          number: "01",
          title: "Offer and qualification",
          copy: "Service pages, packages, or quote paths that help visitors choose the right next step."
        },
        {
          number: "02",
          title: "Lead intake system",
          copy: "Forms and flows that collect the details you actually need before the first conversation."
        },
        {
          number: "03",
          title: "Follow-up logic",
          copy: "Automations, AI helpers, or simple dashboards that make the website useful after launch."
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
      "Reviews, photos, services, press, and past work should be close to the decision. I would turn scattered proof into a clear reason to trust you.",
    points: [
      "Project rows, review placement, FAQs, and stronger service pages",
      "A portfolio or proof section that normal people can scan quickly"
    ]
  },
  blank: {
    kicker: "What that usually means",
    title: "You need someone to shape the first version.",
    copy:
      "You do not need a perfect brief. I can help turn the rough idea into a simple website plan, then build the useful first version.",
    points: [
      "Plain-English questions before design starts",
      "A small site that explains the offer and gives people a way to act"
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
        "Plain English version:",
        message
      ].join("\n")
    );

    window.location.href = `mailto:hello@liamoherlihy.dev?subject=${subject}&body=${body}`;

    if (formNote) {
      formNote.textContent = "Email draft opened. If nothing happened, email hello@liamoherlihy.dev directly.";
    }
  });
}
