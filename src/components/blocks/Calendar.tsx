import { AttributesBlock } from 'types/AttributesBlock';
import { UtkwdsCalendarBlockAttributes } from 'client';
import React, { useEffect } from 'react';
import Test from './Test';

interface Props {
  attributes: Partial<UtkwdsCalendarBlockAttributes>;
  innerBlocks?: AttributesBlock[];
  
}

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
    template,
    topic,
    audience,
    exType,
    exTopic,
    exAudience,
  }}: Props) => 
 (

  // Do the need to be added as attributes in the plugin? – like slug from alerts?
  // const all_types = {`${widgetType || ''}','${topic || ''}','${audience || ''}`};
  // const exAll_types = {`${exType}','${exTopic}','${exAudience}`};

   useEffect(() => {
    const calendarUrl = document.createElement('script');
    calendarUrl.src = {`'https://calendar.utk.edu/widget/' ${widgetType ||''}'?schools=utk&venues='${place ||''}'&departments='${department ||''}'&groups='${group ||''}'&types='${all_types}'&days='${daysAhead ||''}'&num='${numResults ||''}'&tags='${keywords ||''}${featuredS ||''}${sponsoredS ||''}${matchingS ||''}${pastS ||''}${hideDescS ||''}${truncateS ||''}${htmlDescS ||''}${evImageS ||''}${evTimeS ||''}${viewAllS ||''}${newWinS ||''}${hideDropS ||''}'&match='${mustMatch ||''}'&exclude_types='${exAll_types}'&container=localist-widget-12345'${incStyleS ||''}'&template='${template ||''}`};

    document.body.appendChild(calendarUrl);
  });

  <div className={className || ''}>
  <div id={'localist-widget-12345'} className={'localist-widget'}>
    
  </div>
</div>
  );

export default Calendar;