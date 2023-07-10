import { enableMapSet } from 'immer';
import { render } from 'preact';
import { App } from './app.jsx';
import './index.css';

enableMapSet();

render(<App />, document.getElementById('app'));
