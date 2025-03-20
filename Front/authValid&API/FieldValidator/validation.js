class FieldValidator {
    static validateName(nameProfile) {
        return nameProfile.length > 0 && nameProfile.length <= 35;
    }

    static validateEmail(email) {
        return email.includes('@') && email.length <= 35;
    }

    static validatePassword(password) {
        return password.length >= 6 && password.length <= 35;
    }

    static highlightField(input, isValid) {
        input.style.borderColor = isValid ? '' : 'red';
    }
}

export default FieldValidator;