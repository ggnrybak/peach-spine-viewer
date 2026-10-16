import { ElementsReducerAction, ElementsReducerState, ElementsReducerTypes } from './types';
import {
  makeAddAnimationState,
  makeAddBitmapTextState,
  makeAddHideAndShowTextureScriptState,
  makeAddSpriteState,
  makeAddTextState,
  makeSetCurrentElementState,
} from './utils';

export function createElementsReducerState(): ElementsReducerState {
  return {
    spineAnimations: {},
    sprites: {},
    bitmapTexts: [],
    texts: [],
    scripts: [],
    currentElement: null,
  };
}

export function elementsReducer(state: ElementsReducerState, action: ElementsReducerAction): ElementsReducerState {
  switch (action.type) {
    case ElementsReducerTypes.ClearElements: {
      return createElementsReducerState();
    }
    case ElementsReducerTypes.AddAnimation: {
      return makeAddAnimationState(state, action.payload, action.app);
    }
    case ElementsReducerTypes.AddBitmapText: {
      return makeAddBitmapTextState(state, action.payload, action.app);
    }
    case ElementsReducerTypes.AddText: {
      return makeAddTextState(state, action.payload, action.app);
    }
    case ElementsReducerTypes.AddSprite: {
      return makeAddSpriteState(state, action.payload, action.app);
    }
    case ElementsReducerTypes.AddHideAndShowTextureScript: {
      return makeAddHideAndShowTextureScriptState(state, action.payload);
    }
    case ElementsReducerTypes.SetCurrentElement: {
      return makeSetCurrentElementState(state, action.payload);
    }
    default:
      return state;
  }
}
