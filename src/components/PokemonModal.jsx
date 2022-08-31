import {
  Box,
  Center,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tag,
  Text,
  Wrap,
} from "@chakra-ui/react";

const PokeTags = ({ keyName, arr, color }) => {
  return (
    <Wrap align="center" spacing="8px" mt="16px">
      <Text color={`${color}.900`} fontWeight="semibold">
        {keyName}
      </Text>
      {arr.map((v) => (
        <Tag
          key={v}
          size="lg"
          bg={`${color}.300`}
          color={`${color}.900`}
          borderRadius="full"
        >
          {v}
        </Tag>
      ))}
    </Wrap>
  );
};

const PokemonModal = ({ pokemon, isOpen, onClose, color }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{pokemon.name}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text color={`${color}.700`} fontWeight="medium">
            ID: {pokemon.id}
          </Text>
          <Text color={`${color}.700`} fontWeight="medium" mt="8px">
            Height: {pokemon.height}
          </Text>
          <Text color={`${color}.700`} fontWeight="medium" mt="8px">
            Base Experience: {pokemon.baseExperience}
          </Text>
          <Center m="48px">
            <Image
              maxH="150px"
              src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
            />
          </Center>
          <PokeTags keyName="Abilities" color={color} arr={pokemon.abilities} />
          <PokeTags keyName="Forms" color={color} arr={pokemon.forms} />
          <PokeTags keyName="Types" color={color} arr={pokemon.types} />
          <PokeTags keyName="Moves" color={color} arr={pokemon.moves} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PokemonModal;
