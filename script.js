document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const successMessage = document.getElementById('successMessage');

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Form submission event
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        hideAllErrors();

        let isValid = true;

        // Validate name
        if (!nameInput.value.trim()) {
            showError(nameError);
            isValid = false;
        }

        // Validate email
        if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailError);
            isValid = false;
        }

        // Validate message
        if (messageInput.value.trim().length < 20) {
            showError(messageError);
            isValid = false;
        }

        // Submit form if valid
        if (isValid) {
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                message: messageInput.value.trim(),
            };

            // Log the sent message
            logSentMessage(formData.message);

            console.log('Form submitted with data:', formData);

            // Show success message
            contactForm.reset();
            successMessage.style.display = 'block';

            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    });

    // Real-time validation
    nameInput.addEventListener('input', () => {
        if (nameInput.value.trim()) hideError(nameError);
    });

    emailInput.addEventListener('input', () => {
        if (emailRegex.test(emailInput.value.trim())) hideError(emailError);
    });

    messageInput.addEventListener('input', () => {
        if (messageInput.value.trim().length >= 20) hideError(messageError);
    });

    // Function to log the sent message
    function logSentMessage(message) {
        console.log('Sent Message:', message);
    }

    // Helper functions
    function showError(errorElement) {
        errorElement.style.display = 'block';
    }

    function hideError(errorElement) {
        errorElement.style.display = 'none';
    }

    function hideAllErrors() {
        [nameError, emailError, messageError, successMessage].forEach(hideError);
    }
});