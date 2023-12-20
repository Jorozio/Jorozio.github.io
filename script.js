
// ============================= info =============================

let topText = document.getElementById('top-text')
let botText = document.getElementById('bot-text')
let i = 0;

if (window.location.pathname === '/info.html') {
    setTimeout(function () {
        document.body.classList.add("transition");
    }, 200);


} else {
    setTimeout(function () {
        document.body.classList.remove("transition");
    }, 200);
}

setTimeout(function () {
let typingEffect = setInterval(() => {
    let textT = "It's very nice";
    let textB = "to meet you";
    if (i < textT.length) {
        topText.innerHTML += textT.charAt(i);
        i++;
    } else if (i < textT.length + textB.length) {
        botText.innerHTML += textB.charAt(i - textT.length);
        i++;
    }
}, 100);
}, 1000);
// ================================================================