import { Week } from "./week";
import { Teacher } from "./teacher";
import { Classroom } from "./classroom";

export interface TimetableItem {
  subject: string[] | null;
  dayOfWeek: Week | null;
  lessonNumber: number | null;
  startAt: Date;
  endAt: Date;
  teacher: Teacher | null;
  classroom: Classroom | null;
}
