import { getNextStaticProps } from '@faustjs/next';
import { client, OrderEnum, PostObjectsConnectionOrderbyEnum } from 'client';
import { Footer, Header, Hero, Pagination } from 'components';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

const POSTS_PER_PAGE = 100;

export default function Page() {
  const { useQuery, usePaginatedQuery } = client;
  const generalSettings = useQuery().generalSettings;

    const alphaIndex = useQuery().allAToZ({
      first: 1000,
      where:{
        orderby:[ {
          field: PostObjectsConnectionOrderbyEnum.TITLE,
          order: OrderEnum.ASC
        } ]
      }
    });

   console.log(alphaIndex?.pageInfo);

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>A-Z Index - {generalSettings.title}</title>
      </Head>

      <Hero title="A-Z Index" />

      <main className="content content-single">
        <div className="wrap">
         

        <div className='table-responsive'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Site</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
            {alphaIndex.nodes.map((this_alpha) => (
              <tr>
                <td><a href={this_alpha.aToZFields.url}>
                  <strong>{this_alpha.title()}</strong>
                  <br />
                  <small className='utsmokey alpha-link'>{this_alpha.aToZFields.url}</small>
                </a></td>
                <td className='alph-cat'>
                  <small>
                    {this_alpha.aToZCategories().nodes.map((this_cat) => (
                      <a className='utsmokey'>{this_cat.name}</a> 
                    ))}
                  </small>
                </td>
              </tr>
            ) ) }
            </tbody>
          </table>
        </div>

        </div>
      </main>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
  });
}
