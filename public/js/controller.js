import { Controller } from 'marionette';
import { SearchView } from './views/search';
import Layout from './views/layout';

let AppController = Controller.extend({
    initialize(){
        console.log('Attaching View');
        Layout.search.attachView(new SearchView());
    },
    
    index(){
        console.log('Index Router');
    },

    search(...args){
        console.log(`Search route ${args}`);
    }
});

export default new AppController();
