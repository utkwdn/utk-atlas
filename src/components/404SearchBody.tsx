import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import SiteSearch from './404SiteSearch';

interface Props {
  displayTitle?: boolean;
}

const SearchModalBody = ({ displayTitle = true }: Props): JSX.Element => (
  <div className="modal-body">
    <div className="container-xxl">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-8" style={{ padding: 0 }}>
          <Tab.Container id="left-tabs-example" defaultActiveKey="main">
            <Nav
              variant="pills"
              className="nav nav-pills nav-tabs justify-content-center justify-content-lg-start"
              defaultActiveKey="main"
            >
              <Nav.Item>
                <Nav.Link eventKey="main">Search www.utk.edu</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="events">Events</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="news">News</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="directory">Directory</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/alpha">A-Z Index</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="https://maps.utk.edu">Maps</Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content>
              <Tab.Pane eventKey="main" className="search-tab-pane">
                <SiteSearch />
              </Tab.Pane>
              <Tab.Pane eventKey="events" className="search-tab-pane">
                <div>
                  <form
                    className="form-inline hidden-print mt-4"
                    id="events-searchbox-form"
                    action="https://calendar.utk.edu/search"
                  >
                    <div className="mb-3 input-group">
                      <label
                        className="sr-only visually-hidden"
                        htmlFor="q-events"
                      >
                        Search
                      </label>
                      <input
                        type="search"
                        className="form-control"
                        title="Search events"
                        placeholder="Example: Orientation, Art Show, Yoga Session"
                        name="search"
                        id="q-events"
                      />
                      <button type="submit" className="btn btn-utlink">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="white"
                          className="bi bi-search"
                          aria-hidden="true"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>{' '}
                        <span className="text-white">Search</span>
                      </button>
                    </div>
                  </form>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="news" className="search-tab-pane">
                <div>
                  <form
                    className="form-inline hidden-print mt-4"
                    id="news-searchbox-form"
                    action="https://news.utk.edu/"
                  >
                    <div className="mb-3 input-group">
                      <label
                        className="sr-only visually-hidden"
                        htmlFor="q-news"
                      >
                        Search
                      </label>
                      <input
                        type="search"
                        className="form-control"
                        title="Search news"
                        placeholder="Example: Dean's List, ORNL, Capstone Project"
                        name="s"
                        id="q-news"
                      />
                      <button type="submit" className="btn btn-utlink">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="white"
                          className="bi bi-search"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>{' '}
                        <span className="text-white">Search</span>
                      </button>
                    </div>
                  </form>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="directory" className="search-tab-pane">
                <div>
                  <form
                    className="form-inline hidden-print mt-4"
                    id="dir-searchbox-form"
                    action="https://directory.utk.edu/search"
                  >
                    <div className="mb-3 input-group">
                      <label
                        className="sr-only visually-hidden"
                        htmlFor="query"
                      >
                        Search
                      </label>
                      <input
                        type="search"
                        className="form-control"
                        title="Search directory"
                        placeholder="Example: Jane Doe, NetID, email@utk.edu"
                        name="query"
                        id="search-bar"
                      />
                      <button type="submit" className="btn btn-utlink">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="white"
                          className="bi bi-search"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>{' '}
                        <span className="text-white">Search</span>
                      </button>
                    </div>
                  </form>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div>
  </div>
);

export default SearchModalBody;
