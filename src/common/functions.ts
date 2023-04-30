//#Supporteed from Source https://bit.ly/2neWfJ2
export const generateRandomHexaColor = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
  };
  