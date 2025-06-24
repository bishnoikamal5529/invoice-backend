function roleLevelAccessMiddleware(req, res, next) {
    const user = req.user;

    if (!user || user.role === 'staff') {
        return res.status(403).json({ error: 'You need higher authority to make these changes' });
    }

    next();
}

module.exports = roleLevelAccessMiddleware;