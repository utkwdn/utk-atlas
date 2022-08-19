import { Block } from 'client';
import BlockRouter from 'components/BlockRouter';

interface Props {
  innerBlocks?: Partial<Block>[];
  /** For a real block, would import the `attributes` type from `'client'` */
  attributes: { foo: string; bar?: string };
}

const Test = ({ attributes, innerBlocks }: Props) => (
  <div>
    <p>{attributes.foo}</p>

    {attributes.bar && <p>{attributes.bar}</p>}

    {!!innerBlocks?.length &&
      innerBlocks.map((block, i) => <BlockRouter block={block} key={i} />)}
  </div>
);

export default Test;
