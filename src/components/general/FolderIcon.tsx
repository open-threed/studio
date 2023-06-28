import { IconFolderCode, IconFolderFilled } from "@tabler/icons-react";

type FolderIconProps = {
  isOpen: boolean
}

export default function FolderIcon({ isOpen }: FolderIconProps) {
  return isOpen ? (
    <IconFolderCode className="icon" />
  ) : (
    <IconFolderFilled className="icon" />
  );
}
