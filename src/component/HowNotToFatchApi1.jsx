import React, { useEffect, useState } from "react";

const HowNotToFatchApi1 = () => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const[error,setError]=useState("");
  useEffect(() => {
    // const api="https://jsonplaceholder.typicode.com/posts"
    const api = "https://pokeapi.co/api/v2/pokemons/squirtle";
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setApiData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Data Loading ...</div>;
  }
  if(error){
    return(
      <div>
        <h1>Error: {error.message}</h1>
      </div>
    )
  }

  return (
    <>
      <div>
        {apiData.name}
        <img
          src={apiData.sprites.other.dream_world.front_default}
          alt=""
          height="300px"
          width="300px"
        />
      </div>
    </>
  );
};

export default HowNotToFatchApi1;
