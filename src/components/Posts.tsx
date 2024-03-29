import React from 'react';
import Link from 'next/link';
import styles from 'scss/components/Posts.module.scss';
import Heading, { HeadingProps } from './Heading';
import ImageCap from './ImageCap';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: {
    node: {
      sourceUrl: string;
      title: string;
    };
  };
}
[];

interface Props {
  posts: Post[] | undefined;
  intro?: string;
  id?: string;
  heading?: string;
  headingLevel?: HeadingProps['level'];
  postTitleLevel?: HeadingProps['level'];
  bgImage?: string;
  readMoreText?: string;
}

function Posts({
  posts,
  intro,
  heading,
  bgImage,
  id,
  headingLevel = 'h1',
  postTitleLevel = 'h2',
  readMoreText = 'Read more',
}: Props): JSX.Element {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <section className={styles['posts-block']} {...(id && { id })}>
      <div className="container-xxl">
        {heading && (
          <Heading level={headingLevel} className={styles.heading}>
            {heading}
          </Heading>
        )}
        {intro && <p className={styles.intro}>{intro}</p>}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3  row-cols-xl-4 g-4">
          {posts?.map((post) => (
            <div className="col" key={post.id ?? ''}>
              <div
                className="card card-body"
                key={post.id ?? ''}
                id={`post-${post.id || ''}`}
              >
                <div>
                  <ImageCap
                    title={post?.featuredImage?.node?.title || ''}
                    bgImage={post?.featuredImage?.node?.sourceUrl || undefined}
                  />
                  <Heading level={postTitleLevel} className={styles.title}>
                    <Link
                      href={`/blog/posts/${post.slug || ''}`}
                      className="stretched-link"
                    >
                      {post.title}
                    </Link>
                  </Heading>
                  <div className={styles.excerpt}>{post?.excerpt}</div>
                </div>
              </div>
            </div>
          ))}
          {posts && posts?.length < 1 && <p>No posts found.</p>}
        </div>
      </div>
    </section>
  );
}

export default Posts;
