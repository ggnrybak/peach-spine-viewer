import { Flex } from '@chakra-ui/react';
import { AssetsPanel, LayersPanel, PropertiesPanel, Scene, ToolBar } from '@peach/components';
import { useThemeContext } from '@peach/contexts';

const FRAME = '0 0 1px 0';

export default function Main() {
  const { textColor, mainColor, mainColorHover } = useThemeContext();
  return (
    <Flex flexDirection="column" h="100vh" color={textColor} bg={mainColor}>
      <Flex h="48px" flexShrink={0} boxShadow={FRAME}>
        <ToolBar />
      </Flex>
      <Flex flex={1} minH={0} overflow="hidden">
        <Flex flexBasis="20vw" minW="200px" minH={0} flexDirection="column" boxShadow={FRAME}>
          <AssetsPanel />
        </Flex>
        <Flex flexGrow="1" bg={mainColorHover} boxShadow={FRAME}>
          <Scene />
        </Flex>
        <Flex flexBasis="20vw" minW="200px" minH={0} flexDirection="column" boxShadow={FRAME}>
          <Flex flex="0 0 33.3%" minH={0} overflow="hidden" borderBottomWidth="1px">
            <LayersPanel />
          </Flex>
          <Flex flex={1} minH={0} overflow="hidden">
            <PropertiesPanel />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
