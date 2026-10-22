const projects = [
  {
    title: "Personal Portfolio Website",
    description: "A personal website to share my profile, learning journey, web development interests, and projects.",
    status: "Learning project",
    icon: "✧",
    number: "01",
    tags: ["HTML", "CSS", "JavaScript"]
  },
  {
    title: "Habit Tracker",
    description: "A beginner-friendly application concept for organizing daily habits and reflecting on consistency.",
    status: "Project concept",
    icon: "◷",
    number: "02",
    tags: ["Habit tracking", "Responsive UI"]
  },
  {
    title: "Provers — AI Assistant",
    description: "An AI assistant project concept centered on a clear, conversational interface for exploring AI.",
    status: "Project concept",
    icon: "✳",
    number: "03",
    tags: ["AI exploration", "Conversation UI"]
  },
  {
    title: "CampusFlow — Student Planning Dashboard",
    description: "A planning dashboard concept for organizing student tasks, milestones, deadlines, and team reviews.",
    status: "Project concept",
    icon: "⌘",
    number: "04",
    tags: ["Student planning", "Team workflows"]
  }
];

const contactDetails = [
  { label: "Email", value: "", placeholder: "Add your email address", icon: "✉", type: "email" },
  { label: "Phone", value: "", placeholder: "Add your phone number", icon: "⌕", type: "phone" },
  { label: "Instagram", value: "", placeholder: "Add your Instagram profile URL", icon: "◎", type: "url" },
  { label: "GitHub", value: "", placeholder: "Add your GitHub profile URL", icon: "⌘", type: "url" }
];

const projectGrid = document.querySelector("#projectGrid");
projects.forEach(project => {
  const card = document.createElement("article");
  card.className = "project-card glass-card reveal";

  const topLine = document.createElement("div");
  topLine.className = "project-topline";
  const icon = document.createElement("span");
  icon.className = "project-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = project.icon;
  const number = document.createElement("span");
  number.className = "project-number";
  number.textContent = `PROJECT ${project.number}`;
  topLine.append(icon, number);

  const title = document.createElement("h3");
  title.textContent = project.title;
  const description = document.createElement("p");
  description.textContent = project.description;
  const status = document.createElement("span");
  status.className = "project-status";
  status.textContent = project.status;
  const actions = document.createElement("div");
  actions.className = "project-actions";
  const details = document.createElement("button");
  details.className = "project-details-button";
  details.type = "button";
  details.textContent = "View details";
  details.setAttribute("aria-label", `View details for ${project.title}`);
  const code = document.createElement("span");
  code.textContent = "View code";
  actions.append(details, code);
  details.addEventListener("click", () => openProjectDetails(project, details));
  card.append(topLine, title, description, status, actions);
  projectGrid.append(card);
});

function makeContactLink(detail) {
  if (!detail.value.trim()) return null;

  if (detail.type === "email" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(detail.value)) {
    return `mailto:${detail.value}`;
  }
  if (detail.type === "phone" && /^[+\d().\-\s]+$/.test(detail.value)) {
    return `tel:${detail.value.replace(/[^\d+]/g, "")}`;
  }
  if (detail.type === "url") {
    try {
      const url = new URL(detail.value);
      if (url.protocol === "https:" && url.hostname.includes(".")) return url.href;
    } catch {
      return null;
    }
  }
  return null;
}

const contactList = document.querySelector("#contactList");
contactDetails.forEach(detail => {
  const item = document.createElement("div");
  item.className = "contact-item";
  const icon = document.createElement("span");
  icon.className = "contact-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = detail.icon;
  const text = document.createElement("span");
  const label = document.createElement("span");
  label.className = "contact-label";
  label.textContent = detail.label;
  const href = makeContactLink(detail);
  const value = document.createElement(href ? "a" : "span");
  value.className = "contact-value";
  value.textContent = detail.value || detail.placeholder;
  if (href) {
    value.href = href;
    if (detail.type === "url") {
      value.target = "_blank";
      value.rel = "noopener noreferrer";
    }
  } else {
    value.classList.add("is-placeholder");
  }
  text.append(label, value);
  item.append(icon, text);
  if (detail.value.trim()) {
    const copy = document.createElement("button");
    copy.className = "copy-contact";
    copy.type = "button";
    copy.textContent = "Copy";
    copy.setAttribute("aria-label", `Copy ${detail.label.toLowerCase()}`);
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(detail.value);
        document.querySelector("#contactCopyFeedback").textContent = `${detail.label} copied to clipboard.`;
      } catch {
        document.querySelector("#contactCopyFeedback").textContent = `Could not copy ${detail.label.toLowerCase()}. Select and copy the value instead.`;
      }
    });
    item.append(copy);
  }
  contactList.append(item);
});

