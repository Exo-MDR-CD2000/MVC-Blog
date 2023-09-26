const router = require('express').Router();
const { User, Posts, Comments } = require('../models');
const withAuth = require('../utils/auth');



// this is the homepage route. the url will be localhost:3001/
router.get('/', withAuth, async (req, res) => {
  console.log('homepage route');
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['username', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    const postData = await Posts.findAll({
      include: [{ model: User }, { model: Comments, include: [User] }],
      order: [['id', 'ASC']],
    });

    const posts = postData.map((post) => post.get({ plain: true }));


    res.render('homepage', {
      users,
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/', withAuth, async (req, res) => {
//   try {
//     const postData = await Post.findAll({
//       include: [{ model: Comment }]
//     });
//     const posts = postData.map(post => post.get({ plain: true }));
//     res.render(path.join(__dirname, '../views/homepage'), { 
//       posts, 
//       logged_in: req.session.logged_in 
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


// TODO: this route needs to be modified to show the user's posts

router.get('/account', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    const postData = await Posts.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User }, { model: Comments, include: [User] }],
      order: [['id', 'ASC']],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('account', {
      ...user,
      posts,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// this is the signup route

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

module.exports = router;
