import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import User from "./models/User";
import routes from "./routes";
import { githubLoginCallback, facebookLoginCallback } from "./controllers/userController";

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

passport.use(
    new FacebookStrategy({
        clientID : process.env.FB_ID,
        clientSecret : process.env.FB_SECRET,
        callbackURL : `https://d6180173.ngrok.io${routes.facebookCallback}`,
        profileFields : ["id", "displayName", "photos","email"],
        scope : ["public_profile","email"]
    },
    facebookLoginCallback)
)

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());