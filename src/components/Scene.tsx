import { Button, Flex } from '@chakra-ui/react';
import { useAppContext, useElementsContext } from '@peach/contexts';
import { useEffect, useRef, useState } from 'react';

const MIN_ZOOM = 0.1;
const MAX_ZOOM = 5;

export default function Scene() {
  const ref = useRef<HTMLDivElement>(null);
  const { app } = useAppContext();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { clearElements } = useElementsContext();
  const [zoom, setZoom] = useState(1);

  function resetZoom() {
    app.stage.scale.set(1);
    app.stage.position.set(0);
    setZoom(1);
  }

  function resize() {
    /* при изменении размеров окна, флекс-контейнер не уменьшается из-за вложенного элемента,
    поэтому размеры элемента заведомо устанавливаются меньше флекс-контейнера*/
    app.cancelResize();
    app.view.width = 0;
    app.view.height = 0;
    app.resize();
  }

  useEffect(() => {
    if (!ref.current) return;
    app.resizeTo = ref.current;
    ref.current.appendChild(app.view);
    const canvas = app.view;

    function wheelHandler(event: WheelEvent) {
      event.preventDefault();
      const bounds = canvas.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;

      const x = ((event.clientX - bounds.left) / bounds.width) * app.screen.width;
      const y = ((event.clientY - bounds.top) / bounds.height) * app.screen.height;
      const delta =
        event.deltaY *
        (event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? 16
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
          ? app.screen.height
          : 1);
      const previousZoom = app.stage.scale.x;
      const nextZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, previousZoom * Math.exp(-delta * 0.001)));
      const ratio = nextZoom / previousZoom;

      app.stage.position.set(x - (x - app.stage.x) * ratio, y - (y - app.stage.y) * ratio);
      app.stage.scale.set(nextZoom);
      setZoom(nextZoom);
    }

    canvas.addEventListener('wheel', wheelHandler, { passive: false });
    window.addEventListener('resize', resize);
    return () => {
      canvas.removeEventListener('wheel', wheelHandler);
      window.removeEventListener('resize', resize);
      app.view.remove();
      app.destroy();
    };
  }, [app, ref]);

  return (
    <Flex position="relative" flexBasis="100%" minW={0} minH={0} overflow="hidden">
      <Flex ref={ref} flex={1} minW={0} minH={0} overflow="hidden" />
      <Button position="absolute" left={3} bottom={3} size="sm" onClick={clearElements}>
        Clear
      </Button>
      <Button
        position="absolute"
        right={3}
        bottom={3}
        size="sm"
        aria-label="Reset scene zoom to 100%"
        title="Reset zoom to 100%"
        onClick={resetZoom}
      >
        {Math.round(zoom * 100)}%
      </Button>
    </Flex>
  );
}
