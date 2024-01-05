function capitalizeName(name) {
  if (name) {
    const firstChar = name[0].toUpperCase();
    const substring = name.substring(1);
    return firstChar + substring;
  } else {
    return 'Loading...';
  }
}

export default capitalizeName;
