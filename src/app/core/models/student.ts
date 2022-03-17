import { Student } from './auth';
import { Question } from './question';

export interface StudentAssignment {
  id: string;
  start_date: string;
  end_date: string;
  student_details?: Student;
  student?: string;
  stats: StudentAssignmentStats;
  completed_date?: string;
}

export interface StudentAssignmentStats {
  answered: number;
  correct: number;
  score: number;
  skipped: number;
  total: number;
  wrong: number;
}

export interface StudentReport extends Partial<StudentAssignmentStats> {
  answers: Question[];
}

// define level as class for initialization
export class StudentLevel {
  level: number;
  correct: number;
  skipped: number;
  wrong: number;
  total: number;

  constructor(level: number) {
    this.level = level;
    this.correct = 0;
    this.total = 0;
  }
}

export class StudentLevelDetail extends StudentLevel {
  label: string;
  color: string;

  constructor(level: number, label: string, color: string) {
    super(level);
    this.label = label;
    this.color = color;
  }
}

export interface StudentStats {
  user_level: number;
  completed_quizzes: number;
  score: number;
  details: StudentLevel[];
}

export const StudentLevels: StudentLevelDetail[] = [
  new StudentLevelDetail(0, 'Beginner', '#3C8AFF'),
  new StudentLevelDetail( 1, 'False beginner', '#F2C94C'),
  new StudentLevelDetail( 2, 'Lower beginner', '#BB6BD9'),
  new StudentLevelDetail( 3, 'Intermediate', '#EB5757'),
  new StudentLevelDetail( 4, 'Upper intermediate', '#27AE60'),
  new StudentLevelDetail( 5, 'Lower advanced', '#6C63FF'),
  new StudentLevelDetail( 6, 'Advanced', '#25CED1'),
];
