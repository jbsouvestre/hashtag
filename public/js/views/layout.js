import { LayoutView } from 'marionette';
import SearchView from './search';

let Layout = LayoutView.extend({
    template: require('__templates__/layout.html'),
    regions: {
        search: '#search',
        results: '#results'
    },
    onShow(){
        this.search.show( 
                new SearchView()
            );
    }
});

export default new Layout();