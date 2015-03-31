import { Application } from 'marionette';
import $ from 'jquery';
import 'bootstrap';
import { history } from 'backbone';
import Router from './router';
import Layout from './views/layout';

const App = new Application({
    regions: {
        main: '[role=main]'
    }
});

App.addInitializer(() => {
    App.main.attachView(Layout);
});

history.start({
    pushState: true
});

App.start();
console.log($);
window.$ = $;

export default App;