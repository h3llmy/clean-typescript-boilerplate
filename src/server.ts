import UserRoute from "./domains/users/route/route";
import AuthRoute from "./domains/auth/route/route";
import App from "./app/app";

const app = new App([new UserRoute(), new AuthRoute()]);

app.listen();

export default app;
