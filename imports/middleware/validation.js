const validate = function (fieldName, field) {
  let errors = {};
  if (!field) {
    errors[fieldName] = `${fieldName} is required`;
  } else if (fieldName === "email") {
    if (!validateEmail(field)) {
      errors[fieldName] = "Invalid Email Format";
    }
  } else if (fieldName === "password") {
    const minLength = 8;
    if (field.length < minLength) {
      errors[fieldName] = "Password must be at least 8 characters long.";
    }
  } else if (fieldName === "phone") {
    if (!Number.isInteger(Number(field))) {
      errors[fieldName] = "Invalid phone number";
    }
  }
  console.log(errors[fieldName], "--sdasd--");
  return errors;
};

const validateEmail = function (email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export { validate };
