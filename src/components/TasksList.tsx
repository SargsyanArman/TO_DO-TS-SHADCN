import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Task } from "../model";
import CardList from "./CardList";
import { Card, CardHeader, CardContent, Div } from "@/components/ui/card";

interface Props {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    completedTask: Task[];
    setCompletedTask: React.Dispatch<React.SetStateAction<Task[]>>;
    inProcessTasks: Task[];
    setInProcessTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList: React.FC<Props> = ({
    tasks,
    setTasks,
    completedTask,
    setCompletedTask,
    inProcessTasks,
    setInProcessTasks,
}) => {

    const taskLists = [
        {
            id: "incomplete",
            title: "Incomplete Tasks",
            tasks: tasks,
            setTasks: setTasks,
            bgColor: "#f4e2ff",
        },
        {
            id: "InProcess",
            title: "In Process",
            tasks: inProcessTasks,
            setTasks: setInProcessTasks,
            bgColor: "#f7ffd4",
        },
        {
            id: "completed",
            title: "Completed Tasks",
            tasks: completedTask,
            setTasks: setCompletedTask,
            bgColor: "#d8ffd4",
        },
    ];

    return (
        <div className="flex gap-2 border-none">
            {taskLists.map(({ id, title, tasks, setTasks, bgColor }) => (
                <Div className="flex-1" key={id}>
                    <Card className={`bg-[${bgColor}]`}>
                        <CardHeader className="p-4">
                            <h3 className="mb-2">{title}</h3>
                        </CardHeader>
                        <CardContent>
                            <Droppable droppableId={id}>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps} className="mb-4">
                                        {tasks?.map((task, index) => (
                                            <CardList
                                                index={index}
                                                tasks={tasks}
                                                task={task}
                                                key={task.id}
                                                setTasks={setTasks}
                                            />
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </CardContent>
                    </Card>
                </Div>
            ))}
        </div>
    );
};

export default TaskList;
