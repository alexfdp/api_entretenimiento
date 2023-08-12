import { createPool } from 'mysql2/promise'

export const pool = createPool({
    host: 'containers-us-west-127.railway.app',
    user: 'root',
    password: 'WmmmGA8RK65GL1suy6wA',
    port: 5668,
    database: 'railway'
})