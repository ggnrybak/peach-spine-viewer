import { SkeletonData, Spine } from '@pixi-spine/runtime-4.1';
import { Application, BitmapText, Sprite, Text, Texture } from 'pixi.js';
import { PropsWithChildren } from 'react';

export const enum ElementsReducerTypes {
  AddAnimation = 'addAnimation',
  AddBitmapText = 'addBitmapText',
  AddText = 'addText',
  AddSprite = 'addSprite',
  AddHideAndShowTextureScript = 'addHideAndShowTextureScript',
  SetCurrentElement = 'setCurrentElement',
  ClearElements = 'clearElements',
}

export type HideAndShowTextureScript = {
  spine: Spine;
  sprite: Sprite;
  animationName: string;
};

export type AddAnimationPayload = [string, SkeletonData];
export type AddBitmapTextPayload = [string, string];
export type AddTextPayload = [string, string];
export type AddSpritePayload = [string, Texture];
export type AddHideAndShowTextureScriptPayload = [string, string];
export type CurrentElementPayload = Spine | Sprite | BitmapText | Text | HideAndShowTextureScript | null;

export interface AddAnimationAction {
  type: ElementsReducerTypes.AddAnimation;
  payload: AddAnimationPayload;
  app: Application;
}

export interface AddBitmapTextAction {
  type: ElementsReducerTypes.AddBitmapText;
  payload: AddBitmapTextPayload;
  app: Application;
}

export interface AddTextAction {
  type: ElementsReducerTypes.AddText;
  payload: AddTextPayload;
  app: Application;
}

export interface AddSpriteAction {
  type: ElementsReducerTypes.AddSprite;
  payload: AddSpritePayload;
  app: Application;
}

export interface AddHideAndShowTextureScriptAction {
  type: ElementsReducerTypes.AddHideAndShowTextureScript;
  payload: AddHideAndShowTextureScriptPayload;
}

export interface CurrentElementAction {
  type: ElementsReducerTypes.SetCurrentElement;
  payload: CurrentElementPayload;
}

export interface ClearElementsAction {
  type: ElementsReducerTypes.ClearElements;
}

export type ElementsReducerAction =
  | AddAnimationAction
  | AddBitmapTextAction
  | AddTextAction
  | AddSpriteAction
  | AddHideAndShowTextureScriptAction
  | CurrentElementAction
  | ClearElementsAction;

export interface ElementsReducerState {
  readonly spineAnimations: Record<string, Spine>;
  readonly bitmapTexts: ReadonlyArray<BitmapText>;
  readonly texts: ReadonlyArray<Text>;
  readonly sprites: Record<string, Sprite>;
  readonly scripts: Array<HideAndShowTextureScript>;
  readonly currentElement: CurrentElementPayload;
}

export interface ElementsContextState extends ElementsReducerState {
  addAnimation(payload: AddAnimationPayload): void;
  addBitmapText(payload: AddBitmapTextPayload): void;
  addText(payload: AddTextPayload): void;
  addSprite(payload: AddSpritePayload): void;
  addHideAndShowTextureScript(payload: AddHideAndShowTextureScriptPayload): void;
  setCurrentElement(payload: CurrentElementPayload): void;
  clearElements(): void;
}

export type AppProviderProps = PropsWithChildren;
