interface Props{
    text : string
}

export default function getValidRouteName({text }: Props): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\/]+/g, "-")   // spaces or slashes -> dash
    .replace(/[^a-z0-9-]/g, ""); // remove other special characters
}
