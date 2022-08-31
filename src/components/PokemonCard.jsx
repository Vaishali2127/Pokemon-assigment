import {
  Box,
  Flex,
  Image,
  Tag,
  Text,
  useDisclosure,
  Wrap,
} from "@chakra-ui/react";
import PokemonModal from "./PokemonModal";

const colors = ["orange", "red", "green", "pink", "blue"];

const PokemonCard = ({ pokemon }) => {
  const color = colors[Math.floor(Math.random() * 5)];
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      cursor="pointer"
      onClick={onOpen}
      flexDir="column"
      width="250px"
      boxShadow="lg"
      mb="16px"
      borderRadius="16px"
      bg={`${color}.100`}
      color={`${color}.900`}
    >
      <Wrap align="start" w="100%" m="8px">
        <Tag size="lg" bg={`${color}.900`} color={`${color}.100`}>
          #{pokemon.id}
        </Tag>
      </Wrap>
      <Flex flexDir="column" p="24px" alignItems="center">
        <Image
          maxH="150px"
          src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
        />
        <Text fontWeight="medium" mt="16px">
          {pokemon.name}
        </Text>
        <Wrap mt="8px">
          {pokemon.types.map((type) => (
            <Tag
              key={type}
              size="lg"
              bg={`${color}.300`}
              color={`${color}.900`}
              borderRadius="full"
            >
              {type}
            </Tag>
          ))}
        </Wrap>
      </Flex>
      {isOpen && (
        <PokemonModal
          color={color}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          pokemon={pokemon}
        />
      )}
    </Box>
  );
};

export default PokemonCard;
