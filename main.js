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
var loadThisPage = function(){
    console.log("NOT IMPLEMENTED");
}