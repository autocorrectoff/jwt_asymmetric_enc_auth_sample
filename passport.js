const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const { readFileSync } = require("fs");

const fromCustomHeader = (req) => {
    let token = null;
    if(req && req.headers) {
        token = req.headers['jwt'];
    }
    return token;
};

var opts = {};
opts.jwtFromRequest = fromCustomHeader;

const secret = readFileSync("./id_rsa_pub.pem", "utf-8");
opts.secretOrKey = secret;
opts.algorithms = ['RS256'];

passport.use('jwt', new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(jwt_payload);
    return done(null, 'success');
}));