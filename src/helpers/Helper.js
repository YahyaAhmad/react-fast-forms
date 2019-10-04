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
