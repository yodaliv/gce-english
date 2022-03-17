import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StudentLevels } from 'src/app/core/models/student';
import { Exam } from '../../core/models/exam';
import { CommonService } from '../../core/services/common.service';
import { ExamService } from '../../core/services/exam.service';
import { StudentLevelDetail } from './../../core/models/student';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';


@Component({
  selector: 'app-exam-info-form',
  templateUrl: './exam-info-form.component.html',
  styleUrls: ['./exam-info-form.component.scss'],
})
export class ExamInfoFormComponent implements OnInit, OnDestroy {

  @Input() exam: Exam;
  @Output() finish: EventEmitter<Exam> = new EventEmitter<Exam>();

  studentLevels: StudentLevelDetail[] = StudentLevels;

  isUpdated = false;
  isLoading = false;

  form: FormGroup;

  previewImage: SafeStyle;

  private unsubscribeAll: Subject<any> = new Subject<any>();

  get cover_image() {
    return this.form.get('cover_image');
  }

  constructor(
    private fb: FormBuilder,
    private examService: ExamService,
    private commonService: CommonService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    this.form = this.buildForm(this.exam);
    if (this.exam && this.exam.id) {
      this.form.valueChanges.pipe(
        takeUntil(this.unsubscribeAll)
      ).subscribe(value => {
        const data = {
          id: this.exam.id,
          cover_image: this.exam.cover_image,
          exam_title: this.exam.exam_title,
          is_practice: this.exam.is_practice,
          is_public: this.exam.is_public,
          level: +this.exam.level
        };
        this.setPreviewImage(this.exam.cover_image);
        this.isUpdated = JSON.stringify(data) !== JSON.stringify(value);
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  async save(): Promise<Exam | null> {
    if (this.form.invalid) {
      this.commonService.showToast('Please fill out exam title.');
      return;
    }
    const loading = await this.commonService.showLoading('Saving exam...');
    try {
      this.isLoading = true;
      const payload: Exam = this.form.value;
      let res = null;
      if (this.exam && this.exam.id) {
        const id = this.exam.id;
        res = await this.examService.updateExam(id, payload).toPromise();
      } else {
        res = await this.examService.createExam(payload).toPromise();
      }
      this.exam = res;
      this.isUpdated = false;
      this.finish.emit(res);
      // this.commonService.showToast('Test has successfully been saved.');
      return res;
    } catch (e) {
      this.commonService.showToast('Sorry, failed to save data. Please try again.');
    } finally {
      await loading.dismiss();
      this.isLoading = false;
    }
  }

  buildForm(exam?: Exam) {
    const data: Exam = exam || {} as any;
    this.setPreviewImage(data.cover_image);
    return this.fb.group({
      id: data.id,
      cover_image: typeof data.cover_image !== 'string' ? [data.cover_image || ''] : null,
      exam_title: [data.exam_title || '', Validators.required],
      is_practice: data.is_practice || false,
      is_public: [data.is_public !== undefined ? data.is_public : true, Validators.required],
      level: [+data.level || 0, Validators.required]
    });
  }

  async uploadHandler(event) {
    const file = event.target.files[0];
    this.form.controls.cover_image.setValue(file);
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.setPreviewImage(reader.result);
    }, false);
    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.clearImage();
    }
  }

  clearImage() {
    this.setPreviewImage(null);
    this.form.controls.cover_image.setValue(null);
  }

  setPreviewImage(imageUrl: string | ArrayBuffer) {
    if (imageUrl) {
      this.previewImage = this.sanitizer.bypassSecurityTrustStyle('url(' + imageUrl + ')');
    } else {
      this.previewImage = null;
    }
  }
}
