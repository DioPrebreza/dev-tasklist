import Link from "next/link";
import moment from "moment";

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
    <div
      style={{ display: "flex", flexDirection: "column", marginBottom: "5px" }}
    >
      <h1>Current booking count: {bookings.length}</h1>
      {bookings ? (
        bookings.map((booking: Booking) => {
          const date = moment(booking.date);

          const month = date.format("MMMM");
          const day = date.format("D");

          return (
            <div
              style={{ display: "flex", marginBottom: "15px" }}
              key={booking.id}
            >
              <Link
                href={{
                  pathname: `/booking/${booking.id}`,
                  query: {
                    service: booking.service,
                    doctor_name: booking.doctor_name,
                    end_time: booking.end_time,
                  },
                }}
              >
                A Booking on {month} {day} starting at {booking.start_time}
              </Link>
            </div>
          );
        })
      ) : (
        <div>
          <p>No bookings yet, please add a booking through the button below</p>
        </div>
      )}
      <Link href="/add-booking">
        <button>Add a Booking</button>
      </Link>
    </div>
  );
};

export default Home;
