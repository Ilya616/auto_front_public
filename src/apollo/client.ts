import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Создаем тип для env переменных для TypeScript
interface ImportMetaEnv {
  readonly VITE_BACK_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export const createApolloClient = () => {
  const httpLink = createHttpLink({
    uri: `${import.meta.env.VITE_BACK_API}/graphql`,
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;