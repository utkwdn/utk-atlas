import { AccordionFoldBlockAttributes, Block } from 'client';
import BlockRouter from 'components/BlockRouter';

interface Props {
  attributes: AccordionFoldBlockAttributes;
  innerBlocks?: Partial<Block>[];
}

const AccordionFoldBlock = ({
  attributes: {
    className,
    collapseS,
    foldSlug,
    foldName,
    show,
    showS,
    parentID,
  },
  innerBlocks,
}: Props) => (
  // eventually use React-Bootstrap Accordion, probably

  <div className={`'accordion-item' ${className || ''}`}>
    <h2 className={'accordion-header'} id={`heading ${foldSlug || ''}`}>
      <button
        className={`'accordion-button' ${collapseS || ''}`}
        type={'button'}
        data-bs-toggle={'collapse'}
        data-bs-target={`#collapse${foldSlug || ''}`}
        aria-expanded={show}
        aria-controls={`collapse ${foldSlug || ''}`}
      >
        {foldName}
      </button>
    </h2>
    <div
      id={`collapse ${foldSlug || ''}`}
      className={`'accordion-collapse' collapse ${showS || ''}`}
      aria-labelledby={`heading ${foldSlug || ''}`}
      data-bs-paren={`# ${parentID || ''}`}
    >
      <div className={'accordion-body'}>
        {!!innerBlocks?.length &&
          innerBlocks.map((block, i) => <BlockRouter block={block} key={i} />)}
      </div>
    </div>
  </div>
);

export default AccordionFoldBlock;
