import passport from "passport";
import GithubStrategy from "passport-github";
import User from "./models/User";
import routes from "./routes";
import { githubLoginCallback } from "./controllers/userController";

passport.use(User.createStrategy());

passport.use(
    new GithubStrategy({
        clientID : process.env.GH_ID,
        clientSecret : process.env.GH_SECRET,
        callbackURL : `http://localhost:4000${routes.githubCallback}`
    },
    //사용자가 깃헙에서 돌아왔을 때 실행이 되는 함수
    githubLoginCallback )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());