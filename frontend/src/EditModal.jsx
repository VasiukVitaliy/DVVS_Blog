import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import axios from "axios";

export default function EditModal({ msg, id, uuid, onClose }) {
  const backend = import.meta.env.VITE_BACKEND;

  const deleteMsg = async () => {
    try {
      const res = await axios.delete(`${backend}/deleteMessage`, {
        data: { message_id: id, uuid: uuid }
      });
      console.log(res.data);
      onClose();
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Error deleting message");
    }
  };

   const [newText, setNewText] = useState(msg.message);

   const editMsg = async () => {
     try {
       const res = await axios.put(`${backend}/updateMessage`, {
         message_id: id,
         uuid: uuid,
         message: newText
       });
       console.log(res.data);
       onClose();
       window.location.reload();
     } catch (err) {
       console.error(err);
       alert("Error editing message");
     }
   };

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">

      <DialogBackdrop className="fixed inset-0 bg-black/40" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg">

          <DialogTitle className="text-lg font-semibold mb-3">
            Дії з повідомленням
          </DialogTitle>

          <textarea
            className="w-full border p-2 rounded mb-4"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />

          <div className="space-y-2">
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-md"
              onClick={editMsg}
            >
              ✏️ Редагувати
            </button>

            <button
              className="w-full bg-red-600 text-white py-2 rounded-md"
              onClick={deleteMsg}
            >
              🗑️ Видалити
            </button>

            <button
              className="w-full bg-gray-200 py-2 rounded-md"
              onClick={onClose}
            >
              Скасувати
            </button>
          </div>

        </DialogPanel>
      </div>
    </Dialog>
  );
}
