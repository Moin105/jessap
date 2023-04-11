const  api = async (formData) => {
    try {
      // Make a POST request to the login API endpoint with the form data
      const response = await fetch('https://phplaravel-391561-3408566.cloudwaysapps.com/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        // Handle error response from the server
        throw new Error('Failed to login');
      }
  
      // Parse the response as JSON and return it
      const data = await response.json();
      return data;
    } catch (error) {
      // Handle any errors that occur during the request
      throw new Error('Failed to login');
    }
  };
  export default api;