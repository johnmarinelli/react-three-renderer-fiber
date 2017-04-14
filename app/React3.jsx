import React, { PureComponent } from 'react';
import ReactPortal from 'react-dom/lib/ReactPortal';

import R3R from '../core/r3r';

class React3 extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this.div = null;

    // the canvas gets created here so that it can be rendered into even before the component gets mounted.
    this.canvas = document.createElement('canvas');

    this.renderCount = 0;

    this.fakeDOMContainerInfo = {
      tagName: 'react-three-renderer-fake-container',
      removeChild(child) {
        // Doing nothing here but still need to have a stub
      },
      appendChild: () => {
        // the child is fake, but...
        // for unknown reasons, this seems to be the best spot to render into r3r here.

        // I'll need to study to find out why exactly.
        // Until then, assume fiber sorcery.

        // Also, priority hack to ensure lifecycle guarantees.. ( not sure if necessary?, to be confirmed )
        // Basically doing this worked before and I just kept it.
        // TODO try to remove priority elevation and see what happens.
        R3R.rendererInternal.performWithPriority(1, () => {
          R3R.render(this.props.children, this.canvas);
        });
      },
      ownerDocument: {
        createElement: (name) => ({ name }) // fake element gets created here
      },
    };
  }

  divRef = (div) => {
    this.div = div;
  };

  componentDidMount() {
    this.div.appendChild(this.canvas);
  }

  render() {
    this.renderCount++;

    // Create a fake element that will keep remounting every render.
    // Whenever it gets remounted, we can use that as an opportunity to render into R3R context
    // I am guessing that should be solved by the `implementation` property?
    // I.e. I'd love to get a callback for a moment to be able to call `R3R.render`.

    const implementation = null;

    return (<div ref={this.divRef}>{
      [
        ReactPortal.createPortal(
          <react-three-renderer-proxy key={this.renderCount} />,
          this.fakeDOMContainerInfo,
          implementation,
        )
      ]
    }</div>);
  }
}

export default React3;