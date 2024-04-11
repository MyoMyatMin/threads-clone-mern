import { useToast } from "@chakra-ui/react";

const useShowToast = () => {
  const toast = useToast();
  const showToast = (title, description, status) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 3000, // Corrected duration property
      isClosable: true, // Added isClosable property for better UX
    });
  };

  return showToast; // Return the showToast function from the hook
};

export default useShowToast;
