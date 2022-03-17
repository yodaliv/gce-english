import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoryService } from '../core/services/category.service';
import { CommonService } from '../core/services/common.service';
import { LevelService } from '../core/services/level.service';
import { QuestionService } from '../core/services/question.service';
import { DefaultSearchQuestionLimit, getLevelFromLevelAsCategory, isSelectedCategoryLevel } from '../core/models/category';
import { Question } from '../core/models/question';
import { StateManageService } from '../core/services/state-manage.service';

@Component({
  selector: 'app-search-database',
  templateUrl: './search-database.page.html',
  styleUrls: ['./search-database.page.scss'],
})
export class SearchDatabasePage implements OnInit {

  examId = this.route.snapshot.params.id;
  categories: string[] = [];
  levels: string[] = [];
  questions: Question[] = [];

  selectedCategories: string[] = [];
  level: string = null;
  limit = DefaultSearchQuestionLimit;

  constructor(
    private categoryService: CategoryService,
    private levelService: LevelService,
    private commonService: CommonService,
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router,
    private state: StateManageService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadCategories();
  }

  filterChanged(categories: string[]) {
    this.selectedCategories = categories.filter(x => !isSelectedCategoryLevel(x));
    const found = categories.find(x => isSelectedCategoryLevel(x));
    this.level = found ? this.level = getLevelFromLevelAsCategory(found) : null;
    this.loadQuestions();
  }

  limitChanged() {
    this.loadQuestions();
  }

  saveQuestionsToExam() {
    this.state.queriedQuestions = this.state.queriedQuestions.concat(this.questions);
    // route back to the exam create form
    this.router.navigate(['exam-form', 'create']);
  }

  private async loadCategories() {
    const loading = await this.commonService.showLoading('Loading categories...');
    try {
      this.categories =  await this.categoryService.getParentCategories().toPromise();
      this.levels = await this.levelService.getLevels().toPromise();
      this.loadQuestions();
    } catch (e) {
      this.commonService.showToast('Sorry, Failed to load categories. Please try again.');
    } finally {
      loading.dismiss();
    }
  }

  private async loadQuestions() {
    const loading = await this.commonService.showLoading('Loading questions...');
    try {
      const res = await this.questionService.searchQuestions(this.selectedCategories, this.level, this.limit).toPromise();
      // accept only valid questions
      this.questions = res.results.filter(x => x.sub_questions && x.sub_questions.length >= 1);
    } catch (e) {
      this.commonService.showToast('Sorry, failed to load questions. Please try again.');
    } finally {
      await loading.dismiss();
    }
  }

}
