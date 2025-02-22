import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonButton, IonIcon, IonReorderGroup, ItemReorderEventDetail, IonReorder, IonCheckbox, IonActionSheet } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { trash } from 'ionicons/icons';
import { CheckboxChangeEventDetail, IonCheckboxCustomEvent } from '@ionic/core';
import { useState } from 'react';

interface Task {
  id: string;
  title: string
}

interface ContainerProps {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  tasks: Task[]
}

const Tab1: React.FC<ContainerProps> = ({ tasks, setTasks }) => {
  const [order, setOrder] = useState<boolean>(true)
  const deleteTask = (id: string) => {
    setTasks([...tasks.filter(task => task.id !== id)])
  }

  const handleReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    setTasks(event.detail.complete(tasks));;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div style={{display: 'flex'}}>
            <IonTitle>Liste des tâches</IonTitle>
            <IonButton 
              style={{marginRight: '20px'}}
              onClick={() => setOrder(!order)}
            >
              Ordonner
            </IonButton>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div>
          {tasks.length === 0 ? 
          (
            <div className='nothing-tasks'>Aucune tâches</div>
          ) : (
            <IonList>
              <IonReorderGroup disabled={order} onIonItemReorder={handleReorder}>
                {tasks.map((task: Task) => (
                  <IonItem key={task.id}>
                    <div 
                      id={`open-action-${task.id}`}
                      style={{width: '100%'}}
                    >
                      { task.title }
                    </div>
                    <IonActionSheet
                      trigger={`open-action-${task.id}`}
                      header='Actions'
                      buttons={[
                        {
                          text: 'Supprimer',
                          role: 'destructive',
                          handler: () => deleteTask(task.id)
                        }
                      ]}
                    ></IonActionSheet>
                    <IonReorder slot='end'></IonReorder>
                  </IonItem>
                ))}
              </IonReorderGroup>
            </IonList>
          )
        }
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
