export const mapPokemonData = (pokeData) => {
  return pokeData
    .filter((p) => p != null)
    .map((pok) => ({
      name: pok?.species.name.capitalize(),
      abilities: pok?.abilities.map((a) => a.ability.name.capitalize()),
      types: pok?.types.map((t) => t.type.name.capitalize()),
      moves: pok?.moves.map((m) => m.move.name.capitalize()),
      forms: pok?.forms.map((f) => f.name.capitalize()),
      id: pok?.id,
      height: pok?.height,
      baseExperience: pok?.base_experience,
    }));
};
