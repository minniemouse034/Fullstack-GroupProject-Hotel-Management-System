import connectionPool from "@/utils/connectionPool/db";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { username } = req.query;
      const userInput = req.body;
      const userInfo = await connectionPool.query(
        `
      SELECT users.user_id
      ,username,
      user_profile_id,
      full_name,
      email,
      id_number,
      date_of_birth,
      country,
      profile_picture 
      FROM users
      inner join user_profiles
      on user_profiles.user_id = users.user_id
      where username = $1
      `,
        [username]
      );
      if (!userInfo.rows[0]) {
        return res
          .status(404)
          .json({ message: "Invalid request cannot find user" });
      }
      const updatedData = { ...userInput, updated_at: new Date() };
      const userId = userInfo.id;

      await connectionPool.query(
        `
      UPDATE user_profiles
    SET full_name = $1,
    id_number = $2,
    date_of_birth = $3,
    country = $4,
    profile_picture = $5,
    updated_at = $6
    where user_id = $7
    `,
        [
          updatedData.full_name,
          updatedData.id_number,
          updatedData.date_of_birth,
          updatedData.country,
          updatedData.profile_picture,
          updatedData.updated_at,
          userId,
        ]
      );

      await connectionPool.query(
        `
      UPDATE users
    SET email = $1
    where username = &2
    `,
        [updatedData.email, username]
      );
      return res.status(200).json({ message: "Update sucessfuly" });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  if (req.method === "GET") {
    try {
      const { username } = req.query;
      const userData = await connectionPool.query(
        `select * from users where username = $1`,
        [username]
      );
      if (!userData.rows[0] || !username) {
        return res
          .status(404)
          .json({ message: "Invalid request user not found" });
      }
      const userInfo = await connectionPool.query(
        `
      SELECT users.user_id,
      username,
      user_profile_id,
      full_name,
      email,
      id_number,
      date_of_birth,
      country,
      profile_picture 
      FROM users
      inner join user_profiles
      on user_profiles.user_id = users.user_id
      where username = $1
      `,
        [username]
      );
      return res.status(200).json(userInfo.rows[0]);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}
