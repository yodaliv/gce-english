import { Student } from './auth';
import { Exam } from './exam';

export interface Assignment {
  id?: string;
  exam: Exam;
  is_completed: boolean;
  student?: Student;
}
