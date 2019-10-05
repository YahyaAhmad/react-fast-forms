import React, { Component } from "react";
import PropTypes from "prop-types";
import { map, concat } from "lodash";
export default class OptionsField extends Component {
  static defaultProps = {
    emptyOption: "- Select -"
  };
  render() {
    const { onChange, value, items, required, emptyOption } = this.props;
    let selectOptions = [];
    if (!required) {
      selectOptions.push(<option value="">{emptyOption}</option>);
    }
    selectOptions = concat(
      selectOptions,
      map(items, (label, key) => <option value={key}>{label}</option>)
    );

    return (
      <select
        onChange={e => onChange(e.target.options[e.target.selectedIndex].value)}
        value={value}
      >
        {selectOptions}
      </select>
    );
  }
}

OptionsField.propTypes = {
  items: PropTypes.object.isRequired
};
