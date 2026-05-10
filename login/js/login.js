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

function setName(nome){
    nomeForm.textContent = nome;
    nomeReg.textContent = nome;
}

cef.on("setName", (nome) => {
    console.log("Evento chamado")
    console.log("setName:", nomeStr)
    setName(nomeStr)
})
