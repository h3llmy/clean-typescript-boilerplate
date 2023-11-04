import UserRoute from "./domains/users/route/users.route";
import AuthRoute from "./domains/auth/route/auth.route";
import FileRoute from "./domains/file/route/file.route";
import App from "./app/app";

const app = new App([new UserRoute(), new AuthRoute(), new FileRoute()]);

export default app.getServer();
