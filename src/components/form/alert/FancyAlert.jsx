import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const FancyAlert = ({ message, onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate("/"); // Navigate to the given path
  };

  return (
    <Dialog open={!!message} onOpenChange={onClose}>
      <DialogContent className="p-6 max-w-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-center"
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-green-600">
              🎉 Success!
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-600 mt-2">{message}</p>
          <Button
            onClick={handleClose}
            className="mt-4 w-full bg-green-500 hover:bg-green-600"
          >
            OK
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default FancyAlert;
