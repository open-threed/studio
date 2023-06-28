/* eslint-disable no-var */
/* eslint-disable no-prototype-builtins */
import { ObjectType } from "@/types";

export default function getObjectDiff(lhs:ObjectType, rhs:ObjectType) {
  function compareObjects(lhs:ObjectType, rhs:ObjectType) {
    const diff: ObjectType = {};

    for (var key in lhs) {
      if (rhs?.hasOwnProperty(key)) {
        if (typeof lhs[key] === 'object' && typeof rhs[key] === 'object') {
          const subDiff = compareObjects(lhs[key], rhs[key]);
          if (Object.keys(subDiff).length > 0) {
            diff[key] = subDiff;
          }
        } else if (Array.isArray(lhs[key]) && Array.isArray(rhs[key])) {
          if (lhs[key].length !== rhs[key].length) {
            diff[key] = rhs[key];
          } else {
            for (let i = 0; i < lhs[key].length; i++) {
              if (typeof lhs[key][i] === 'object' && typeof rhs[key][i] === 'object') {
                const subDiffArray = compareObjects(lhs[key][i], rhs[key][i]);
                if (Object.keys(subDiffArray).length > 0) {
                  if (!diff[key]) {
                    diff[key] = [];
                  }
                  diff[key][i] = subDiffArray;
                }
              } else if (lhs[key][i] !== rhs[key][i]) {
                if (!diff[key]) {
                  diff[key] = [];
                }
                diff[key][i] = rhs[key][i];
              }
            }
          }
        } else if (lhs[key] !== rhs[key]) {
          diff[key] = rhs[key];
        }
      } else {
        diff[key] = rhs[key];
      }
    }

    for (var key in rhs) {
      if (!lhs?.hasOwnProperty(key)) {
        diff[key] = rhs[key];
      }
    }

    return diff;
  }

  return compareObjects(lhs, rhs);
}

export const applyDiffChanges = (objOriginal:ObjectType, changes:ObjectType) => {
  const updatedObject = { ...objOriginal };

  for (const key in changes) {
    if (updatedObject?.hasOwnProperty(key) && typeof changes[key] === 'object' && typeof updatedObject[key] === 'object') {
      updatedObject[key] = applyDiffChanges(updatedObject[key], changes[key]);
    } else {
      updatedObject[key] = changes[key];
    }
  }

  return updatedObject;
};

export const removeDiffChange = (objFinal:ObjectType, changes:ObjectType) => {
  const removedObject = { ...objFinal };

  for (const key in changes) {
    if (removedObject?.hasOwnProperty(key) && typeof changes[key] === 'object' && typeof removedObject[key] === 'object') {
      removedObject[key] = removeDiffChange(removedObject[key], changes[key]);
      if (Object.keys(removedObject[key]).length === 0) {
        delete removedObject[key];
      }
    }
  }

  return removedObject;
};

