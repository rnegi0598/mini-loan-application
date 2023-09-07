//GET
const getHome = (req, res) => {
  console.log(req.user);
  res.render("loan/home.ejs", { name: req.user.name });
};

module.exports = { getHome };
