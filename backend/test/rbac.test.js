import axios from "axios";


const API_URL = "http://localhost:3000/api";


const login = async () => {

  const response = await axios.post(
    `${API_URL}/auth/login`,
    {
      email: "admin@test.com",
      password: "12345678",
    }
  );


  return response.data.token;

};



const testAdminRoute = async () => {

  try {

    const token = await login();


    const response = await axios.get(
      `${API_URL}/admin/admin-test`,
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );


    console.log("✅ Admin Access Success");
    console.log(response.data);


  } catch(error){

    console.log(
      "❌ Admin Access Failed"
    );

    console.log(
      error.response?.data
    );

  }

};



testAdminRoute();