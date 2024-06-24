// src/script.js

import $ from 'jquery'; // Import jQuery if not already done

// Define your validation and AJAX logic here
export function initializeLoginForm() {
    $('#primary-form').validate({
        rules: {
            email: {
                required: true,
                email: true,
            },
            password: {
                required: true,
                minlength: 5,
            },
            text: {
                required: true,
                minlength: 5,
            },
        },
        messages: {
            name: "Please enter your name",
            email: {
                required: "Please enter your email",
                email: "Please enter a valid email",
            },
            password: {
                required: "Please enter your password",
                minlength: "Password must be at least 5 characters long",
            },
            text: {
                required: "Please enter your 6-digit code",
                minlength: "Code must be 6 characters long",
            },
        },
        submitHandler: function (form) {
            let email = $('#email').val();
            let password = $('#password').val();
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                },
                url: "loginform",
                type: "POST",
                data: {
                    email: email,
                    password: password,
                },
                success: function (response) {
                    console.log(response);
                    if (response.success === "step3") {
                        window.location.href = "authenticationpage";
                    }
                    if (response.success === "error") {
                        $("#user-error").removeClass("d-none");
                    }
                },
                error: function (response) {
                    console.log(response);
                },
            });
        },
    });
}

export function initializeAuthenticateForm() {
    $('#authenticateform').validate({
        rules: {
            text: {
                required: true,
                minlength: 6,
            },
        },
        messages: {
            text: {
                required: "Please enter your 6-digit code",
                minlength: "Code must be 6 characters long",
            },
        },
        submitHandler: function (form) {
            let text = $('#text').val();
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                },
                url: "authenticateform",
                data: {
                    text: text,
                },
                success: function (response) {
                    console.log(response);
                    if (response) {
                        window.location.href = "submission";
                    }
                },
                error: function (response) {
                    console.log(response);
                },
            });
        },
    });
}
