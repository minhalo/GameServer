import genderRoute from './genderRoute';
import userRoute from './userRoute';
import databaseRoute from './databaseRoute';
import roleRoute from './roleRoute'
import addressRoute from './addressRoute';
import testRoute from './testRoute';
import fileRoute from './fileRoute';

exports.initWebRoute = (app) => {
    genderRoute(app);
    userRoute(app);
    databaseRoute(app);
    roleRoute(app);
    addressRoute(app);
    testRoute(app);
    fileRoute(app);
}