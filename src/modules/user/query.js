export const userQuery = {
  getUserById: (parent, { USERID }, { pool }) => {
    return new Promise(async (resolve, reject) => {
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
        pool.getConnection(async (err, connection) => {
          if (err) reject(err);
          /* ****************************** Direct query statement ******************************  */
          connection.query("SELECT * FROM users", (error, results) => {
            if (error) reject(error);
            resolve(results);
          });

          /* ****************************** Automatic creation, cached and re-used by connection ******************************  */
          connection.execute('select 1 + ? + ? as result', [5, 6], (err, rows) => {
            if (err) reject(err);
            console.log("🚀 ~ file: query.js:28 ~ connection.execute ~ rows", rows)
          });
          connection.unprepare('select 1 + ? + ? as result');

          /* ****************************** Prepared statements ******************************  */
          connection.prepare('select ? + ? as tests', (err, statement) => {
            if (err) reject(err);
            console.time("Test case 1")
            statement.execute([1, 2], (err, rows) => {
              if (err) reject(err);
              console.log("🚀 ~ file: query.js:36 ~ statement.execute ~ rows", rows)
            });
            console.timeEnd("Test case 1");
            console.time("Test case 2");
            statement.execute([2, 5], (err, rows) => {
              if (err) reject(err);
              console.log("🚀 ~ file: query.js:51 ~ statement.execute ~ rows", rows)
            });
            console.timeEnd("Test case 2")
            console.time("Test case 3")
            statement.execute([10, 11], (err, rows) => {
              if (err) reject(err);
              console.log("🚀 ~ file: query.js:55 ~ statement.execute ~ rows", rows)
            });
            console.timeEnd("Test case 3")
            statement.close();
          });

          /* ****************************** Using Promise Wrapper ******************************  */

          pool.releaseConnection(connection);
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
