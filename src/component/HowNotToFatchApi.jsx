import React, { useEffect, useState } from "react";

const HowNotToFatchApi = () => {
  const [apiData, setApiData] = useState(null);
  useEffect(() => {
    // const api="https://jsonplaceholder.typicode.com/posts"
    const api = "https://pokeapi.co/api/v2/pokemon/squirtle";
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setApiData(data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(apiData);
  if (!apiData) {
    return <div>Data Loading ...</div>;
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

export default HowNotToFatchApi;
