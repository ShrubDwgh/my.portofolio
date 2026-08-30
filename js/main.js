import { initNavigation } from "./navigation.js";
import { initScrollReveal } from "./animations.js";
import { initProjectModal, renderExperiments, renderProjects } from "./projects.js";
import { initProfileFallback, initSecretTrigger, initTiltCards, initUtilityUI } from "./interactions.js";
 
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderExperiments();
  initNavigation();
  initProjectModal();
  initScrollReveal();
  initProfileFallback();
  initTiltCards();
  initSecretTrigger();
  initUtilityUI();
});
