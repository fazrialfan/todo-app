import './ExploreContainer.css';
import React from 'react';
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCheckbox,
  IonIcon,
  IonInput,
  IonItem, IonItemDivider,
  IonLabel
} from '@ionic/react';
import { trashOutline } from 'ionicons/icons';

interface Todo {
  id: string,
  name: string,
  completed: boolean,
}

interface ContainerProps {
  todos: Array<Todo>,
  onDelete: OnDelete,
  onUpdate: OnUpdate,
}

interface OnDelete {
  (id: string): void;
}

interface OnUpdate {
  (id: string, name: string, completed?: boolean): void;
}

const ExploreContainer: React.FC<ContainerProps> = ({ todos, onDelete, onUpdate}) => {
  const todoItems = (completed = false) =>  todos?.filter(todo => todo.completed === completed).map(todo => {
    let todoInput = todo.name;
    let label = (
      <IonInput
        value={todoInput}
        onIonChange={({ detail }) => {
          todoInput = detail.value!;
          console.log('this is from label')
        }}
        onIonBlur={() => {
          onUpdate(todo.id, todoInput.length > 0 ? todoInput : todo.name, todo.completed);
        }}
        onKeyPress={(e) => {}}
      ></IonInput>
    );

    if (todo.completed) {
      label = (
        <IonLabel color="medium" class="strikethrough">
          {todo.name}
        </IonLabel>
      );
    }

    return (
      <IonCard key={todo.id}>
        <IonItem>
          <IonCheckbox checked={todo.completed} onIonChange={e => {
            onUpdate(todo.id, todo.name, e.detail.checked!)
          }} slot="start"></IonCheckbox>
          {label}
          <IonButtons slot="end">
            <IonButton onClick={() => {
              onDelete(todo.id)
            }}>
              <IonIcon slot="icon-only" icon={trashOutline}/>
            </IonButton>
          </IonButtons>
        </IonItem>
      </IonCard>
    );
  });

  let completedItems;

  if (todoItems(true).length > 0) {
    completedItems = (
      <div>
        <IonItemDivider>
          <IonBadge slot="start">Completed</IonBadge>
        </IonItemDivider>

        {todoItems(true)}
      </div>
    );
  }

  return (
    <div className="container">
      {todoItems()}
      {completedItems}
    </div>
  );
};

export default ExploreContainer;
