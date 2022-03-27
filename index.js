// SlideBar Javascript

document.querySelector('#menu').addEventListener("click", () => {
	document.querySelector('.navbar').classList.toggle('navbar-go');
    document.querySelector('#cross').style.display = 'inline';
	document.querySelector('#menu').style.display = 'none';
});

document.querySelector('#cross').addEventListener("click", () => {
    document.querySelector('.navbar').classList.toggle('navbar-go');
    document.querySelector('#menu').style.display = 'inline';
	document.querySelector('#cross').style.display = 'none';
});

window.onclick = function(e) {
	console.log(e.target)
	var obj = document.querySelector('.navbar');
	if(e.target == obj) {
		obj.classList.toggle('navbar-go');
		document.querySelector('#menu').style.display = 'inline';
		document.querySelector('#cross').style.display = 'none';
	}
}

window.addEventListener('resize', () => {
	var wid = window.screen.width;
	if(wid > 1070) {
		document.querySelector('#cross').style.display = null;
		document.querySelector('#menu').style.display = null;
	}
})
	

// Skill Fetching

fetch("/skills_data.json").then(response => response.json()).then(resp => {
	const skills_obj = document.getElementById('skill-container');
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
var container = document.querySelector('.container');

function open_window(id) {
	var modal = document.getElementById(id);
	modal.className = "Modal is-visuallyHidden";
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

function js_send() {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if(request.readyState == 4 && request.status == 200) {
			alert("Message Sent Successfully...");
		}else if(request.readyState == 4) {
			alert("Message not sent. Check Your Connection...");
		}
	};
	let name = document.querySelector("#name-input").value;
	let email = document.querySelector("#email-input").value;
	let subject = document.querySelector("#subject-input").value;
	let message = document.querySelector("#message").value;
	setTimeout(() => {
		document.getElementById("my-form").reset();
	}, 500);
	var data_js = { "access_token": "g2y6ytjwdn3hpfol9vh01f09" };
	data_js['extra_from'] = name;
	data_js["extra_sender's_email"] = email;
	data_js['subject'] = subject;
	data_js['text'] = "Message: " + message;
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

var themes_obj = ['#light', '#dark', '#blue', '#green'];

document.querySelector(themes_obj[0]).style.backgroundColor = 'black';
document.querySelector(themes_obj[0]).style.color = 'white';

function change_theme(mode) {
	var theme = document.querySelector('#theme-link');
	if(mode == 'dark-mode') {
		theme.href = "styles/darkTheme.css";
		for(var i = 0; i < 4; i++) {
			document.querySelector(themes_obj[i]).style.backgroundColor = null;
			document.querySelector(themes_obj[i]).style.color = null;
		}
		document.querySelector(themes_obj[1]).style.backgroundColor = 'white';
		document.querySelector(themes_obj[1]).style.color = 'black';
		
	}else if(mode == 'blue-mode') {
		theme.href = "styles/blueTheme.css";
		for(var i = 0; i < 4; i++) {
			document.querySelector(themes_obj[i]).style.backgroundColor = null;
			document.querySelector(themes_obj[i]).style.color = null;
		}
		document.querySelector(themes_obj[2]).style.backgroundColor = 'black';
		document.querySelector(themes_obj[2]).style.color = 'white';
	}else if(mode == 'green-mode') {
		theme.href = "styles/greenTheme.css";
		for(var i = 0; i < 4; i++) {
			document.querySelector(themes_obj[i]).style.backgroundColor = null;
			document.querySelector(themes_obj[i]).style.color = null;
		}
		document.querySelector(themes_obj[3]).style.backgroundColor = 'black';
		document.querySelector(themes_obj[3]).style.color = 'white';
	}else if(mode == 'light-mode') {
		theme.href = "styles/lightTheme.css";
		for(var i = 0; i < 4; i++) {
			document.querySelector(themes_obj[i]).style.backgroundColor = null;
			document.querySelector(themes_obj[i]).style.color = null;
		}
		document.querySelector(themes_obj[0]).style.backgroundColor = 'black';
		document.querySelector(themes_obj[0]).style.color = 'white';
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

// To active navbar tags

var sidebar_ids = ['#home', '#about', '#skills', '#projects', '#achievements', '#contact'];

document.querySelector(`${sidebar_ids[0]}-href`).parentNode.style.borderBottom = '4px solid rgb(0, 204, 255)';
document.querySelector(`${sidebar_ids[0]}-href`).style.color = 'rgb(0, 204, 255)';

window.addEventListener('scroll', (event) => {
	for(let i = 0; i < 6; i++) {
		var topPosition = document.querySelector(sidebar_ids[i]).getBoundingClientRect().top;
		if(topPosition <= 200) {
			for(var j = 0; j < 6; j++) {
				document.querySelector(`${sidebar_ids[j]}-href`).parentNode.style.borderBottom = null;
				document.querySelector(`${sidebar_ids[j]}-href`).style.color = null;
			}
			document.querySelector(`${sidebar_ids[i]}-href`).parentNode.style.borderBottom = '4px solid rgb(0, 204, 255)';
			document.querySelector(`${sidebar_ids[i]}-href`).style.color = 'rgb(0, 204, 255)';
		}
	}
});

document.querySelector(`${sidebar_ids[1]}-href`).addEventListener('click', () => {
	const y = document.querySelector(sidebar_ids[1]).getBoundingClientRect().top + window.pageYOffset - 80;
	window.scrollTo({top: y});
});

document.querySelector(`${sidebar_ids[2]}-href`).addEventListener('click', () => {
	const y = document.querySelector(sidebar_ids[2]).getBoundingClientRect().top + window.pageYOffset - 80;
	window.scrollTo({top: y});
});

document.querySelector(`${sidebar_ids[3]}-href`).addEventListener('click', () => {
	const y = document.querySelector(sidebar_ids[3]).getBoundingClientRect().top + window.pageYOffset - 80;
	window.scrollTo({top: y});
});

document.querySelector(`${sidebar_ids[4]}-href`).addEventListener('click', () => {
	const y = document.querySelector(sidebar_ids[4]).getBoundingClientRect().top + window.pageYOffset - 80;
	window.scrollTo({top: y});
});

document.querySelector(`${sidebar_ids[5]}-href`).addEventListener('click', () => {
	const y = document.querySelector(sidebar_ids[5]).getBoundingClientRect().top + window.pageYOffset - 80;
	window.scrollTo({top: y});
});

document.querySelector(`#scroll`).addEventListener('click', () => {
	const y = document.querySelector(sidebar_ids[1]).getBoundingClientRect().top + window.pageYOffset - 80;
	window.scrollTo({top: y});
});

function backToTop() {
	document.querySelector(sidebar_ids[0]).scrollIntoView();
}