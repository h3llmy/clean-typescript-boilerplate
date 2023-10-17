import * as React from "react";
import {
  renderToStaticMarkup,
  renderToStaticNodeStream,
} from "react-dom/server";

class RenderReact {
  /**
   * render react function to string
   */
  public toString(
    component: React.ComponentType<any>,
    data?: object
  ): Promise<string> {
    return new Promise((resolve) => {
      resolve(renderToStaticMarkup(React.createElement(component, data)));
    });
  }

  /**
   * render react function to node stream
   */
  public toNodeStream(component: React.ComponentType<any>, data?: object) {
    return renderToStaticNodeStream(React.createElement(component, data));
  }
}

export default RenderReact;
