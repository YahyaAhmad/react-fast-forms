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
  switch (typeOfValidation) {
    case "required":
      return rule ? !isNotValid(value) : true;
    case "pattern":
      return rule.test(value);
    case "minLength":
      return value.length >= rule;
    case "maxLength":
      return value.length <= rule;
    case "function":
      return rule(value);
  }
};

export const classNames = names => {
  return names.filter(value => typeof value !== "undefined").join(" ");
};
