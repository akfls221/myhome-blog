import React from 'react';
import ReactDom from 'react-dom';
import App from "../pages/App";
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

// webpack 모드가 production일 경우 react dev-tool disable
if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

ReactDom.render(<App />, document.getElementById("render"));