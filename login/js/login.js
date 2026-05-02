const tabs = document.querySelectorAll("[data-tab]");
const panels = document.querySelectorAll("[data-panel]");

function setTab(name){
  tabs.forEach(t => t.classList.toggle("is-active", t.dataset.tab === name));
  panels.forEach(p => p.classList.toggle("is-active", p.dataset.panel === name));
}

tabs.forEach(btn => {
  btn.addEventListener("click", () => setTab(btn.dataset.tab));
});

const nomeForm =  document.getElementById("player-name")
const nomeReg =  document.getElementById("reg-player-name")

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

// Para o Login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = sendLogin(); // Isso pega os dados do form (ex: data.password)

  if (typeof cef !== 'undefined') {
    // Envia a senha para o servidor Pawn
    cef.emit("Player:login", data.password);
  }

  hint(loginHint, "Enviando login...", null);
  console.log("LOGIN:", data);
});

// Para o Registro
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = sendRegister();

  if (data.password !== data.passwordConfirm){
    hint(registerHint, "As senhas não batem.", "is-error");
    return;
  }

  if (typeof cef !== 'undefined') {
    // Envia a senha para o servidor Pawn
    cef.emit("Player:register", data.password);
  }

  hint(registerHint, "Enviando registro...", null);
  console.log("REGISTER:", data);
});

function setName(nome){
    nomeForm.textContent = nome;
    nomeReg.textContent = nome;
}

cef.on("UI:SetName", (nome) => {
    console.log("Nome sendo setado:", nome);
    setName(nome);
})