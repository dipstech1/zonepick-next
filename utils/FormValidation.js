import { useState } from 'react';
const FormValidation = ({ validationRules, formInput }) => {
    const [errors, setErrors] = useState(null);

    const validation = () => {
      // define a empty object to store errors.
      let allErrors = {};
      // Run loop on validation object
      Object.keys(validationRules).forEach((name) => {
        // name is the name of input field
        const rulesArr = validationRules[name];

        // Run loop on validation array applied on that input
        rulesArr.forEach((rule) => {
          // Skip if any error message is already stored in allErrors object
          if (!allErrors[name]) {
            let result;
            // If rule is an array than it is a type of a function with parameter
            switch (Array.isArray(rule)) {
              case true: {
                // take the function name and parameter value from rule array
                const [functionName, paramValue] = rule;
                // call validation function

                result = functionName(formInput, name, paramValue);
                break;
              }

              default:
                // call validation function
                result = rule(formInput, name);
                break;
            }
            if (result) {
              // append error in object
              allErrors = { ...allErrors, ...result };
            }
          }
        });
      });

      return allErrors;
    };

    const validate = () =>
      new Promise((resolve, reject) => {
        const errorObj = validation();

        if (Object.keys(errorObj).length === 0) {
          setErrors({});
          resolve("Success");
        } else {
          setErrors(errorObj);
          reject(Error("Some Error Occurred"));
        }
      });

    return { validate, errors, setErrors };
  };

  export const required = (formInputs, inputName) =>
    !formInputs[inputName] && { [inputName]: "This field is required" };

  function emailPattern(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  export const email = (formInputs, inputName) =>
    !emailPattern(formInputs[inputName]) && {
      [inputName]: "Please enter valid email",
    };

  export function passwordPattern(formInputs, inputName) {
    const value = formInputs[inputName];

    let error;
    if (value.length < 8) {
      error = "Your password must be at least 8 characters";
    }
    if (value.search(/[a-z]/i) < 0) {
      error = "Your password must contain at least one letter.";
    }
    if (value.search(/[0-9]/) < 0) {
      error = "Your password must contain at least one digit.";
    }

    if (value.search(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/) < 0) {
      error = "Your password must contain at least one special character.";
    }

    return (
      error && {
        [inputName]: error,
      }
    );
  }

  export const maxLength = (formInputs, inputName, paramValue) =>
    formInputs[inputName].length > paramValue && {
      [inputName]: `Maximum characters are ${paramValue}`,
    };

  export const minLength = (formInputs, inputName, paramValue) =>
    formInputs[inputName].length < paramValue && {
      [inputName]: `Minimum characters are ${paramValue}`,
    };

  export default FormValidation;