export const userMutation = {
  createUser: (parent, { input }, { pool }) => {
    return new Promise(async (resolve, reject) => {
      try {
        pool.getConnection((err, connection) => {
          if (err) throw err;
          let id = nanoid();
          connection.query(
            `INSERT INTO users ( USERID, NAME ) VALUES (? ,?)`,
            [id, input.NAME],
            (error, results) => {
              if (error) throw error;
              else {
                pool.releaseConnection(connection);
                connection.query(
                  `SELECT * FROM users WHERE USERID = ?`,
                  [id],
                  (err, response) => {
                    if (err) reject(err);
                    resolve(response[0]);
                  }
                );
              }
            }
          );
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  insertManyUser: (parent, { input }, { pool }) => {
    return new Promise(async (resolve, reject) => {
      try {
        let binds = input.map((val) => [+nanoid(), val.NAME]);
        pool.getConnection((err, connection) => {
          if (err) throw err;
          connection.query(
            `INSERT INTO users ( USERID, NAME ) VALUES ? `,
            [binds],
            (error, results) => {
              if (error) throw error;
              else resolve(true);
              pool.releaseConnection(connection);
            }
          );
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  updateUser: (parent, { input }, { pool }) => {
    return new Promise(async (resolve, reject) => {
      try {
        pool.getConnection((err, connection) => {
          if (err) throw err;
          connection.query(
            `UPDATE users SET NAME= ? WHERE USERID = ?`,
            [input?.NAME, input?.USERID],
            (error, results) => {
              if (error) throw error;
              else resolve(true);
              pool.releaseConnection(connection);
            }
          );
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  deleteUser: (parent, { USERID }, { pool }) => {
    return new Promise(async (resolve, reject) => {
      try {
        pool.getConnection((err, connection) => {
          if (err) throw err;
          connection.query(
            `DELETE FROM users WHERE USERID= ?`,
            [USERID],
            (error, results) => {
              if (error) throw error;
              else resolve(true);
              pool.releaseConnection(connection);
            }
          );
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};
