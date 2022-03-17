import { QuestionAssignment } from './question';

export interface Exam {
  id?: string;
  cover_image: any;
  exam_title: string;
  exam_description?: string;
  is_practice?: boolean;
  is_public?: boolean;
  questions?: QuestionAssignment[];
  questions_count?: number;
  level?: string;
}
