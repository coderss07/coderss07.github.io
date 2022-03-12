// SlideBar Javascript

document.querySelector('#cross').style.display = 'none';
document.querySelectorAll('.ham')[1].addEventListener("click", () => {
	document.querySelector('.sidebar').classList.toggle('sidebar-go');
	setTimeout(() =>{
		document.querySelector('#cross').style.display = 'inline';
	}, 350)
	document.querySelector('#menu').style.display = 'none';
});

document.querySelectorAll('.ham')[0].addEventListener("click", () => {
	document.querySelector('.sidebar').classList.toggle('sidebar-go');
	setTimeout(() =>{
		document.querySelector('#menu').style.display = 'inline';
	}, 400)
	document.querySelector('#cross').style.display = 'none';
});

// Skill Fetching

fetch("/skills_data.json").then(response => response.json()).then(resp => {
	const skills_obj = document.getElementById('skills');
	let skillContent = skills_obj.innerHTML;
	const obj = resp.data;
	for(var i = 0; i < obj.length; i++) {
		let skill = obj[i].skill;
		let level = obj[i].level;

		let ele = `<div class="skill-box reveal">\n
			<div class="skill-attribute"> 
				<p class="skill-name">${skill}</p>
				<p class="skill-value">${level}%</p>
			</div>\n
			<div class="progress-bar">
				<div style="width: ${level}%;"></div>\n
			</div>
		</div>`;
		i++;
		if(i < obj.length) {
			skill = obj[i].skill;
			level = obj[i].level;
			ele += `<div class="skill-box reveal">\n
				<div class="skill-attribute"> 
					<p class="skill-name">${skill}</p>
					<p class="skill-value">${level}%</p>
				</div>\n
				<div class="progress-bar">
					<div style="width: ${level}%;"></div>\n
				</div>
			</div>`;
		}
		skillContent += `<div class="reveal skill-package">${ele}</div>`;
	}
	skills_obj.innerHTML = skillContent;
})

// Project Data Fetching

fetch("/project_data.json").then(response => response.json()).then(resp => {
	const project_info = document.getElementById('new-line');
	
	let projectDescription = project_info.innerHTML;
	resp.data.forEach(element => {
		let id = element.id;
		let title = element.title;
		let description = element.description;
		let imageURL = element.imageURL;
		let url = element.url;					
		let des = `<div id="${id}" class="Modal is-hidden is-visuallyHidden">
						<div class="project-info">
							<span onclick="close_modal('${id}')" class="Close">&times;</span>
							<h2 class="reveal">${title}</h2>
							<img class="reveal" src="${imageURL}" alt="">
							<p class="project-description reveal"> ${description} </p>
							<button onclick="window.open('${url}', '_blank')" class="open-btn reveal">Open in Github</button>
							<button onclick="close_modal('${id}')" class="open-btn reveal">Close</button>
						</div>
					</div>`;
		projectDescription += ('\n' + des);
	})
	project_info.innerHTML = projectDescription;
	// console.log(project_info.innerHTML);
})

fetch("/project_data.json").then(response => response.json()).then(resp => {
	const project_obj = document.querySelector('.project-container');
	let projectContent = project_obj.innerHTML;
	resp.data.forEach(element => {
		let id = element.id;
		let title = element.title;
		let imageURL = element.imageURL;

		let ele = `<div class="reveal project-box">
						<h3 class="reveal">${title}</h3>
						<img class="reveal" src="${imageURL}" alt="">
						<button onclick="open_window('${id}')" class="open-btn reveal">More Info</button>
					</div>`;
		projectContent += ele;
	})
	project_obj.innerHTML = projectContent;
})

//  Open Modal
var body = document.querySelector('body');
var container = document.getElementById('main');

function open_window(id) {
	var modal = document.getElementById(id);
	modal.className = "Modal is-visuallyHidden theme";
	setTimeout(function() {
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

window.onclick = function(event) {
	var obj = document.getElementsByClassName('Modal');
	for(var i = 0; i < obj.length; i++) {
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

fetch("/achievements_data.json").then(response => response.json()).then(resp => {
	const project_obj = document.querySelector('.achievement-container');
	let achievementContent = project_obj.innerHTML;
	resp.data.forEach(element => {
		let description = element.description;
		let platform = element.platform;
		let url = element.url;
		let imageUrl = element.imageUrl;

		let ele = `<div class="reveal achievement-box">
						<img class="reveal" src="${imageUrl}" alt="">
						<ul>
							<li class="reveal">${description}</li>
							<li class="reveal">Platform: ${platform}</li>
						</ul>
						<button onclick="window.open('${url}', '_blank')" class="open-btn reveal">Open</button>
					</div>`;
		achievementContent += ele;
	})
	project_obj.innerHTML = achievementContent;
})


// Resume Download

document.querySelector('.btn').addEventListener("click", () => {
	window.open('SarthakSharma.pdf')
});

// Scroll Animation

function reveal() {
	var reveals = document.querySelectorAll(".reveal");
  
	for(var i = 0; i < reveals.length; i++) {
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

// Contact through Mail

var data_js = { "access_token": "g2y6ytjwdn3hpfol9vh01f09" };

function js_send() {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			alert("Message Sent Successfully...");
		} else if(request.readyState == 4) {
			alert("Message not sent. Check Your Connection...");
		}
	};
	let name = document.querySelector("#name-input").value;
	let email = document.querySelector("#email-input").value;
	let subject = document.querySelector("#subject-input").value;
	let message = document.querySelector("#message").value;
	document.getElementById("my-form").reset();
	
	data_js['extra_from'] = name;
	data_js["extra_sender's_email"] = email;
	data_js['subject'] = subject;
	data_js['text'] ="Message: " + message;
	var params = toParams(data_js);
	
	request.open("POST", "https://postmail.invotes.com/send", true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	
	request.send(params);
	return false;
}

var sendButton = document.querySelector('.contact-btn');
sendButton.onclick = js_send;

function toParams(data_js) {
	var form_data = [];
	for ( var key in data_js ) {
		form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
	}
	return form_data.join("&");
}

var js_form = document.getElementById("my-form");
js_form.addEventListener("submit", function (e) {
	e.preventDefault();
});

// Change Themes

const originalTheme = [];

function change_theme(mode) {
	var theme = document.querySelector('#theme-link');
	if(mode == 'dark-mode') {
		theme.href = "styles/darkTheme.css";
	}else if(mode == 'blue-mode') {
		theme.href = "styles/blueTheme.css";
	}else if(mode == 'green-mode') {
		theme.href = "styles/greenTheme.css";
	}else if(mode == 'light-mode') {
		theme.href = "styles/lightTheme.css";
	}
}

var theme_obj = document.querySelector('#theme-link');

if(theme_obj.href == "styles/lightTheme.css") {
	var mode = document.getElementById('light');
	mode.style.backgroundColor = 'black';
	mode.style.color = 'white';
}else if(theme_obj.href == "styles/darkTheme.css") {
	var mode = document.getElementById('dark');
	mode.style.backgroundColor = 'black';
	mode.style.color = 'white';
}