import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { CategorySelectDialogComponent } from '../category-select-dialog/category-select-dialog.component';
import { isSelectedCategoryLevel, LevelAsCategory } from '../../core/models/category';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss'],
})
export class CategoryFilterComponent implements OnInit {

  @Input() categories: string[] = [];
  @Input() levels: string[] = [];
  @Output() filterChanged: EventEmitter<string[]> = new EventEmitter<string[]>();

  showLevel = true;
  selectedCategories: string[] = [];

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  removeCategory(event, index: number) {
    event.preventDefault();
    event.stopPropagation();
    if (isSelectedCategoryLevel(this.selectedCategories[index])) {
      // level option should be enabled when user delete level from the selected category
      this.showLevel = true;
    }
    this.selectedCategories.splice(index, 1);
    this.filterChanged.emit(this.selectedCategories);
  }

  async openCategoryFilter() {
    const modal = await this.modalController.create({
      component: CategorySelectDialogComponent,
      cssClass: 'modal-bottom-option',
      componentProps: {categories: this.categories, levels: this.levels, showLevel: this.showLevel},
      swipeToClose: true,
    });
    await modal.present();
    modal.onWillDismiss().then((res: any) => {
      if (res && res.data && res.data.parent === LevelAsCategory) {
        // once we select a level, we should remove level option from the categories
        this.showLevel = false;
      }
      if (res && res.data && res.data.sub) {
        if (this.selectedCategories.findIndex(x => x === res.data.sub) >= 0) { // do not add duplicated category
          return;
        }
        this.selectedCategories.push(res.data.sub);
        this.filterChanged.emit(this.selectedCategories);
      } else {
        // modal has dismissed
      }
    });
  }

}
