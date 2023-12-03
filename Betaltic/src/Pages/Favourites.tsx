// components/Favourites.tsx
import React, { useEffect, useState } from "react";
import { data } from "./Home";
import axios from "axios";
import { Button, Divider, useToast } from "@chakra-ui/react";
const Favourites: React.FC<FavoritesProps> = ({
  favorites,
  setModalOpen,
  setSelectedFavorite,
}) => {
  const [val, setVal] = useState<data[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const toast = useToast();
  const getData = async () => {
    setLoading(true);
    try {
      let res = await axios.get(`http://localhost:8080/favourite`);
      setVal(res.data);
      setLoading(false);
    } catch (err) {
      console.log("err", err);
      setError(false);
    }
  };
  const handleDelete = async (id: Number) => {
    setLoading(true);
    try {
      let res = await axios.delete(`http://localhost:8080/favourite/${id}`);
      toast({
        title: "Delete Successfull.",
        description: `${id} Delete Successfull`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      getData();
    } catch (err) {
      console.log("err", err);
      setError(false);
    }
  };
  useEffect(() => {
    getData();
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

interface FavoritesProps {
  favorites: string[];
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedFavorite: React.Dispatch<React.SetStateAction<string | null>>;
}

export default Favourites;
