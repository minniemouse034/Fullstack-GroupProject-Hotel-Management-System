import connectionPool from "@/utils/connectionPool/db";

export default async function handler(req, res) {
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
      select  
      users.username,
      room_types.type_name,
      booking.check_in,
      booking.check_out,
      booking.created_at,
      booking.booking_id,
      rooms.room_size,
      rooms.bed_type,
      rooms.room_id,	
      rooms.room_capacity,
      rooms.current_price,
      rooms.promotion_price,
      rooms.main_image,
      bills.payment_method,
      bills.promotion_discount,
      bills.special_request,
      bills.additional_request,
      bills.total_price
      from bills 
      inner join booking
      on bills.booking_id = booking.booking_id
      inner join rooms
      on booking.room_id = rooms.room_id
      inner join room_types
      on rooms.room_type_id = room_types.room_type_id
      inner join user_profiles
      on booking.user_id = user_profiles.user_id
      inner join users  
      on booking.user_id = users.user_id
      where username = $1
      order by booking.created_at DESC
      `,
        [username]
      );
      return res.status(200).json(userInfo.rows);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

}
