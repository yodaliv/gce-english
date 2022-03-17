export const LevelAsCategory = 'level';
export const DefaultSearchQuestionLimit = 20;

export interface Category {
  id: string;
  name: string;
}

export interface SubCategory extends Category {
  original_name: string;
}

export function isSelectedCategoryLevel(value: string) {
  // string format is `level::{value}
  const found = value.search(`${LevelAsCategory}::`);
  return found === 0;
}

export function getLevelFromLevelAsCategory(value: string): string {
  if (isSelectedCategoryLevel(value)) {
    return value.slice(LevelAsCategory.length + 2, value.length);
  } else {
    return '';
  }
}
