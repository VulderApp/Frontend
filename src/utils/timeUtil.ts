import moment from "moment";

export const getTimetableTime = (from: Date, to: Date) =>
  `${moment(from).format("LT")} - ${moment(to).format("LT")}`;
