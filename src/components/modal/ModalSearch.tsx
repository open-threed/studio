import useModal from "@/hooks/useModal";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

const ModalSearch = () => {
  const { isOpeneSearchModal, closeSearchModal, openSearchModal } = useModal()

  return (
    <CommandDialog open={isOpeneSearchModal} onOpenChange={isOpeneSearchModal?closeSearchModal:openSearchModal}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Create element</CommandItem>
          <CommandItem>Search Model</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Others">
          <CommandItem>Logout</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default ModalSearch;