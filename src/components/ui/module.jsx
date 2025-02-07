import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";

function OpenModule({ btnName, Title, Content, deleteAction }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const onCopy = () => {
    navigator.clipboard.writeText(Content);
  };
  const onDelete = () => {
    deleteAction();
    // close modal
    onOpenChange(false);
  };

  return (
    <>
      <Button color="secondary" className="text-sm font-bold" onPress={onOpen}>
        {btnName}
      </Button>
      <Modal
        backdrop="opaque"
        classNames={{
          body: "p-6",
          backdrop: "bg-[#DEFA3F]/50 backdrop-opacity-40",
          base: "border-white bg-white dark:bg-[#19172c] ",
          header: "py-2 border-[#292f46] ",
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
              <div className="flex justify-between items-center relative">
                <ModalHeader className="flex flex-col gap-1">
                  {Title}
                </ModalHeader>
                <div className="absolute right-12 top-2 flex gap-4">
                  <Button
                    className="bg-first font-bold shadow-lg shadow-indigo-500/20"
                    onPress={onCopy}
                  >
                    Copy
                  </Button>

                  <Button
                    className="bg-[#FF2727] font-bold shadow-lg shadow-indigo-500/20"
                    onPress={onDelete}
                  >
                    Delete
                  </Button>
                </div>
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
