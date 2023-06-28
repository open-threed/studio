import { File } from "../types";

export default function getOpenedFiles(files: File[]): File[] {
  const result: File[] = [];

  const traverse = (files: File[]): void => {
    for (const file of files) {
      if (file?.opened) {
        result.push(file);
      }
      if (file?.children) {
        traverse(file?.children);
      }
    }
  };

  traverse(files);

  return result;
}
