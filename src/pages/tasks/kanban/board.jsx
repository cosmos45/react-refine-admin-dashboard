import React from "react";
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, } from "@dnd-kit/core";
export const KanbanBoard = ({ onDragEnd, children, }) => {
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 5,
        },
    });
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            distance: 5,
        },
    });
    const sensors = useSensors(mouseSensor, touchSensor);
    const handleDragEnd = (event) => {
        if (event.over === null) {
            return;
        }
        onDragEnd(event);
    };
    return (<KanbanBoardContainer>
            <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
                {children}
            </DndContext>
        </KanbanBoardContainer>);
};
export const KanbanBoardContainer = ({ children }) => {
    return (<div style={{
            width: "calc(100% + 64px)",
            height: "calc(100vh - 64px)",
            display: "flex",
            justifyContent: "column",
            margin: "-32px",
        }}>
            <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            padding: "32px",
            overflow: "scroll",
        }}>
                {children}
            </div>
        </div>);
};
