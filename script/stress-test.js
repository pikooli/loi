import axios from 'axios';

const generateRandomSigner = (i) => ({
  firstName: 'John',
  lastName: `Doe-a${i}`,
  email: `panamepoul+${i}@gmail.com`,
});

const testRequest = async (i) => {
  const requestData = {
    data: {
      projectName: 'Sample Project',
      projectDescription: 'This is a test project',
      projectUrl: 'http://example.com',
      contactEmail: `zhangpas+${i}@gmail.com`,
      commitmentText: 'This is a sample commitment text',
      signer: generateRandomSigner(i),
    }
  };

  try {
    console.log('trying', JSON.stringify(requestData));
    const response = await axios.post('http://localhost:5173/api/sign-letter', requestData);
    console.log(`Response: ${response.data.success}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

const runStressTest = async (concurrentRequests) => {
  const promises = [];

  for (let i = 0; i < concurrentRequests; i++) {
    promises.push(testRequest(i));
  }

  await Promise.all(promises);
  console.log(`${concurrentRequests} requests completed.`);
};

// Run a stress test with 10 concurrent requests
runStressTest(10);