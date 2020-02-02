export const isNotValid = value => {
  switch (value) {
    case null:
    case undefined:
    case []:
    case "":
      return true;
    default:
      return false;
  }
};

/**
 * Validate a value against certain rules and validation types.
 *
 * @param {string|number} value
 * @param {any} rule
 * @param {string} typeOfValidation
 */
export const validate = (value, rule, typeOfValidation) => {
  // Don't run other validators if the value is not entered.
  if (typeOfValidation == "required") {
    return rule ? !isNotValid(value) : true;
  }

  // Run these validators only if the value is valid.
  if (!isNotValid(value)) {
    switch (typeOfValidation) {
      case "pattern":
        return rule.test(value);
      case "minLength":
        return value.length >= rule;
      case "maxLength":
        return value.length <= rule;
      case "function":
        return rule(value);
    }
  } else {
    return true;
  }
};

export const classNames = names => {
  return names.filter(value => typeof value !== "undefined").join(" ");
};
