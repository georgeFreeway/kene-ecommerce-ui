import { useNavigate } from "react-router-dom";

const About = () => {
    const navigate = useNavigate();

    const handleHome = () => {
        navigate('/');
    }
    const about = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere id, laborum optio quam in minima expedita placeat ut ullam deleniti officiis aut ex enim, excepturi quos quae, atque adipisci est vel quia quaerat? Fuga, ratione dolorum blanditiis maiores distinctio fugit debitis quisquam accusamus! Dolor sit error quod magni aspernatur ea exercitationem aliquam, laborum soluta, numquam natus voluptates rem impedit vero quisquam dolorem eligendi accusamus quidem alias! Vitae veniam assumenda ab consectetur eaque ad provident. Minima, dolore deleniti natus in est enim itaque. Iusto ab ipsa assumenda soluta hic non error aut corrupti? Nostrum ratione voluptatibus consequuntur fugit aperiam nisi sapiente.';

  return (
    <div className="p-5 text-center">
        <h1 className="font-mono text-2xl mb-3">ABOUT SOLE LUXURY</h1>
        <p className="text-sm font-mono">{about.toUpperCase()}</p>
        <button 
            className="px-4 py-2 bg-black text-white text-sm font-mono mt-5"
            onClick={handleHome}>CONTINUE SHOPPING
        </button>
    </div>
  )
}

export default About;