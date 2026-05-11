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

const loginHint = document.getElementById("login-hint");
const registerHint = document.getElementById("register-hint");

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

// Função de Login chamada pelo HTML
function handleLogin(event) {
    event.preventDefault(); // Impede a página de recarregar
    
    // Pega a senha do formulário que disparou o evento
    const pass = event.currentTarget.querySelector('input[type="password"]').value;

    if (typeof cef !== 'undefined') {
        cef.emit("auth:login", pass);
    } else {
        console.log("CEF não detectado. Senha digitada:", pass);
    }
}

// Função de Registro chamada pelo HTML
function handleRegister(event) {
    event.preventDefault();

    const pass = event.currentTarget.querySelector('input[type="password"]').value;

    // Se a sua função 'hint' estiver definida, ela funcionará aqui
    if (typeof hint === "function") {
        hint(registerHint, "Criando conta...", "is-ok");
    }

    if (typeof cef !== 'undefined') {
        cef.emit("auth:register", pass);
    } else {
        console.log("CEF não detectado. Registro de senha:", pass);
    }
}

cef.on("setName", (nome) => {
    console.log("Evento chamado")
    console.log("setName:", nome)
    setName(nome)
})

