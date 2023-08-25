import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";

class RenderReact {
  public toString(component: React.ComponentType<any>, data?: object): string {
    return renderToStaticMarkup(React.createElement(component, data));
  }
}

export default RenderReact;
