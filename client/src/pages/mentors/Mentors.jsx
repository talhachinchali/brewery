import React, { useState, useEffect } from "react";
import axios from "axios";

function Mentors() {
  const [schemes, setSchemes] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:5000/api/auth/mentors");
      setSchemes(response.data);
    }

    fetchData();
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: schemes }} />;
}

export default Mentors;