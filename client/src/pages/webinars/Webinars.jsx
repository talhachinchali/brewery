import React, { useState, useEffect } from "react";
import axios from "axios";

function Webinars() {
  const [schemes, setSchemes] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/auth/webinars");
      setSchemes(response.data);
    }

    fetchData();
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: schemes }} />;
}

export default Webinars;