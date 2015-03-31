import { AppRouter } from 'marionette';
import controller from './controller';

let Router = AppRouter.extend({

    appRoutes: {
        '*index': 'index',
        'search*': 'search'
    },
    controller: controller
});

export default new Router();