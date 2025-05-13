"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import ContentCard from "@/components/layout/contentCard";

interface Message {
  id: string;
  title: string;
  createdAt: string;
  content: string;
}

interface DraggableWhatsAppMessagesProps {
  messages: Message[];
  // onReorder: (reorderedMessages: Message[]) => void;
  title: string;
  // onEdit?: (message: Message) => void;
  // onDelete?: (message: Message) => void;
  translations?: any;
}

// SortableCard component
function SortableCard({
  message,
  translations,
}: {
  message: Message;
  translations: any;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: message.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-3 touch-manipulation">
      <Card>
        <CardContent className="p-4 flex items-center gap-3">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab touch-manipulation"
          >
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="font-medium">{message.title}</h3>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                // onClick={() => onEdit && onEdit(message)}
                // disabled={!onEdit}
              >
                {translations?.["messageUpdateCta"] || "Edit"}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                // onClick={() => onDelete && onDelete(message)}
                // disabled={!onDelete}
              >
                <Trash2 className="h-5 w-5 text-destructive" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const DraggableWhatsAppMessages = ({
  messages,
  title,
  translations,
}: DraggableWhatsAppMessagesProps) => {
  const [cards, setCards] = useState<Message[]>(messages);

  // Set up sensors for drag detection
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag end event
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setCards((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <ContentCard title={title}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={cards.map((card) => card.id)}
          strategy={verticalListSortingStrategy}
        >
          <ScrollArea className="h-[70vh]">
            {cards.map((card) => (
              <SortableCard
                key={card.id}
                message={card}
                translations={translations}
              />
            ))}
          </ScrollArea>
        </SortableContext>
      </DndContext>
    </ContentCard>
  );
};

export default DraggableWhatsAppMessages;
