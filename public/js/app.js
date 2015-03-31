import { Application } from 'marionette';
import $ from 'jquery';
import 'bootstrap';
import Backbone from 'backbone';
import Router from './router';
import Layout from './views/layout';

Backbone.$ = $;

const historyOptions = { pushState: true };

const App = new Application({
    regions: {
        main: '[role=main]'
    }
});

App.addInitializer(() => {
    App.main.show(Layout);
    Backbone.history.start(historyOptions);
    App.Router = Router;
});


$(() => {
    console.info('App Start');
    App.start();
});

export default App;