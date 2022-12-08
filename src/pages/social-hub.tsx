import Layout from '../components/Layout';
import { client, PostObjectsConnectionOrderbyEnum, OrderEnum } from 'client';
import { GetStaticPropsContext } from 'next';
import { getNextStaticProps } from '@faustjs/next';
import { link } from 'fs/promises';

function Social() {
  const { useQuery } = client;

  const socialUnits =
    useQuery().socialUnits({
      first: 1000,
      where: {
        orderby: [
          {
            field: PostObjectsConnectionOrderbyEnum.TITLE,
            order: OrderEnum.ASC,
          },
        ],
      },
    })?.nodes || [];

  return (
    <Layout>
      <div className="card-block">
        <p className="lead text-xs-center">Social media accounts across UT.</p>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Unit Name</th>
              <th>Twitter</th>
              <th>Facebook</th>
              <th>Instagram</th>
              <th>YouTube</th>
              <th>LinkedIn</th>
            </tr>
          </thead>
          <tbody>
            {socialUnits?.map((this_unit, i) => {
              const title = this_unit?.title() || '';
              const twitterLink = this_unit?.socialUnitURLs?.twitter;
              const facebookLink = this_unit?.socialUnitURLs?.facebook;
              const instagramLink = this_unit?.socialUnitURLs?.instagram;
              const youtubeLink = this_unit?.socialUnitURLs?.youtube;
              const linkedinLink = this_unit?.socialUnitURLs?.linkedin;
              return (
                <tr>
                  <td>{title}</td>
                  <td>
                    {twitterLink ? (
                      <a href={twitterLink} target="_blank">
                        {/* <svg viewBox="0 0 100 100" className="soc-icon twitter"><use xlinkHref="#soc-twitter"></use></svg> */}
                        <img src="https://content.cms.utk.edu/wp-content/uploads/2022/11/2021-Twitter-logo-blue.png" />
                        {/* <span className="sr-only">{`${title}'s Twitter`}</span> */}
                      </a>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {facebookLink ? (
                      <a href={facebookLink} target="_blank">
                        {/* <svg viewBox="0 0 100 100" className="soc-icon facebook"><use xlinkHref="#soc-facebook"></use></svg> */}
                        <img
                          width="58"
                          src="https://content.cms.utk.edu/wp-content/uploads/2022/11/f_logo_RGB-Blue_58.png"
                        />
                        {/* <span className="sr-only">{`${title}'s Facebook`}</span> */}
                      </a>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {instagramLink ? (
                      <a href={instagramLink} target="_blank">
                        {/* <svg viewBox="0 0 100 100" className="soc-icon instagram">
                        <use xlinkHref="#soc-instagram"></use>
                      </svg> */}
                        <img src="https://content.cms.utk.edu/wp-content/uploads/2022/11/Instagram_Glyph_Gradient-copy.png" />
                        {/* <span className="sr-only">{`${title}'s Instagram`}</span> */}
                      </a>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {youtubeLink ? (
                      <a href={youtubeLink} target="_blank">
                        {/* <svg viewBox="0 0 100 100" className="soc-icon youtube"><use xlinkHref="#soc-youtube"></use></svg> */}
                        <img src="https://content.cms.utk.edu/wp-content/uploads/2022/11/yt_logo_rgb.png" />
                        {/* <span className="sr-only">{`${title}'s YouTube`}</span> */}
                      </a>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {linkedinLink ? (
                      <a href={linkedinLink} target="_blank">
                        {/* <svg viewBox="0 0 100 100" className="soc-icon linkedin"><use xlinkHref="#soc-linkedin"></use></svg> */}
                        <img src="https://content.cms.utk.edu/wp-content/uploads/2022/11/In-Blue-26@2x.png" />
                        {/* <span className="sr-only">{`${title}'s LinkedIn`}</span> */}
                      </a>
                    ) : (
                      ''
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Social;

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page: Social,
    client,
  });
}
