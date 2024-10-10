"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface BookingData {
  service: string;
  doctor_name: string;
  start_time: string;
  end_time: string;
  date: string;
}

const AddBookingForm: React.FC = () => {
  const [service, setService] = useState<string>("");
  const [doctorName, setDoctorName] = useState<string>("");
  const [startHours, setStartHours] = useState<string>("");
  const [startMinutes, setStartMinutes] = useState<string>("");
  const [startAmPm, setStartAmPm] = useState<string>("AM");
  const [endHours, setEndHours] = useState<string>("");
  const [endMinutes, setEndMinutes] = useState<string>("");
  const [endAmPm, setEndAmPm] = useState<string>("AM");
  const [date, setDate] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const startTime = `${
      startHours.length === 1 ? `0${startHours}` : startHours
    }:${
      startMinutes.length === 1 ? `0${startMinutes}` : startMinutes
    } ${startAmPm}`;
    const endTime = `${endHours.length === 1 ? `0${endHours}` : endHours}:${
      endMinutes.length === 1 ? `0${endMinutes}` : endMinutes
    } ${endAmPm}`;

    const bookingData: BookingData = {
      service,
      doctor_name: `Dr. ${doctorName}`,
      start_time: startTime,
      end_time: endTime,
      date,
    };

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
        cache: "no-cache",
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.log(
          `Error adding the booking:", ${errorData}, HTTP Status: ${response.status}`
        );
        setError(
          `Couldn't add booking. (Error: ${errorData}, HTTP Status:${response.status})`
        );
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Failed to send booking:", error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ color: "#000" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>Service:</label>
        <input
          type="text"
          value={service}
          onChange={(e) => setService(e.target.value)}
          placeholder="E.g. Annual Check-up, Flu Shot"
          required
        />
      </div>

      <div>
        <label>Doctor Name:</label>
        <input
          type="text"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
          placeholder="Doctor's Name"
          required
        />
      </div>

      <div>
        <label>Start Time:</label>
        <input
          type="number"
          value={startHours}
          onChange={(e) => setStartHours(e.target.value)}
          min="1"
          max="12"
          placeholder="HH"
          required
        />
        :
        <input
          type="number"
          value={startMinutes}
          onChange={(e) => setStartMinutes(e.target.value)}
          min="0"
          max="59"
          placeholder="MM"
          required
        />
        <select
          value={startAmPm}
          onChange={(e) => setStartAmPm(e.target.value)}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>

      <div>
        <label>End Time:</label>
        <input
          type="number"
          value={endHours}
          onChange={(e) => setEndHours(e.target.value)}
          min="1"
          max="12"
          placeholder="HH"
          required
        />
        :
        <input
          type="number"
          value={endMinutes}
          onChange={(e) => setEndMinutes(e.target.value)}
          min="0"
          max="59"
          placeholder="MM"
          required
        />
        <select value={endAmPm} onChange={(e) => setEndAmPm(e.target.value)}>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>

      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <button type="submit">Add Booking</button>
    </form>
  );
};

export default AddBookingForm;
