import { AttributesBlock } from 'types/AttributesBlock';
import { UtkwdsCalendarBlockAttributes } from 'client';
import React, { useEffect } from 'react';

interface Props {
  attributes: Partial<UtkwdsCalendarBlockAttributes>;
  innerBlocks?: AttributesBlock[];
}

const id = 'localist-widget-12345';

const Calendar = ({
  attributes: {
    className,
    widgetType,
    place,
    department,
    group,
    daysAhead,
    numResults,
    keywords,
    featuredS,
    sponsoredS,
    matchingS,
    pastS,
    hideDescS,
    truncateS,
    htmlDescS,
    evImageS,
    evTimeS,
    viewAllS,
    newWinS,
    hideDropS,
    mustMatch,
    incStyleS,
    /** 'modern', 'hill-cards', 'hill-simple-list', 'hill-list-alt', 'hill-modern', 'hill-modern-no-description', 'hill-simple-columns' */
    template,
    type,
    topic,
    audience,
    exType,
    exTopic,
    exAudience,
  },
}: Props) => {
  const all_types = [type, topic, audience].filter(Boolean).join(',');
  const exAll_types = [exType, exTopic, exAudience].filter(Boolean).join(',');
  const tags =
    (keywords || '') +
    (featuredS || '') +
    (sponsoredS || '') +
    (matchingS || '') +
    (pastS || '') +
    (hideDescS || '') +
    (truncateS || '') +
    (htmlDescS || '') +
    (evImageS || '') +
    (evTimeS || '') +
    (viewAllS || '') +
    (newWinS || '') +
    (hideDropS || '');

  const scriptSrc = `https://calendar.utk.edu/widget/${
    widgetType || 'view'
  }?schools=utk${place ? '&venues=' + place : ''}${
    department ? '&departments=' + department : ''
  }${group ? '&groups=' + group : ''}${all_types ? '&types=' + all_types : ''}${
    // number, so must account for possibility of `0`
    daysAhead !== undefined ? `&days=${daysAhead}` : ''
  }${
    // number, so must account for possibility of `0`
    numResults !== undefined ? `&num=${numResults}` : ''
  }${tags ? '&tags=' + tags : ''}${mustMatch ? '&match=' + mustMatch : ''}${
    exAll_types ? '&exclude_types=' + exAll_types : ''
  }&container=${id}${incStyleS || ''}${
    template ? '&template=' + template : ''
  }`;

  /*
    Fetch the script on mount, and delete it on unmount.

    NOTE: the script also adds a `style` element in the `<head>`, and it would be best
    to delete that on unmount also. However, its contents vary widely depending on the
    settings that are used to create the `scriptSrc`, and so there's really no way to
    guarantee that we're deleting the right `<style>` tag! It's very *likely*
    that it will be the one that comes right after the `<script>` tag in question,
    but the consequence of deleting the wrong `<style>` tag is too great IMO to warrant
    the risk. If we can put some kind of flag in the CSS that the localist widget will
    send, then we can look at the style-tag's CONTENTS to verify that we've got the right
    one. Until then, we'll have to risk leaving the `<style>` tag around, I think.
  */
  useEffect(() => {
    const script = document.createElement('script');
    script.src = scriptSrc;
    document.head.appendChild(script);

    // remove the script on unmount
    return () => {
      document.head.removeChild(script);
    };
  });

  return (
    <div className={className || ''}>
      <div id={id} className="localist-widget" />
    </div>
  );
};

export default Calendar;
