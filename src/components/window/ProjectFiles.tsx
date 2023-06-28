import TreeView, { flattenTree } from "react-accessible-treeview";
import { IconPlus } from "@tabler/icons-react";
import useModal from "../../hooks/useModal";
import useProjectFiles from "../../hooks/useProjectFiles";
import FolderIcon from "../general/FolderIcon";
import FileIcon from "../general/FileIcon";
import "../../styles/SidebarCode.css";
import { useDocumentStore } from "../../store/document";
import { useFilesStore } from "../../store/files";

import { Button } from "@/components/ui/button";

export default function ProjectFiles() {
  const { openNewFileModal } = useModal()
  const { openFile } = useProjectFiles()
  const { document } = useDocumentStore()
  const { files } = useFilesStore()

  const data = flattenTree({
    name: "",
    children: [
      {
        name: document.title,
        children: files,
      },
    ]
  });

  const selectedFile = files.find(({selected}) => selected)

  return (
    <div>

      <div className="directory">
        <TreeView
          data={data}
          defaultExpandedIds={[1]}
          selectedIds={selectedFile ? [selectedFile.id] : []}
          aria-label="directory tree"
          onNodeSelect={(e) => e.element.name.includes('.') && openFile(String(e.element.id))}
          nodeRenderer={({
            element,
            isBranch,
            isExpanded,
            getNodeProps,
            level,
          }) => (
            <div {...getNodeProps()} style={{ paddingLeft: 20 * (level - 1) }}>
              {isBranch || !element.name.includes('.') ? (
                <FolderIcon isOpen={isExpanded} />
              ) : (
                <FileIcon filename={element.name} />
              )}

              <div className="inline-block" style={{width: `calc(100% - ${20 * (level - 1)}px - 56px)`}}>
                {element.name}
              </div>
            </div>
          )}
        />

        <div className="h-2" />
        <Button onClick={openNewFileModal} variant="default" className="p-0 h-4 w-4 absolute right-1.5 top-1.5 z-10">
          <IconPlus size="0.6rem" />
        </Button>
      </div>
    </div>
  );
}
