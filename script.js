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
    label: "Repair Build",
    stage: "Generation 1: plain-service site",
    copy: "Strip confusion away: who you help, what you do, and how to start.",
    personality:
      "A practical refresh for the business that needs to look current and make the next step obvious.",
    upgradeName: "Generation 1",
    upgradeLine: "Loading the clear local-business build."
  },
  studio: {
    label: "Showcase Build",
    stage: "Generation 2: visual showcase site",
    copy: "Turn the same business into something people can feel, browse, and remember.",
    personality:
      "A custom visual direction for restaurants, creatives, brands, and anyone whose taste is part of the sale.",
    upgradeName: "Generation 2",
    upgradeLine: "Rebuilding the page as a visual showcase."
  },
  live: {
    label: "System Build",
    stage: "Generation 3: custom web or AI system",
    copy: "Make the website do more: collect requests, route leads, answer questions, and support the business.",
    personality:
      "A more custom build for owners who want a site, workflow, and AI-assisted helper shaped around how they actually operate.",
    upgradeName: "Generation 3",
    upgradeLine: "Activating the custom business-system layer."
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
