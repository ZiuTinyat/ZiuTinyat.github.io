function openProj(proj){
    window.open("../projects/" + proj + ".html", "_self");
}
function openBlog(blog){
    window.open("../blogs/" + blog + ".html", "_self");
}
function loadPage(page){
    window.open("../pages/" + page + ".html", "_self");
}
function loadResume(){
    window.open('../files/Tianyi-Zhao.pdf', '_self')
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
function contactLinkedin(){
    window.open('https://www.linkedin.com/in/tianyi-zhao-018ba9154/', '_blank')
}