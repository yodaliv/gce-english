import { Injectable } from '@angular/core';
import { Question, QuestionAssignment } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class StateManageService {

  queriedQuestions: Question[] = []; // create quiz, search from database state
  createdQuestions: QuestionAssignment[] = []; // create quiz, manually created questions

  constructor() { }
}
