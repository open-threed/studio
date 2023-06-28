/* eslint-disable no-prototype-builtins */
import { ObjectType } from "@/types";

export default function processElements(elements: ObjectType, injectedVariables: ObjectType) {
  const processedElements: ObjectType = {};

  for (const key in elements) {
    if (elements.hasOwnProperty(key)) {
      const element = elements[key];
      let injectedProps = {};

      if (element.inject) {
        for (const injectKey of element.inject) {
          if (injectedVariables.hasOwnProperty(injectKey)) {
            injectedProps = {
              ...injectedProps,
              ...injectedVariables[injectKey],
            };
          }
        }
      }

      processedElements[key] = {
        ...element,
        ...injectedProps,
      };

      delete processedElements[key].inject;
    }
  }

  return processedElements;
}
