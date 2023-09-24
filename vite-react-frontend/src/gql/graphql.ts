/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export enum AssessmentLevel {
  NotAssessed = 'NOT_ASSESSED',
  PartiallySatisfied = 'PARTIALLY_SATISFIED',
  Satisfied = 'SATISFIED'
}

export type CompletionChunk = {
  __typename?: 'CompletionChunk';
  isLast: Scalars['Boolean']['output'];
  text: Scalars['String']['output'];
};

export type ControlCategory = {
  __typename?: 'ControlCategory';
  id: Scalars['ID']['output'];
  objectives?: Maybe<Array<Maybe<Objective>>>;
  sectionIdentifier: Scalars['String']['output'];
  title: Scalars['String']['output'];
  version?: Maybe<Scalars['String']['output']>;
};

export type ControlMapping = {
  __typename?: 'ControlMapping';
  assessment: AssessmentLevel;
  controlReference?: Maybe<ControlReference>;
  details: Scalars['String']['output'];
  evidenceCreator: Scalars['String']['output'];
};

export type ControlReference = {
  __typename?: 'ControlReference';
  factorType: FactorType;
  id: Scalars['ID']['output'];
  levels: Array<Level>;
  name: Scalars['String']['output'];
  sectionIdentifier: Scalars['String']['output'];
  specification: Scalars['String']['output'];
  topics: Array<Scalars['String']['output']>;
};

export type Evidence = {
  __typename?: 'Evidence';
  controlMappings?: Maybe<Array<Maybe<ControlMapping>>>;
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type EvidenceInput = {
  text: Scalars['String']['input'];
  url?: InputMaybe<Scalars['String']['input']>;
};

export enum FactorType {
  Organizational = 'ORGANIZATIONAL',
  Regulatory = 'REGULATORY',
  System = 'SYSTEM'
}

export type Level = {
  __typename?: 'Level';
  authoritativeSourceMapping: Array<Scalars['String']['output']>;
  implementationExample: Scalars['String']['output'];
  level: Scalars['Int']['output'];
  organizationalFactors: Array<Scalars['String']['output']>;
  regulatoryFactors: Array<Scalars['String']['output']>;
  systemFactors: Array<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addGoogleDocLinkToOrg?: Maybe<Organization>;
  createEvidence?: Maybe<Evidence>;
  createOrganization?: Maybe<Organization>;
};


export type MutationAddGoogleDocLinkToOrgArgs = {
  googleDocLink: Scalars['String']['input'];
  organizationId: Scalars['ID']['input'];
};


export type MutationCreateEvidenceArgs = {
  input?: InputMaybe<EvidenceInput>;
};


export type MutationCreateOrganizationArgs = {
  input?: InputMaybe<OrganizationInput>;
};

export type Objective = {
  __typename?: 'Objective';
  controlReferences: Array<ControlReference>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  sectionIdentifier: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type OrgContextItem = {
  __typename?: 'OrgContextItem';
  title: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type OrgContextItemInput = {
  title: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type Organization = {
  __typename?: 'Organization';
  context?: Maybe<Array<Maybe<OrgContextItem>>>;
  googleDocLink?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type OrganizationInput = {
  context?: InputMaybe<Array<InputMaybe<OrgContextItemInput>>>;
  name: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  allControlCategories: Array<ControlCategory>;
  getControlCategory?: Maybe<ControlCategory>;
  getEvidence?: Maybe<Evidence>;
  getOrganization?: Maybe<Organization>;
};


export type QueryGetControlCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetEvidenceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetOrganizationArgs = {
  id: Scalars['ID']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  genericCompletion?: Maybe<CompletionChunk>;
  testSubscription: Scalars['String']['output'];
};


export type SubscriptionGenericCompletionArgs = {
  prompt: Scalars['String']['input'];
};

export type AllControlCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllControlCategoriesQuery = { __typename?: 'Query', allControlCategories: Array<{ __typename?: 'ControlCategory', sectionIdentifier: string, id: string, title: string, objectives?: Array<{ __typename?: 'Objective', sectionIdentifier: string, id: string, title: string, controlReferences: Array<{ __typename?: 'ControlReference', sectionIdentifier: string, id: string, name: string, specification: string }> } | null> | null }> };


export const AllControlCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allControlCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allControlCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sectionIdentifier"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"objectives"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sectionIdentifier"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"controlReferences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sectionIdentifier"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"specification"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AllControlCategoriesQuery, AllControlCategoriesQueryVariables>;