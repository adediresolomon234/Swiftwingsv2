export const validatePassengersAgainstLowestSeats = (jetData, formData) => {
  let errors = [];

  // Find the aircraft with the lowest no_of_seats
  const aircraftWithLowestSeats = jetData.reduce((lowestJet, currentJet) => {
    return currentJet?.features?.no_of_seats < lowestJet?.features?.no_of_seats
      ? currentJet
      : lowestJet;
  }, jetData[0]);

  const lowestSeats = aircraftWithLowestSeats?.features?.no_of_seats;

  // Validate each formData entry
  formData.forEach((data, index) => {
    const totalPassengers =
      data.passengers.adults + data.passengers.children + data.passengers.pets;

    if (totalPassengers > lowestSeats) {
      errors.push(
        `Trip ${
          index + 1
        } - Total passengers (${totalPassengers}) exceed the lowest available seat capacity (${lowestSeats}) on ${
          aircraftWithLowestSeats.name
        }.`
      );
    }
  });

  return errors;
};

export const formatThousand = (num) => {
  if (num >= 1000000) {
    if (num % 1000000 === 0) return (num / 1000000).toFixed(0) + "M";
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    if (num % 1000 === 0) return (num / 1000).toFixed(0) + "k";
    return (num / 1000).toFixed(1) + "k";
  }
  return num.toString();
};
