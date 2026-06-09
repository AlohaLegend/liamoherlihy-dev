const year = document.querySelector("[data-year]");
const typeLine = document.querySelector("[data-type-text]");
const bootScreen = document.querySelector("[data-boot-screen]");
const bootLog = document.querySelector("[data-boot-log]");
const menuClock = document.querySelector("[data-menu-clock]");
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
  "turning jargon off...",
  "ready."
];

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

  windows.forEach((item, index) => {
    const delay = reduceMotion ? 0 : 120 + index * 120;
    window.setTimeout(() => item.classList.add("is-open"), delay);
  });

  window.setTimeout(typeIntro, reduceMotion ? 0 : 240);
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
