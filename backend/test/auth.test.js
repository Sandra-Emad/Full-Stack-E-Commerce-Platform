import axios from "axios";

const API_URL = "http://localhost:3000/api";

const testUser = {
  name: "Sandra Test",
  email: "sandra_test@test.com",
  password: "12345678",
};

let token = "";

// 1) Register Test

async function registerTest() {
  try {
    const response = await axios.post(
      `${API_URL}/auth/register`,
      testUser
    );

    console.log("\n✅ Register Success");
    console.log(response.status);
    console.log(response.data);
  } catch (error) {
    console.log("\n❌ Register Failed");

    console.log("Status:", error.response?.status);
    console.log("Response:", error.response?.data);
    console.log("Message:", error.message);
  }
}

// 2) Login Test

async function loginTest() {
  try {
    const response = await axios.post(
      `${API_URL}/auth/login`,
      {
        email: testUser.email,
        password: testUser.password,
      }
    );

    token = response.data.token;

    console.log("\n✅ Login Success");
    console.log("Status:", response.status);
    console.log("JWT Token:", token);
  } catch (error) {
    console.log("\n❌ Login Failed");

    console.log("Status:", error.response?.status);
    console.log("Response:", error.response?.data);
    console.log("Message:", error.message);
  }
}

// 3) Protected Profile Test

async function profileTest() {
  try {
    const response = await axios.get(
      `${API_URL}/users/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("\n✅ Protected Profile Success");
    console.log("Status:", response.status);
    console.log(response.data);
  } catch (error) {
    console.log("\n❌ Profile Failed");

    console.log("Status:", error.response?.status);
    console.log("Response:", error.response?.data);
    console.log("Message:", error.message);
  }
}

// Run All Tests

async function runTests() {
  console.log("=================================");
  console.log("Starting Authentication Tests");
  console.log("=================================");

  await registerTest();

  await loginTest();

  await profileTest();

  console.log("\n=================================");
  console.log("Authentication Tests Finished");
  console.log("=================================");
}

runTests();