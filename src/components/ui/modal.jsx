import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Plus } from "lucide-react";
function OpenModule({ btnName, Title, Content }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        color="secondary"
        className="text-sm font-bold bg-first"
        onPress={onOpen}
      >
        {btnName}
        <Plus />
      </Button>
      <Modal
        backdrop="opaque"
        classNames={{
          body: "p-6",
          backdrop: "bg-[#69CFF7]/50 backdrop-opacity-40",
          base: "border-white bg-white dark:bg-[#19172c] ",
          header: "pb-2 pt-6  border-[#292f46] ",
          closeButton: "hover:bg-third active:bg-white/10",
        }}
        isOpen={isOpen}
        radius="lg"
        onOpenChange={onOpenChange}
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <div className="flex  justify-between items-center relative">
                <ModalHeader className="flex flex-col gap-1">
                  {Title}
                </ModalHeader>

                <div className="absolute right-12 top-2 flex gap-4"></div>
              </div>
              <ModalBody>{Content}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
export { OpenModule };
