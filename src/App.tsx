import { useState, FormEvent } from 'react';

// interface Task { }

type Task = {
  id: string
  title: string
  completed: boolean
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [input, setInput] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const task: Task = {
      id: crypto.randomUUID(),
      title: input,
      completed: false,
    }

    // 新しい配列（オブジェクト）を作成している
    setTasks([...tasks, task])
    setInput('')
  }

  function handleCheckboxChange(task: Task) {
    // map は新しい配列を返す
    setTasks(tasks.map(t => {
      if (t.id === task.id) {
        return {
          ...t,
          completed: !t.completed,
        }
      }
      return t
    }))
  }

  return (
    <>
      <h1>TODOアプリ</h1>

      {tasks.length > 0 ?
        <>
          <h2>My Tasks</h2>

          <ul>
            {tasks.map(task => (
              <li key={task.id}>
                <input type="checkbox" checked={task.completed} onChange={() => handleCheckboxChange(task)} />
                {task.completed ? <s>{task.title}</s> : task.title}
              </li>
            ))}
          </ul>
        </> :
        <p>タスクを追加してください</p>
      }

      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={(event) => setInput(event.target.value)} />
        <button type='submit'>Add Task</button>
      </form>
    </>
  )
}

export default App