const footerSocials = document.querySelector("#footerSocials");
contactDetails.filter(detail => detail.type === "url").forEach(detail => {
  const href = makeContactLink(detail);
  const profile = document.createElement(href ? "a" : "span");
  profile.className = "social-icon";
  profile.setAttribute("aria-label", href ? detail.label : `${detail.label} profile not provided`);
  profile.title = href ? detail.label : `${detail.label} profile not provided`;
  profile.textContent = detail.icon;
  if (href) {
    profile.href = href;
    profile.target = "_blank";
    profile.rel = "noopener noreferrer";
  }
  footerSocials.append(profile);
});

document.querySelector("#year").textContent = new Date().getFullYear();

const typedRole = document.querySelector("#typedRole");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const roles = ["Aspiring Web Developer", "Technology Enthusiast", "AI Explorer", "Creative Problem Solver"];
let roleIndex = 0;
let roleCharacter = roles[0].length;
let deletingRole = false;
let roleTimer = 0;

function typeRole() {
  if (prefersReducedMotion.matches) return;
  const role = roles[roleIndex];
  roleCharacter += deletingRole ? -1 : 1;
  typedRole.textContent = role.slice(0, roleCharacter);
  let delay = deletingRole ? 38 : 72;
  if (!deletingRole && roleCharacter === role.length) {
    deletingRole = true;
    delay = 1500;
  } else if (deletingRole && roleCharacter === 0) {
    deletingRole = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 280;
  }
  roleTimer = window.setTimeout(typeRole, delay);
}

if (!prefersReducedMotion.matches) roleTimer = window.setTimeout(typeRole, 1400);
prefersReducedMotion.addEventListener("change", () => {
  if (prefersReducedMotion.matches) {
    window.clearTimeout(roleTimer);
    typedRole.textContent = roles[0];
  } else {
    roleTimer = window.setTimeout(typeRole, 1400);
  }
});

const projectModal = document.querySelector("#projectModal");
const projectModalTitle = document.querySelector("#projectModalTitle");
const projectModalStatus = document.querySelector("#projectModalStatus");
const projectModalDescription = document.querySelector("#projectModalDescription");
const projectModalTags = document.querySelector("#projectModalTags");
const closeProjectModal = document.querySelector("#closeProjectModal");
let projectModalReturnFocus = null;

function openProjectDetails(project, trigger) {
  projectModalTitle.textContent = project.title;
  projectModalStatus.textContent = project.status;
  projectModalDescription.textContent = project.description;
  projectModalTags.replaceChildren();
  project.tags.forEach(tag => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = tag;
    projectModalTags.append(chip);
  });
  projectModalReturnFocus = trigger;
  projectModal.showModal();
  closeProjectModal.focus();
}

closeProjectModal.addEventListener("click", () => projectModal.close());
projectModal.addEventListener("cancel", event => {
  event.preventDefault();
  projectModal.close();
});
projectModal.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    event.preventDefault();
    projectModal.close();
  }
});
projectModal.addEventListener("click", event => {
  if (event.target === projectModal) projectModal.close();
});
projectModal.addEventListener("close", () => {
  if (projectModalReturnFocus?.isConnected) projectModalReturnFocus.focus();
});

const menuToggle = document.querySelector("#menuToggle");
const siteNav = document.querySelector("#siteNav");
const mobileNavigation = window.matchMedia("(max-width: 680px)");
siteNav.inert = mobileNavigation.matches;
function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  siteNav.classList.remove("is-open");
  siteNav.inert = mobileNavigation.matches;
}
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  siteNav.classList.toggle("is-open", !isOpen);
  siteNav.inert = isOpen && mobileNavigation.matches;
});
mobileNavigation.addEventListener("change", closeMenu);
siteNav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeMenu();
});
document.addEventListener("click", event => {
  if (!siteNav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
});

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...siteNav.querySelectorAll("a")];
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        const isActive = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", isActive);
        if (isActive) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach(section => sectionObserver.observe(section));
} else {
  document.querySelectorAll(".reveal").forEach(element => element.classList.add("is-visible"));
}

