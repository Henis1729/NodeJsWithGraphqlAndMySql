export const userQuery = {
  getUserById: (parent, { USERID }, { pool }) => {
    return new Promise(async (resolve, reject) => {
      let connection;
      try {
        pool.getConnection((err, connection) => {
          if (err) throw err;
          connection.query(
            `SELECT * FROM users WHERE USERID = ? `,
            [USERID],
            (error, results) => {
              if (error) reject(error);
              resolve(results[0]);
              pool.releaseConnection(connection);
              if (error) throw error;
            }
          );
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  getAllUser: (parent, args, { pool }) => {
    return new Promise(async (resolve, reject) => {
      try {
        pool.getConnection((err, connection) => {
          if (err) throw err;
          connection.query("SELECT * FROM users", (error, results) => {
            resolve(results);
            pool.releaseConnection(connection);
            if (error) throw error;
          });
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  getAllUserWithPaginate: (parent, args, { pool }) => {
    return new Promise(async (resolve, reject) => {
      let connection;
      try {
        let { page, limit, search, sort } = args;
        pool.getConnection((err, connection) => {
          if (err) throw err;
          let sql1 = `SELECT COUNT(*) "Total" FROM users WHERE LOWER(NAME) LIKE LOWER('%${search}%')`;
          connection.query(
            `SELECT * FROM users WHERE LOWER(NAME) LIKE LOWER('%${search}%') ORDER BY ? ? LIMIT ?, ?`,
            [sort?.key, sort?.order, (page - 1) * limit, limit],
            (error, results) => {
              if (error) throw error;
              connection.query(sql1, (error, count) => {
                if (error) throw error;
                resolve({ count: count[0]?.Total, data: results });
                pool.releaseConnection(connection);
              });
            }
          );
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};
