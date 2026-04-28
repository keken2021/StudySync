import { getTasks } from '@/api/tasksApi';
import { useEffect } from 'react'

export default function TasksPage() {
    const { data: res } = getTasks();
    useEffect(() => {
        console.log("Tasks data:", res);
    }, [res])
    return (
        <div>
            RESULT : {res}
        </div>
    )
}
