import { omit } from "lodash";

/**
 * Filter the props to omit unneeded properties.
 *
 * @param {Object} props
 *    The props object to filter.
 *
 * @returns {Object}
 */
export let filterProps = props => {
  return omit(props, ["children", "tag", "element", "fields"]);
};

/**
 * Filter the string to use it as a className
 *
 * @param {string} string
 */
export let classNames = (myClass, otherClasses) => {
  let className = myClass;
  if (otherClasses) {
    className += " " + otherClasses;
    className = className.trim();
  }
  return className;
};
