exports.isAdmin = (req, res, next) => {
  if (req.body.role === 0) {
    return res.status(403).json({
      error: "Admin resource! Access Denied",
    });
  }
  next();
};
