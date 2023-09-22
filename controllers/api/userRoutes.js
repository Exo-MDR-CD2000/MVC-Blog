const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    console.log(userData);

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: ['id', 'username', 'email', 'password'],
      order: [['id', 'ASC']]
    });
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  try {
    //const { username, email, password } = req.body;
    const userData = await User.create(req.body);
      res.status(200).json(userData);
    }
    catch (err) {
      res.status(400).json(err);
    }
});


// in insomnia, to create a new user, it would be: localhost:3001/api/users
// in the body, it would be:
// {
//   "username": "username",
//   "email": "email",
//   "password": "password"
// }



router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);
      if (!userData) {
        res.status(404).json({ message: 'No user found with that id!' });
        return;
      }
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
    });

module.exports = router;
