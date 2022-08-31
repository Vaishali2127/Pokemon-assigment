import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { FilterBar, PokemonCard } from "../components";
import { mapPokemonData } from "../utils/mapper";

const Home = () => {
  const [urls, setUrls] = useState({
    next: "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0",
    previous: null,
  });
  const [pokemons, setPokemons] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPokemons(urls.next);
  }, []);

  const fetchPokemons = async (pokUrl, isByType) => {
    try {
      setLoading(true);
      const response = await fetch(pokUrl);
      const data = await response.json();

      console.log(data);

      const promises = data[isByType ? "pokemon" : "results"].map(
        async ({ url }) => {
          try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
          } catch (error) {
            console.log(error);
          }
        }
      );

      const pokeData = await Promise.all(promises);
      const pokemons = mapPokemonData(pokeData);

      setPokemons(pokemons);
      setLoading(false);
      if (!isByType) setUrls({ next: data.next, previous: data.previous });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (prop) => {
    fetchPokemons(urls[prop]);
  };

  const handleSearch = () => {};

  const handleFilter = (e) => {
    console.log(e.target.value);
    if (e.target.value) {
      fetchPokemons(e.target.value, true);
    } else {
      fetchPokemons(urls.next);
    }
  };

  return (
    <Container maxW="1200px" p={4}>
      <FilterBar handleSearch={handleSearch} handleFilter={handleFilter} />
      <Heading mt="48px">Your Results</Heading>
      {loading ? (
        <Center h="50vh">
          <Spinner size="lg" />
        </Center>
      ) : (
        <Box>
          <SimpleGrid
            columns={[2, 3, 4]}
            spacing="16px"
            wrap="wrap"
            justifyContent="space-between"
            mt="24px"
          >
            {pokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </SimpleGrid>
          <Center mt="32px">
            <Button
              disabled={!urls.previous}
              onClick={() => handleClick("previous")}
            >
              Previous
            </Button>
            <Button
              disabled={!urls.next}
              onClick={() => handleClick("next")}
              ml="16px"
              colorScheme="blue"
            >
              Next
            </Button>
          </Center>
        </Box>
      )}
    </Container>
  );
};

export default Home;
