rs.status()
db.createUser({ user: 'admin', pwd: 'admin@microvoid', roles: [{ role: 'root', db: 'admin' }] })
