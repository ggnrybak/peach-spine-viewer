import { useAppContext } from '@peach/contexts';
import { createContext, useContext, useReducer } from 'react';

import { createElementsReducerState, elementsReducer } from './reducer';
import {
  AddAnimationPayload,
  AddBitmapTextPayload,
  AddHideAndShowTextureScriptPayload,
  AddSpritePayload,
  AddTextPayload,
  AppProviderProps,
  CurrentElementPayload,
  ElementsContextState,
  ElementsReducerTypes,
} from './types';

export const ElementsContext = createContext({} as ElementsContextState);

export const useElementsContext = () => useContext(ElementsContext);

export const ElementsProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch] = useReducer(elementsReducer, createElementsReducerState());
  const { app } = useAppContext();

  const elementsContext: ElementsContextState = {
    ...state,
    addAnimation(payload: AddAnimationPayload) {
      dispatch({ type: ElementsReducerTypes.AddAnimation, payload, app });
    },
    addBitmapText(payload: AddBitmapTextPayload) {
      dispatch({ type: ElementsReducerTypes.AddBitmapText, payload, app });
    },
    addText(payload: AddTextPayload) {
      dispatch({ type: ElementsReducerTypes.AddText, payload, app });
    },
    addSprite(payload: AddSpritePayload) {
      dispatch({ type: ElementsReducerTypes.AddSprite, payload, app });
    },
    addHideAndShowTextureScript(payload: AddHideAndShowTextureScriptPayload) {
      dispatch({ type: ElementsReducerTypes.AddHideAndShowTextureScript, payload });
    },
    setCurrentElement(payload: CurrentElementPayload) {
      dispatch({ type: ElementsReducerTypes.SetCurrentElement, payload });
    },
    clearElements() {
      // Destroy scene instances without destroying shared textures kept in Assets.
      for (const element of app.stage.removeChildren()) {
        element.destroy({ children: true });
      }
      dispatch({ type: ElementsReducerTypes.ClearElements });
    },
  };

  return <ElementsContext.Provider value={elementsContext}>{children}</ElementsContext.Provider>;
};
