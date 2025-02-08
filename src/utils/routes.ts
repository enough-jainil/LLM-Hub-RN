import { resourceBlocks } from "../data/resources";

// Helper function to slugify strings
const slugify = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[?]/g, "") // Remove question marks
    .replace(/[^a-z0-9-\s]/g, "") // Remove special characters except hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim(); // Remove leading/trailing spaces
};

// Define routes for the application
export const routes = {
  // Generate a resource detail route for React Navigation
  resourceDetail: (tag: string, tag2: string | undefined, name: string) => {
    const block = resourceBlocks.find(
      (block) =>
        block.tag === tag && (block.tag2 === tag2 || !tag2) && block.title
    );

    const slugifiedTitle = slugify(block?.title || "");
    const slugifiedTag = slugify(tag2 || tag);
    const slugifiedName = slugify(name);

    // This path format is meant for React Navigation
    return {
      screen: "ResourceDetail",
      params: {
        title: slugifiedTitle,
        tag2: slugifiedTag,
        name: slugifiedName,
      },
    };
  },
};

export const routeUtils = {
  decodePath: (
    title: string | undefined,
    tag2: string | undefined,
    name: string | undefined
  ) => {
    return {
      decodedTitle: decodeURIComponent(title || "").toLowerCase(),
      decodedTag2: decodeURIComponent(tag2 || "").toLowerCase(),
      decodedName: decodeURIComponent(name || "").toLowerCase(),
    };
  },

  findBlockAndResource: (
    decodedTitle: string,
    decodedTag2: string,
    decodedName: string
  ) => {
    const block = resourceBlocks.find((block) => {
      const slugifiedTitle = slugify(block.title);
      const slugifiedTag2 = slugify(block.tag2 || block.tag);
      return slugifiedTitle === decodedTitle && slugifiedTag2 === decodedTag2;
    });

    const resource = block?.resources.find(
      (r) => slugify(r.name) === decodedName
    );

    return { block, resource };
  },
};
