import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { slideUpAnimation } from '../../core/utils/animation.util';
import { CategoryService } from '../../core/services/category.service';
import { CommonService } from '../../core/services/common.service';
import { LevelAsCategory, SubCategory } from '../../core/models/category';

@Component({
  selector: 'app-category-select-dialog',
  templateUrl: './category-select-dialog.component.html',
  styleUrls: ['./category-select-dialog.component.scss'],
  animations: [
    slideUpAnimation()
  ],
})
export class CategorySelectDialogComponent implements OnInit, OnDestroy {

  @Input() categories: string[] = [];
  @Input() levels: string[] = [];
  @Input() showLevel: boolean;

  options: string[] = [];
  subCategories: SubCategory[] = [];

  form: FormGroup = this.fb.group({
    parent: ['', Validators.required],
    sub: ['', Validators.required]
  });

  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private commonService: CommonService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    // we show level as a category to UI simple
    this.options = this.showLevel ? [LevelAsCategory, ...this.categories] : this.categories;
    this.form.get('sub').disable();
    this.form.get('parent').valueChanges.pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe((value: string) => {
      if (value === LevelAsCategory) {
        this.subCategories = this.levels.map(x => ({id: x, original_name: `level::${x}`, name: x}));
      } else {
        this.loadSubCategories(value);
      }
      this.form.get('sub').enable();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  selectCategory() {
    this.modalController.dismiss(this.form.value);
  }

  private async loadSubCategories(parent: string) {
    const loading = await this.commonService.showLoading('Loading sub categories...');
    try {
      this.subCategories = await this.categoryService.getSubCategories(parent).toPromise();
    } catch (e) {
      this.commonService.showToast('Sorry, Failed to load sub categories. Please try again with different category.');
    } finally {
      await loading.dismiss();
    }
  }

}
