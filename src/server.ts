import UserRoute from "./domains/users/route/route";
import AuthRoute from "./domains/auth/route/route";
import FileRoute from "./domains/file/route/route";
import App from "./app/app";

const app = new App([new UserRoute(), new AuthRoute(), new FileRoute()]);

export default app.getServer();
