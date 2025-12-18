import React, { useMemo } from 'react';
import { MdEventSeat } from 'react-icons/md';
import { GiSteeringWheel } from 'react-icons/gi';

const SeatMap = ({
  totalSeats = 24,
  bookedSeats = [],
  onSelect,
  selectedSeats = [],
}) => {
  console.log(bookedSeats, 'booked seats');
  const maxSelect = totalSeats;
  const seatLayout = useMemo(() => {
    const seatsPerRow = 4;
    const totalRows = Math.ceil(totalSeats / seatsPerRow);
    const rows = [];
    let seatCounter = 0;
    for (let i = 0; i < totalRows; i++) {
      const rowLabel = String.fromCharCode(65 + i);
      const rowSeats = [];
      for (let j = 1; j <= seatsPerRow; j++) {
        seatCounter++;
        if (seatCounter <= totalSeats) {
          rowSeats.push(`${rowLabel}${j}`);
        }
      }
      rows.push({ label: rowLabel, seats: rowSeats });
    }
    return rows;
  }, [totalSeats]);

  console.log(seatLayout);

  const handleSeatClick = seatId => {
    if (bookedSeats.includes(seatId)) return;
    onSelect(seatId);
    console.log(seatId);
    if (selectedSeats.includes(seatId)) {
      const newSelection = selectedSeats.filter(s => s !== seatId);
      onSelect(newSelection);
    } else {
      if (selectedSeats.length >= maxSelect) {
        alert(`You can only select up to ${maxSelect} seats.`);
        onSelect([]);
        return;
      }
      const newSelection = [...selectedSeats, seatId];
      onSelect(newSelection);
    }
  };

  const getSeatColor = seatId => {
    if (bookedSeats.includes(seatId)) return 'text-gray-300 cursor-not-allowed'; // Booked
    if (selectedSeats.includes(seatId)) return 'text-primary cursor-pointer'; // Selected
    return 'text-base-300 hover:text-primary/70 cursor-pointer'; // Available
  };

  return (
    <div className="bg-base-100 p-6 rounded-xl border border-base-200 shadow-sm w-full max-w-sm mx-auto">
      <div className="flex justify-end mb-6 border-b pb-4">
        <div className="flex flex-col items-center opacity-50">
          <GiSteeringWheel className="text-3xl" />
          <span className="text-[10px] uppercase font-bold">Driver</span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {seatLayout.map(row => (
          <div key={row.label} className="flex items-center justify-between">
            <div className="flex gap-3">
              {[0, 1].map(index => {
                const seatId = row.seats[index];
                if (!seatId) return <div key={index} className="w-8"></div>;
                return (
                  <div
                    key={seatId}
                    onClick={() => handleSeatClick(seatId)}
                    className="relative group"
                  >
                    <MdEventSeat
                      className={`text-3xl transition-colors ${getSeatColor(
                        seatId
                      )}`}
                    />
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-500 pointer-events-none">
                      {seatId}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="w-8"></div>
            <div className="flex gap-3">
              {[2, 3].map(index => {
                const seatId = row.seats[index];
                if (!seatId) return <div key={index} className="w-8"></div>;

                return (
                  <div
                    key={seatId}
                    onClick={() => handleSeatClick(seatId)}
                    className="relative group"
                  >
                    <MdEventSeat
                      className={`text-3xl transition-colors ${getSeatColor(
                        seatId
                      )}`}
                    />
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-500 pointer-events-none">
                      {seatId}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-8 pt-4 border-t text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-200 rounded-sm"></div> Available
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-primary rounded-sm"></div> Selected
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-300 rounded-sm"></div> Booked
        </div>
      </div>
    </div>
  );
};

export default SeatMap;
