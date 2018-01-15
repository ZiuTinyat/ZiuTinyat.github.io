console.log("main.js");
function openProj(proj){
    window.open("../projects/" + proj + ".html");
}
function loadPage(page){
    window.open("../pages/" + page + ".html", "_self");
}
function loadResume(){
    window.open('../files/CV-Tianyi Zhao.pdf', '_blank')
}
function updateMenuTag(page){
    document.getElementById("menu-" + page).setAttribute("class", "menu-content-selected");
}

function contactEmail(){
    window.open('mailto:tz1@andrew.cmu.edu', '_self')
}
function contactGithub(){
    window.open('https://github.com/ZiuTinyat', '_blank')
}
function contactFacebook(){
    window.open('https://www.facebook.com/profile.php?id=100006528554451', '_blank')
}