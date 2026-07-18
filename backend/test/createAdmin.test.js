import axios from "axios";


const API_URL = "http://localhost:3000/api";


async function createAdmin() {

  try {

    // Register new user

    const register = await axios.post(
      `${API_URL}/auth/register`,
      {
        name: "Admin User",
        email: "admin@test.com",
        password: "12345678"
      }
    );


    console.log("✅ Admin user created");
    console.log(register.data);



  } catch(error) {

    console.log(
      "❌ Failed"
    );

    console.log(
      error.response?.data || error.message
    );

  }

}


createAdmin();