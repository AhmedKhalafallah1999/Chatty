export const testApp = (req, res, next) => {
  res.json({ msg: "Hello Worldd", body: req.body });
  console.log(req.body);
};
