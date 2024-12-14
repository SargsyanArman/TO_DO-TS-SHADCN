import React, { useState } from "react";
import { Task } from "../model";
import { Draggable } from "react-beautiful-dnd";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardHeader, CardFooter } from "./ui/card";

interface Props {
    index: number;
    task: Task;
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const CardList: React.FC<Props> = ({ index, task, tasks, setTasks }) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTask, setEditTask] = useState<string>(task.task);

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        if (edit) {
            setTasks(
                tasks.map((task) => (task.id === id ? { ...task, task: editTask } : task))
            );
            setEdit(false);
        } else {
            setEdit(true);
        }
    };

    const handleDelete = (id: number) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    return (
        <Draggable draggableId={task.id.toString()} index={index}>
            {(provided) => (
                <form
                    onSubmit={(e) => handleEdit(e, task.id)}
                    className="mb-2"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Card className="bg-blue-50 p-4 rounded-lg shadow-md">
                        <CardHeader className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-800">
                                {edit ? (
                                    <Input
                                        value={editTask}
                                        placeholder="Enter task"
                                        onChange={(e) => setEditTask(e.target.value)}
                                        className="w-full"
                                    />
                                ) : (
                                    task.task
                                )}
                            </h3>
                        </CardHeader>
                        <CardFooter className="flex space-x-3">
                            <Button
                                type="submit"
                                variant="outline"
                                className="w-20"
                            >
                                {edit ? "Save" : "Edit"}
                            </Button>
                            <Button
                                type="button"
                                variant="destructive"
                                className="w-20"
                                onClick={() => handleDelete(task.id)}
                            >
                                Delete
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            )}
        </Draggable>
    );
};

export default CardList;
