import { Model } from 'backbone';
import { ItemView } from 'marionette';
import 'bootstrap-daterangepicker';

export let Search = Model.extend({
    url: '/search'
});

export let SearchView = ItemView.extend({
    template: false,
    el: '#search',
    initialize(){
        this.triggerMethod('render');
    },
    ui: {
        form: 'form',
        date: '[name=date]',
        'submit': '[type=submit]'
    },
    events: {
        'submit @ui.form': 'onSubmit',
    },
    onRender: function(){
        console.log('onRander')
        //this.ui.date.daterangepicker();
    },
    onSubmit(e){
        e.preventDefault();
        console.log('submit');
    }
});