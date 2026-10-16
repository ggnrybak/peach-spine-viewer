import { Container } from '@chakra-ui/react';
import { AnimationSettings, BitmapTextSettings, PanelsTitel, SpriteSettings, TextSettings } from '@peach/components';
import { CurrentElementPayload, useElementsContext } from '@peach/contexts';
import { Spine } from '@pixi-spine/runtime-4.1';
import { BitmapText, Sprite, Text } from 'pixi.js';

import HideAndShowSpriteSettings from './settings/HideAndShowSpriteSettings';

function getSettingsComponent(element: CurrentElementPayload) {
  if (element === null) return <></>;
  if (element instanceof BitmapText) return <BitmapTextSettings bitmapText={element} />;
  if (element instanceof Text) return <TextSettings text={element} />;
  if (element instanceof Sprite) return <SpriteSettings sprite={element} />;
  if (element instanceof Spine) return <AnimationSettings spine={element} />;
  if ('animationName' in element) return <HideAndShowSpriteSettings elements={element} />;
  return <></>;
}

export default function PropertiesPanel() {
  const { currentElement } = useElementsContext();

  return (
    <Container overflowY="scroll">
      <PanelsTitel>props</PanelsTitel>
      {getSettingsComponent(currentElement)}
    </Container>
  );
}
