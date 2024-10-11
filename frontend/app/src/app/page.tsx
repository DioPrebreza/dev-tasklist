import Link from "next/link";
import moment from "moment";

import "./home.css";

interface Booking {
  id: number;
  service: string;
  doctor_name: string;
  start_time: string;
  end_time: string;
  date: string;
}

async function getBookings() {
  const res = await fetch("http://host.docker.internal:5000/api/bookings", {
    cache: "no-store",
    mode: "no-cors",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Home: React.FC = async () => {
  const bookings = await getBookings();
  console.log(bookings);

  return (
    <div className="container">
      <div className="booking-count">
        <h1 className="booking-count">
          Current booking count: {bookings.length}
        </h1>
      </div>
      <Link href="/add-booking" className="btn-container">
        <button className="add-booking-btn">Add a Booking</button>
      </Link>
      <div className="booking-list">
        {bookings ? (
          bookings.map((booking: Booking) => {
            const date = moment(booking.date);

            const month = date.format("MMMM");
            const day = date.format("D");

            return (
              <Link
                href={{
                  pathname: `/booking/${booking.id}`,
                  query: {
                    service: booking.service,
                    doctor_name: booking.doctor_name,
                    end_time: booking.end_time,
                  },
                }}
                key={booking.id}
                className="booking"
              >
                A Booking on {month} {day} starting at {booking.start_time}
              </Link>
            );
          })
        ) : (
          <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
            <p>
              No bookings yet, please add a booking through the button below
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
