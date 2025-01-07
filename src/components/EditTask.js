import React, { useEffect } from "react";

const EditTask = ({ isOpen, onClose, task, onSave }) => {
    const [taskTitle, setTaskTitle] = React.useState(task.task || '');
    const [category, setCategory] = React.useState(task.category || '');
    const [createdAt, setCreatedAt] = React.useState(task.createdAt || '');
    const [deadline, setDeadline] = React.useState(task.dateline || '');

    useEffect(() => {
        setTaskTitle(task.task || '');
        setCategory(task.category || '');
        setCreatedAt(task.createdAt || '');
        setDeadline(task.deadline || '');
    }, [task]);

    if (!isOpen) return null;

    const handleSave = () => {
        onSave({ ...task, task: taskTitle, category, createdAt, deadline });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-yellow-200 p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold font-poppins mb-4">Edit Task</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Task</label>
                        <input
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            className="w-ful px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <input
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-ful px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">CreatedAt</label>
                        <input 
                            type="date"
                            value={createdAt}
                            onChange={(e) => setCreatedAt(e.target.value)}
                            className="w-ful px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Deadline</label>
                        <input 
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className="w-ful px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="px-4 py-2 bg-yellow-800 text-white rounded-lg hover:bg-yellow-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default EditTask;