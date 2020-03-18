const bcrypt = require('bcrypt');
const db = require('../models/models.js');

const userController = {};

/*
 * Expects format of req.body to be be:
 *   {
 *     "firstname":
 *     "lastname":
 *     "username":
 *     "password": <plain text>
 *   }
 */
userController.encrypt = (req, res, next) => {
  const { password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      res.locals.user = { ...req.body, password: hash };
      return next();
    })
    // For bcrypt internal errors
    .catch(() => next({
      log: 'A problem occured hashing password',
      status: 500,
      message: { err: 'A problem occured hashing password' }
    }));
};

// Adds user to user table
userController.create = (req, res, next) => {
  const {
    firstname, lastname, username, password
  } = res.locals.user;

  const queryStr = `INSERT INTO users (firstname, lastname, username, password)
                    VALUES ($1, $2, $3, $4)`;
  const params = [firstname, lastname, username, password];

  db.query(queryStr, params)
    .then(() => next())
    .catch(() => next({
      log: 'Username already exists',
      status: 400,
      message: { err: 'Username already exists' }
    }));
};

/*
 * Verifies user
 * Input format of req.body is:
 *   {
 *     "username":
 *     "password":
 *   }
 * Output format of res.locals.user is:
 *   {
 *     "firstname":
 *     "lastname":
 *     "username":
 *     "password": <plain text>
 *   }
 * Output of plain text password exists on res.locals.user
 */
userController.verify = (req, res, next) => {
  const { username, password } = req.body;
  const str = 'SELECT * from users WHERE username = $1;';
  const params = [username];

  db.query(str, params)
    .then((data) => {
      // If user exists, send data to next middleware
      if (data.rows !== []) {
        [res.locals.user] = data.rows;
        res.locals.password = password;
        return next();
      }

      // If user does not exist, call global error handler
      return next({
        log: 'Username or password incorrect',
        status: 400,
        message: { err: 'Username or password incorrect' }
      });
    })
    .catch((err) => next(err)); // internal pg error
};

// Compares plain text password on res.locals.password to hashed password
userController.authenticate = (req, res, next) => {
  bcrypt.compare(res.locals.password, res.locals.user.password)
    .then((result) => {
      // If password correct, move to next middleware
      if (result) return next();

      // If password incorrect, call global error handler
      return next({
        log: 'Username or password incorrect',
        status: 400,
        message: { err: 'Username or password incorrect' }
      });
    })
    .catch((err) => next(err)); // For bcrypt internal errors
};

/* Expects format of req.body and to  be:
 *   {
 *     "username":  <- this should probably be in req.cookies or something
 *     "location": , eg paris
 *     "category": , eg attraction
 *     "rating": integer from 1 to 5,
 *     "recommenation": , eg eiffel tower <- can think of a better name if confusing
 *     "review_text": eg it was pointy
 *
 *   }
 */
userController.submitReview = (req, res, next) => {
  const {
    username, location, category, rating, recommendation, review_text
  } = req.body;
  const str = `INSERT INTO "review" (created_by, location, category, rating, recommendation, review_text)
               VALUES ($1, $2, $3, $4, $5, $6);`;
  const params = [username, location, category, rating, recommendation, review_text];
  db.query(str, params)
    .then((data) => {
      console.log('is this working????');
      console.log(data);
      return next();
    })
    .catch((err) => next(err));
};

/* Expects format of req.body for user1 to follow user2:
 *   {
 *     "username":  <- his should probably be in req.cookies or something,
 *     "user2 id or username:
 *
 *   }
 * However you want to get to to us - could be req.params in case 1, req.body in case 2 below
 *    1. user1 can visit user2's profile. on user2's profile, there's a "follow" button (if user1
 *       visits profile/user2, serve SELECT * from review WHERE created_by = user2)
 *    2. or is there just a search bar on user1's homepage to follow  user2?
 */
userController.follow = (req, res, next) => {
  const { user_id, followedUser } = req.body;
  const str = 'INSERT INTO "follows" (user_id, followed_user) VALUES ($1, $2)';
  const params = [user_id, followedUser];
  db.query(str, params)
    .then((data) => next())
    .catch((err) => next(err));
};

module.exports = userController;
