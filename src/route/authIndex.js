import authRoute from "./authRoute"

exports.authInitWebRoute = (app) => {
    authRoute(app);
}