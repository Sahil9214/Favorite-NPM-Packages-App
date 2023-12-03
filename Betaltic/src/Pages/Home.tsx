// components/Home.tsx
import axios from "axios";
import { Button, Divider, useToast } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export  interface data {
  id: Number;
  name: String;
  version: String;
  description: String;
  author: String;
  downloads: Number | String;
}
const Home: React.FC<HomeProps> = ({ handleAddToFavorite }) => {
  const [val, setVal] = useState<data[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const toast = useToast();
  const handleDelete = async (id: Number) => {
    try {
      let res = await axios.delete(`http://localhost:8080/packages/${id}`);
      toast({
        title: "Delete Successfull.",
        description: `${id} Delete Successfull`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      action();
    } catch (err) {
      console.log("err", err);
    }
  };
  const handleFavouritesData = async (el: data) => {
    try {
      let res = await axios.post(`http://localhost:8080/favourite`, el);
      console.log("res",res.data)
    } catch (err) {
      console.log("err", err);
    }
  };

  const action = async () => {
    setLoading(true);
    setError(false); // Reset error state when initiating a new request
    try {
      let res = await axios(`http://localhost:8080/packages`);
      setVal(res.data);
    } catch (err) {
      console.error("Error occurred:", err);
      setError(true);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  useEffect(() => {
    action();
  }, []);
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
        }}
      >
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error occurred</div>
        ) : (
          val.map((el) => (
            <div
              style={{
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
                padding: "12px",
              }}
            >
              <h3
                style={{
                  fontWeight: "900",
                  fontStyle: "italic",
                  textAlign: "center",
                }}
              >
                {el.name}
              </h3>
              <h4
                style={{
                  fontWeight: "600",
                  fontStyle: "italic",
                  textAlign: "center",
                }}
              >
                {el.version}
              </h4>
              <h4
                style={{
                  fontWeight: "600",
                  fontStyle: "italic",
                  textAlign: "center",
                }}
              >
                {el.description}
              </h4>
              <h4
                style={{
                  fontWeight: "600",
                  fontStyle: "italic",
                  textAlign: "center",
                }}
              >
                {el.author}
              </h4>
              <br />
              <Divider />
              <br />
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Button onClick={() => handleFavouritesData(el)}>
                  Add favouirtes
                </Button>
                <Button>Add</Button>
                <Button onClick={() => handleDelete(el.id)}>Delete</Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

interface HomeProps {
  handleAddToFavorite: (packageName: string) => void;
}

export default Home;
