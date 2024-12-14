import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Div } from "./ui/card";

interface Props {
    task: string;
    setTask: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ task, setTask, handleAdd }) => {
    return (
        <form
            className="flex justify-center"
            onSubmit={handleAdd}
        >
            <Div className="flex">
                <Input
                    placeholder="Add a task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <Button type="submit">
                    Add
                </Button>
            </Div>
        </form>
    );
};

export default InputField;