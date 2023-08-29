import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";

class RenderReact {
  public toString(
    component: React.ComponentType<any>,
    data?: object
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve(renderToStaticMarkup(React.createElement(component, data)));
    });
  }
}

export default RenderReact;
