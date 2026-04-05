import { createPool } from "mysql2"

export default createPool ({
    host: "localhost",
    user: "root",
    password: "root",
    database: "stream",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})