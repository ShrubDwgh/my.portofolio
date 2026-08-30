const SECRET_CLICK_LIMIT = 5;
 
function showSecretToast(message) {
  const toast = document.querySelector("#secret-toast");
 
  if (!toast) {
    return;
  }
 
  toast.textContent = message;
  toast.classList.add("is-visible");
 
  window.clearTimeout(showSecretToast.timeoutId);
  showSecretToast.timeoutId = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2600);
}
 
export function initProfileFallback(basePath = "") {
  const profileImage = document.querySelector("[data-profile-image]");
 
  if (!profileImage) {
    return;
  }
 
  profileImage.addEventListener(
    "error",
    () => {
      profileImage.src = `${basePath}assets/images/profile-placeholder.svg`;
    },
    { once: true }
  );
}
 
export function initTiltCards() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hoverCapable = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
 
  if (prefersReducedMotion || !hoverCapable) {
    return;
  }
 
  document.querySelectorAll(".js-tilt").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      const offsetX = (event.clientX - bounds.left) / bounds.width;
      const offsetY = (event.clientY - bounds.top) / bounds.height;
      const rotateX = (0.5 - offsetY) * 7;
      const rotateY = (offsetX - 0.5) * 7;
 
      card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });
 
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}
 
export function initSecretTrigger() {
  const trigger = document.querySelector("[data-secret-trigger]");
 
  if (!trigger) {
    return;
  }
 
  let clicks = 0;
 
  trigger.addEventListener("click", () => {
    clicks += 1;
 
    if (clicks < SECRET_CLICK_LIMIT) {
      return;
    }
 
    clicks = 0;
    document.body.classList.add("easter-active");
    showSecretToast("Easter egg unlocked: build, break, fix, repeat.");
 
    window.setTimeout(() => {
      document.body.classList.remove("easter-active");
    }, 2200);
  });
 
  const konamiSequence = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let cursor = 0;
 
  document.addEventListener("keydown", (event) => {
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
 
    if (key === konamiSequence[cursor]) {
      cursor += 1;
    } else {
      cursor = 0;
    }
 
    if (cursor !== konamiSequence.length) {
      return;
    }
 
    cursor = 0;
    showSecretToast("Konami detected: nothing crashes today, only clean UI.");
  });
}
 
export function initUtilityUI() {
  const yearNode = document.querySelector("#current-year");
 
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }
}
