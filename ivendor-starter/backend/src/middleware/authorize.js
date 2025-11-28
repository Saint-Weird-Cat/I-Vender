function requireRole(...allowed) {
  return (req, res, next) => {
    const user = req.user;
    if (!user) return res.status(401).json({ error: 'unauthenticated' });
    if (allowed.length === 0) return next();
    if (!allowed.includes(user.role)) return res.status(403).json({ error: 'forbidden' });
    next();
  };
}

module.exports = { requireRole };
