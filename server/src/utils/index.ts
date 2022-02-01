export const generateCode = (): string => {
  let code = '';
  const characters = '0123456789';
  for (let i = 0; i < 5; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};
