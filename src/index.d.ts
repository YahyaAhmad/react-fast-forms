declare module "react-fast-forms" {
  import React from "react";

  interface ElementBuilder {
    tag: "div" | "section";
  }
  export default class Test extends React.Component<ElementBuilder> {}

}
