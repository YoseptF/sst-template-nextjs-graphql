"use client"
import { FC, ReactNode } from 'react';

import {
  Client,
  createClient,
  cacheExchange,
  fetchExchange,
  Provider as UrqlProvider,
} from "urql";

const urql = createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_URL || "",
  exchanges: [cacheExchange, fetchExchange],
});

interface ClientProvidersProps {
  children: ReactNode;
}

const ClientProviders: FC<ClientProvidersProps> = ({ children }) => {
  return (
    <UrqlProvider value={urql}>{children}</UrqlProvider>
  )
};

export default ClientProviders
