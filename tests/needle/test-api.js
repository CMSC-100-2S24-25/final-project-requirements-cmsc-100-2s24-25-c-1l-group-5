import needle from 'needle';

const BASE_URL = 'http://localhost:3000/api/auth';

// Test data
const testUser = {
  fName: 'Test',
  lName: 'User',
  email: `test${Math.random().toString(36).substring(7)}@example.com`,
  password: 'test123'
};

// 1. Test User Registration
needle.post(`${BASE_URL}/register`, testUser, (err, res) => {
  if (err) {
    console.error('Registration Error:', err);
    return;
  }
  
  console.log('=== REGISTRATION TEST ===');
  console.log('Status Code:', res.statusCode);
  console.log('Response:', res.body);
  console.log('\n');

  // 2. Test Login with registered credentials
  needle.post(`${BASE_URL}/login`, {
    email: testUser.email,
    password: testUser.password
  }, (err, res) => {
    console.log('=== LOGIN TEST ===');
    console.log('Status Code:', res.statusCode);
    console.log('Response:', res.body);
  });
});