import { Controller } from 'marionette';
import ResultView from './views/result';
import LoadingView from './views/loading';
import Search from './models/search';
import Layout from './views/layout';


let AppController = Controller.extend({
    index(){
        console.info('Index Router');
    },

    search(...args){

        let query = new Search({
            queryParams: args
        });

        let resultView = new ResultView({
            model: query
        });

        Layout.results.show( new LoadingView() );

        query.fetch()
            .done(() => {
                Layout.results.show(resultView);
            })
            .fail(this._handleError.bind(this));
    },
    _handleError: function(...args){
        console.log(args);
    }
});

export default new AppController();
