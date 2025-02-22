import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './AddTask.css';
import { useState } from 'react';
import { checkmarkOutline, closeOutline } from 'ionicons/icons';
import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string;
  title: string;
}

interface ContainerProps {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  tasks: Task[]
}

const Tab2: React.FC<ContainerProps> = ({ tasks,setTasks }) => {
  const [task, setTask] = useState<string>('')
  const [toastAddTask] = useIonToast();

  const addTask = () => {
    try {
      setTasks([...tasks, {id: uuidv4(), title: task}])
      setTask('')
      toastAddTask({
        message: "Tâche ajouté",
        icon: checkmarkOutline,
        position: 'bottom',
        color: 'success',
        duration: 1500
      })
    } catch (err) {
      toastAddTask({
        message: "Une erreur est survenue",
        icon: closeOutline,
        position: 'bottom',
        color: 'danger',
        duration: 1500
      })
    }
  }

  const handleButton = (): boolean => {
    if(task.length < 1) {
      return true
    }
    return false
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ajouter une tâche</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div style={{margin: '1rem'}}>
          <IonInput 
            fill='outline' 
            style={{marginBottom: "1rem"}} 
            labelPlacement='floating' 
            label='Ajouter une tâche'
            maxlength={50}
            minlength={1}
            counter={true}
            counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} caractères restant`}
            onIonInput={(event: Event) => setTask((event.target as HTMLInputElement).value)}
            value={task}
          ></IonInput>
          <IonButton 
            color='success' 
            expand='block'
            onClick={() => addTask()}
            disabled={handleButton()}
            >
              Ajouter
            </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
