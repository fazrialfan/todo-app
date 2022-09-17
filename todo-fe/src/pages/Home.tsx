import {
  IonContent,
  IonHeader,
  IonFooter,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonButton, IonItem, IonInput
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { addOutline } from 'ionicons/icons';
import './Home.css';
import React, { useEffect, useState } from 'react';

const title = 'Todo App';

const Home: React.FC = () => {
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  const [todoInput, setTodoInput] = useState<string>('');
  const [todos, setTodos] = useState<any[]>([]);


  const loadTodos = () => {
    fetch(`${baseURL}`)
      .then(response => response.json())
      .then(todos => {
        setTodos(todos);
      });
  }

  useEffect(loadTodos, [baseURL]);

  const createTodo = async (name: string) => {
    if (name.length === 0) {
      return;
    }

    const request = await fetch(`${baseURL}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (request.ok) {
      setTodoInput('');
      await loadTodos();
    }

    console.log('Todo created...');
  }

  const deleteTodo = async (id: string) => {
    const request = await fetch(`${baseURL}/${id}`, {
      method: "DELETE",
    });

    if (request.ok) {
      await new Audio('/assets/remove-sound.mp3').play();
      console.log('Todo deleted...');

      await loadTodos()
    }
  }

  const updateTodo = async (id: string, name: string, completed?: boolean) => {
    const request = await fetch(`${baseURL}/${id}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ name, completed }),
    });

    if (request.ok) {
      if (completed) {
        await new Audio('/assets/completion-sound.mp3').play();
      }

      await loadTodos();
    }
  }

  const onFormSubmit = async () => {
    await createTodo(todoInput);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer
          todos={todos}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
        />
      </IonContent>

      <IonFooter className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton disabled={todoInput?.length === 0} onClick={() => { onFormSubmit() }}>
              <IonIcon slot="icon-only" icon={addOutline} />
            </IonButton>
          </IonButtons>
          <IonItem>
            <form onSubmit={(event) => { onFormSubmit(); event.preventDefault(); }}>
              <IonInput value={todoInput} placeholder="Add a Task" onIonChange={e => setTodoInput(e.detail.value!)}></IonInput>
            </form>
          </IonItem>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
