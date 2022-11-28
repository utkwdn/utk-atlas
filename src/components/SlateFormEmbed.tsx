import { memo, useEffect, useRef } from 'react';

const TARGET_STRINGS = ['cdn.technolutions.net'];

type ScriptOrLink = HTMLScriptElement | HTMLLinkElement;

const assetsByScriptSrc = new Map<string, ScriptOrLink[]>();

const addRelatedAssetsIfNeeded = (script: HTMLScriptElement) => {
  const assets = assetsByScriptSrc.get(script.src);
  if (!assets) return;

  assets.forEach((asset) => {
    if (document.head.contains(asset)) return;
    document.head.appendChild(asset);
  });
};

const removeRelatedAssets = (script: HTMLScriptElement) => {
  if (!assetsByScriptSrc.has(script.src)) {
    const assets: ScriptOrLink[] = [];

    const allNextSiblings: ChildNode[] = [];
    let sibling: ChildNode | null = script;
    while ((sibling = sibling.nextSibling)) {
      allNextSiblings.push(sibling);
    }

    allNextSiblings.forEach((sibling) => {
      if (sibling instanceof HTMLScriptElement) {
        if (TARGET_STRINGS.some((s) => sibling.src.includes(s))) {
          return void assets.push(sibling);
        }
      } else if (sibling instanceof HTMLLinkElement) {
        if (TARGET_STRINGS.some((s) => sibling.href.includes(s))) {
          return void assets.push(sibling);
        }
      }
    });

    assetsByScriptSrc.set(script.src, assets);
  }

  (assetsByScriptSrc.get(script.src) || []).forEach((asset) => {
    asset.remove();
  });
};

interface Props {
  id: string;
  scriptSrc: string;
}

/*
  Use `memo` to ensure that once mounted, this component never re-renders (because
  its only props -- `id` and `scriptSrc` -- should never change).
  This makes it easy to ensure that the `useEffect()` hook runs only
  on component mount/unmount (even though the props are included in its dependency array).
*/
const SlateFormEmbed = memo(({ id, scriptSrc }: Props) => {
  const scriptRef = useRef<HTMLScriptElement>();

  /*
    On component-mount, load form-script, and, if necessary, re-add the extra related assets
    that it itself fetched on the first mount (this is tricky because the script is "smart"
    enough NOT to re-add those extra assets if it's already done so, and in this case we
    need to work around that "smartness"). Our solution involves a global store that attempts
    to keep track of which assets should go with which script. It probably isn't perfect,
    but in testing it's working just fine.

    On component-unmount, remove the form-script, and also remove the extra related assets.
  */
  useEffect(() => {
    if (!scriptRef.current) {
      scriptRef.current = document.createElement('script');
      scriptRef.current.src = scriptSrc;
    }

    const script = scriptRef.current;

    if (document.head.contains(script)) return;

    document.head.appendChild(script);
    addRelatedAssetsIfNeeded(script);

    return () => {
      removeRelatedAssets(script);
      script.remove();
    };
  }, [id, scriptSrc]);

  return <div id={`form_${id}`}></div>;
});

SlateFormEmbed.displayName = 'SlateFormEmbed';

export default SlateFormEmbed;
