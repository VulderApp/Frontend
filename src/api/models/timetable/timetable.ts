import { TimetableItem } from "./timetableItem";

export interface Timetable {
  timetableItems: TimetableItem[];
  generatedAt: Date;
  validFrom: string;
}
