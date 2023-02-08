// Skill Fetching

fetch("../assets/data/skills_data.json").then(response => response.json()).then(resp => {
    const skills_obj = document.getElementById('skill-container');
    let skillContent = skills_obj.innerHTML;
    const obj = resp.data;
    for (var i = 0; i < obj.length; i++) {
        let skill = obj[i].skill;
        let level = obj[i].level;

        let elem = `<span class="reveal">${skill}</span> <span style="float: right" class="pull-right reveal">${level}%</span>
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" style="width: ${level}%;" aria-valuenow="${level}" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>`
        i++;
        if (i < obj.length) {
            skill = obj[i].skill;
            level = obj[i].level;
            elem += `<span class="reveal">${skill}</span> <span style="float: right" class="pull-right reveal">${level}%</span>
                        <div class="progress reveal">
                            <div class="progress-bar" role="progressbar" style="width: ${level}%;" aria-valuenow="${level}" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>`
        }
        skillContent += `<div class="col-md-4 reveal">
                            <div class="service-box reveal">
                                <div class="service-content">
                                    <div class="skill-mf reveal">
                                        ${elem}
                                    </div>
                                </div>
                            </div>
                        </div>`;
    }
    skills_obj.innerHTML = skillContent;
})

// Project Data Fetching

fetch("../assets/data/project_data.json").then(response => response.json()).then(resp => {
    const project_info = document.getElementById('new-line');

    let projectDescription = project_info.innerHTML;
    resp.data.forEach(element => {
        let id = element.id;
        let title = element.title;
        let description = element.description;
        let imageURL = element.imageURL;
        let github = element.github;
        let url = element.url;
        let status = element.status;
        let con = "Project";
        if (status == "disabled") con = "<del>Project</del>";

        let desp = `<ul>`
        description.forEach((e) => {
            desp += `<li>${e}</li>`;
        });
        desp += `</ul>`

        let des = `<div id="${id}" class="Modal is-hidden is-visuallyHidden">
                        <div class="project-info">
                            <div onclick="close_modal('${id}')" class="Close">&times;</div>
                            <h4 class="reveal">${title}</h4>
                            <img class="reveal" src="${imageURL}" alt="">
                            <div class="project-description reveal"> ${desp} </div>
                            <div class="btn-container reveal">
                                <button onclick="window.open('${github}', '_blank')" class="btn btn-secondary">Github</button>
                                <button onclick="window.open('${url}', '_blank')" type="button" class="btn btn-primary ${status}">${con}</button>
                            </div>
                        </div>
                    </div>`;
        projectDescription += ('\n' + des);
    })
    project_info.innerHTML = projectDescription;
    // console.log(project_info.innerHTML);
})

//  Open Modal
var body = document.querySelector('body');
var container = document.querySelector('#main');

function open_window(id) {
    var modal = document.getElementById(id);
    modal.className = "Modal is-visuallyHidden";
    setTimeout(function () {
        container.className = "main-box is-blurred";
        modal.className = "Modal";
    }, 200);
    container.parentElement.className = "ModalOpen";
}
// Close Modal
function close_modal(id) {
    var modal = document.getElementById(id);
    setTimeout(() => {
        modal.className = "Modal is-hidden is-visuallyHidden theme";
        body.className = "";
        container.className = "main-box";
        container.parentElement.className = "";
    })
}

window.onclick = function (event) {
    var obj = document.getElementsByClassName('Modal');
    for (var i = 0; i < obj.length; i++) {
        if (event.target == obj[i]) {
            obj[i].className = "Modal is-hidden is-visuallyHidden";
            body.className = "";
            container.className = "main-box";
            container.parentElement.className = "";
            break;
        }
    }
}

// Achievements Data Fetching

fetch("../assets/data/achievements_data.json").then(response => response.json()).then(resp => {
    const project_obj = document.querySelector('#achievements-container');
    let achievementContent = project_obj.innerHTML;
    resp.data.forEach(element => {
        let description = element.description;
        let platform = element.platform;
        let url = element.url;
        let imageUrl = element.imageUrl;

        let elem = `<div class="col-md-4 reveal">
                            <div class="card card-blog reveal">
                                <div class="card-img reveal">
                                    <a href="${url}" target="_blank"><img src="${imageUrl}" alt="" class="img-fluid"></a>
                                </div>
                                <div class="card-body reveal">
                                    <div class="card-category-box reveal">
                                        <div class="card-category">
                                            <h6 class="category">${platform}</h6>
                                        </div>
                                    </div>
                                    <h3 class="card-title reveal"><a href="${url}" target="_blank">${description}</a></h3>
                                </div>
                            </div>
                        </div>`
        achievementContent += elem;
    })
    project_obj.innerHTML = achievementContent;
})

// Scroll Animation

function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 30;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}
window.addEventListener("scroll", reveal);


// Change Themes

let darkMode = localStorage.getItem('darkMode'); 
        
const darkModeToggle = document.querySelector('#slider');

const enableDarkMode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkMode', 'enabled');
    darkModeToggle.checked = true
}

const disableDarkMode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkMode', null);
    darkModeToggle.checked = false
}
 
if (darkMode === 'enabled') {
    enableDarkMode();
}

darkModeToggle.addEventListener('change', () => {
    darkMode = localStorage.getItem('darkMode'); 
    
    if (darkMode !== 'enabled') {
        enableDarkMode();
    } else {  
        disableDarkMode(); 
    }
});


