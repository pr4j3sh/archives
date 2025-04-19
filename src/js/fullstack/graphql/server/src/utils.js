const mocks = {
  Query: () => ({
    tracksForHome: [...new Array(6)],
  }),
  Track: () => ({
    id: () => "track_01",
    title: () => "How to go to space",
    author: () => {
      return {
        name: "Jesh",
        avatar: "https://avatars.githubusercontent.com/u/75523737?v=4",
      };
    },
    thumbnail: () =>
      "https://res.cloudinary.com/apollographql/image/upload/v1730818804/odyssey/lift-off-api/nebula_cat_djkt9r_nzifdj.jpg",
    length: () => 234,
    modulesCount: () => 2,
  }),
};

module.exports = mocks;
