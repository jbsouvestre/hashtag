import { LayoutView } from 'marionette';

let Layout = LayoutView.extend({
    template: false,
    regions: {
        search: '#search',
        results: '#results'
    }
});

export default new Layout();