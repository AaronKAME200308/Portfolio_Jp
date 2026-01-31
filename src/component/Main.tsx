import About from "../pages/About";
import Home from "../pages/Home";
import Projects from "../pages/Projets";


const Main = () => {
    return (
        <main>
            <section id="Accueil">
                <Home />
            </section>


            <section id="À propos">
                <About/>
            </section>

            <section id="Projets">
               <Projects/>
            </section>
            
            <section id="Contact">
                
            </section>
        </main>
    );
};

export default Main;
