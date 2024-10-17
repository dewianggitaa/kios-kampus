export const userValidation = {
    name: {
        notEmpty: {
            errorMessage: "Name cannot be empty"
        },
        isString: {
            errorMessage: "Username must be a string"
        }
    },
    email: {
        notEmpty: {
            errorMessage: "Email is required"
        }
    },
    no_wa: {
        notEmpty: {
            errorMessage: "WhatsApp number is required"
        }
    },
    password: {
        notEmpty: {
            errorMessage: "Password is required"
        }
    }
}