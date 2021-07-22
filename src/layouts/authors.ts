export const authors = [
  {
    name: "Maximous Black",
    image: "https://github.com/maximousblk.png",
  },
  {
    name: "Maël Acier",
    image: "https://github.com/oganexon.png",
  },
  {
    name: "Tate Berenbaum",
    image: "https://github.com/t8.png",
  },
];

const defaultAuthor = authors[0];

export const getAuthor = (name: string) => {
  const author = authors.find(author => author.name === name);

  return author ?? defaultAuthor;
};
