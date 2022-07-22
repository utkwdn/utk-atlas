import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import SiteSearch from './SiteSearch';

const SearchModalBody = () => (
  <div className="modal-body">
    <div className="container-xxl">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-6">
          <h1 className="text-center mt-md-5 mb-2 mb-md-5 fw-lighter">
            Search
          </h1>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-xl-8">
          <Tabs className="nav nav-pills justify-content-center justify-content-lg-start">
            <Tab title="Search utk.edu" eventKey="main" className="nav-item">
              <SiteSearch />
            </Tab>
            <Tab title="Events" eventKey="events" className="nav-item">
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
                    <button type="submit" className="btn btn-secondary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-search"
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                      </svg>{' '}
                      <span className="visually-hidden">Search</span>
                    </button>
                  </div>
                </form>
              </div>
            </Tab>
            <Tab title="News" eventKey="news" className="nav-item">
              <div>
                <form
                  className="form-inline hidden-print mt-4"
                  id="news-searchbox-form"
                  action="https://news.utk.edu/"
                >
                  <div className="mb-3 input-group">
                    <label className="sr-only visually-hidden" htmlFor="q-news">
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
                    <button type="submit" className="btn btn-secondary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-search"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                      </svg>{' '}
                      <span className="visually-hidden">Search</span>
                    </button>
                  </div>
                </form>
              </div>
            </Tab>
            <Tab title="Directory" eventKey="directory" className="nav-item">
              <div>
                <form
                  className="form-inline hidden-print mt-4"
                  id="dir-searchbox-form"
                  action="https://directory.utk.edu/search"
                >
                  <div className="mb-3 input-group">
                    <label className="sr-only visually-hidden" htmlFor="query">
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
                    <button type="submit" className="btn btn-secondary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-search"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                      </svg>{' '}
                      <span className="visually-hidden">Search</span>
                    </button>
                  </div>
                </form>
              </div>
            </Tab>
            <Tab title="More" eventKey="more" className="nav-item">
              <div className="mt-4">
                <ul>
                  <li>
                    <a href="https://www.utk.edu/alpha">A-Z Index</a>
                  </li>
                  <li>
                    <a href="https://maps.utk.edu">Map</a>
                  </li>
                </ul>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
);

export default SearchModalBody;
