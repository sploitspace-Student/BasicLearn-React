import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Section from "./components/Section";
import Background from "./components/Background";
import About from "./components/About";

export default function App() {
  return (
    <>
      <Navbar />
      <Background />
      <main>
        <Hero />
        <About />
        <Section id="about" title="About" />
        <Section id="skills" title="Skills" />
      </main>
    </>
  );
}
