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
    console.log("setName:", nome)
    setName(nome)
})

// --- Configuração do Formulário de Login ---
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const pass = loginForm.querySelector('input[type="password"]').value;
            
            // --- Envia dados de login para o servidor ---
            cef.emit("auth:login", pass);
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
        // --- Configuração do Formulário de Registro ---
            e.preventDefault();

            const pass = registerForm.querySelector('input[type="password"]').value;
            const passConfirm = registerForm.querySelectorAll('input[type="password"]')[1].value;

            // Validações de Registro
            if (pass !== passConfirm) {
                hint(registerHint, "As senhas não coincidem!", "is-error");
                return;
            }

            hint(registerHint, "Criando conta...", "is-ok");

            // Envia para o cliente do jogo
            cef.emit("auth:register", pass);
        });
    }
});