import { Flex, SimpleGrid } from '@chakra-ui/react';
import { BaseSettings, ButtonProp } from '@peach/components';
import { useAppContext, useElementsContext } from '@peach/contexts';
import { Spine } from '@pixi-spine/runtime-4.1';
import { useEffect } from 'react';

export type AnimationSettingsProps = {
  spine: Spine;
};

export default function AnimationSettings({ spine }: AnimationSettingsProps) {
  const { app } = useAppContext();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { spineAnimations, setCurrentElement } = useElementsContext();

  useEffect(() => {
    //
  }, [spine]);

  function playClichHandler() {
    spine.state.setAnimation(0, spine.name);
  }

  function loopClichHandler() {
    spine.state.setAnimation(0, spine.name, true);
  }

  function stopClickHandler() {
    spine.state.clearTracks();
  }

  function removeClickHandler() {
    delete spineAnimations[spine.name]; // TODO: перенести удаление в редюсер
    setCurrentElement(null);
    app.stage.removeChild(spine);
    spine.destroy();
  }

  return (
    <Flex flexDirection="column" gap="5px">
      <SimpleGrid columns={2} spacing="5px" minW={0}>
        <ButtonProp content="Play animation" clickHandler={playClichHandler} />
        <ButtonProp content="Loop animation" clickHandler={loopClichHandler} />
        <ButtonProp content="Stop animation" clickHandler={stopClickHandler} />
        <ButtonProp content="Remove" clickHandler={removeClickHandler} />
      </SimpleGrid>
      <BaseSettings element={spine} />
    </Flex>
  );
}
