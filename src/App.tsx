import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { add, addOutline, ellipse, list, listOutline, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/ListTask';
import Tab2 from './pages/AddTask';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Preferences } from '@capacitor/preferences';

setupIonicReact();

interface Task {
  id: string;
  title: string
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // const setTask = async (id: string, task: string) => {
  //   try {
  //     const newTask = { id: id, title: task }
  //     const { value } = await Preferences.get({ key: 'tasks'})
  //     let tasksParse = [];
  //     let tasksStringify = '';

  //     if(value) {
  //       tasksParse = JSON.parse(value)
  //     }
  //     tasksParse.push(newTask)
  //     tasksStringify = JSON.stringify(tasksParse)
  //     await Preferences.set({
  //       key: "tasks",
  //       value: tasksStringify
  //     })
  //   } catch(err) {
  //     console.log("Une erreur d'insertion est survenue!")
  //   }

  // }

  const getTasks = async () => {
    const { value } = await Preferences.get({ key: 'tasks' })
    const tasks = value ? JSON.parse(value) : [];
    return tasks
  }
  
  // const removeTask = async (id: string) => {
  //   const tasks = await getTasks()
  //   let tasksStringify = '';
  //   const newTasksList = []

  //   if(tasks.length === 0) {
  //     return;
  //   }
  //   newTasksList.push(...tasks.filter((task: Task) => task.id !== id))

  //   tasksStringify = JSON.stringify(newTasksList)

  //   await Preferences.set({ key: 'tasks', value: tasksStringify })
  // }

  useEffect(() => {
    (async() => {
      setTasks(await getTasks())
      console.log('Tâches chargés:', await getTasks())
    })();
  }, [])

  useEffect(() => {
    (async() => {
      let tasksStringify = JSON.stringify(tasks)
      await Preferences.set({ key: 'tasks', value: tasksStringify})
      console.log('Update:', await getTasks())
    })();
  }, [tasks])

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/tab1">
              <Tab1 setTasks={setTasks} tasks={tasks} />
            </Route>
            <Route exact path="/tab2">
              <Tab2 setTasks={setTasks} tasks={tasks} />
            </Route>
            <Route exact path="/">
              <Redirect to="/tab1" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tab1">
              <IonIcon aria-hidden="true" icon={list} />
              <IonLabel>Liste</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IonIcon aria-hidden="true" icon={add} />
              <IonLabel>Ajouter</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
