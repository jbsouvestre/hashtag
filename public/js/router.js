import { AppRouter } from 'marionette';
import controller from './controller';

let Router = AppRouter.extend({
    appRoutes: {
        'search*': 'search',
        '*index': 'index'
    },
    controller: controller
});

export default new Router();