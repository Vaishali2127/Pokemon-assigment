import { Search2Icon } from "@chakra-ui/icons";
import {
  Flex,
  Input,
  Select,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const FilterBar = ({ handleFilter, handleSearch }) => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/type");
      const data = await response.json();
      setTypes(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex justifyContent="space-between" mt="32px">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<Search2Icon color="gray.600" />}
        />
        <Input placeholder="Search..." maxW="350px" />
      </InputGroup>
      <Select
        defaultValue={null}
        onChange={handleFilter}
        maxW="250px"
        placeholder="Select Type"
      >
        {types.map((t) => (
          <option key={t.name} value={t.url}>
            {t.name}
          </option>
        ))}
      </Select>
    </Flex>
  );
};

export default FilterBar;
