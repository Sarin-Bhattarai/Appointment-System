exports.isAdmin = (req, res, next) => {
  if (req.body.role === 0) {
    return res.status(403).json({
      error: "admin resource! access denied",
    });
  }
  next();
};
