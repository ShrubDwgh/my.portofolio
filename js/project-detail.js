import { getProjectBySlug } from "../data/projects.js";
import { buildProjectModal, resolveAssetPath } from "./projects.js";
 
function createProjectPageMarkup(project) {
  const imagePath = resolveAssetPath(project.image, "../");
  const linkItems = [];
 
  if (project.liveUrl) {
    linkItems.push(`<a class="button button-secondary" href="${project.liveUrl}" target="_blank" rel="noreferrer">Live Demo</a>`);
  }
 
  if (project.githubUrl) {
    linkItems.push(`<a class="button button-secondary" href="${project.githubUrl}" target="_blank" rel="noreferrer">GitHub</a>`);
  }
 
  linkItems.push('<a class="button button-ghost" href="../index.html#projects">Back to Projects</a>');
 
  return `
    <div class="project-page__media">
      <img src="${imagePath}" alt="Preview project ${project.title}" loading="lazy">
    </div>
    <p class="eyebrow">Project Detail</p>
    <h1>${project.title}</h1>
    <p>${project.detail}</p>
    <div class="project-page__meta">
      <span class="status-pill" data-status="${project.status}">${project.status}</span>
      <span class="chip">${project.technologies.join(" / ")}</span>
    </div>
    <div class="project-card__actions">
      ${linkItems.join("")}
    </div>
    ${buildProjectModal(project, "../")
      .replace("<article class=\"modal-project\">", "<article class=\"modal-project project-page__details\">")
      .replace(/id="project-modal-title"/g, "")}
  `;
}
 
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#project-page-content");
  const title = document.querySelector("#project-page-title");
  const description = document.querySelector("#project-page-description");
  const slug = new URLSearchParams(window.location.search).get("slug");
 
  if (!container || !slug) {
    return;
  }
 
  const project = getProjectBySlug(slug);
 
  if (!project) {
    title.textContent = "Project tidak ditemukan";
    description.textContent = "Slug project belum sesuai dengan data yang tersedia.";
    return;
  }
 
  document.title = `${project.title} — Ahmad Zainal A.`;
  container.innerHTML = createProjectPageMarkup(project);
});
