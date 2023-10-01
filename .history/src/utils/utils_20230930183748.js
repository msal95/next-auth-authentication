export const generateUsername = (fullName) => {
  // Remove spaces and convert to lowercase
  const cleanName = fullName.replace(/\s+/g, "").toLowerCase();

  // Extract the first 3 characters of the first name
  const firstName = cleanName.slice(0, 3);

  // Extract the first 3 characters of the last name (or less if the last name is shorter)
  const lastName = cleanName.slice(3, 6);

  // Combine the first name and last name
  const username = `${firstName}${lastName}`;

  // If the username is less than 4 characters, add random numbers to reach 4 characters
  if (username.length < 4) {
    const randomNumbers = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    return `${username}${randomNumbers}`;
  }

  // If the username is more than 6 characters, truncate it to 6 characters
  if (username.length > 6) {
    return username.slice(0, 6);
  }

  return username;
};
