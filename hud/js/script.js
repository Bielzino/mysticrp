
function texts(cash, job){
    const money = document.getElementById("cash-amount")
    
    money.textContent = cash;
}

function setProgress(elementId, percent) {
    const circle = document.getElementById(elementId);
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    
    const offset = circumference - (percent / 100 * circumference);
    circle.style.strokeDashoffset = offset;
}


cef.on("UpdateHUD", (hp, hunger, thirst, armor, cash) => {
    setProgress("hp-ring", hp);
    setProgress("hunger-ring", hunger);
    setProgress("thirst-ring", thirst);
    setProgress("thirst-ring", armor);
    
    document.getElementById("cash-amount").innerText = cash.toLocaleString();
});

cef.on("vignette-overlay", () => {
    const v = document.getElementById("vignette-overlay").style;
    v.display = (v.display === "none") ? "block" : "none";
});