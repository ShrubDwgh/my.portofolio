import { projects, getProjectBySlug } from "../data/projects.js";
import { experiments } from "../data/experiments.js";
 
const MODAL_SELECTOR = "#project-modal";
const MODAL_CONTENT_SELECTOR = "#project-modal-content";
const FOCUSABLE_SELECTOR = "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])";
 
let modalElements = null;
let lastFocusedElement = null;
 
export function resolveAssetPath(assetPath, basePath = "") {
  if (!assetPath) {
    return `${basePath}assets/images/projects/project-placeholder.svg`;
  }
 
  if (/^(https?:)?\/\//.test(assetPath) || assetPath.startsWith("data:")) {
    return assetPath;
  }
 
  return `${basePath}${assetPath}`;
}
 
function createTags(items = []) {
  return items
    .filter(Boolean)
    .map((item) => `<span class="tag">${item}</span>`)
    .join("");
}
 
function createOptionalLinks(project, basePath = "") {
  const links = [];
 
  if (project.liveUrl) {
    links.push(`<a class="button button-secondary" href="${project.liveUrl}" target="_blank" rel="noreferrer">Live Demo</a>`);
  }
 
  if (project.githubUrl) {
    links.push(`<a class="button button-secondary" href="${project.githubUrl}" target="_blank" rel="noreferrer">GitHub</a>`);
  }
 
  links.push(`<a class="button button-ghost" href="${basePath}pages/project.html?slug=${encodeURIComponent(project.slug)}">Open Page</a>`);
 
  return links.join("");
}
 
function createStatus(status = "Planning") {
  return `<span class="status-pill" data-status="${status}">${status}</span>`;
}
 
function createProjectCard(project, basePath = "") {
  const imagePath = resolveAssetPath(project.image, basePath);
 
  return `
    <article class="project-card glass-card js-tilt" data-project-card data-project-slug="${project.slug}">
      <div class="project-card__media">
        <img src="${imagePath}" alt="Preview project ${project.title}" loading="lazy">
      </div>
      <div class="project-card__header">
        <div class="project-meta">
          ${createStatus(project.status)}
          ${project.featured ? '<span class="chip">Featured</span>' : ""}
        </div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
      <div class="tag-list">${createTags(project.technologies)}</div>
      <div class="project-card__actions">
        ${project.liveUrl ? `<a class="button button-secondary" href="${project.liveUrl}" target="_blank" rel="noreferrer">Live Demo</a>` : ""}
        ${project.githubUrl ? `<a class="button button-secondary" href="${project.githubUrl}" target="_blank" rel="noreferrer">GitHub</a>` : ""}
        <button class="button button-ghost" type="button" data-open-project="${project.slug}">View Detail</button>
      </div>
    </article>
  `;
}
 
function createFeaturedProject(project, basePath = "") {
  const imagePath = resolveAssetPath(project.image, basePath);
 
  return `
    <article class="featured-project glass-card reveal js-tilt">
      <div class="featured-project__copy">
        <p class="eyebrow">Featured Project</p>
        <h3>${project.title}</h3>
        <p>${project.detail}</p>
        <div class="project-meta">
          ${createStatus(project.status)}
          <span class="chip">${project.technologies.join(" / ")}</span>
        </div>
        <div class="project-card__actions">
          <button class="button button-primary" type="button" data-open-project="${project.slug}">Explore Detail</button>
          ${createOptionalLinks(project, basePath)}
        </div>
      </div>
      <div class="featured-project__media">
        <img src="${imagePath}" alt="Featured preview ${project.title}" loading="lazy">
      </div>
    </article>
  `;
}
 
function createExperimentCard(experiment, basePath = "") {
  const imagePath = resolveAssetPath(experiment.image, basePath);
 
  return `
    <article class="experiment-card glass-card js-tilt">
      <div class="experiment-card__media">
        <img src="${imagePath}" alt="Preview experiment ${experiment.title}" loading="lazy">
      </div>
      <div class="experiment-card__header">
        <span class="chip">${experiment.category}</span>
        <h3>${experiment.title}</h3>
        <p>${experiment.description}</p>
        <div class="project-meta">
          <span class="status-pill" data-status="Planning">${experiment.status}</span>
        </div>
        <p>${experiment.detail}</p>
      </div>
    </article>
  `;
}
 
function createEmptyState(message) {
  return `
    <div class="glass-card empty-state">
      <p>${message}</p>
    </div>
  `;
}
 
