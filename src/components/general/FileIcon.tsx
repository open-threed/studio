import { IconBrandCss3, IconFile, IconCode, IconPackage } from "@tabler/icons-react";

type FileIconProps = {
  filename: string
}

export default function FileIcon({ filename }: FileIconProps) {
  const extension = filename.slice(filename.lastIndexOf(".") + 1);
  switch (extension) {
    case "js":
      return <IconFile className="icon" />;
    case "css":
      return <IconBrandCss3 className="icon" />;
    case "json":
      return <IconCode className="icon" />;
    case "npmignore":
      return <IconPackage className="icon" />;
    default:
      return null;
  }
}
