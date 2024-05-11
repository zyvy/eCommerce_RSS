import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from './ctpClient.ts';

export default function testGet() {
  // Create apiRoot from the imported ClientBuilder and include your Project key
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: `${import.meta.env.VITE_PROJECT_KEY}`,
  });
  // Example call to return Project information
  // This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
  const getProject = () => apiRoot.get().execute();

  // Retrieve Project information and output the result to the log
  getProject()
    .then((data) => {
      console.log('data', data);
    })
    .catch((e) => {
      console.log('error', e);
    });

  apiRoot
    .customers()
    .get()
    .execute()
    .then((data) => {
      console.log('customers', data);
    });
}
