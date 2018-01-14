console.log("main.js");
function openProj(proj){
    window.open("../projects/" + proj + ".php");
}
function loadPage(page){
    window.open("../pages/" + page + ".php", "_self");
}
function loadResume(){
    window.open('../files/CV-Tianyi Zhao.pdf', '_blank')
}
function updateMenuTag(page){
    document.getElementById("menu-" + page).setAttribute("class", "menu-content-selected");
}