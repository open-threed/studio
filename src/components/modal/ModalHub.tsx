import { useEffect, useState } from "react"
import { useScrollIntoView } from "@mantine/hooks"
import { Pagination } from "react-headless-pagination";

import { useLayoutStore } from "../../store/layout"
import { useElement } from "../../hooks/useElement"
import useModal from "../../hooks/useModal"
import CONSTANTS from "../../constants"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react";

type CardHubProps = {
  name: string
  file: string
}

function CardHub({ name, file }: CardHubProps) {
  const {createGlbElement} = useElement()
  const { setModalOpen } = useLayoutStore()

  function handleClick() {
    createGlbElement({ file })
    setModalOpen({name: 'hub', value: false})
  }

  return (
    <div className="border bg-background rounded-md">
      <div onClick={handleClick} className="cursor-pointer">
        <img
          src={`${CONSTANTS.cdn}/models/${file}/${file}.png`}
          height={160}
          alt={name}
        />
      </div>
      <div className="justify-center mt-3 mb-3">
        <p className="font-medium capitalize text-center">
          {name.replaceAll('_', ' ')}
        </p>
      </div>
    </div>
  )
}

export default function ModalHub() {
  const { isOpenedHubModal, closeHubModal } = useModal()
  const [page, setPage] = useState<number>(0);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<
    HTMLDivElement,
    HTMLDivElement
  >({duration: 200});

  useEffect(() => {
    scrollIntoView()
  }, [page])
  
  const alu = CONSTANTS.models.filter((_: string, index: number)=>(
    index+1>(((page+1)*20)-20) && index+1<=((page+1)*20)
  ))

  return (
    <Dialog
      open={isOpenedHubModal}
      onOpenChange={closeHubModal}
    >
      <DialogContent style={{maxWidth: '60rem'}}>
        <DialogHeader>
          <DialogTitle>Hub</DialogTitle>
        </DialogHeader>
        <div className="mt-1">
          <ScrollArea className="h-[600px] mt-1 overflow-x-hidden" ref={scrollableRef}>
            <div ref={targetRef} />
            <div className="grid grid-cols-4 gap-4">
              {alu.map((item: string) => (
                <div key={item}>
                  <CardHub
                    name={item}
                    file={item}
                  />
                </div>
              ))}
            </div>
            <div className="mt-3 pb-2 flex justify-center">
              <Pagination
                className="flex justify-center mt-10 items-center w-full h-10 text-sm select-none"
                edgePageCount={2}
                middlePagesSiblingCount={1}
                currentPage={page}
                setCurrentPage={handlePageChange}
                totalPages={10}
                truncableClassName="w-10 px-0.5 text-center"
                truncableText="..."
              >
                <Pagination.PrevButton className="flex items-center mr-2 text-gray-500 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none opacity-50">
                  <IconChevronsLeft
                    className="mr-3"
                    size={20}
                  />
                </Pagination.PrevButton>
                <div className="flex list-none mx-5">
                  <Pagination.PageButton
                    activeClassName="bg-primary-50 dark:bg-muted text-primary-600 dark:text-white"
                    className="flex border mx-1 items-center justify-center h-10 w-10 rounded-md cursor-pointer"
                    inactiveClassName="text-gray-500"
                  />
                </div>
                <Pagination.NextButton className="flex items-center mr-2 text-gray-500 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none cursor-pointer">
                  <IconChevronsRight
                    className="ml-3"
                    size={20}
                  />
                </Pagination.NextButton>
              </Pagination>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}