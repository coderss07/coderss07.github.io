let darkMode=localStorage.getItem("darkMode");
null===darkMode&&(darkMode="light");


const body = document.querySelector("body"), metaTheme = document.querySelector("meta[name = 'theme-color']");

body.setAttribute("data-theme",darkMode), "dark" == darkMode ? metaTheme.setAttribute("content","#1a1a1a"):metaTheme.setAttribute("content","#fff");const dm=document.getElementById("dm"),toast=document.querySelector(".toast-box"),toastMsg=document.getElementById("dm-status"),showToast=()=>{toast.style.display="block",setTimeout(()=>{toast.style.display="none"},2e3)};"dark"===(darkMode=localStorage.getItem("darkMode"))&&(dm.classList.replace("fa-moon-o","fa-sun-o"),document.body.setAttribute("data-theme",darkMode)), dm.addEventListener("click",() => {
    dm.classList.contains("fa-moon-o") ? (localStorage.setItem("darkMode","dark"), document.body.setAttribute("data-theme","dark"), metaTheme.setAttribute("content","#1a1a1a"),dm.classList.replace("fa-moon-o","fa-sun-o"), toastMsg.innerHTML = "enabled", showToast()) : (localStorage.setItem("darkMode","light"), document.body.setAttribute("data-theme","light"), metaTheme.setAttribute("content","#fff"), dm.classList.replace("fa-sun-o","fa-moon-o"), toastMsg.innerHTML = "disabled", showToast())
});

const date = new Date, footerYear = document.getElementById("current-year");

footerYear.innerHTML=date.getFullYear();
const toggleBtn = document.getElementById("nav-toggle"), navWrapper = document.querySelector(".nav-wrapper");


toggleBtn.addEventListener("click",()=>{ 
    toggleBtn.checked ? navWrapper.classList.add("active") : navWrapper.classList.remove("active")
});

const navLinks=document.querySelectorAll(".nav-item");
navLinks.forEach(e => {
    e.addEventListener("click",() => {
        Array.from(e.parentNode.children).forEach(e => {
            e.classList.remove("active")
        }),e.classList.add("active")
    })
});




const skillsBoxContainer = document.querySelector(".skills-box-wrapper");
let skillsBoxContent="";
for(const e in skills) {
    let t = "";
    for(item in skills[e]) {
        let o = skills[e][item];
        t += `\n <li data-aos="fade-up">\n 
                    <p> ${item} </p>  <p> ${o}% </p> \n 
                    <div class="skill-progress-bar">\n 
                        <div class="skill-progress" style="width: ${o}%;"> </div>\n
                    </div>\n 
                </li>\n`
    }
    skillsBoxContent += `\n<div class="skills-box" data-aos="fade-up">\n
                                <h3>${e}</h3>\n
                                <ul class="skills-list">\n
                                    ${t}\n
                                </ul>\n
                            </div>\n`
}
skillsBoxContainer.innerHTML = skillsBoxContent;
const projectsContainer = document.querySelector(".projects-wrapper");


{/* <i class="fa-solid fa-moon"></i> */}
{/* <i class="fa-duotone fa-sun"></i> */}
    
let projectsContent="";
for(const e in projects)
    projectsContent += `\n<div class="project-box" data-aos="fade-up">\n<div class="img-box" data-aos="fade-up">\n<img src="${projects[e].imageURI}" alt="${projects[e].image_alt}" loading="lazy">\n</div>\n<div class="project-info" data-aos="fade-up">\n<h3>${projects[e].title}</h3>\n            <div class="project-details" data-id="${e}" data-aos="fade-up">\n                <button>More Info</button>\n            </div>\n        </div>\n    </div>\n    `;projectsContainer.innerHTML=projectsContent;const container=document.querySelector(".container"),viewMoreButton=document.querySelectorAll("#projects .project-details button"),projectModals=document.querySelector(".modals .project-modals");let closeModal=()=>{projectModals.style.display="none",container.classList.remove("blur-bg")};viewMoreButton.forEach(e=>{e.addEventListener("click",()=>{let t=e.parentNode.getAttribute("data-id"),o=projectData[t].title,a=projectData[t].desc,s=projectData[t].url,n=projectData[t].techUsed,l='target="_blank"',d="";""==s.trim()&&(d="disabled",s="javascript: void(0)",l="");let r="";for(let e=0;e<n.length;e++)r+=`<li>${n[e]}</li>`;let c=`\n        <div class="modal-box">\n            <div class="modal-header">\n                <h3 class="modal-title">${o}</h3>\n                <button>+</button>\n            </div>\n            <div class="modal-body">\n                <p class="p-desc-title">Project Description:</p>\n                <p>${a}</p>\n                <p class="p-desc-title tu-title">Technology used</p>\n                <ul class="tech-used">\n                    ${r}\n                </ul>\n            </div>\n            <div class="modal-footer">\n                <div class="view-project ${d}">\n                    <a href="${s}" ${l}>View Project</a>\n                </div>\n                <button class="close">Close</button>\n            </div>\n        </div>\n        `;projectModals.innerHTML=c,container.classList.add("blur-bg"),projectModals.style.display="block";const i=document.querySelectorAll(".modals .modal-header button"),m=document.querySelectorAll(".modals .modal-footer button");i.forEach(e=>{e.addEventListener("click",closeModal)}),m.forEach(e=>{e.addEventListener("click",closeModal)})})});