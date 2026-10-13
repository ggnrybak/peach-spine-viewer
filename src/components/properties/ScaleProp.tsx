import { NumberTitleProp } from '@peach/components';

export type ScalePropProps = {
  value: number;
  onChange(value: number): void;
};

export default function ScaleProp(props: ScalePropProps) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { value, onChange } = props;

  return (
    <NumberTitleProp
      content="scale:"
      value={value}
      min={0}
      max={1}
      step={0.01}
      onChange={onChange}
      maxW={150}
      input
      slider
    />
  );
}
