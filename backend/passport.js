const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('./src/DB/db'); // Adjust the path to your DB module

passport.use(new GoogleStrategy({
  clientID: 'YOUR_GOOGLE_CLIENT_ID',
  clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if the user already exists in the database
    const [rows] = await db.query('SELECT * FROM manager WHERE email = ?', [profile.emails[0].value]);
    
    if (rows.length > 0) {
      // User exists
      return done(null, rows[0]);
    } else {
      // User does not exist, create a new one
      const newUser = {
        name: profile.displayName,
        email: profile.emails[0].value,
        pass: '', // Default or handle password as needed
        rol: 'user' // Default role
      };
      
      const [result] = await db.query('INSERT INTO manager SET ?', newUser);
      newUser.id = result.insertId;
      return done(null, newUser);
    }
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const [rows] = await db.query('SELECT * FROM manager WHERE id = ?', [id]);
    done(null, rows[0]);
  } catch (err) {
    done(err);
  }
});
