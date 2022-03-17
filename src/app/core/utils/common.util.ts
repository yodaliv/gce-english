import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

export async function wait(milisec: number) {
  await of(0).pipe(delay(milisec)).toPromise();
}

export const LETTERS = ['A', 'B', 'C', 'D'];
export const COVERS = ['blue', 'green', 'red', 'pink', 'yellow'];

export function getCoverImage(index) {
  return `assets/images/covers/${ COVERS[index % 5] }-cover.svg`;
}
