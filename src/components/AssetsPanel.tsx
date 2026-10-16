/* eslint-disable @typescript-eslint/unbound-method */
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import { PanelsTitel } from '@peach/components';
import { useAppContext, useElementsContext, useThemeContext } from '@peach/contexts';
import { PropsWithChildren, useEffect, useState } from 'react';

function AssetCategory({ name, children, bold = false }: PropsWithChildren<{ name: string; bold?: boolean }>) {
  return (
    <AccordionItem
      borderTopWidth="1px"
      borderBottomWidth="1px"
      borderLeftWidth={0}
      borderRightWidth={0}
      borderRadius={0}
      mb={2}
      overflow="hidden"
    >
      <AccordionButton px={3} py={2}>
        <Box flex="1" textAlign="left" fontWeight={bold ? 'bold' : 'normal'} overflowWrap="anywhere">
          {name}
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel px={2} pt={1} pb={2}>
        {children}
      </AccordionPanel>
    </AccordionItem>
  );
}

export default function AssetsPanel() {
  const { assets } = useAppContext();
  const { addAnimation, addSprite, addBitmapText, addText } = useElementsContext();
  const { mainColorHover } = useThemeContext();
  const [bitmapContent, setBitmapContent] = useState('');
  const [textContent, setTextContent] = useState('');
  const [systemFont, setSystemFont] = useState('');
  const [loadedFont, setLoadedFont] = useState('');
  const skeletons = assets.getSkeletonDatas();
  const textures = assets.getTextures();
  const bitmapFonts = assets.getBitmapFonts();
  const webFonts = assets.getWebFonts();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const categories = [
    ...(skeletons.length ? ['Animations'] : []),
    ...(textures.length ? ['Textures'] : []),
    ...(bitmapFonts.length ? ['BitmapText'] : []),
    ...(webFonts.length ? ['Text'] : []),
  ];
  const animationCount = skeletons.reduce((count, [, skeleton]) => count + skeleton.animations.length, 0);

  useEffect(() => {
    if (skeletons.length) {
      setExpandedCategories((previous) => (previous.includes('Animations') ? previous : [...previous, 'Animations']));
    }
  }, [skeletons]);

  const itemStyle = {
    variant: 'ghost',
    width: '100%',
    height: 'auto',
    minH: '32px',
    py: 2,
    justifyContent: 'flex-start',
    whiteSpace: 'normal',
    textAlign: 'left',
    overflowWrap: 'anywhere',
    _hover: { bg: mainColorHover },
  } as const;

  return (
    <Container h="100%" overflowY="auto">
      <PanelsTitel>assets</PanelsTitel>
      <Accordion
        allowMultiple
        index={categories.flatMap((category, index) => (expandedCategories.includes(category) ? [index] : []))}
        onChange={(indices) => {
          const selectedIndices = Array.isArray(indices) ? indices : [indices];
          setExpandedCategories(selectedIndices.map((index) => categories[index]));
        }}
      >
        {skeletons.length > 0 && (
          <AssetCategory name={`Animations (${skeletons.length}/${animationCount})`}>
            <Accordion allowMultiple>
              {skeletons.map(([name, skeleton]) => (
                <AssetCategory key={name} name={name} bold>
                  {skeleton.animations.map(({ name: animation }) => (
                    <Button
                      key={animation}
                      {...itemStyle}
                      minH="24px"
                      px={2}
                      py={0.5}
                      fontSize="sm"
                      fontWeight="normal"
                      lineHeight="20px"
                      onClick={() => addAnimation([animation, skeleton])}
                    >
                      {animation}
                    </Button>
                  ))}
                </AssetCategory>
              ))}
            </Accordion>
          </AssetCategory>
        )}
        {textures.length > 0 && (
          <AssetCategory name="Textures">
            {textures.map(([name, texture]) => (
              <Button key={name} {...itemStyle} onClick={() => addSprite([name, texture])}>
                {name}
              </Button>
            ))}
          </AssetCategory>
        )}
        {bitmapFonts.length > 0 && (
          <AssetCategory name="BitmapText">
            <VStack align="stretch" spacing={2}>
              <Input
                aria-label="BitmapText content"
                placeholder="Enter text"
                value={bitmapContent}
                onChange={(event) => setBitmapContent(event.currentTarget.value)}
              />
              {bitmapFonts.map((font) => (
                <Button
                  key={font}
                  {...itemStyle}
                  isDisabled={!bitmapContent.length}
                  onClick={() => addBitmapText([bitmapContent, font])}
                >
                  {font}
                </Button>
              ))}
            </VStack>
          </AssetCategory>
        )}
        {webFonts.length > 0 && (
          <AssetCategory name="Text">
            <VStack align="stretch" spacing={2}>
              <Input
                aria-label="Text content"
                placeholder="Enter text"
                value={textContent}
                onChange={(event) => setTextContent(event.currentTarget.value)}
              />
              {webFonts.length > 0 && (
                <Select
                  aria-label="Uploaded font"
                  placeholder="Select uploaded font"
                  value={loadedFont}
                  onChange={(event) => setLoadedFont(event.currentTarget.value)}
                >
                  {webFonts.map((font) => (
                    <option key={font} value={font}>
                      {font}
                    </option>
                  ))}
                </Select>
              )}
              <Input
                aria-label="System font"
                placeholder="System font (e.g. Arial)"
                value={systemFont}
                onChange={(event) => setSystemFont(event.currentTarget.value)}
              />
              <Button
                variant="custom"
                isDisabled={!textContent.length}
                onClick={() => addText([textContent, loadedFont || systemFont])}
              >
                Add text
              </Button>
            </VStack>
          </AssetCategory>
        )}
      </Accordion>
    </Container>
  );
}
