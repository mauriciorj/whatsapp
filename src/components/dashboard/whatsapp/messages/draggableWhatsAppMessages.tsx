"use client";

import { useState, useEffect, useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ArrowDownUp, CalendarIcon, Trash2 } from "lucide-react";
import { format } from "date-fns";
import DefaultCard from "@/components/layout/defaultCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  title: string;
  createdAt: string;
  content: string;
}

interface DraggableWhatsAppMessagesProps {
  messages: Message[];
  onReorder: (reorderedMessages: Message[]) => void;
  title: string;
  onEdit?: (message: Message) => void;
  onDelete?: (message: Message) => void;
  translate?: any;
}

type DraggableItemProps = {
  message: Message;
  index: number;
  moveCard: (fromIndex: number, toIndex: number) => void;
  onEdit?: (message: Message) => void;
  onDelete?: (message: Message) => void;
  translate?: any;
};

const ItemType = "MESSAGE_CARD";

const MessageCard = ({
  message,
  index,
  moveCard,
  onEdit,
  onDelete,
  translate,
}: DraggableItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item: { index: number }, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = clientOffset?.y! - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  // Apply drop ref to the card container
  drop(ref);

  // Apply drag ref only to the handle
  drag(dragHandleRef);

  return (
    <div
      ref={ref}
      className={cn(
        "p-4 rounded-lg border bg-card shadow-sm mb-3",
        isDragging && "shadow-md opacity-80 border-primary"
      )}
    >
      <div className="flex justify-between items-start">
        {/* Left side with drag handle and title */}
        <div className="flex items-center">
          <div
            ref={dragHandleRef}
            className="cursor-grab mr-2 p-1 rounded hover:bg-gray-100 active:cursor-grabbing"
          >
            <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
          </div>
          <h3 className="font-medium text-sm">{message.title}</h3>
        </div>

        {/* Right side with date */}
        <div className="flex items-center text-muted-foreground text-xs">
          <CalendarIcon className="h-3 w-3 mr-1" />
          {format(new Date(message.createdAt), "MMM dd, yyyy")}
        </div>
      </div>

      {/* Bottom section with action buttons */}
      <div className="flex justify-end mt-3">
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit && onEdit(message)}
            disabled={!onEdit}
          >
            {translate?.["messageUpdateCta"] || "Edit"}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete && onDelete(message)}
            disabled={!onDelete}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function DraggableWhatsAppMessages({
  messages,
  title,
  onEdit,
  onDelete,
  translate,
}: DraggableWhatsAppMessagesProps) {
  const [messageItems, setMessageItems] = useState<Message[]>([]);

  useEffect(() => {
    setMessageItems(messages);
  }, [messages]);

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const updatedItems = [...messageItems];
    const draggedItem = updatedItems[dragIndex];

    // Remove the dragged item
    updatedItems.splice(dragIndex, 1);
    // Insert at the new position
    updatedItems.splice(hoverIndex, 0, draggedItem);

    setMessageItems(updatedItems);
  };

  return (
    <DefaultCard title={title}>
      <DndProvider backend={HTML5Backend}>
        <div className="space-y-0">
          {messageItems.map((message, index) => (
            <MessageCard
              key={`${message.id}-${index}`}
              message={message}
              index={index}
              moveCard={moveCard}
              onEdit={onEdit}
              onDelete={onDelete}
              translate={translate}
            />
          ))}
        </div>
      </DndProvider>
    </DefaultCard>
  );
}
