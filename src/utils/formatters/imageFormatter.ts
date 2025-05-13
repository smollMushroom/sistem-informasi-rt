const imageFormater = (imageString: string) => {
  const match = imageString.match(/src="([^"]+)"/);
  const imageSrc = match ? match[1] : null;
  return imageSrc
}

export default imageFormater;