import { getHalf } from '@peach/utils';
import { Spine } from '@pixi-spine/runtime-4.1';
import { Application, BitmapText, Point, Sprite, Text } from 'pixi.js';

import {
  AddAnimationPayload,
  AddBitmapTextPayload,
  AddHideAndShowTextureScriptPayload,
  AddSpritePayload,
  AddTextPayload,
  CurrentElementPayload,
  ElementsReducerState,
} from './types';

export function makeAddAnimationState(
  state: ElementsReducerState,
  [anim, skeleton]: AddAnimationPayload,
  { stage, screen }: Application,
): ElementsReducerState {
  const spine = new Spine(skeleton);
  spine.name = anim;
  spine.position.copyFrom(stage.toLocal(new Point(getHalf(screen.width), getHalf(screen.height))));
  stage.addChild(spine);
  return {
    ...state,
    spineAnimations: { ...state.spineAnimations, [anim]: spine },
    currentElement: spine,
  };
}

export function makeAddBitmapTextState(
  state: ElementsReducerState,
  [content, font]: AddBitmapTextPayload,
  { stage, screen }: Application,
): ElementsReducerState {
  const bitmapText = new BitmapText(content, { fontName: font });
  bitmapText.anchor.set(0.5, 0.5);
  bitmapText.position.copyFrom(stage.toLocal(new Point(getHalf(screen.width), getHalf(screen.height))));
  stage.addChild(bitmapText);
  return {
    ...state,
    bitmapTexts: [...state.bitmapTexts, bitmapText],
    currentElement: bitmapText,
  };
}

export function makeAddTextState(
  state: ElementsReducerState,
  [content, font]: AddTextPayload,
  { stage, screen }: Application,
): ElementsReducerState {
  const text = new Text(content, { fontFamily: font });
  text.name = font || 'text';
  text.anchor.set(0.5, 0.5);
  text.position.copyFrom(stage.toLocal(new Point(getHalf(screen.width), getHalf(screen.height))));
  stage.addChild(text);
  return {
    ...state,
    texts: [...state.texts, text],
    currentElement: text,
  };
}

export function makeAddSpriteState(
  state: ElementsReducerState,
  [name, texture]: AddSpritePayload,
  { stage, screen }: Application,
): ElementsReducerState {
  const sprite = new Sprite(texture);
  sprite.name = name;
  sprite.anchor.set(0.5, 0.5);
  sprite.position.copyFrom(stage.toLocal(new Point(getHalf(screen.width), getHalf(screen.height))));
  stage.addChild(sprite);
  return {
    ...state,
    sprites: { ...state.sprites, [name]: sprite },
    currentElement: sprite,
  };
}

export function makeAddHideAndShowTextureScriptState(
  state: ElementsReducerState,
  [spriteName, animationName]: AddHideAndShowTextureScriptPayload,
): ElementsReducerState {
  const sprite = state.sprites[spriteName];
  const spine = state.spineAnimations[animationName];
  if (!sprite || !spine) throw new Error(`${spriteName} or ${animationName} not found`);
  spine.visible = false;
  sprite.visible = true;
  const hideAndShowSprite = { sprite, spine, animationName };
  return {
    ...state,
    scripts: [...state.scripts, hideAndShowSprite],
    currentElement: hideAndShowSprite,
  };
}

export function makeSetCurrentElementState(
  state: ElementsReducerState,
  payload: CurrentElementPayload,
): ElementsReducerState {
  return { ...state, currentElement: payload };
}
