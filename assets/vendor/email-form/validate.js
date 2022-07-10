(function () {
    "use strict";

    let form = document.querySelector('#my-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        let thisForm = this;

        thisForm.querySelector('.loading').classList.add('d-block');
        thisForm.querySelector('.error-message').classList.remove('d-block');
        thisForm.querySelector('.sent-message').classList.remove('d-block');


        var btn = thisForm.querySelector('#contact-btn');

        btn.innerHTML = 'Sending...';

        const serviceID = 'service_epu49lf';
        const templateID = 'template_ggpqn9r';

        let _name = thisForm.name.value;
        let _email = thisForm.email.value;
        let _subject = thisForm.subject.value;
        let _message = thisForm.message.value;

        setTimeout(() => {
            document.getElementById("my-form").reset();
        }, 500);

        var templateParams = {
            from_name: _name,
            from_email: _email,
            subject: _subject,
            message: _message
        };

        thisForm.querySelector('.loading').classList.remove('d-block');
        emailjs.send(serviceID, templateID, templateParams)
            .then(() => {
                thisForm.querySelector('.sent-message').classList.add('d-block');
			    btn.innerHTML = 'Send Message';
			    thisForm.reset();
            }, (err) => {
                btn.innerHTML = 'Send Message';
                displayError(thisForm, 'Message send failed, try again!');
            });


    });

    function displayError(thisForm, error) {
        thisForm.querySelector('.loading').classList.remove('d-block');
        thisForm.querySelector('.error-message').innerHTML = error;
        thisForm.querySelector('.error-message').classList.add('d-block');
    }

})();
