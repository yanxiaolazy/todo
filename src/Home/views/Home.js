import Helmet from "../../components/Helmet";

const prefix = 'home';

export default function Home() {
  
  return(
    <div className={`${prefix}`}>
      <Helmet title='Dashboard' />
      <h1 className='todo-title'>Dashboard</h1>
      正在完善...
    </div>
  );
}

