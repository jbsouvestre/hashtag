import { Model, history } from 'backbone';
import { ItemView } from 'marionette';
//import bd from 'bootstrap-daterangepicker';


export default ItemView.extend({
    template: require('__templates__/search.html'),
    ui: {
        form: 'form',
        query: '[name=query]',
        date: '[name=date]',
        'submit': '[type=submit]'
    },
    events: {
        'submit @ui.form': 'onSubmit',
    },
    onRender(){
        // /console.log($);
        //this.ui.date.daterangepicker();
    },
    onSubmit(e){
        e.preventDefault();
        let queryParams = this.ui.form.serialize();

        history.navigate('/search?' + queryParams, {
            trigger: true
        });        
    }
});