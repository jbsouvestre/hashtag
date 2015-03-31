import { ItemView } from 'marionette';

export default ItemView.extend({
    template: require('__templates__/results.html'),
    serializeData(){
        return {
            result: this.getOption('queryParams')
        };
    }
});