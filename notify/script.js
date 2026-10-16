const notifications = {
  success: {
    title: "Sucesso",
    icon: '<path d="m5 12 4 4L19 6" />',
  },
  info: {
    title: "Informação",
    icon: '<path d="M12 16v-4m0-4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />',
  },
  warning: {
    title: "Atenção",
    icon: '<path d="M12 9v4m0 4h.01M10.3 3.9 1.8 18.6A1.6 1.6 0 0 0 3.2 21h17.6a1.6 1.6 0 0 0 1.4-2.4L13.7 3.9a2 2 0 0 0-3.4 0Z" />',
  },
  error: {
    title: "Erro",
    icon: '<path d="m18 6-12 12M6 6l12 12" />',
  },
};

const notificationArea = document.querySelector("#notification-area");
const actionButtons = document.querySelectorAll(".action-button");
const isPreview = new URLSearchParams(window.location.search).has("preview") || typeof window.invokeNative !== "function";
const maxNotifications = 5;

window.addEventListener("message", (event) => {
  const data = event.data;
  if (!data || typeof data !== "object") return;

  const payload = data.action === "notify" && data.notification ? data.notification : data;
  showNotification(payload);
});

window.showNotification = showNotification;

// ==exemplo de uso ==
// showNotification({type:"info", title:"pagamento", message:"voce recebeu", duration:"9000"})
// *==================

function showNotification(options) {
  if (!options || typeof options !== "object") return;

  const type = typeof options.type === "string" ? options.type : "info";
  const style = notifications[type];
  if (!style) return;

  const title = typeof options.title === "string" && options.title.trim() ? options.title.trim() : style.title;
  const message = typeof options.message === "string" ? options.message.trim() : "";
  const duration = Number.isFinite(Number(options.duration))
    ? Math.min(15000, Math.max(1000, Number(options.duration)))
    : 5000;

  const card = document.createElement("article");
  card.className = `notification notification-${type}`;
  card.style.setProperty("--duration", `${duration}ms`);

  const icon = document.createElement("span");
  icon.className = "notification-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.innerHTML = `<svg viewBox="0 0 24 24">${style.icon}</svg>`;

  const copy = document.createElement("div");
  copy.className = "notification-copy";

  const heading = document.createElement("div");
  heading.className = "notification-title";
  const titleText = document.createElement("strong");
  titleText.textContent = title;
  const time = document.createElement("time");
  time.textContent = "agora";
  heading.append(titleText, time);

  const text = document.createElement("p");
  text.textContent = message;

  const progress = document.createElement("div");
  progress.className = "progress";
  const progressBar = document.createElement("span");
  progress.append(progressBar);

  copy.append(heading);
  if (message) copy.append(text);
  copy.append(progress);
  card.append(icon, copy);
  notificationArea.prepend(card);

  while (notificationArea.children.length > maxNotifications) {
    notificationArea.lastElementChild.remove();
  }

  window.setTimeout(() => {
    card.classList.add("is-leaving");
    card.addEventListener("animationend", () => card.remove(), { once: true });
  }, duration);
}

cef.on("notify", (type, title, message, duration) => {
  showNotification({type: type, title:title, message:message, duration: duration });
})