const contactForm = document.querySelector("#contactForm");
const formFeedback = document.querySelector("#formFeedback");
contactForm.addEventListener("invalid", () => {
  formFeedback.textContent = "Please complete the required fields and enter a valid email address.";
  formFeedback.classList.remove("is-valid");
}, true);
contactForm.addEventListener("invalid", event => {
  event.target.setAttribute("aria-invalid", "true");
}, true);
contactForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  formFeedback.textContent = "Your details look complete. This demo isn't connected to a delivery service, so nothing has been sent.";
  formFeedback.classList.add("is-valid");
});
contactForm.addEventListener("input", event => {
  const field = event.target;
  if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)) return;
  field.setAttribute("aria-invalid", String(!field.validity.valid));
  formFeedback.classList.remove("is-valid");
  if (!field.validity.valid) {
    formFeedback.textContent = field.validity.valueMissing
      ? `Please complete the ${field.labels[0].textContent.trim()} field.`
      : field.type === "email"
        ? "Please enter a valid email address."
        : `Please check the ${field.labels[0].textContent.trim()} field.`;
  } else if (contactForm.checkValidity()) {
    formFeedback.textContent = "Your details look complete, but this demo form is not connected and will not send a message.";
  } else {
    formFeedback.textContent = "This demo form isn't connected to a delivery service, so it won't send a message.";
  }
});

const canvas = document.querySelector("#starfield");
const context = canvas.getContext("2d");
const cursorGlow = document.querySelector("#cursorGlow");
const scrollProgress = document.querySelector("#scrollProgress");
const scrollTop = document.querySelector("#scrollTop");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
const backgroundMotion = {
  width: 0,
  height: 0,
  pixelRatio: 1,
  stars: [],
  trail: [],
  streak: null,
  nextStreakAt: 0,
  lastFrameAt: 0,
  frame: 0,
  pointerX: 0,
  pointerY: 0,
  trailAt: 0,
  scrollFrame: 0
};

function resizeStarfield() {
  backgroundMotion.width = window.innerWidth;
  backgroundMotion.height = window.innerHeight;
  backgroundMotion.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(backgroundMotion.width * backgroundMotion.pixelRatio);
  canvas.height = Math.round(backgroundMotion.height * backgroundMotion.pixelRatio);
  context.setTransform(backgroundMotion.pixelRatio, 0, 0, backgroundMotion.pixelRatio, 0, 0);
  const mobile = backgroundMotion.width <= 680;
  const count = Math.min(mobile ? 48 : 110, Math.floor((backgroundMotion.width * backgroundMotion.height) / (mobile ? 15000 : 10500)));
  backgroundMotion.stars = Array.from({ length: count }, () => ({
    x: Math.random() * backgroundMotion.width,
    y: Math.random() * backgroundMotion.height,
    radius: Math.random() * 1.1 + 0.3,
    alpha: Math.random() * 0.34 + 0.14,
    drift: Math.random() * 0.17 + 0.04,
    depth: Math.random() * 0.28 + 0.04
  }));
  paintStarfield(performance.now(), false);
}

function paintStarfield(time, animate) {
  const state = backgroundMotion;
  context.clearRect(0, 0, state.width, state.height);
  const elapsed = state.lastFrameAt ? Math.min(time - state.lastFrameAt, 50) : 0;
  const mouseX = state.pointerX * 13;
  const mouseY = state.pointerY * 13;
  state.stars.forEach(star => {
    const x = (star.x + mouseX * star.depth + state.width) % state.width;
    const y = (star.y + mouseY * star.depth + state.height) % state.height;
    context.beginPath();
    context.fillStyle = `rgba(217, 217, 214, ${star.alpha})`;
    context.arc(x, y, star.radius, 0, Math.PI * 2);
    context.fill();
    if (animate) {
      star.y += star.drift * elapsed * .045;
      if (star.y > state.height) star.y = 0;
    }
  });

  state.trail = state.trail.filter(point => time - point.at < 380);
  state.trail.forEach(point => {
    const alpha = (1 - (time - point.at) / 380) * .13;
    context.beginPath();
    context.fillStyle = `rgba(217, 217, 214, ${alpha})`;
    context.arc(point.x, point.y, 1.3, 0, Math.PI * 2);
    context.fill();
  });

  if (animate && time >= state.nextStreakAt) {
    state.streak = {
      x: Math.random() * state.width * .9,
      y: Math.random() * state.height * .48,
      started: time,
      duration: 720 + Math.random() * 360,
      length: 22 + Math.random() * 28
    };
    state.nextStreakAt = time + 4500 + Math.random() * 7000;
  }
  if (state.streak) {
    const progress = (time - state.streak.started) / state.streak.duration;
    if (progress >= 1) {
      state.streak = null;
    } else if (progress >= 0) {
      const streak = state.streak;
      const x = streak.x + progress * 105;
      const y = streak.y + progress * 72;
      const fade = Math.sin(progress * Math.PI) * .45;
      const gradient = context.createLinearGradient(x - streak.length, y - streak.length * .55, x, y);
      gradient.addColorStop(0, "rgba(217, 217, 214, 0)");
      gradient.addColorStop(1, `rgba(217, 217, 214, ${fade})`);
      context.beginPath();
      context.strokeStyle = gradient;
      context.lineWidth = 1;
      context.moveTo(x - streak.length, y - streak.length * .55);
      context.lineTo(x, y);
      context.stroke();
    }
  }

  state.lastFrameAt = time;
  if (animate) state.frame = window.requestAnimationFrame(nextTime => paintStarfield(nextTime, true));
}

