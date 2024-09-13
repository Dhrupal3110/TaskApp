export const filterUniquePets = (pets) => {
    const uniquePetsMap = new Map();
    
    pets.forEach((pet) => {
      if (!uniquePetsMap.has(pet.id)) {
        uniquePetsMap.set(pet.id, pet);
      }
    });
  
    return Array.from(uniquePetsMap.values());
  };
  

// Function to generate a random light color for the chips
export const getRandomLightColor = () => {
    // Function to generate a random value for the color components
    const getRandomComponent = () => {
      // Generate a random value between 200 and 255 for lighter colors
      const min = 200;
      const max = 255;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
  
    // Generate RGB components for the color
    const r = getRandomComponent();
    const g = getRandomComponent();
    const b = getRandomComponent();
  
    // Convert RGB to HEX format
    const rgbToHex = (r, g, b) => {
      const toHex = (n) => {
        const hex = n.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };
  
    return rgbToHex(r, g, b);
  };
  