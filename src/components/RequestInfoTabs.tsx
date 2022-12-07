import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import SlateFormEmbed from './SlateFormEmbed';
import { useEffect, useState } from 'react';

const UNDERGRAD_ID = '03b73a18-fab9-4d73-bb2b-38eb3372937b';
const GRAD_ID = '99443a39-fc22-40a9-a28f-d81171bbbf48';

const RequestInfoTabs = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated ? (
    <Tabs className="nav nav-pills justify-content-center justify-content-lg-start">
      <Tab
        title="Undergraduate Information"
        eventKey="undergraduate"
        className="nav-item my-4"
      >
        <SlateFormEmbed
          id={UNDERGRAD_ID}
          scriptSrc={
            `https://govols.utk.edu/register/?id=${UNDERGRAD_ID}&output=embed&div=form_${UNDERGRAD_ID}` +
            (location.search.length > 1
              ? '&' + location.search.substring(1)
              : '')
          }
        />
      </Tab>
      <Tab
        title="Graduate Information"
        eventKey="graduate"
        className="nav-item my-4"
      >
        <SlateFormEmbed
          id={GRAD_ID}
          scriptSrc={
            `https://apply.gradschool.utk.edu/register/?id=${GRAD_ID}&output=embed&div=form_${GRAD_ID}` +
            (location.search.length > 1
              ? '&' + location.search.substring(1)
              : '')
          }
        />
      </Tab>
    </Tabs>
  ) : (
    <></>
  );
};

export default RequestInfoTabs;
