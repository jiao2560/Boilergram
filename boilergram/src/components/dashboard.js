import {useEffect} from 'react';
import Header from './header';
import Timeline from './timeline';
import Sidebar from './sidebar';

export default function Dashboard() {
  useEffect(() => {
    document.title = 'Boilergram';
  }, []);

  return (
    <div className="bg-gray-background">
      <Header/>
      <div className="grid grid-cols-3 gap-4 justify-between
                      mx-auto max-w-screen-lg">
        <Timeline/>
        <Sidebar/>
      </div>
    </div>
  );
}
