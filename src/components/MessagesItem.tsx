import { Message } from "@/app/admin/messages/page";
import { Clock, Mail } from "lucide-react";

type MessagesItemType = {
  message: Message;
  handleSelectMessage: (message: Message) => void;
};

const MessagesItem = ({ message, handleSelectMessage }: MessagesItemType) => {
  const formattedDate = new Date(message.createdAt).toLocaleDateString();
  const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div
      key={message._id}
      className="border border-white/10 p-3 rounded-3xl space-y-3 bg-white/5 cursor-pointer relative"
      onClick={() => handleSelectMessage(message)}
    >
      <div
        className={`${
          message.status === "new" ? "text-accent-purple" : "text-gray-400"
        } flex items-center space-x-2`}
      >
        <Mail className="w-5" />
        <h5 className="text-sm font-medium">{message.name}</h5>
      </div>
      <h3 className="text-lg font-medium">{message.subject}</h3>
      <div className="flex items-center space-x-1 text-gray-400 m-0">
        <Clock className="w-3" />
        <span className="text-xs tracking-wider">{formattedDate}</span>
      </div>
      <span className="text-gray-400 text-sm absolute bottom-4 right-4 m-0">
        {formattedTime}
      </span>
      <div
        className={`${
          message.status === "new" ? " bg-accent-purple" : "bg-transparent"
        } w-2 h-2 rounded-full absolute top-4 right-4`}
      ></div>
    </div>
  );
};

export default MessagesItem;
