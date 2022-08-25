import { AttributesBlock } from 'types/AttributesBlock';
import { UtkwdsCalendarBlockAttributes } from 'client';
import React, { useEffect } from 'react';

interface Props {
  attributes: Partial<UtkwdsCalendarBlockAttributes>;
  innerBlocks?: AttributesBlock[];
}

const Calendar = ({ attributes: { className, widgetType, place, department, group, all_types, daysAhead, numResults, keywords, featuredS, sponsoredS, matchingS, pastS, hideDescS, truncateS, htmlDescS, evImageS, evTimeS, viewAllS, newWinS, hideDropS, mustMatch, exAll_types, incStyleS, template } }: Props) => 
(
    function GetCalendar () {

        useEffect(() => {
            const script = document.createElement('script');
            script.src = {`'https://calendar.utk.edu/widget/'${widgetType ||''}'?schools=utk&venues='${place ||''}'&departments='${department ||''}'&groups='${group ||''}'&types='${all_types}'&days='${daysAhead ||''}'&num='${numResults ||''}'&tags='${keywords ||''}${featuredS ||''}${sponsoredS ||''}${matchingS ||''}${pastS ||''}${hideDescS ||''}${truncateS ||''}${htmlDescS ||''}${evImageS ||''}${evTimeS ||''}${viewAllS ||''}${newWinS ||''}${hideDropS ||''}'&match='${mustMatch ||''}'&exclude_types='${exAll_types}'&container=localist-widget-12345'${incStyleS ||''}'&template='${template ||''}`};
   
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
          }
        );
        }
 

    <div className={className || ''}>
    <div id={'localist-widget-12345'} className={'localist-widget'}></div>


    </div>
  ); 

export default Calendar;
