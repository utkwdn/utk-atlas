/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query FooterTools {\n    toolsItems: menuItems(where: { location: TOOLS }) {\n      nodes {\n        url\n        label\n      }\n    }\n    linksItems: menuItems(where: { location: LINKS }) {\n      nodes {\n        url\n        label\n      }\n    }\n  }\n": types.FooterToolsDocument,
    "\n  query MainNav {\n    menuItems(where: { location: PRIMARY }) {\n      nodes {\n        id\n        uri\n        url\n        title\n        parentId\n        label\n        childItems {\n          nodes {\n            label\n            id\n            url\n            uri\n          }\n        }\n      }\n    }\n  }\n": types.MainNavDocument,
    "\n  query GetAToZ {\n    allAToZ(first: 1000, where: { orderby: { field: TITLE, order: ASC } }) {\n      nodes {\n        id\n        title(format: RENDERED)\n        aToZFields {\n          tags\n          url\n        }\n      }\n    }\n  }\n": types.GetAToZDocument,
    "\n  query GetSocials {\n    socialUnits(first: 1000, where: { orderby: { field: TITLE, order: ASC } }) {\n      nodes {\n        id\n        title\n        socialUnitURLs {\n          twitter\n          facebook\n          instagram\n          youtube\n          linkedin\n        }\n      }\n    }\n  }\n": types.GetSocialsDocument,
    "\n  query GetCategoryPage($uri: String!) {\n    nodeByUri(uri: $uri) {\n      ... on Category {\n        name\n        slug\n        posts {\n          nodes {\n            id\n            title\n            slug\n            excerpt(format: RENDERED)\n            featuredImage {\n              node {\n                title\n                sourceUrl\n              }\n            }\n          }\n          pageInfo {\n            endCursor\n            startCursor\n            hasNextPage\n            hasPreviousPage\n          }\n        }\n      }\n    }\n    generalSettings {\n      title\n    }\n  }\n": types.GetCategoryPageDocument,
    "\n  query GetFrontPage {\n    pageBy(uri: \"/\") {\n      content\n      seo {\n        fullHead\n      }\n    }\n    generalSettings {\n      title\n    }\n  }\n": types.GetFrontPageDocument,
    "\n  query GetPage($databaseId: ID!, $asPreview: Boolean = false) {\n    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {\n      content\n      slug\n      seo {\n        fullHead\n      }\n      showsHeadline\n      title\n      featuredImage {\n        node {\n          sourceUrl\n        }\n      }\n    }\n    generalSettings {\n      title\n    }\n  }\n": types.GetPageDocument,
    "\n  query GetPost($databaseId: ID!, $asPreview: Boolean = false) {\n    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {\n      content\n      title\n      featuredImage {\n        node {\n          sourceUrl\n        }\n      }\n    }\n    generalSettings {\n      title\n    }\n  }\n": types.GetPostDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FooterTools {\n    toolsItems: menuItems(where: { location: TOOLS }) {\n      nodes {\n        url\n        label\n      }\n    }\n    linksItems: menuItems(where: { location: LINKS }) {\n      nodes {\n        url\n        label\n      }\n    }\n  }\n"): (typeof documents)["\n  query FooterTools {\n    toolsItems: menuItems(where: { location: TOOLS }) {\n      nodes {\n        url\n        label\n      }\n    }\n    linksItems: menuItems(where: { location: LINKS }) {\n      nodes {\n        url\n        label\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query MainNav {\n    menuItems(where: { location: PRIMARY }) {\n      nodes {\n        id\n        uri\n        url\n        title\n        parentId\n        label\n        childItems {\n          nodes {\n            label\n            id\n            url\n            uri\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query MainNav {\n    menuItems(where: { location: PRIMARY }) {\n      nodes {\n        id\n        uri\n        url\n        title\n        parentId\n        label\n        childItems {\n          nodes {\n            label\n            id\n            url\n            uri\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAToZ {\n    allAToZ(first: 1000, where: { orderby: { field: TITLE, order: ASC } }) {\n      nodes {\n        id\n        title(format: RENDERED)\n        aToZFields {\n          tags\n          url\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAToZ {\n    allAToZ(first: 1000, where: { orderby: { field: TITLE, order: ASC } }) {\n      nodes {\n        id\n        title(format: RENDERED)\n        aToZFields {\n          tags\n          url\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetSocials {\n    socialUnits(first: 1000, where: { orderby: { field: TITLE, order: ASC } }) {\n      nodes {\n        id\n        title\n        socialUnitURLs {\n          twitter\n          facebook\n          instagram\n          youtube\n          linkedin\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetSocials {\n    socialUnits(first: 1000, where: { orderby: { field: TITLE, order: ASC } }) {\n      nodes {\n        id\n        title\n        socialUnitURLs {\n          twitter\n          facebook\n          instagram\n          youtube\n          linkedin\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCategoryPage($uri: String!) {\n    nodeByUri(uri: $uri) {\n      ... on Category {\n        name\n        slug\n        posts {\n          nodes {\n            id\n            title\n            slug\n            excerpt(format: RENDERED)\n            featuredImage {\n              node {\n                title\n                sourceUrl\n              }\n            }\n          }\n          pageInfo {\n            endCursor\n            startCursor\n            hasNextPage\n            hasPreviousPage\n          }\n        }\n      }\n    }\n    generalSettings {\n      title\n    }\n  }\n"): (typeof documents)["\n  query GetCategoryPage($uri: String!) {\n    nodeByUri(uri: $uri) {\n      ... on Category {\n        name\n        slug\n        posts {\n          nodes {\n            id\n            title\n            slug\n            excerpt(format: RENDERED)\n            featuredImage {\n              node {\n                title\n                sourceUrl\n              }\n            }\n          }\n          pageInfo {\n            endCursor\n            startCursor\n            hasNextPage\n            hasPreviousPage\n          }\n        }\n      }\n    }\n    generalSettings {\n      title\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetFrontPage {\n    pageBy(uri: \"/\") {\n      content\n      seo {\n        fullHead\n      }\n    }\n    generalSettings {\n      title\n    }\n  }\n"): (typeof documents)["\n  query GetFrontPage {\n    pageBy(uri: \"/\") {\n      content\n      seo {\n        fullHead\n      }\n    }\n    generalSettings {\n      title\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPage($databaseId: ID!, $asPreview: Boolean = false) {\n    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {\n      content\n      slug\n      seo {\n        fullHead\n      }\n      showsHeadline\n      title\n      featuredImage {\n        node {\n          sourceUrl\n        }\n      }\n    }\n    generalSettings {\n      title\n    }\n  }\n"): (typeof documents)["\n  query GetPage($databaseId: ID!, $asPreview: Boolean = false) {\n    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {\n      content\n      slug\n      seo {\n        fullHead\n      }\n      showsHeadline\n      title\n      featuredImage {\n        node {\n          sourceUrl\n        }\n      }\n    }\n    generalSettings {\n      title\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPost($databaseId: ID!, $asPreview: Boolean = false) {\n    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {\n      content\n      title\n      featuredImage {\n        node {\n          sourceUrl\n        }\n      }\n    }\n    generalSettings {\n      title\n    }\n  }\n"): (typeof documents)["\n  query GetPost($databaseId: ID!, $asPreview: Boolean = false) {\n    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {\n      content\n      title\n      featuredImage {\n        node {\n          sourceUrl\n        }\n      }\n    }\n    generalSettings {\n      title\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;