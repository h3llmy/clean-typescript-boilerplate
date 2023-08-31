import * as React from "react";
import {
  renderToStaticMarkup,
  renderToStaticNodeStream,
} from "react-dom/server";

class RenderReact {
  public toString(
    component: React.ComponentType<any>,
    data?: object
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve(renderToStaticMarkup(React.createElement(component, data)));
    });
  }
  public toNodeStream(component: React.ComponentType<any>, data?: object) {
    return renderToStaticNodeStream(React.createElement(component, data));
  }
}

export default RenderReact;
