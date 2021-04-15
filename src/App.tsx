/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";

/* React Vis: Nice graphs */
import "react-vis/dist/style.css";

import { CoordinatorPage } from "./coordinator/CoordinatorPage";

/* Theme variables */
import "./theme/variables.scss";

const App: React.FC = () => {
    return <CoordinatorPage></CoordinatorPage>;
};

export default App;
