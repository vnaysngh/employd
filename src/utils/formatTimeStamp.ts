function formatTimestamp(timestamp: string) {
  // Parse the timestamp
  const parsedTime = new Date(timestamp);

  // Extract components
  const day = parsedTime.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const month = monthNames[parsedTime.getMonth()];
  const year = parsedTime.getFullYear();

  // Format the time in 12-hour format
  let hours = parsedTime.getHours();
  const minutes = parsedTime.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12; // Convert to 12-hour format

  // Combine all parts into the desired format
  return `${day} ${month} ${year}, ${hours}:${minutes
    .toString()
    .padStart(2, "0")} ${ampm}`;
}

export default formatTimestamp;
