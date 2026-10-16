/* eslint-disable @typescript-eslint/unbound-method */
import { AttachmentIcon, CalendarIcon, ChatIcon, EditIcon, StarIcon } from '@chakra-ui/icons';
import { Container } from '@chakra-ui/react';
import { LayerItem, PanelsTitel } from '@peach/components';
import { useElementsContext } from '@peach/contexts';

const ICON_OPTIONS = {
  boxSize: 6,
  flexBasis: '15%',
};

export default function LayersPanel() {
  const elementsContext = useElementsContext();
  const { currentElement, setCurrentElement } = elementsContext;
  return (
    <Container overflowY="scroll">
      <PanelsTitel>layers</PanelsTitel>
      {Object.entries(elementsContext.spineAnimations).map(([anim, spine]) => (
        <LayerItem
          key={anim}
          name={anim}
          showProps={() => setCurrentElement(spine)}
          selected={currentElement === spine}
          icon={<CalendarIcon {...ICON_OPTIONS} />}
        />
      ))}
      {Object.values(elementsContext.bitmapTexts).map((bitmapText, index) => {
        const name = `${bitmapText.fontName}-${index + 1}`;
        return (
          <LayerItem
            key={name}
            name={name}
            showProps={() => setCurrentElement(bitmapText)}
            selected={currentElement === bitmapText}
            icon={<ChatIcon {...ICON_OPTIONS} />}
          />
        );
      })}
      {Object.values(elementsContext.texts).map((text, index) => {
        const name = `${text.name}-${index + 1}`;
        return (
          <LayerItem
            key={name}
            name={name}
            showProps={() => setCurrentElement(text)}
            selected={currentElement === text}
            icon={<EditIcon {...ICON_OPTIONS} />}
          />
        );
      })}
      {Object.values(elementsContext.sprites).map((sprite, index) => {
        const name = `${sprite.name}-${index + 1}`;
        return (
          <LayerItem
            key={name}
            name={name}
            showProps={() => setCurrentElement(sprite)}
            selected={currentElement === sprite}
            icon={<StarIcon {...ICON_OPTIONS} />}
          />
        );
      })}
      {Object.values(elementsContext.scripts).map((element, index) => {
        const name = `${element.animationName}:script-${index + 1}`;
        return (
          <LayerItem
            key={name}
            name={name}
            showProps={() => setCurrentElement(element)}
            selected={currentElement === element}
            icon={<AttachmentIcon {...ICON_OPTIONS} />}
          />
        );
      })}
    </Container>
  );
}
