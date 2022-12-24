import genderRoute from './genderRoute';
import userRoute from './userRoute';
import databaseRoute from './databaseRoute';
import roleRoute from './roleRoute'
import addressRoute from './addressRoute';
import testRoute from './testRoute';

exports.initWebRoute = (app) => {
    genderRoute(app);
    userRoute(app);
    databaseRoute(app);
    roleRoute(app);
    addressRoute(app);
    testRoute(app);
}