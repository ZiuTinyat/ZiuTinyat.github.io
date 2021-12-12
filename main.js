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
    window.open('mailto:ziutinyat@gmail.com', '_self');
}
function contactGithub(){
    window.open('https://github.com/ZiuTinyat', '_blank');
}
function contactFacebook(){
    window.open('https://www.facebook.com/profile.php?id=100006528554451', '_blank');
}
function contactLinkedin(){
    window.open('https://www.linkedin.com/in/tianyi-zhao-018ba9154/', '_blank');
}

class FilterGroup{
	constructor(rootElement, filterClass){
		this.root = rootElement;
		this.filterClass = filterClass;

		var childrenCollection = this.root.getElementsByClassName("filter");
		this.children = {};
		for (var i = 0; i < childrenCollection.length; i++){
			var e = childrenCollection[i];
			this.children[e.getAttribute("name")] = e;
		}
	}

	applyFilterElement(childElement){
		this.deselectAllChildren();
		childElement.classList.add("filter-selected");
		this.filterClassType(childElement.getAttribute("name"));
	}

	applyFilterName(name){
		this.deselectAllChildren();
		this.children[name].classList.add("filter-selected");
		this.filterClassType(name);
	}

	deselectAllChildren(){
		for (var i in this.children){
			this.children[i].classList.remove("filter-selected");
		}
	}

	filterClassType(type){
		var elements = document.getElementsByClassName(this.filterClass);
		for (var i = 0; i < elements.length; i++){
			var e = elements[i];
			if (type == "" || e.getAttribute("filter")?.split(' ').includes(type)){
				e.style.display = "";
			} else {
				e.style.display = "none";
			}
		}
	}
}