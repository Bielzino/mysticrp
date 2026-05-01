const tabs = document.querySelectorAll("[data-tab]");
const panels = document.querySelectorAll("[data-panel]");

function setTab(name){
  tabs.forEach(t => t.classList.toggle("is-active", t.dataset.tab === name));
  panels.forEach(p => p.classList.toggle("is-active", p.dataset.panel === name));
}

tabs.forEach(btn => {
  btn.addEventListener("click", () => setTab(btn.dataset.tab));
});

const nomeForm =  document.getElementById("login-username-display")
const nomeReg =  document.getElementById("reg-username-display")

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const loginHint = document.getElementById("loginHint");
const registerHint = document.getElementById("registerHint");

function hint(el, msg, type){
  el.textContent = msg || "";
  el.classList.remove("is-error", "is-ok");
  if(type) el.classList.add(type);
}

function sendLogin(){
  return Object.fromEntries(new FormData(loginForm));
}

function sendRegister(){
  return Object.fromEntries(new FormData(registerForm));
}

function toggleAuth() {
    const login = document.getElementById('login-section');
    const register = document.getElementById('register-section');

    if (login.classList.contains('hidden')) {
        register.classList.add('hidden');
        setTimeout(() => {
            login.classList.remove('hidden');
            login.style.opacity = "1";
        }, 100);
    } else {
        login.classList.add('hidden');
        setTimeout(() => {
            register.classList.remove('hidden');
            register.style.opacity = "1";
        }, 100);
    }
}

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = sendLogin();

  hint(loginHint, "Enviando login...", null);

  console.log("LOGIN:", data);
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = sendRegister();

  if (data.password !== data.passwordConfirm){
    hint(registerHint, "As senhas não batem.", "is-error");
    return;
  }

  hint(registerHint, "Enviando registro...", null);

  console.log("REGISTER:", data);
});

cef.on("UI:SetName", (nome) => {
    nomeForm.textContent = nome;
    nomeReg.textContent = nome;
})