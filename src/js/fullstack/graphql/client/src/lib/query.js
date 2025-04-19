import { gql } from "@apollo/client";

export const TRACKS = gql`
  query GetTasks {
    tracksForHome {
      id
      title
      thumbnail
      length
      modulesCount
      author {
        id
        name
        avatar
      }
    }
  }
`;
