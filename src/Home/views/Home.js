import ContainerLayer from "../../components/ContainerLayer";

const prefix = 'home';

export default function Home() {
  
  return(
    <ContainerLayer 
      className={`${prefix}`}
      title='Dashboard'
      h1Content='Dashboard'
    >
      正在完善...
    </ContainerLayer>
  );
}

