import * as knexInit from 'knex'

import config from '../config'

const knex = knexInit({
  client: 'pg',
  connection: config.database.connection,
  pool: {
    /* eslint-disable */
    afterCreate(conn: any, done: Function): void {
      conn.query('SET timezone="UTC";', (err: Error) => {
        if (err) return done(err, conn)

        conn.query('SET statement_timeout TO 3000;', (err: Error) => {
          // if err is not falsy, connection is discarded from pool
          done(err, conn)
        })
      })
    },
    /* eslint-enable */
  },
})

export default knex
