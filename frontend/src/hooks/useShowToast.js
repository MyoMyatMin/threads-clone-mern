import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

const useShowToast = () => {
  const toast = useToast();
  const showToast = useCallback(
    (title, description, status) => {
      toast({
        title: title,
        description: description,
        status: status,
        duration: 3000, // Corrected duration property
        isClosable: true, // Added isClosable property for better UX
      });
    },
    [toast]
  );

  return showToast; // Return the showToast function from the hook
};

export default useShowToast;
