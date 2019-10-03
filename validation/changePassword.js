const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateChangePW(data) {
    console.log("Validiate Now");
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : "";
    data.confirmNewPassword = !isEmpty(data.confirmNewPassword) ? data.confirmNewPassword : "";

    // Password checks
    if (Validator.isEmpty(data.newPassword)) {
        errors.newPassword = "Password field is required";
    }
    if (Validator.isEmpty(data.confirmNewPassword)) {
        errors.confirmNewPassword = "Confirm password field is required";
    }
    if (!Validator.isLength(data.newPassword, { min: 6, max: 30 })) {
        errors.newPassword = "Password must be at least 6 characters";
    }
    if (!Validator.equals(data.newPassword, data.confirmNewPassword)) {
        errors.confirmNewPassword = "Passwords must match";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