function getModalElements() {
  if (modalElements) {
    return modalElements;
  }
 
  const modal = document.querySelector(MODAL_SELECTOR);
  const content = document.querySelector(MODAL_CONTENT_SELECTOR);
 
  if (!modal || !content) {
    return null;
  }
 
  modalElements = {
    modal,
    content,
    closeButtons: modal.querySelectorAll("[data-close-modal]")
  };
 
  return modalElements;
}
 
function focusTrap(event) {
  const current = getModalElements();
 
  if (!current || event.key !== "Tab") {
    return;
  }
 
  const focusable = current.modal.querySelectorAll(FOCUSABLE_SELECTOR);
 
  if (!focusable.length) {
    return;
  }
 
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
 
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  }
 
  if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}
 
export function buildProjectModal(project, basePath = "") {
  const imagePath = resolveAssetPath(project.image, basePath);
 
  return `
    <article class="modal-project">
      <div class="modal-project__hero">
        <div class="modal-project__image">
          <img src="${imagePath}" alt="Preview detail ${project.title}" loading="lazy">
        </div>
        <div class="modal-project__content">
          <p class="eyebrow">Project Detail</p>
          <h2 id="project-modal-title">${project.title}</h2>
          <p>${project.detail}</p>
          <div class="project-meta">
            ${createStatus(project.status)}
            ${project.featured ? '<span class="chip">Featured Build</span>' : ""}
          </div>
          <div class="tag-list">${createTags(project.technologies)}</div>
          <div class="project-links">${createOptionalLinks(project, basePath)}</div>
        </div>
      </div>
      <section class="modal-project__section">
        <h3>Overview</h3>
        <p>${project.description}</p>
      </section>
      <section class="modal-project__section">
        <h3>Fitur / Fokus</h3>
        <div class="tag-list">${createTags(project.features)}</div>
      </section>
      <section class="modal-project__section">
        <h3>Catatan Tambahan</h3>
        <p>${project.extra}</p>
      </section>
    </article>
  `;
}
 
export function openProjectModal(slug, basePath = "") {
  const current = getModalElements();
  const project = getProjectBySlug(slug);
 
  if (!current || !project) {
    return;
  }
 
  lastFocusedElement = document.activeElement;
  current.content.innerHTML = buildProjectModal(project, basePath);
  current.modal.classList.add("is-open");
  current.modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
 
  const closeButton = current.modal.querySelector(".modal__close");
  closeButton?.focus();
}
 
export function closeProjectModal() {
  const current = getModalElements();
 
  if (!current || !current.modal.classList.contains("is-open")) {
    return;
  }
 
  current.modal.classList.remove("is-open");
  current.modal.setAttribute("aria-hidden", "true");
  current.content.innerHTML = "";
  document.body.classList.remove("modal-open");
  lastFocusedElement?.focus?.();
}
 
export function initProjectModal(basePath = "") {
  const current = getModalElements();
 
  if (!current) {
    return;
  }
 
  current.modal.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.matches("[data-close-modal]")) {
      closeProjectModal();
    }
  });
 
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeProjectModal();
    }
 
    focusTrap(event);
  });
 
  document.addEventListener("click", (event) => {
    const target = event.target;
 
    if (!(target instanceof HTMLElement)) {
      return;
    }
 
    const trigger = target.closest("[data-open-project]");
 
    if (!trigger) {
      return;
    }
 
    openProjectModal(trigger.getAttribute("data-open-project"), basePath);
  });
}
 
export function renderProjects(basePath = "") {
  const featuredContainer = document.querySelector("#featured-projects");
  const gridContainer = document.querySelector("#projects-grid");
 
  if (!featuredContainer || !gridContainer) {
    return;
  }
 
  const featuredProjects = projects.filter((project) => project.featured);
  const regularProjects = projects.filter((project) => !project.featured);
 
  featuredContainer.innerHTML = featuredProjects.length
    ? featuredProjects.map((project) => createFeaturedProject(project, basePath)).join("")
    : createEmptyState("Belum ada featured project yang ditampilkan.");
 
  gridContainer.innerHTML = regularProjects.length
    ? regularProjects.map((project) => createProjectCard(project, basePath)).join("")
    : createEmptyState("Project tambahan belum diisi.");
}
 
export function renderExperiments(basePath = "") {
  const experimentsContainer = document.querySelector("#experiments-grid");
 
  if (!experimentsContainer) {
    return;
  }
 
  experimentsContainer.innerHTML = experiments.length
    ? experiments.map((experiment) => createExperimentCard(experiment, basePath)).join("")
    : createEmptyState("Belum ada experiment yang ditambahkan.");
          }
