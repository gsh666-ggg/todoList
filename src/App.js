import routers from './router/route';
import { Routes,Link,Route } from 'react-router-dom';

function App() {
    return (
        <Routes>
            {
                routers.map((route, index) => {
                    return (
                        <Route key = { index } path = { route.path}  element = {< route.components />}/>
                    )
                })
            }
        </Routes>
    );
}
export default App;