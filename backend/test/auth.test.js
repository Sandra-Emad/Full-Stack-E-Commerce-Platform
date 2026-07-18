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


    console.log("✅ Register Success");
    console.log(response.data);


  } catch (error) {

    console.log(
      "❌ Register Failed:"
    );

    console.log(
      error.response?.data || error.message
    );

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

    console.log(
      "JWT Token:",
      token
    );


  } catch (error) {

    console.log(
      "❌ Login Failed:"
    );

    console.log(
      error.response?.data || error.message
    );

  }

}




// 3) Protected Route Test

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

    console.log(response.data);



  } catch (error) {


    console.log(
      "❌ Profile Failed:"
    );


    console.log(
      error.response?.data || error.message
    );


  }

}




// Run All Tests

async function runTests() {

  await registerTest();

  await loginTest();

  await profileTest();

}


runTests();