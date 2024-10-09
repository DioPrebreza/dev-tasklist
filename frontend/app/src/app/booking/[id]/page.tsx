"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const BookingDetail = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const searchParams = useSearchParams();
  const service = searchParams.get("service");
  const doctor_name = searchParams.get("doctor_name");
  const end_time = searchParams.get("end_time");

  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginBottom: "15px" }}
    >
      <p>
        This Booking is with {doctor_name} For {service} and it ends on{" "}
        {end_time}
      </p>
      <Link href="/" passHref>
        <button>Go to Home</button>
      </Link>
    </div>
  );
};

export default BookingDetail;