function updateScrollEffects() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
  scrollProgress.style.transform = `scaleX(${progress})`;
  scrollTop.classList.toggle("is-visible", window.scrollY > 500);
  document.querySelector(".site-header").classList.toggle("is-scrolled", window.scrollY > 12);
  backgroundMotion.scrollFrame = 0;
}

if (context) {
  resizeStarfield();
  if (!prefersReducedMotion.matches) paintStarfield(performance.now(), true);
  window.addEventListener("resize", resizeStarfield);
  prefersReducedMotion.addEventListener("change", () => {
    window.cancelAnimationFrame(backgroundMotion.frame);
    backgroundMotion.trail = [];
    if (prefersReducedMotion.matches) paintStarfield(performance.now(), false);
    else paintStarfield(performance.now(), true);
  });

  window.addEventListener("scroll", () => {
    if (!backgroundMotion.scrollFrame) {
      backgroundMotion.scrollFrame = window.requestAnimationFrame(updateScrollEffects);
    }
  }, { passive: true });
  updateScrollEffects();
  scrollTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: prefersReducedMotion.matches ? "auto" : "smooth" }));

  if (finePointer.matches && !prefersReducedMotion.matches) {
    const cursorDot = document.querySelector("#cursorDot");
    const cursorRing = document.querySelector("#cursorRing");
    document.body.classList.add("custom-cursor-active");
    window.addEventListener("pointermove", event => {
      if (prefersReducedMotion.matches) return;
      backgroundMotion.pointerX = event.clientX / window.innerWidth - .5;
      backgroundMotion.pointerY = event.clientY / window.innerHeight - .5;
      document.body.style.setProperty("--parallax-x", `${backgroundMotion.pointerX * 16}px`);
      document.body.style.setProperty("--parallax-y", `${backgroundMotion.pointerY * 12}px`);
      cursorGlow.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      cursorDot.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      cursorRing.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      if (performance.now() - backgroundMotion.trailAt > 38) {
        backgroundMotion.trail.push({ x: event.clientX, y: event.clientY, at: performance.now() });
        backgroundMotion.trailAt = performance.now();
      }
    }, { passive: true });

    document.querySelectorAll("a, button, input, textarea, .project-card").forEach(element => {
      element.addEventListener("pointerenter", () => document.body.classList.add("cursor-hovering"));
      element.addEventListener("pointerleave", () => document.body.classList.remove("cursor-hovering"));
    });

    document.querySelectorAll(".button-primary, .button-secondary").forEach(button => {
      button.addEventListener("pointermove", event => {
        if (prefersReducedMotion.matches) return;
        const bounds = button.getBoundingClientRect();
        const x = event.clientX - bounds.left - bounds.width / 2;
        const y = event.clientY - bounds.top - bounds.height / 2;
        button.style.transform = `translate(${x * .06}px, ${y * .12 - 2}px)`;
      });
      button.addEventListener("pointerleave", () => button.style.removeProperty("transform"));
    });

    document.querySelectorAll(".project-card").forEach(card => {
      card.addEventListener("pointermove", event => {
        if (prefersReducedMotion.matches) return;
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - .5;
        const y = (event.clientY - bounds.top) / bounds.height - .5;
        card.style.transform = `perspective(900px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg) translateY(-3px)`;
      });
      card.addEventListener("pointerleave", () => {
        card.style.removeProperty("transform");
      });
    });
  }
}
