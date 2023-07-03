import { useEffect, useRef, useState } from "react"
import { useClipboard, useScrollIntoView } from "@mantine/hooks"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { IconCheck, IconChevronsLeft, IconChevronsRight, IconCopy, IconInfoCircle, IconPlus, IconSearch, IconX } from "@tabler/icons-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { nanoid } from "nanoid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useDocumentStore } from "@/store/document";

type CardHubProps = {
  name: string
  file: string
  owner: string
}

const exampleModelUrl = 'https://gltf.pmnd.rs/suzanne.gltf'

function CardHub({ name, file, owner }: CardHubProps) {
  const {createGlbElement} = useElement()
  const { setModalOpen } = useLayoutStore()

  function handleClick() {
    createGlbElement({ file })
    setModalOpen({name: 'hub', value: false})
  }

  const isCustomModel = owner === 'custom'

  const imgUrl = isCustomModel ? '/img/no-image.png' : `${CONSTANTS.cdn}/models/${file}/${file}.png`
  const imgClassName = isCustomModel ? 'py-5 mx-auto max-h-[213px]' : ''

  return (
    <div className="border bg-background rounded-md">
      <div onClick={handleClick} className="model-thumb relative cursor-pointer">
        <img
          src={imgUrl}
          height={160}
          className={imgClassName}
          alt={name}
        />
        <Badge className="model-thumb-label absolute top-2 right-2 opacity-0">
          {owner}
        </Badge>
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
  const formRef = useRef<HTMLFormElement>(null)
  const {document: doc, updateDocument} = useDocumentStore()

  const [tabSelected, setTabSelected] = useState('thebasemesh')
  const [openedForm, setOpenedForm] = useState<string | null>(null)

  const clipboard = useClipboard({ timeout: 500 });

  function onAddSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const target = e.target as typeof e.target & {
      name: { value: string };
      url: { value: string };
    };

    const newCustomModel = {
      id: nanoid(6),
      name: target.name.value,
      file: target.url.value
    }
    updateDocument({
      customModels: doc.customModels?.length ? [
        newCustomModel,
        ...doc.customModels
      ] : [newCustomModel]
    })
    formRef.current?.reset();
  }

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

  useEffect(() => {
    if(openedForm === 'add') {
      setTabSelected('custom')
    }
  }, [openedForm])

  useEffect(() => {
    if(tabSelected === 'thebasemesh' && openedForm === 'add') {
      setOpenedForm(null)
    }
  }, [tabSelected])
  
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
        <Tabs value={tabSelected}>
          <div className="mt-1">
            <div className="flex justify-between mb-5">
              <div className="flex">
                <TabsList>
                  <TabsTrigger onClick={() => setTabSelected('thebasemesh')} value="thebasemesh">
                    THE BASE MESH
                  </TabsTrigger>
                  <TabsTrigger onClick={() => setTabSelected('custom')} value="custom">
                    Model by URL
                  </TabsTrigger>
                </TabsList>
              </div>
              <div className="flex">
                {openedForm !== 'add' ? null : (
                  <form autoComplete="nope" ref={formRef} onSubmit={onAddSubmit}>
                    <div className="flex space-x-3">
                      <Input required name="name" autoComplete="off" placeholder="Name" />
                      <div className="flex">
                        <Input required name="url" className="w-[170px] pr-[30px]" autoComplete="off" placeholder="URL" />
                        <div className="relative">
                          <Popover>
                            <PopoverTrigger className="w-full" asChild>
                              <div className="mt-2 opacity-70 cursor-pointer absolute left-[-30px]">
                                <IconInfoCircle />
                              </div>
                            </PopoverTrigger>
                            <PopoverContent side="bottom" className="p-2 pl-3 w-[340px]">
                              <div className="flex">
                                <Badge variant="outline" className="mr-2">Ex</Badge>
                                <p>{exampleModelUrl}</p>
                                <Button variant="ghost" className="h-6 px-1 ml-2" onClick={() => clipboard.copy(exampleModelUrl)}>
                                  {clipboard.copied ? <IconCheck size="1rem" /> : <IconCopy size="1rem" />}
                                </Button>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <Button variant="outline" type="submit">Add</Button>
                    </div>
                  </form>
                )}
                {openedForm !== 'search' ? null : (
                  <div className="flex space-x-3">
                    <Input placeholder="Search by name" />
                    <Button variant="outline">Search</Button>
                  </div>
                )}
                <div className="flex space-x-3">
                  {!openedForm ? (
                    <>
                      <Button className="hidden" onClick={() => setOpenedForm('search')}>
                        <IconSearch />
                      </Button>
                      <Button onClick={() => setOpenedForm('add')}>
                        <IconPlus />
                      </Button>
                    </>
                  ) : (
                    <Button variant="link" onClick={() => setOpenedForm(null)}>
                      <IconX />
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <ScrollArea className="h-[600px] mt-1 overflow-x-hidden" ref={scrollableRef}>
              <div ref={targetRef} />

              <TabsContent value="custom">
                {doc.customModels?.length ? null : <p>No custom models found.</p>}
                <div className="grid grid-cols-4 gap-4">
                  {doc.customModels?.map((item) => (
                    <div key={item.id}>
                      <CardHub
                        name={item.name}
                        file={item.file}
                        owner="custom"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="thebasemesh">
                <div className="grid grid-cols-4 gap-4">
                  {alu.map((item: string) => (
                    <div key={item}>
                      <CardHub
                        name={item}
                        file={item}
                        owner="the-base-mesh"
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
              </TabsContent>
            </ScrollArea>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}