import React, { useState } from "react";
import InputField from "./components/InputField";
import { Task } from "./model";
import { Card, CardHeader, CardContent, Div } from "@/components/ui/card";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TaskList from "./components/TasksList";
import { IN_PROCESS, TASK_LIST } from "./constants/Constants";

const App = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTask, setCompletedTask] = useState<Task[]>([]);
  const [inProcessTasks, setInProcessTasks] = useState<Task[]>([]);

  const onDragEnd = (res: DropResult) => {
    const { destination, source } = res;

    console.log('destinatin:', destination,)
    console.log('source:', source,)

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    let add;
    let active = tasks;
    let complete = completedTask;
    let inProcess = inProcessTasks;

    if (source.droppableId === TASK_LIST) {
      add = active[source.index];
      active.splice(source.index, 1);
    } else if (source.droppableId === IN_PROCESS) {
      add = inProcess[source.index];
      inProcess.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === TASK_LIST) {
      active.splice(destination.index, 0, add);
    } else if (destination.droppableId === IN_PROCESS) {
      inProcess.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTask(complete);
    setTasks(active);
    setInProcessTasks(inProcess);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      setTasks([...tasks, { id: Date.now(), task }]);
      setTask("");
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Div className="flex flex-col items-center mt-8">
        <InputField task={task} setTask={setTask} handleAdd={handleAdd} />

        <Card className="my-4">
          <CardHeader>
            <h2 className="text-xl font-bold">
              {tasks.length === 0 ? "No task added" : ""}
            </h2>
          </CardHeader>
          <CardContent>
            {tasks.length === 0 && completedTask.length === 0 && inProcessTasks.length === 0 ? (
              <h4 className="font-bold mt-12">No task added</h4>
            ) : (
              <TaskList
                tasks={tasks}
                setTasks={setTasks}
                completedTask={completedTask}
                setCompletedTask={setCompletedTask}
                inProcessTasks={inProcessTasks}
                setInProcessTasks={setInProcessTasks}
              />
            )}
          </CardContent>
        </Card>
      </Div>
    </DragDropContext>
  );
};

export default App;
